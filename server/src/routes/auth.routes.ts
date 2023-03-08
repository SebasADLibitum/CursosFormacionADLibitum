import { Router } from 'express';
import { usersController } from '../controllers/users.controller';
import { authController } from '../controllers/auth.controller';

const router = Router();

router.post('/login', authController.login)



export default router;