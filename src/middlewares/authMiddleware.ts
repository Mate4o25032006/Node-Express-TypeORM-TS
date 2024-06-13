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
        (req as any).user = decodedToken; // Puedes almacenar el token decodificado en req.user
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token inválido o ha expirado' });
    }
};

export default verificarToken;
