// src/types/documentoTypes.ts
export interface documento {
  idDocumento: number;          
  idDocenteActividad: number;   
  fechaGeneracion?: Date | null;
  urlArchivo: string;          
  version?: number | null;
}
