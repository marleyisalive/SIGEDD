export interface documento {
  idDocumento: number;
  idTipoDocumento: number;
  idDocente: number;
  idActividadInstitucional?: number | null;
  idGrupo?: number | null;
  nombreArchivo: string;
  rutaArchivo: string;
  lugar: string;
  fecha?: Date;
  hora?: string;
  validador: number;
}
