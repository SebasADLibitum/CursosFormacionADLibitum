import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class CoursesController {

    public async getAll(req: Request, res: Response) {
        mysqlConnection.query('select * from presentacion t1 left join dd_tipos_presentaciones t2 on t1.idpresentacion = t2.id',
            (error, results) => {
                if (error)
                    return res.json({ error: error });
                if (results.length == 0) {
                    return res.json({ text: 'No hay cursos disponibles' });
                }
                res.json(results);
            })
    };

    public async getOne(req: Request, res: Response) {
        mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.presentacion WHERE (idpresentacion = ?)',
            [req.params.id],
            (error, result) => {
                if (error)
                    return res.json({ error: error });
                if (result.length == 0) {
                    return res.status(404).json({ text: 'El curso que buscas no existe' });
                }
                res.json(result);
            })
    };

    public async create(req: Request, res: Response) {
        mysqlConnection.query('INSERT INTO ng_pruebalanding_db.presentacion (titulo, tipo, cliente, sitio, fecha, notas, registrableweb, camposobligatorios) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
            [req.body.titulo || null, req.body.tipo || null, req.body.cliente || null, req.body.sitio || null, req.body.fecha || null, req.body.notas || null, req.body.registrableweb, req.body.camposobligatorios],
            (error, result) => {
                if (error)
                    return res.json({ error: error });
                res.json(result);
            });
    }

    public async delete(req: Request, res: Response) {
        mysqlConnection.query('DELETE FROM ng_pruebalanding_db.presentacion WHERE (idpresentacion = ?)', [req.params.id],
            (error, results) => {
                if (error)
                    return res.json({ error: error });
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        mysqlConnection.query('update ng_pruebalanding_db.presentacion SET ? where idpresentacion = ?',
            [{
                titulo: req.body.titulo, tipo: req.body.tipo, cliente: req.body.cliente, sitio: req.body.sitio,
                fecha: req.body.fecha, notas: req.body.notas, registrableweb: req.body.registrableweb, camposobligatorios: req.body.camposobligatorios
            }, req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error });
                res.json(result);
            });
    }

}

export const coursesController = new CoursesController();