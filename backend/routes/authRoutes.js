import express from 'express';
import { loginAdmin } from '../controllers/authController.js';
import { validate } from '../middleware/validate.js';
import { loginSchema } from '../validators/schemas.js';

const router = express.Router();

router.post('/login', validate(loginSchema), loginAdmin);

export default router;
