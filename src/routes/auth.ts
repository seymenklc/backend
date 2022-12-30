import express from 'express';
import auth from '@/controllers/auth';
import isAuthenticated from '@/middleware/auth';

const router = express.Router();

router.post('/register', auth.register);
router.post('/login', auth.login);
// protected routes
router.get('/logout', isAuthenticated, auth.logout);
router.get('/me', isAuthenticated, auth.me);

export default router;