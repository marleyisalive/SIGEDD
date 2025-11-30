// src/types/docenteActividadTypes.ts
export interface docenteactividad {
  idDocenteActividad: number;
  idActividadInstitucional: number;
  idDocente: number;
  datosCapturados: any;
  fechaRegistro?: Date | null;
  validadoPor?: number | null;
  fechaValidacion?: Date | null;

  nombreActividad?: string;
  nombreTipo?: string;
  idTipoDocumento?: number;
}
// export type NuevaDocenteActividad = docenteactividad;
