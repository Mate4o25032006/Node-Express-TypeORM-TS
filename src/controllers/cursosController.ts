import { Request, Response } from "express";
import { Curso } from "../models/cursoModel";
import { Profesor } from "../models/profesorModel";
import { Estudiante } from "../models/estudianteModel";

class CursosController {
    constructor(){

    }

     //Consultar listado de Cursos
    async consultar(req: Request, res:Response) {
        try {
            const data = await Curso.find({relations: {profesor: true, estudiantes: true}});
            res.status(200).json(data)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

     //Consultar curso específico
    async consultarDetalle(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const registro = await Curso.findOne( {where: {id: Number(id)}, relations: {profesor: true, estudiantes: true}});

            if(!registro){
                throw new Error('Curso no encontrado')
            }
            res.status(200).json(registro)
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Registrar curso
    async ingresar(req: Request, res:Response ) {
        try {
            //Obtenemos el atributo
            const { profesor } = req.body;

            //Verificamos si el atributo de tipo 'profesor'  existe en la base de datos
            const profesorRegistro = await Profesor.findOneBy({id: Number(profesor)});
            if(!profesorRegistro){
                throw new Error('Profesor no encontrado');
            }   
            //Guardamos el curso
            const registro = await Curso.save(req.body);
            res.status(201).json(registro);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Actualizar Curso
    async actualizar(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            //Obtenemos el atributo
            const { profesor } = req.body;
            const profesorRegistro = await Profesor.findOneBy({id: Number(profesor)});
            if(!profesorRegistro){
                throw new Error('Profesor no encontrado');
            }   
            
            const registro = await Curso.findOneBy({id: Number(id)});
            if(!registro){
                throw new Error('Curso no encontrado')
            }

            await Curso.update({ id: Number(id) }, req.body);
            const registroActualizado = await Curso.findOne({ where: { id: Number(id) }, relations: { profesor: true, estudiantes: true } });
            res.status(200).json(registroActualizado);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Eliminar Curso
    async eliminar(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const registro = await Curso.findOneBy({id: Number(id)});
            if(!registro){
                throw new Error('Curso no encontrado')
            }
            await Curso.delete({id: Number(id)});


            res.status(204);
        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }

    //Asociar estudiante a curso
    async asociarEstudiante(req: Request, res:Response ) {
        const { id } = req.params;
        try {
            const {estudiante_id, curso_id} = req.body;
            //Validación Estudiante
            const estudiante = await Estudiante.findOneBy({id: Number(estudiante_id)});

            //Validación Curso
            const curso = await Curso.findOneBy({id: Number(curso_id)});

            if(!estudiante){
                throw new Error('Estudiante no encontrado')
            }

            if(!curso){
                throw new Error('Curso no encontrado')
            }

            curso.estudiantes = curso.estudiantes || [];
            curso.estudiantes.push(estudiante);

            const registro = await Curso.save(curso);
            res.status(200).json(registro)

        } catch (err) {
            if(err instanceof Error)
            res.status(500).send(err.message);
        }
    }
}

export default new CursosController();