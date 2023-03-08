import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import validateToken from './validToken.routes';

const router = Router();

router
    .get('/', validateToken, usersController.getAll)
    .get('/:id', validateToken, usersController.getOne)
    .post('/', validateToken, usersController.create)
    .put('/:id', validateToken, usersController.update)
    .delete('/:id', validateToken, usersController.delete)


export default router;