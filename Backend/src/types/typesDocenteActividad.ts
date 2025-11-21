export interface docenteactividad {
  idDocenteActividad: number;
  idActividadInstitucional: number;
  idDocente: number;
  datosCapturados: Record<string, any>;  // JSON
  fechaRegistro?: Date | null;
  validadoPor?: number | null;
  fechaValidacion?: Date | null;
}

export type NuevaDocenteActividad = docenteactividad;