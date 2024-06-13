//Generamos una sección de rutas
import express from 'express';
import cursosController from '../controllers/cursosController';
const router = express.Router();


//Ruta GET para los cursos
router.get('/', cursosController.consultar);

//Ruta POST para los cursos
router.post('/', cursosController.ingresar);

//Ruta POST para los Asociar estudiante
router.post('/registraEstudiante', cursosController.asociarEstudiante);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(cursosController.consultarDetalle)
    .put(cursosController.actualizar)
    .delete(cursosController.eliminar);

//export default router;
export default router;