import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class TeachersController {

    public async getAll(req: Request, res: Response) {
        console.log('Controller getAll')
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.personas',
            (error, results) => {
                if (error) return res.json({ error: error })
                if (results.length == 0){
                    return res.json({ text: 'No hay profesores dados de alta'})
                }
                console.log('Busqueda de todos los profesores realizada con exito');
                console.log(results);
                res.json(results)
            })
    };

    public async getOne(req: Request, res: Response) {
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.personas WHERE (idpersona = ?)',
            [req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error })
                if (result.length == 0){
                    return res.status(404).json({ text: 'El profesor que buscas no existe'})
                }
                console.log('Busqueda de prfesor realizada con exito');
                console.log(result);
                res.json(result)
            })
    };
    
        public async create(req: Request, res: Response) {
            
            await mysqlConnection.query('INSERT INTO ng_pruebalanding_db.personas (nombre, profesion, dni, nuss, fecha_nacimiento, ciudad, provincia, pais, cp, direccion, telefono1, telefono2, email, web, codimd5, caducidadmd5) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [req.body.nombre || null, req.body.profesion || null, req.body.dni || null, req.body.nuss || null, req.body.fecha_nacimiento || null, req.body.ciudad || null, req.body.provincia || null, req.body.pais || null,
                 req.body.cp || null, req.body.direccion || null, req.body.telefono1 || null, req.body.telefono2 || null, req.body.email || null, req.body.web || null, req.body.codimd5 || null, req.body.caducidadmd5 || null],
                (error, result) => {
                    if (error) return res.json({ error: error });
                    console.log('Profesor creado con exito');
                    console.log(result);
                    res.json(result);
                });
        }

    public async delete(req: Request, res: Response) {
        await mysqlConnection.query('DELETE FROM ng_pruebalanding_db.personas WHERE (idpersona = ?)', [req.params.id],
            (error, results) => {
                if (error) return res.json({ error: error });
                
                console.log('Profesor eliminado con exito');
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        let sql = 'UPDATE ng_pruebalanding_db.personas SET';
        let values = [];

        if (req.body.nombre) {
            sql += " nombre = ?";
            values.push(req.body.nombre);
        }
        if (req.body.profesion) {
            sql += " profesion = ?";
            values.push(req.body.profesion);
        }
        if (req.body.dni) {
            sql += " dni = ?";
            values.push(req.body.dni);
        }
        if (req.body.nuss) {
            sql += " nuss = ?";
            values.push(req.body.nuss);
        }
        if (req.body.fecha_nacimiento) {
            sql += " fecha_nacimiento = ?";
            values.push(req.body.fecha_nacimiento);
        }
        if (req.body.ciudad) {
            sql += " ciudad = ?";
            values.push(req.body.ciudad);
        }
        if (req.body.provincia) {
            sql += " provincia = ?";
            values.push(req.body.provincia);
        }
        if (req.body.pais) {
            sql += " pais = ?";
            values.push(req.body.pais);
        }
        if (req.body.cp) {
            sql += " cp = ?";
            values.push(req.body.cp);
        }
        if (req.body.direccion) {
            sql += " direccion = ?";
            values.push(req.body.direccion);
        }
        if (req.body.telefono1) {
            sql += " telefono1 = ?";
            values.push(req.body.telefono1);
        }
        if (req.body.telefono2) {
            sql += " telefono2 = ?";
            values.push(req.body.telefono2);
        }
        if (req.body.email) {
            sql += " email = ?";
            values.push(req.body.email);
        }
        if (req.body.web) {
            sql += " web = ?";
            values.push(req.body.web);
        }
        if (req.body.codimd5) {
            sql += " codimd5 = ?";
            values.push(req.body.codimd5);
        }
        if (req.body.caducidadmd5) {
            sql += " caducidadmd5 = ?";
            values.push(req.body.caducidadmd5);
        }
        sql += " WHERE idpersona = ?";
        values.push(req.params.id);

        await mysqlConnection.query(sql, values,
            (error, result) => {
                if (error) return res.json({ error: error });
                console.log('Curso actualizado con exito');
                console.log(result);
                res.json(result);
            });
    }

}

export const teachersController = new TeachersController();