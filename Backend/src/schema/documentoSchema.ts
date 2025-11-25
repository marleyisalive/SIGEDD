// src/schema/documentoSchema.ts
import { z } from "zod";
export const documentoSchema = z.object({
  // PK Manual
  idDocumento: z.number().min(1).int().positive(),
  // FK obligatoria
  idDocenteActividad: z.number().min(1).int().positive(),
  // Campo opcional (la BD pone el default de timestamp)
  // Usamos z.any() para permitir que pase lo que sea o sea nulo,
  // la BD se encargará del formato de fecha.
  fechaGeneracion: z.any().optional().nullable(),
  // Cadena obligatoria, máximo 500 caracteres
  urlArchivo: z.string().min(1).max(500),
  // Campo opcional (la BD pone default 1)
  version: z.number().int().positive().optional().nullable(),
});