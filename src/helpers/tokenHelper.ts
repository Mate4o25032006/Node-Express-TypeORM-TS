import * as jwt from 'jsonwebtoken';

export const generarToken = (usuario: any) => {
    const usuarioForToken = {
        id: usuario.id,
        correo: usuario.correo
    };

    return jwt.sign(usuarioForToken, 'Token-Auth', { expiresIn: '1h' });
};
