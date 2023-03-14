import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class TypesCoursesController {

    public async getAll(req: Request, res: Response) {
        console.log('Controller getAll')
        mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.dd_tipos_presentaciones',
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
        mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.dd_tipos_presentaciones WHERE (id = ?)',
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
            
            mysqlConnection.query('INSERT INTO ng_pruebalanding_db.dd_tipos_presentaciones (color, colorHex, nombre, registableweb, eliminado) VALUES (?, ?, ?, ?, ?)',
                [req.body.color || null, req.body.colorHex, req.body.nombre || null, req.body.registableweb, req.body.eliminado || null],
                (error, result) => {
                    if (error)
                        return res.json({ error: error });
                    res.json(result);
                });
        }

    public async delete(req: Request, res: Response) {
        mysqlConnection.query('DELETE FROM ng_pruebalanding_db.dd_tipos_presentaciones WHERE (id = ?)', [req.params.id],
            (error, results) => {
                if (error)
                    return res.json({ error: error });
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        mysqlConnection.query('update ng_pruebalanding_db.dd_tipos_presentaciones SET ? where id = ?',
            [{
                color: req.body.color, colorHex: req.body.colorHex, nombre: req.body.nombre, registableweb: req.body.registableweb,
                eliminado: req.body.eliminado
            }, req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error });
                res.json(result);
            });
    }

}

export const typesCoursesController = new TypesCoursesController();