// src/types/carreraTypes.ts

// Usamos el estilo de tu compañero (minúscula al inicio)
export interface carrera {
  idCarrera: number;    // PK manual
  nombre: string;       // varchar
  acreditado: number;   // tinyint (se maneja como 0 o 1)
}