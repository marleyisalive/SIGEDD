// src/schema/departamentoSchema.ts
import { z } from "zod";
export const departamentoSchema = z.object({
  idDepartamento: z.number().min(1).int().positive(),
  // max 100 caracteres
  nombreDepartamento: z.string().min(1).max(100),
  // puede ser número positivo, null, o no venir.
  encargadoDepartamento: z.number().int().positive().optional().nullable(),
});