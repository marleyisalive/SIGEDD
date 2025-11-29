// src/schema/carreraSchema.ts
import { z } from "zod";

export const carreraSchema = z.object({
  idCarrera: z.number().min(1).int().positive(),
  nombre: z.string().min(1).max(150),
  // Validación específica para tinyint booleano (solo permite 0 o 1)
  acreditado: z.number().int().min(0).max(1),
});