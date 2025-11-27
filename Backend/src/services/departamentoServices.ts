// src/services/departamentoServices.ts

import { departamento } from "../types/typesDepartamento"; // Nombre en minúscula
import { createPool } from "mysql2/promise";
import { departamentoSchema } from "../schema/departamentoSchema"; // Esquema de validación

// Configuración de la conexión
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307, // Descomenta si es necesario
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --- Obtener todos ---
export const obtenerTodosDepartamentos = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM departamento");
    return results;
  } catch (err) {
    console.error("error al obtener departamentos: ", err);
    return { error: "No se pudieron obtener los departamentos." };
  }
};

// --- Encontrar por ID ---
export const encontrarDepartamentoPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM departamento WHERE idDepartamento = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener departamento por id: ", err);
    return { error: "No se pudo obtener el departamento por id." };
  }
};

// --- Agregar nuevo (CON VALIDACIÓN ZOD) ---
export const agregarDepartamento = async (nueva: departamento) => {
  // 1. Validar con el esquema (maneja el opcional/nulo de encargado)
  const validacion = departamentoSchema.safeParse(nueva);
  if (!validacion.success) {
    return { error: validacion.error };
  }

  // 2. Insertar
  // Nota: Si nueva.encargadoDepartamento es null o undefined, MySQL lo guarda como NULL.
  const [results] = await conexion.query(
    "INSERT INTO departamento (idDepartamento, nombreDepartamento, encargadoDepartamento) VALUES (?, ?, ?)",
    [
      nueva.idDepartamento,
      nueva.nombreDepartamento,
      nueva.encargadoDepartamento,
    ]
  );
  return results;
};

// --- Actualizar existente ---
export const actualizarDepartamento = async (modificada: departamento) => {
  try {
    // No validamos en update siguiendo el patrón
    const [results] = await conexion.query(
      "UPDATE departamento SET nombreDepartamento = ?, encargadoDepartamento = ? WHERE idDepartamento = ?",
      [
        modificada.nombreDepartamento,
        modificada.encargadoDepartamento,
        modificada.idDepartamento,
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar departamento: ", err);
    return { error: "No se pudo actualizar el departamento." };
  }
};

// --- Eliminar ---
export const eliminarDepartamento = async (idDepartamento: number) => {
  const [results] = await conexion.query(
    "DELETE FROM departamento WHERE idDepartamento = ?",
    [idDepartamento]
  );
  return results;
};
