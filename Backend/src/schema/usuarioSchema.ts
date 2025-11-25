import { z } from "zod";

export const usuarioSchema = z.object({
  idUsuario: z.number().min(1).int().positive(),
  nombreUsuario: z.string().min(1).max(50),

  // Campos opcionales y que pueden ser null
  apePatUsuario: z.string().max(50).optional().nullable(),
  apeMatUsuario: z.string().max(50).optional().nullable(),

  // Teléfono: Validamos longitud 10 y que sean solo dígitos.
  telefono: z.string().length(10).regex(/^\d+$/).optional().nullable(),

  // Validación de formato de correo
  correoUsuario: z.string().email().max(100),

  // Validación de contraseña (mínimo 6 caracteres)
  contrasenaUsuario: z.string().min(6).max(150),

  // Estatus (0 o 1)
  estatus: z.number().int().min(0).max(1),

  idRol: z.number().min(1).int().positive(),
});