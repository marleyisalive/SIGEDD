// src/services/aulaServices.ts

import { aula } from "../types/typesAula"; // Asegúrate de la ruta y el nombre (minúscula)
import { createPool } from "mysql2/promise";
import { aulaSchema } from "../schema/aulaSchema"; // Importamos el esquema

// Configuración de la conexión
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307, // Descomenta si usas otro puerto
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --- Obtener todas las aulas ---
export const obtenerTodasAulas = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM aula");
    return results;
  } catch (err) {
    console.error("error al obtener aulas: ", err);
    return { error: "No se pudieron obtener las aulas." };
  }
};

// --- Encontrar aula por ID ---
export const encontrarAulaPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM aula WHERE idAula = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener aula por id: ", err);
    return { error: "No se pudo obtener el aula por id." };
  }
};

// --- Agregar nueva aula (CON VALIDACIÓN ZOD) ---
export const agregarAula = async (nueva: aula) => {
  // 1. Validar datos de entrada
  const validacion = aulaSchema.safeParse(nueva);
  if (!validacion.success) {
    return { error: validacion.error };
  }
  const [results] = await conexion.query(
    "INSERT INTO aula (idAula, nombre) VALUES (?, ?)",
    [nueva.idAula, nueva.nombre]
  );
  return results;
};

// --- Actualizar aula existente ---
export const actualizarAula = async (modificada: aula) => {
  try {
    // No validamos en update siguiendo el patrón
    const [results] = await conexion.query(
      "UPDATE aula SET nombre = ? WHERE idAula = ?",
      [modificada.nombre, modificada.idAula]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar aula: ", err);
    return { error: "No se pudo actualizar el aula." };
  }
};

// --- Eliminar aula ---
export const eliminarAula = async (idAula: number) => {
  const [results] = await conexion.query("DELETE FROM aula WHERE idAula = ?", [
    idAula,
  ]);
  return results;
};
