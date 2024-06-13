//Generamos una sección de rutas
import express from 'express';
import estudiantesController from '../controllers/estudiantesController'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/validatorRolMiddelware';
const router = express.Router();

//Ruta GET para los estudiantes
router.get('/', verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), estudiantesController.consultar);

//Ruta POST para los estudiantes
router.post('/', verificarToken, validarRol(['ADMINISTRADOR']), estudiantesController.ingresar);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), estudiantesController.consultarDetalle)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), estudiantesController.actualizar)
    .delete(verificarToken, validarRol(['ADMINISTRADOR']), estudiantesController.eliminar);


export default router;