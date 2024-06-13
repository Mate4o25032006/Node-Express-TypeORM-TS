import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import estudiantesRoutes from './routes/estudiantesRoutes';
import profesoresRoutes from  './routes/profesoresRoutes';
import cursosRoutes from './routes/cursosRoutes';
import usuariosRoutes from './routes/usuariosRoutes'
import authRoutes from './routes/authRoutes'
import { Request, Response } from "express";
import bodyParser from 'body-parser';

const app = express();


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(cors());

app.get('/', (req: Request, res: Response) => {
    console.log('Hola mundo');
    res.send('Hola mundo')
})

//Todas las rutas con  '/estudiantes' usarán el 'estudiantesRoutes'
app.use("/estudiantes", estudiantesRoutes);
app.use("/profesores", profesoresRoutes);
app.use("/cursos", cursosRoutes);
app.use("/usuarios", usuariosRoutes);
app.use("/auth", authRoutes);

export default app;



