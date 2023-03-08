import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class TypesCoursesController {

    public async getAll(req: Request, res: Response) {
        console.log('Controller getAll')
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.dd_tipos_presentaciones',
            (error, results) => {
                if (error) return res.json({ error: error })
                if (results.length == 0){
                    return res.json({ text: 'No hay cursos disponibles'})
                }
                console.log('Busqueda de todos los cursos realizada con exito');
                console.log(results);
                res.json(results)
            })
    };

    public async getOne(req: Request, res: Response) {
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.dd_tipos_presentaciones WHERE (id = ?)',
            [req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error })
                if (result.length == 0){
                    return res.status(404).json({ text: 'El curso que buscas no existe'})
                }
                console.log('Busqueda de curso realizada con exito');
                console.log(result);
                res.json(result)
            })
    };
    
        public async create(req: Request, res: Response) {
            
            await mysqlConnection.query('INSERT INTO ng_pruebalanding_db.dd_tipos_presentaciones (color, colorHex, nombre, registableweb, eliminado) VALUES (?, ?, ?, ?, ?)',
                [req.body.color || null, req.body.colorHex || null, req.body.nombre || null, req.body.registableweb || null, req.body.eliminado],
                (error, result) => {
                    if (error) return res.json({ error: error });
                    console.log('Curso creado con exito');
                    console.log(result);
                    res.json(result);
                });
        }

    public async delete(req: Request, res: Response) {
        await mysqlConnection.query('DELETE FROM ng_pruebalanding_db.dd_tipos_presentaciones WHERE (id = ?)', [req.params.id],
            (error, results) => {
                if (error) return res.json({ error: error });
                
                console.log('Curso eliminado con exito');
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        let sql = 'UPDATE ng_pruebalanding_db.dd_tipos_presentaciones SET';
        let values = [];

        if (req.body.color) {
            sql += " color = ?";
            values.push(req.body.color);
        }
        if (req.body.colorHex) {
            sql += " colorHex = ?";
            values.push(req.body.colorHex);
        }
        if (req.body.nombre) {
            sql += " nombre = ?";
            values.push(req.body.nombre);
        }
        if (req.body.registableweb) {
            sql += " registableweb = ?";
            values.push(req.body.registableweb);
        }
        if (req.body.eliminado) {
            sql += " eliminado = ?";
            values.push(req.body.eliminado);
        }
        sql += " WHERE id = ?";
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

export const typesCoursesController = new TypesCoursesController();