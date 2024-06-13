import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

const verificarToken = (req: Request, res: Response, next: NextFunction) => {
    const authorization = req.get('authorization');
    let token = '';

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7);
    }

    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado o es inválido' });
    }

    try {
        const decodedToken = jwt.verify(token, 'Token-Auth');
        console.log(decodedToken);
        (req as any).user = decodedToken; //Asigno el Payload al req.user y esto hace que la información del usuario esté disponible en el objeto de solicitud req para los siguientes middlewares y controladores (Mucho texto, pero esta parte debe quedar clara 😅)
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o ha expirado' });
    }
};

export default verificarToken;
