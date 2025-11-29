export interface DocenteActividad {
  idDocenteActividad: number;
  idActividadInstitucional: number;
  idDocente: number;
  datosCapturados: string; // En frontend se maneja como string para el JSON
  fechaRegistro?: string | null;
  validadoPor?: number | null;
  fechaValidacion?: string | null;
}
