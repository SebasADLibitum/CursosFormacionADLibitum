import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {

    const headerToken = req.headers['authorization'];
    if (headerToken != undefined && headerToken.startsWith('Bearer ')) {
        const bearerToken = headerToken.slice(7); 
        try {
            jwt.verify(bearerToken, process.env.SECRET_KEY!)
            next();
        } catch (error) {
            res.status(401).json({ text: 'Token no Valido'})
        }
    } else {
        res.status(401).json({text: 'Acceso denegado'});
    }
}

export default validateToken;