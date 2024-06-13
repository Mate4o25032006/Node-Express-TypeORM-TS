//Generamos una sección de rutas
import express from 'express';
import profesoresController from '../controllers/profesoresController'
const router = express.Router();


//Ruta GET para los profesores
router.get('/', profesoresController.consultar);

//Ruta POST para los profesores
router.post('/', profesoresController.ingresar);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(profesoresController.consultarDetalle)
    .put(profesoresController.actualizar)
    .delete(profesoresController.eliminar);

export default router;