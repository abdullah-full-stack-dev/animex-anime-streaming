import express from 'express'
import { forgotPassword, login, register, resetPassword } from '../controllers/authController.js';
import { contactUs } from '../controllers/contactController.js';
import { subscribeUs } from '../controllers/newsLetterController.js';

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

router.post("/contact-us", contactUs);
router.post("/subscribe-us", subscribeUs);

export default router;