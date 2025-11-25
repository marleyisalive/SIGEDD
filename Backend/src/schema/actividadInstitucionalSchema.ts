// src/schema/actividadInstitucionalSchema.ts
import { z } from "zod";

export const actividadInstitucionalSchema = z.object({
  idActividadInstitucional: z.number().min(1).int().positive(),
  idTipoDocumento: z.number().min(1).int().positive(),
  // AJUSTE: max(200) según tu SQL
  nombre: z.string().min(1).max(200),
  descripcion: z.string().optional().nullable(),
  periodo: z.string().max(50).optional().nullable(),
  // Validación de fechas como string (YYYY-MM-DD)
  fechaInicio: z.string().date().optional().nullable(),
  fechaFin: z.string().date().optional().nullable(),
});