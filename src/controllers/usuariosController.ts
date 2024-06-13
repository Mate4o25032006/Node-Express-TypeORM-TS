import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";

class UsuariosController {
    constructor(){

    }

    async consultar(req: Request, res:Response) {
        try {
            const data = await Usuario.find();
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    async consultarDetalle(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const registro = await Usuario.findOneBy({id: Number(id)});

            if(!registro){
                throw new Error('Usuario no encontrado')
            }
            res.status(200).json(registro)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }


    // async consultarPorCorreo(req: Request, res: Response){
    //     const { correo, contrasenia } = req.params;
    //     try{
    //         const consulta = await Usuario.findOne({ where: { correo: correo and contrasenia: contrasenia } });
    //     }
    // }

    // async actualizar(req: Request, res:Response ) {
    //     const { id } = req.params;
    //     try {
    //         const registro = await Usuario.findOneBy({id: Number(id)});
    //         if(!registro){
    //             throw new Error('Usuario no encontrado')
    //         }
    //         await Usuario.update({id: Number(id)}, req.body);
    //         const registroActualizado = await Usuario.findOneBy({id: Number(id)});

    //         res.status(200).json(registroActualizado);
    //     } catch (err) {
    //         if(err instanceof Error)
    //         res.status(500).send(err.message);
    //     }
    // }

    // async eliminar(req: Request, res:Response ) {
    //     const { id } = req.params;
    //     try {
    //         const registro = await Usuario.findOneBy({id: Number(id)});
    //         if(!registro){
    //             throw new Error('Usuario no encontrado')
    //         }
    //         await Usuario.delete({id: Number(id)});


    //         res.status(204);
    //     } catch (err) {
    //         if(err instanceof Error)
    //         res.status(500).send(err.message);
    //     }
    // }
}

export default new UsuariosController();