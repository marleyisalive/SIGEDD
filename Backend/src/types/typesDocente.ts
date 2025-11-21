export interface Docente {
  idDocente: number;
  idUsuario: number;
  filiacion: string;           
  idNivelEstudio: number;
  idDepartamento: number;
  idPlaza: number;
  estatusExclusividad?: number | null; 
  folioEdd?: string | null;            
}


export type NuevoDocente = Omit<Docente, "idDocente">;