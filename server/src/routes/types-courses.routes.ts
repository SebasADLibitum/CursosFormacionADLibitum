import { Router } from 'express';
import { typesCoursesController } from '../controllers/types-courses.controller';
import validateToken from './validToken.routes';

const router = Router();

router
    .get('/', validateToken, typesCoursesController.getAll)
    .get('/:id', validateToken,typesCoursesController.getOne)
    .post('/', validateToken,typesCoursesController.create)
    .put('/:id', validateToken,typesCoursesController.update)
    .delete('/:id', validateToken,typesCoursesController.delete)

export default router;