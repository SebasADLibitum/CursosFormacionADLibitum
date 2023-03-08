import { Router } from 'express';
import { coursesController } from '../controllers/courses.controller';
import validateToken from './validToken.routes';

const router = Router();

router
    .get('/', validateToken, coursesController.getAll)
    .get('/:id', validateToken,coursesController.getOne)
    .post('/', validateToken,coursesController.create)
    .put('/:id', validateToken,coursesController.update)
    .delete('/:id', validateToken,coursesController.delete)

export default router;