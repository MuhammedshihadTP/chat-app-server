import { Router } from 'express';
import verifyToken from '../middlewares/auth'
import userService from '../controller/users';

const router: Router = Router()

// Signup Route
router.route('/home')
    .get(verifyToken,userService.home.user)

export default router