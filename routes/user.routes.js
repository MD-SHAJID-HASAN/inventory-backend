import express from 'express';
const router = express.Router();

// Example Controllers
// import { registerUser, loginUser, getAllUsers } from '../controllers/user.controller.js';

router.post('/register', 'registerUser');
router.post('/login', 'loginUser');
router.get('/', 'getAllUsers');

export default router;
