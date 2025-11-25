// src/schema/docenteActividadSchema.ts
import { z } from "zod";
export const docenteActividadSchema = z.object({
  // PK Manual (obligatoria al crear)
  idDocenteActividad: z.number().min(1).int().positive(),
  // FKs obligatorias
  idActividadInstitucional: z.number().min(1).int().positive(),
  idDocente: z.number().min(1).int().positive(),
  // JSON obligatorio (debe ser un objeto)
  datosCapturados: z.record(z.string(), z.any()),
  // Campos opcionales (la BD los maneja por default o son nulos al inicio)
  fechaRegistro: z.any().optional().nullable(),
  validadoPor: z.number().int().positive().optional().nullable(),
  fechaValidacion: z.any().optional().nullable(),
});