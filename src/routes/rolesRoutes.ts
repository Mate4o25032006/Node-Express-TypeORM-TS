//Generamos una sección de rutas
import express from 'express';
import rolesController from '../controllers/rolesController';
const router = express.Router();


//Ruta GET para los Roles
router.get('/', rolesController.consultar);

//Ruta POST para los Roles
router.post('/', rolesController.ingresar);

//Ruta POST para los Asociar usuarios
router.post('/asociaUsuarios', rolesController.asociarUsuario);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(rolesController.consultarDetalle)
    .put(rolesController.actualizar)
    .delete(rolesController.eliminar);

export default router;