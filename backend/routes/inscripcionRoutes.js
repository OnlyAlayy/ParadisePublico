import express from 'express';
import { registrarInscripcion } from '../controllers/inscripcionController.js';
import { validate } from '../middleware/validate.js';
import { inscripcionSchema } from '../validators/schemas.js';

const router = express.Router();

router.post('/', validate(inscripcionSchema), registrarInscripcion);

export default router;
