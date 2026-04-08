import { z } from 'zod';

// ─── Inscripción ────────────────────────────────────────────────
export const inscripcionSchema = z.object({
  nombreNino: z
    .string({ required_error: 'El nombre del niño es requerido' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres')
    .trim(),
  edad: z
    .union([z.string(), z.number()])
    .transform(val => Number(val))
    .pipe(
      z.number({ invalid_type_error: 'La edad debe ser un número' })
        .int('La edad debe ser un número entero')
        .min(1, 'La edad mínima es 1 año')
        .max(18, 'La edad máxima es 18 años')
    ),
  nombreAdulto: z
    .string({ required_error: 'El nombre del adulto es requerido' })
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede superar los 100 caracteres')
    .trim(),
  telefono: z
    .string({ required_error: 'El teléfono es requerido' })
    .min(8, 'El teléfono debe tener al menos 8 dígitos')
    .max(20, 'Teléfono demasiado largo')
    .trim(),
  email: z
    .string({ required_error: 'El email es requerido' })
    .email('Formato de email inválido')
    .max(150, 'Email demasiado largo')
    .trim()
    .toLowerCase(),
  horario: z
    .string({ required_error: 'El horario es requerido' })
    .min(1, 'El horario es requerido')
    .max(200, 'Horario demasiado largo')
    .trim(),
  mensaje: z
    .string()
    .max(1000, 'El mensaje no puede superar los 1000 caracteres')
    .trim()
    .optional()
    .default('')
});

// ─── Recuerdo (crear) ───────────────────────────────────────────
const galeriaItemSchema = z.object({
  url: z.string().url('URL de galería inválida'),
  tipo: z.enum(['imagen', 'video']).default('imagen'),
  descripcion: z.string().max(500).default('')
});

export const crearRecuerdoSchema = z.object({
  titulo: z
    .string({ required_error: 'El título es requerido' })
    .min(3, 'El título debe tener al menos 3 caracteres')
    .max(200, 'El título no puede superar los 200 caracteres')
    .trim(),
  descripcion: z
    .string({ required_error: 'La descripción es requerida' })
    .min(10, 'La descripción debe tener al menos 10 caracteres')
    .max(5000, 'La descripción no puede superar los 5000 caracteres')
    .trim(),
  fecha: z
    .string({ required_error: 'La fecha es requerida' })
    .refine(val => !isNaN(Date.parse(val)), 'Formato de fecha inválido'),
  tipo: z
    .enum(['taller', 'evento', 'exposicion', 'otro'])
    .default('taller'),
  fotoPortada: z
    .string({ required_error: 'La foto de portada es requerida' })
    .url('URL de foto de portada inválida'),
  galeria: z
    .array(galeriaItemSchema)
    .max(50, 'La galería no puede tener más de 50 elementos')
    .default([]),
  destacado: z
    .boolean()
    .default(false)
});

// ─── Recuerdo (actualizar - campos opcionales) ──────────────────
export const actualizarRecuerdoSchema = z.object({
  titulo: z.string().min(3).max(200).trim().optional(),
  descripcion: z.string().min(10).max(5000).trim().optional(),
  fecha: z.string().refine(val => !isNaN(Date.parse(val)), 'Formato de fecha inválido').optional(),
  tipo: z.enum(['taller', 'evento', 'exposicion', 'otro']).optional(),
  fotoPortada: z.string().url('URL de foto de portada inválida').optional(),
  galeria: z.array(galeriaItemSchema).max(50).optional(),
  destacado: z.boolean().optional()
});

// ─── Upload ─────────────────────────────────────────────────────
export const uploadSchema = z.object({
  image: z
    .string({ required_error: 'Se requiere una imagen en base64' })
    .min(100, 'El contenido base64 es demasiado corto para ser una imagen válida'),
  resourceType: z
    .enum(['image', 'video', 'auto'])
    .default('auto')
});

// ─── Login ──────────────────────────────────────────────────────
export const loginSchema = z.object({
  password: z
    .string({ required_error: 'La contraseña es requerida' })
    .min(1, 'La contraseña no puede estar vacía')
    .max(200, 'Contraseña demasiado larga')
});
