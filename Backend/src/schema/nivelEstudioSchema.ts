import { z } from "zod";
export const nivelEstudioSchema = z.object({
  idNivelEstudio: z.number().min(1).int().positive(),
  nombre: z.string().min(1).max(100),
});
