//Generamos una sección de rutas
import express from 'express';
import estudiantesController from '../controllers/estudiantesController'
import verificarToken from '../middlewares/authMiddleware';
const router = express.Router();

//Ruta GET para los estudiantes
router.get('/',verificarToken ,estudiantesController.consultar);

//Ruta POST para los estudiantes
router.post('/', estudiantesController.ingresar);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(estudiantesController.consultarDetalle)
    .put(estudiantesController.actualizar)
    .delete(estudiantesController.eliminar);


export default router;