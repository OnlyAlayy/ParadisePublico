import express from 'express';
import { 
  obtenerRecuerdos, 
  obtenerRecuerdo, 
  crearRecuerdo, 
  actualizarRecuerdo, 
  eliminarRecuerdo 
} from '../controllers/recuerdosController.js';
import { authenticateAdmin } from '../middleware/authenticateAdmin.js';
import { validate } from '../middleware/validate.js';
import { crearRecuerdoSchema, actualizarRecuerdoSchema } from '../validators/schemas.js';

const router = express.Router();

router.get('/', obtenerRecuerdos);
router.get('/:id', obtenerRecuerdo);

// Rutas protegidas con autenticación + validación
router.post('/', authenticateAdmin, validate(crearRecuerdoSchema), crearRecuerdo);
router.put('/:id', authenticateAdmin, validate(actualizarRecuerdoSchema), actualizarRecuerdo);
router.delete('/:id', authenticateAdmin, eliminarRecuerdo);

export default router;
