// src/types/departamentoTypes.ts
export interface departamento {
  idDepartamento: number;   
  nombreDepartamento: string;     
  // Esta columna permite NULL, por lo tanto en TS debe ser opcional y nullable.
  encargadoDepartamento?: number | null;
}
