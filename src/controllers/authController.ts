import { Request, Response, NextFunction } from "express";
import * as bcrypt from 'bcrypt';
import { Usuario } from "../models/usuarioModel";
import { generarToken } from '../helpers/tokenHelper';

class AuthController {
    constructor() {}

    //Prueba
    async saludar(req: Request, res: Response) {
        res.send('Saluditos desde ruta protegida');
    }

    //Login y llamado a 'tokenHelper'
    async consultarUsuario(req: Request, res: Response) {
        const { correo, contrasenia } = req.body;

        try {
            const usuario = await Usuario.findOne({ where: { correo } });
            //Validaciones
            if (!usuario) {
                return res.status(401).json({ error: 'Usuario o Contraseña incorrectos.' });
            }
            const contraseniaCorrecta = await bcrypt.compare(contrasenia, usuario.contrasenia);
            if (!contraseniaCorrecta) {
                return res.status(401).json({ error: 'Usuario o Contraseña incorrectos.' });
            }

            const token = generarToken(usuario);

            res.send({
                correo: usuario.correo,
                token
            });
        } catch (err) {
            res.status(500).json({ error: 'Error en la autenticación del usuario' });
        }
    }

    //Registro de Usuarios
    async registrarUsuario(req: Request, res: Response) {
        try {
            req.body.contrasenia = bcrypt.hashSync(req.body.contrasenia, 10);
            const registro = await Usuario.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new AuthController();
