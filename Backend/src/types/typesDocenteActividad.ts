export interface docenteactividad {
  idDocente: number;
  idActividadInstitucional: number;
  rol?: string;         // Puede ser NULL
  periodo?: string;     
  fechaRegistro?: Date; 
}


export type NuevaDocenteActividad = docenteactividad;