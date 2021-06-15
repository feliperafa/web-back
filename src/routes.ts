
import { Router } from 'express';
import multer from 'multer';

import uploadConfig from './config/upload'
import OrfanatoController from './controllers/OrfanatoController';

const routes = Router();
const upload = multer(uploadConfig);


routes.post('/orfanatos', upload.array('imagens'), OrfanatoController.create)
routes.get('/orfanatos', OrfanatoController.list)
routes.get('/orfanatos/:id', OrfanatoController.listById)
routes.delete('/orfanatos/:id', OrfanatoController.deleteById)



export default routes;