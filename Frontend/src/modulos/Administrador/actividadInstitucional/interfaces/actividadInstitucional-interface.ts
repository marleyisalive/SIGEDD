export interface ActividadInstitucional {
  idActividadInstitucional: number;
  idTipoDocumento: number;
  nombre: string;
  descripcion?: string | null;
  periodo?: string | null;
  fechaInicio?: string | null;
  fechaFin?: string | null;
}
