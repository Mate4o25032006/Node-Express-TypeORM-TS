//Generamos una sección de rutas
import express from 'express';
import profesoresController from '../controllers/profesoresController'
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/validatorRolMiddleware';
const router = express.Router();


//Ruta GET para los profesores
router.get('/',verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), profesoresController.consultar);

//Ruta POST para los profesores
router.post('/', verificarToken, validarRol(['ADMINISTRADOR']),profesoresController.ingresar);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']),profesoresController.consultarDetalle)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), profesoresController.actualizar)
    .delete(verificarToken, validarRol(['ADMINISTRADOR']), profesoresController.eliminar);

export default router;