export interface actividadInstitucional {
  idActividadInstitucional: number;
  idTipoDocumento: number;
  nombre: string;
  descripcion?: string | null;
  periodo?: string | null;
  fechaInicio?: Date | null;  
  fechaFin?: Date | null;      
}
