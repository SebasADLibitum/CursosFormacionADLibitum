import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class TeachersController {

    public async getAll(req: Request, res: Response) {
        mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.personas',
            (error, results) => {
                if (error)
                    return res.json({ error: error });
                if (results.length == 0) {
                    return res.json({ text: 'No hay profesores dados de alta' });
                }
                res.json(results);
            })
    };

    public async getOne(req: Request, res: Response) {
        mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.personas WHERE (idpersona = ?)',
            [req.params.id],
            (error, result) => {
                if (error)
                    return res.json({ error: error });
                if (result.length == 0) {
                    return res.status(404).json({ text: 'El profesor que buscas no existe' });
                }
                res.json(result);
            })
    };

    public async create(req: Request, res: Response) {
        mysqlConnection.query('INSERT INTO ng_pruebalanding_db.personas (nombre, profesion, dni, nuss, fecha_nacimiento, ciudad, provincia, pais, cp, direccion, telefono1, telefono2, email, web, codimd5, caducidadmd5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.nombre, req.body.profesion || null, req.body.dni, req.body.nuss, req.body.fecha_nacimiento || null, req.body.ciudad || null, req.body.provincia || null, req.body.pais || null,
            req.body.cp || null, req.body.direccion || null, req.body.telefono1, req.body.telefono2 || null, req.body.email || null, req.body.web || null, req.body.codimd5 || null, req.body.caducidadmd5 || null],
            (error, result) => {
                if (error)
                    return res.json({ error: error });
                res.json(result);
            });
    }

    public async delete(req: Request, res: Response) {
        mysqlConnection.query('DELETE FROM ng_pruebalanding_db.personas WHERE (idpersona = ?)', [req.params.id],
            (error, results) => {
                if (error)
                    return res.json({ error: error });
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {
        mysqlConnection.query('update ng_pruebalanding_db.personas SET ? where idpersona = ?',
            [{
                nombre: req.body.nombre, dni: req.body.dni, nuss: req.body.nuss, fecha_nacimiento: req.body.fecha_nacimiento,
                ciudad: req.body.ciudad, provincia: req.body.provincia, cp: req.body.cp, direccion: req.body.direccion, telefono1: req.body.telefono1, email: req.body.email
            }, req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error });
                res.json(result);
            });
    }

}

export const teachersController = new TeachersController();