import express from 'express';
import { uploadImage } from '../controllers/uploadController.js';
import { authenticateAdmin } from '../middleware/authenticateAdmin.js';
import { validate } from '../middleware/validate.js';
import { uploadSchema } from '../validators/schemas.js';

const router = express.Router();

router.post('/', authenticateAdmin, validate(uploadSchema), uploadImage);

export default router;
