import { Request, Response } from "express";
import { Rol } from "../models/rolModel";
import { Usuario } from "../models/usuarioModel";

class RolController {
    constructor(){

    }

    //Consultar listado de Roles
    async consultar(req: Request, res:Response) {
        try {
            const data = await Rol.find();
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Consultar detalle de Rol
    async consultarDetalle(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const registro = await Rol.findOneBy({id: Number(id)});

            if(!registro){
                throw new Error('Rol no encontrado')
            }
            res.status(200).json(registro)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Registrar un nuevo rol
    async ingresar(req: Request, res:Response ) {
        try {
            const registro = await Rol.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Actualizar Rol
    async actualizar(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const registro = await Rol.findOneBy({id: Number(id)});
            if(!registro){
                throw new Error('Rol no encontrado')
            }
            await Rol.update({id: Number(id)}, req.body);
            const registroActualizado = await Rol.findOneBy({id: Number(id)});

            res.status(200).json(registroActualizado);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Eliminar Rol
    async eliminar(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const registro = await Rol.findOneBy({id: Number(id)});
            if(!registro){
                throw new Error('Rol no encontrado')
            }
            await Rol.delete({id: Number(id)});


            res.status(204);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Asociar un rol a un usuario
    async asociarUsuario(req: Request, res:Response ) {
        try {
            const {usuario_id, rol_id} = req.body;
            
            const usuario = await Usuario.findOneBy({id: Number(usuario_id)});
            const rol = await Rol.findOneBy({id: Number(rol_id)});

            if(!usuario){
                throw new Error('usuario no encontrado')
            }
            if(!rol){
                throw new Error('rol no encontrado')
            }

            rol.usuarios = rol.usuarios || [];
            rol.usuarios.push(usuario);

            const registro = await Rol.save(rol);
            res.status(200).json(registro)

        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new RolController();