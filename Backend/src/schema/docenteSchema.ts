// src/schema/docenteSchema.ts
import { z } from "zod";
export const docenteSchema = z.object({
  // PK e IDs foráneos obligatorios
  idDocente: z.number().min(1).int().positive(),
  idUsuario: z.number().min(1).int().positive(),
  idNivelEstudio: z.number().min(1).int().positive(),
  idDepartamento: z.number().min(1).int().positive(),
  idPlaza: z.number().min(1).int().positive(),
  // Campo obligatorio de longitud fija (char(18))
  filiacion: z.string().length(18),
  // Campos opcionales
  estatusExclusividad: z.number().int().min(0).max(1).optional().nullable(),
  folioEdd: z.string().length(9).optional().nullable(),
});