//Generamos una sección de rutas
import express from 'express';
import cursosController from '../controllers/cursosController';
import verificarToken from '../middlewares/authMiddleware';
import validarRol from '../middlewares/validatorRolMiddleware';
const router = express.Router();


//Ruta GET para los cursos
router.get('/',verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), cursosController.consultar);

//Ruta POST para los cursos
router.post('/', verificarToken, validarRol(['ADMINISTRADOR']),  cursosController.ingresar);

//Ruta POST para los Asociar estudiante
router.post('/registraEstudiante', verificarToken, validarRol(['ADMINISTRADOR']), cursosController.asociarEstudiante);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(verificarToken, validarRol(['ADMINISTRADOR', 'USUARIO']), cursosController.consultarDetalle)
    .put(verificarToken, validarRol(['ADMINISTRADOR']), cursosController.actualizar)
    .delete(verificarToken, validarRol(['ADMINISTRADOR']), cursosController.eliminar);

//export default router;
export default router;