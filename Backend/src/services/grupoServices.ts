// src/services/grupoServices.ts

// Importamos el tipo en minúscula
import { grupo } from "../types/typesGrupo";
import { createPool } from "mysql2/promise";
import { grupoSchema } from "../schema/grupoSchema"; // Esquema de validación

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
export const obtenerTodosGrupos = async () => {
  try {
    // En el futuro, aquí harías JOINs para traer los nombres reales
    // del docente, materia y aula en lugar de solo sus IDs.
    const [results] = await conexion.query("SELECT * FROM grupo");
    return results;
  } catch (err) {
    console.error("error al obtener grupos: ", err);
    return { error: "No se pudieron obtener los grupos." };
  }
};

// --- Encontrar por ID ---
export const encontrarGrupoPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM grupo WHERE idGrupo = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener grupo por id: ", err);
    return { error: "No se pudo obtener el grupo por id." };
  }
};

// --- Agregar nuevo (CON VALIDACIÓN ZOD) ---
export const agregarGrupo = async (nuevo: grupo) => {
  // 1. Validar con Zod
  const validacion = grupoSchema.safeParse(nuevo);
  if (!validacion.success) {
    return { error: validacion.error };
  }

  // 2. Insertar
  // Nota: 'periodo' puede ser null, mysql2 lo maneja correctamente.
  const [results] = await conexion.query(
    "INSERT INTO grupo (idGrupo, idDocente, idMateria, idAula, periodo, horario, numeroAlumnos) VALUES (?, ?, ?, ?, ?, ?, ?)",
    [
      nuevo.idGrupo,
      nuevo.idDocente,
      nuevo.idMateria,
      nuevo.idAula,
      nuevo.periodo,
      nuevo.horario,
      nuevo.numeroAlumnos,
    ]
  );
  return results;
};

// --- Actualizar existente ---
export const actualizarGrupo = async (modificado: grupo) => {
  // No validamos con Zod en update siguiendo el patrón establecido
  const [results] = await conexion.query(
    "UPDATE grupo SET idDocente = ?, idMateria = ?, idAula = ?, periodo = ?, horario = ?, numeroAlumnos = ? WHERE idGrupo = ?",
    [
      modificado.idDocente,
      modificado.idMateria,
      modificado.idAula,
      modificado.periodo,
      modificado.horario,
      modificado.numeroAlumnos,
      modificado.idGrupo, // ID para el WHERE
    ]
  );
  return results;
};

// --- Eliminar ---
export const eliminarGrupo = async (idGrupo: number) => {
  const [results] = await conexion.query(
    "DELETE FROM grupo WHERE idGrupo = ?",
    [idGrupo]
  );
  return results;
};
