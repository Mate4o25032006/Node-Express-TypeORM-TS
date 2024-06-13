import { Request, Response, NextFunction } from 'express';
import { AppDataSource } from '../db/conexion'; // Asegúrate de importar el DataSource configurado
import { Usuario } from '../models/usuarioModel';

//Recibimos un Arreglo con los roles permitidos
const validarRol = (rolesPermitidos: string[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        //Accedemos al Request que viene del cuerpo de la 
        const usuario = (req as any).user;
        console.log(usuario);
        

        if (!usuario) {
            return res.status(401).json({ error: 'Usuario no autenticado' });
        }

        try {
            // Obtenemos repositorio de usuarios
            const usuarioRepo = AppDataSource.getRepository(Usuario);

            // Obtenemos el usuario con sus roles desde la base de datos
            const usuarioConRoles = await usuarioRepo.findOne({
                where: { id: usuario.id },
                relations: ['roles']
            });
            console.log(usuarioConRoles);
            

            if (!usuarioConRoles) {
                return res.status(401).json({ error: 'Usuario no encontrado' });
            }

            // Verificamos si el usuario tiene al menos uno de los roles permitidos
            const tieneRolPermitido = usuarioConRoles.roles.some(rol =>
                rolesPermitidos.includes(rol.nombre)
            );

            if (!tieneRolPermitido) {
                return res.status(403).json({ error: 'No tiene permiso para acceder a esta ruta' });
            }

            next();
        } catch (error) {
            res.status(500).json({ error: 'Error al verificar los roles del usuario' });
        }
    };
};

export default validarRol;
