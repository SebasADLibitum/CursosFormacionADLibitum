import { Request, Response } from 'express';
import bcrypt from 'bcrypt';

import mysqlConnection from '../db/connectDB';

class UsersController {

    public async getAll(req: Request, res: Response) {
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.users',
            (error, result) => {
                if (error) return res.json({ error: error })
                if (result.length == 0) {
                    return res.status(400).json({ text: 'No hay usuarios en el sistema' })
                }
                // console.log('Busqueda de todos los usuarios realizada con exito');
                // console.log(result);
                res.json(result)
            })
    };

    public async getOne(req: Request, res: Response) {
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.users WHERE (id = ?)',
            [req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error })
                if (result.length == 0) {
                    return res.status(400).json({ text: 'El usuario que buscas no existe' })
                }
                // console.log('Busqueda de usuario realizada con exito');
                // console.log(result);
                res.json(result)
            })
    };

    public async create(req: Request, res: Response) {
        const { username, email, password } = req.body;
        const passwordHash = await bcrypt.hash(req.body.password, 10);

        await mysqlConnection.query('INSERT INTO ng_pruebalanding_db.users (username, email, password) VALUES (?, ?, ?)',
            [username || null, email || null, passwordHash || null],
            (error, result) => {
                if (error) return res.status(400).json({text: 'Este usuario ya existe', error: error });
                // console.log('Usuario creado con exito');
                // console.log(`Usuario ${username} creado con exito`)
                // console.log(result);
                res.json(result);
            });
    }

    public async delete(req: Request, res: Response) {
        await mysqlConnection.query('DELETE FROM ng_pruebalanding_db.users WHERE (id = ?)', [req.params.id],
            (error, results) => {
                if (error) return res.status(400).json({ error: error });

                // console.log('Usuario eliminado con exito');
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        let sql = 'UPDATE ng_pruebalanding_db.users SET';
        let values = [];

        if (req.body.username) {
            sql += " username = ?";
            values.push(req.body.username);
        }
        if (req.body.email) {
            sql += " email = ?";
            values.push(req.body.email);
        }
        if (req.body.password) {
            sql += " password = ?";
            values.push(req.body.password);
        }
        sql += " WHERE id = ?";
        values.push(req.params.id);

        await mysqlConnection.query(sql, values,
            (error, result) => {
                if (error) return res.status(400).json({ error: error });
                // console.log('Usuario actualizado con exito');
                // console.log(result);
                res.json(result);
            });
    }

}

export const usersController = new UsersController();