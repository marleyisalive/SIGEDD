// src/types/grupoTypes.ts
export interface grupo {
  idGrupo: number;        
  idDocente: number;      
  idMateria: number;      
  idAula: number;         
  //DEFAULT NULL en la BD, por lo tanto es opcional.
  periodo?: string | null;
  horario: string;    
  numeroAlumnos: number;
}
