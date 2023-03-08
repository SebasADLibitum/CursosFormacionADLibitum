import { Router } from 'express';
import { teachersController } from '../controllers/teachers.controller';
import validateToken from './validToken.routes';

const router = Router();

router
    .get('/', validateToken, teachersController.getAll)
    .get('/:id', validateToken,teachersController.getOne)
    .post('/', validateToken,teachersController.create)
    .put('/:id', validateToken,teachersController.update)
    .delete('/:id', validateToken,teachersController.delete)

export default router;