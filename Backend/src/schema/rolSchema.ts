import { z } from "zod";
export const rolSchema = z.object({
  idRol: z.number().min(1).int().positive(),
  descripcion: z.string().min(1).max(50), 
});