import express from 'express';
import authController from '../controllers/authController';
import verificarToken from '../middlewares/authMiddleware';
const router = express.Router();

// Ruta POST para registrar usuarios
router.post('/registro', authController.registrarUsuario);

// Ruta POST para Login de los usuarios
router.post('/login', authController.consultarUsuario);

// Ruta protegida
router.get('/ruta-protegida', verificarToken, authController.saludar);

export default router;
