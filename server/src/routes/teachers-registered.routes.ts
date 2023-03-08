import { Router } from 'express';
import { teachersRegisteredController } from '../controllers/teachers-registered.controller';
import validateToken from './validToken.routes';

const router = Router();

router
    .get('/', validateToken, teachersRegisteredController.getAll)
    .get('/:id', validateToken,teachersRegisteredController.getOne)
    .post('/', validateToken,teachersRegisteredController.create)
    .put('/:id', validateToken,teachersRegisteredController.update)
    .delete('/:id', validateToken,teachersRegisteredController.delete)

export default router;