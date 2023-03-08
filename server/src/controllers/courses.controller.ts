import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class CoursesController {

    // public async getAll(req: Request, res: Response) {
    //     await mysqlConnection.query('select * from presentacion t1 inner join personas_clientes t2 on t1.idpresentacion = t2.presentacion',
    //         (error, results) => {
    //             if (error) return res.json({ error: error })
    //             if (results.length == 0){
    //                 return res.json({ text: 'No hay cursos disponibles'})
    //             }
    //             console.log('Busqueda de todos los cursos realizada con exito');
    //             console.log(results);
    //             res.json(results)
    //         })
    // };
    
    public async getAll(req: Request, res: Response) {
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.presentacion',
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
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.presentacion WHERE (idpresentacion = ?)',
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
            
            await mysqlConnection.query('INSERT INTO ng_pruebalanding_db.presentacion (titulo, tipo, cliente, sitio, fecha, notas, registrableweb, camposobligatorios) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
                [req.body.titulo || null, req.body.tipo || null, req.body.cliente || null, req.body.sitio || null, req.body.fecha || null, req.body.notas || null, req.body.registrableweb || null, req.body.camposobligatorios || null],
                (error, result) => {
                    if (error) return res.json({ error: error });
                    console.log('Curso creado con exito');
                    console.log(result);
                    res.json(result);
                });
        }

    public async delete(req: Request, res: Response) {
        await mysqlConnection.query('DELETE FROM ng_pruebalanding_db.presentacion WHERE (idpresentacion = ?)', [req.params.id],
            (error, results) => {
                if (error) return res.json({ error: error });
                
                console.log('Curso eliminado con exito');
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        let sql = 'UPDATE ng_pruebalanding_db.presentacion SET';
        let values = [];

        if (req.body.titulo) {
            sql += " titulo = ?";
            values.push(req.body.titulo);
        }
        if (req.body.tipo) {
            sql += " tipo = ?";
            values.push(req.body.tipo);
        }
        if (req.body.cliente) {
            sql += " cliente = ?";
            values.push(req.body.cliente);
        }
        if (req.body.sitio) {
            sql += " sitio = ?";
            values.push(req.body.sitio);
        }
        if (req.body.fecha) {
            sql += " fecha = ?";
            values.push(req.body.fecha);
        }
        if (req.body.notas) {
            sql += " notas = ?";
            values.push(req.body.notas);
        }
        if (req.body.registrableweb) {
            sql += " registrableweb = ?";
            values.push(req.body.registrableweb);
        }
        if (req.body.camposobligatorios) {
            sql += " camposobligatorios = ?";
            values.push(req.body.camposobligatorios);
        }
        if (req.body.cliente) {
            sql += " cliente = ?";
            values.push(req.body.cliente);
        }
        sql += " WHERE idpresentacion = ?";
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

export const coursesController = new CoursesController();