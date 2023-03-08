import { Request, Response } from 'express';
import mysqlConnection from '../db/connectDB';

class TeachersRegisteredController {

    // select * from tabla1 t1
    // inner join tabla2 t2 on t1.id = t2.id 

    // select * from personas_clientes t1 
    // inner join personas t2 on t1.persona = t2.idpersona
    // inner join presentacion t3 on t1.presentacion = t3.idpresentacion
    // inner join almacenes t4 on t1.escuela_admin = t4.codalmacen
    
    // public async getAll(req: Request, res: Response) {
    //     await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.personas_clientes',
    //         (error, results) => {
    //             if (error) return res.json({ error: error })
    //             if (results.length == 0){
    //                 return res.json({ text: 'No hay profesores dados de alta'})
    //             }
    //             console.log('Busqueda de todos los profesores realizada con exito');
    //             console.log(results);
    //             res.json(results)
    //         })
    // };

    // await mysqlConnection.query('SELECT * FROM personas_clientes t1 inner join personas t2 on t1.persona = t2.idpersona inner join presentacion t3 on t1.presentacion = t3.idpresentacion inner join almacenes t4 on t1.escuela_admin = t4.codalmacen',
    
    public async getAll(req: Request, res: Response){
        await mysqlConnection.query('SELECT * FROM personas_clientes t1 left join personas t2 on t1.persona = t2.idpersona left join presentacion t3 on t1.presentacion = t3.idpresentacion left join almacenes t4 on t1.escuela_admin = t4.codalmacen',
        (error, results) => {
            if (error) return res.json({ error: error })
            if (results.length == 0){
                return res.json({ text: 'No hay profesores dados de alta'})
            }
            res.json(results)
        })
    }
    

    public async getOne(req: Request, res: Response) {
        await mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.personas_clientes WHERE (id = ?)',
            [req.params.id],
            (error, result) => {
                if (error) return res.json({ error: error })
                if (result.length == 0){
                    return res.status(404).json({ text: 'El profesor que buscas no existe'})
                }
                res.json(result)
            })
    };
    
        public async create(req: Request, res: Response) {
            
            await mysqlConnection.query('INSERT INTO ng_pruebalanding_db.personas_clientes; (cliente, persona, presentacion, curso, tipo_relacion, factura, pedido, presupuesto, albaran, linea_presupuesto, linea_pedido, linea_albaran, linea_factura, producto, fecha, descripcion, datos, linea, fecha_alta, web, escuela, escuela_admin) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [req.body.cliente || null, req.body.persona || null, req.body.presentacion || null, req.body.curso || null, req.body.tipo_relacion || null, req.body.factura || null, req.body.pedido || null, req.body.presupuesto || null,
                 req.body.albaran || null, req.body.linea_presupuesto || null, req.body.linea_pedido || null, req.body.linea_albaran || null, req.body.linea_factura || null, req.body.producto || null, req.body.fecha || null, req.body.descripcion 
                 || null, req.body.datos || null, req.body.linea || null, req.body.fecha_alta || null, , req.body.web || null, , req.body.escuela || null, , req.body.escuela_admin || null],
                (error, result) => {
                    if (error) return res.json({ error: error });
                    res.json(result);
                });
        }

    public async delete(req: Request, res: Response) {
        await mysqlConnection.query('DELETE FROM ng_pruebalanding_db.personas_clientes WHERE (id = ?)', [req.params.id],
            (error, results) => {
                if (error) return res.json({ error: error });
                res.json(results);
            }
        );
    }

    public async update(req: Request, res: Response) {

        let sql = 'UPDATE ng_pruebalanding_db.personas_clientes SET';
        let values = [];

        if (req.body.cliente) {
            sql += " cliente = ?";
            values.push(req.body.cliente);
        }
        if (req.body.persona) {
            sql += " persona = ?";
            values.push(req.body.persona);
        }
        if (req.body.presentacion) {
            sql += " presentacion = ?";
            values.push(req.body.presentacion);
        }
        if (req.body.curso) {
            sql += " curso = ?";
            values.push(req.body.curso);
        }
        if (req.body.tipo_relacion) {
            sql += " tipo_relacion = ?";
            values.push(req.body.tipo_relacion);
        }
        if (req.body.factura) {
            sql += " factura = ?";
            values.push(req.body.factura);
        }
        if (req.body.pedido) {
            sql += " pedido = ?";
            values.push(req.body.pedido);
        }
        if (req.body.presupuesto) {
            sql += " presupuesto = ?";
            values.push(req.body.presupuesto);
        }
        if (req.body.albaran) {
            sql += " albaran = ?";
            values.push(req.body.albaran);
        }
        if (req.body.linea_presupuesto) {
            sql += " linea_presupuesto = ?";
            values.push(req.body.linea_presupuesto);
        }
        if (req.body.linea_pedido) {
            sql += " linea_pedido = ?";
            values.push(req.body.linea_pedido);
        }
        if (req.body.linea_albaran) {
            sql += " linea_albaran = ?";
            values.push(req.body.linea_albaran);
        }
        if (req.body.linea_factura) {
            sql += " linea_factura = ?";
            values.push(req.body.linea_factura);
        }
        if (req.body.producto) {
            sql += " producto = ?";
            values.push(req.body.producto);
        }
        if (req.body.fecha) {
            sql += " fecha = ?";
            values.push(req.body.fecha);
        }
        if (req.body.descripcion) {
            sql += " descripcion = ?";
            values.push(req.body.descripcion);
        }
        if (req.body.datos) {
            sql += " datos = ?";
            values.push(req.body.datos);
        }
        if (req.body.linea) {
            sql += " linea = ?";
            values.push(req.body.linea);
        }
        if (req.body.fecha_alta) {
            sql += " fecha_alta = ?";
            values.push(req.body.fecha_alta);
        }
        if (req.body.web) {
            sql += " web = ?";
            values.push(req.body.web);
        }
        if (req.body.escuela) {
            sql += " escuela = ?";
            values.push(req.body.escuela);
        }
        if (req.body.escuela_admin) {
            sql += " escuela_admin = ?";
            values.push(req.body.escuela_admin);
        }
        sql += " WHERE id = ?";
        values.push(req.params.id);

        await mysqlConnection.query(sql, values,
            (error, result) => {
                if (error) return res.json({ error: error });
                res.json(result);
            });
    }

}

export const teachersRegisteredController = new TeachersRegisteredController();