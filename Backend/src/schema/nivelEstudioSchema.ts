import { z } from "zod";
//validaciones con Zod - construir schema
export const nivelEstudioSchema = z.object({
  idNivelEstudio: z.number().min(1).int().positive(),
  nombre: z.string().min(1).max(100),
});
