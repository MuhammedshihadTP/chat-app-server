import { Router } from 'express';
import auth from '../controller/auth';
import verifyToken from '../middlewares/auth'
import { VERSION } from 'ts-node';

const router: Router = Router()

// Signup Route
router.route('/signup')
    .post(auth.signUp.user);

// Login Route
router.route('/login')
    .post(auth.login.user);
router.route('/home')
  .get(auth.logout.user);

export default router