// src/types/docenteActividadTypes.ts
export interface docenteactividad {
  idDocenteActividad: number; // PK Manual
  idActividadInstitucional: number;
  idDocente: number;
  datosCapturados: Record<string, any>; // JSON
  // Fechas opcionales (la BD maneja el default de fechaRegistro)
  fechaRegistro?: Date | null;
  validadoPor?: number | null;
  fechaValidacion?: Date | null;
}

// export type NuevaDocenteActividad = docenteactividad;