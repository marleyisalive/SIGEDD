// src/schema/materiaSchema.ts
import { z } from "zod";
export const materiaSchema = z.object({
  idMateria: z.number().min(1).int().positive(),
  nombre: z.string().min(1).max(100),
  idDepartamento: z.number().min(1).int().positive(),
  creditos: z.number().min(1).max(6).int().positive(),
});