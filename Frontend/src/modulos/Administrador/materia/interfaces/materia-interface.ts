export interface Materia {
  idMateria: number;
  nombre: string;
  idDepartamento: number;
  creditos: number;
}

export interface Departamento {
  idDepartamento: number;
  nombreDepartamento: string;
  encargadoDepartamento: number | null;
}
