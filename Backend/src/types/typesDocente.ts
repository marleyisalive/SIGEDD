export interface docente {
  idDocente: number; // OBLIGATORIO siempre
  idUsuario: number;
  filiacion: string;
  idNivelEstudio: number;
  idDepartamento: number;
  idPlaza: number;
  estatusExclusividad?: number | null;
  folioEdd?: string | null;
}