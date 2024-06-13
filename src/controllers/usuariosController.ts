import { Request, Response } from "express";
import { Usuario } from "../models/usuarioModel";

class UsuariosController {
    constructor(){

    }

    //Listado de usuarios del sistema
    async consultar(req: Request, res:Response) {
        try {
            const data = await Usuario.find();
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Usuario especifico
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
}

export default new UsuariosController();