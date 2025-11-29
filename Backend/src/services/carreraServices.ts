// src/services/carreraServices.ts

// Importamos el tipo en minúscula
import { carrera } from "../types/typesCarrera";
import { createPool } from "mysql2/promise";
import { carreraSchema } from "../schema/carreraSchema"; // Importamos el esquema

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

// --- Obtener todas ---
export const obtenerTodasCarreras = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM carrera");
    return results;
  } catch (err) {
    console.error("error al obtener carreras: ", err);
    return { error: "No se pudieron obtener las carreras." };
  }
};

// --- Encontrar por ID ---
export const encontrarCarreraPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM carrera WHERE idCarrera = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener carrera por id: ", err);
    return { error: "No se pudo obtener la carrera por id." };
  }
};

// --- Agregar nueva (CON VALIDACIÓN ZOD) ---
export const agregarCarrera = async (nueva: carrera) => {
  // 1. Validar con el esquema (incluye la regla de 0 o 1 para 'acreditado')
  const validacion = carreraSchema.safeParse(nueva);
  if (!validacion.success) {
    return { error: validacion.error };
  }

  // 2. Insertar
  const [results] = await conexion.query(
    "INSERT INTO carrera (idCarrera, nombre, acreditado) VALUES (?, ?, ?)",
    [nueva.idCarrera, nueva.nombre, nueva.acreditado]
  );
  return results;
};

// --- Actualizar existente ---
export const actualizarCarrera = async (modificada: carrera) => {
  try {
    // No validamos en update siguiendo el patrón
    const [results] = await conexion.query(
      "UPDATE carrera SET nombre = ?, acreditado = ? WHERE idCarrera = ?",
      [modificada.nombre, modificada.acreditado, modificada.idCarrera]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar carrera: ", err);
    return { error: "No se pudo actualizar la carrera." };
  }
};

// --- Eliminar ---
export const eliminarCarrera = async (idCarrera: number) => {
  const [results] = await conexion.query(
    "DELETE FROM carrera WHERE idCarrera = ?",
    [idCarrera]
  );
  return results;
};
