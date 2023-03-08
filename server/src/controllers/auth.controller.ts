import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import mysqlConnection from '../db/connectDB';
import User from '../models/users.model';

class AuthController {

    public async login(req: Request, res: Response) {

        const { username, password } = req.body;

        if (username && password) {
            mysqlConnection.query('SELECT * FROM ng_pruebalanding_db.users WHERE (username = ?)',
                [username],
                async (error, result) => {

                    if (error) return res.json({ error: error })

                    if (result.length == 0 || !(await bcrypt.compare(password, result[0].password))) {
                        return res.status(400).json({ text: 'Usuario y/o la contraseña incorrectas' })
                    }

                    if (result) {
                        const token = jwt.sign(
                            { username }, process.env.SECRET_KEY!, {
                                expiresIn: '86400000'
                            })
                        res.json(token);
                    } else {
                        res.json({ text: 'Login Incorrecto' })
                    }
                    console.log('Login de usuario realizado con exito');
                }
            )
        }



    };

}

export const authController = new AuthController();