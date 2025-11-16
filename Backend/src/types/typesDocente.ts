export interface Docente {
  idDocente: number;
  idUsuario: number;
  rfc: string;
  idNivelEstudio: number;
  idDepartamento: number;
  idPlaza: number;
  estatusExclusividad: number; // TINYINT(1)
  folioEdd: number;
}

export type NuevoDocente = Omit<Docente, "idDocente">;