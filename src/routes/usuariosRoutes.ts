//Generamos una sección de rutas
import express from 'express';
import usuariosController from '../controllers/usuariosController'
const router = express.Router();

//Ruta GET para los usuarios
router.get('/', usuariosController.consultar);

//Solo hay un punto donde usamos el '/:id'
router.route("/:id")
    .get(usuariosController.consultarDetalle);


export default router;