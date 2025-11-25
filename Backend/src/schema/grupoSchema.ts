// src/schema/grupoSchema.ts
import { z } from "zod";
export const grupoSchema = z.object({
  // PK Manual
  idGrupo: z.number().min(1).int().positive(),
  // FKs obligatorias (números positivos)
  idDocente: z.number().min(1).int().positive(),
  idMateria: z.number().min(1).int().positive(),
  idAula: z.number().min(1).int().positive(),
  // Campo opcional y nullable (varchar 50)
  periodo: z.string().max(50).optional().nullable(),
  // Campos obligatorios
  horario: z.string().min(1).max(50), // varchar(50) NOT NULL
  numeroAlumnos: z.number().int().min(1), // int NOT NULL, al menos 1 alumno
});