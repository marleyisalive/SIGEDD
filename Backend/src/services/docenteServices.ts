// src/services/docenteServices.ts

import { docente } from "../types/typesDocente"; // Tipo en minúscula
import { createPool } from "mysql2/promise";
import { docenteSchema } from "../schema/docenteSchema"; // Esquema limpio

// Configuración de la conexión
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

// --- Obtener todos ---
export const obtenerTodosDocentes = async () => {
  try {
    // Aquí en el futuro podrías hacer JOINs para traer los nombres de
    // usuario, departamento, plaza, etc., en lugar de solo los IDs.
    // Por ahora, lo mantenemos simple con SELECT *
    const [results] = await conexion.query("SELECT * FROM docente");
    return results;
  } catch (err) {
    console.error("error al obtener docentes: ", err);
    return { error: "No se pudieron obtener los docentes." };
  }
};

// --- Encontrar por ID ---
export const encontrarDocentePorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM docente WHERE idDocente = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener docente por id: ", err);
    return { error: "No se pudo obtener el docente por id." };
  }
};

// --- Encontrar docente por idUsuario ---
export const encontrarDocentePorUsuario = async (idUsuario: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM docente WHERE idUsuario = ?",
      [idUsuario]
    );
    const rows: any = results as any;
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    console.error("error al obtener docente por idUsuario: ", err);
    return null;
  }
};

// --- Agregar nuevo (CON VALIDACIÓN ZOD) ---
export const agregarDocente = async (nueva: docente) => {
  // 1. Validar con Zod (longitudes exactas, tipos)
  const validacion = docenteSchema.safeParse(nueva);
  if (!validacion.success) {
    throw new Error(JSON.stringify(validacion.error));
  }

  // 2. Insertar
  const [results] = await conexion.query(
    "INSERT INTO docente (idDocente, idUsuario, filiacion, idNivelEstudio, idDepartamento, idPlaza, estatusExclusividad, folioEdd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nueva.idDocente,
      nueva.idUsuario,
      nueva.filiacion,
      nueva.idNivelEstudio,
      nueva.idDepartamento,
      nueva.idPlaza,
      nueva.estatusExclusividad, // MySQL maneja si es null
      nueva.folioEdd, // MySQL maneja si es null
    ]
  );
  return results;
};

// --- Actualizar existente ---
export const actualizarDocente = async (modificada: docente) => {
  try {
    // No validamos con Zod en update siguiendo el patrón
    const [results] = await conexion.query(
      "UPDATE docente SET idUsuario = ?, filiacion = ?, idNivelEstudio = ?, idDepartamento = ?, idPlaza = ?, estatusExclusividad = ?, folioEdd = ? WHERE idDocente = ?",
      [
        modificada.idUsuario,
        modificada.filiacion,
        modificada.idNivelEstudio,
        modificada.idDepartamento,
        modificada.idPlaza,
        modificada.estatusExclusividad,
        modificada.folioEdd,
        modificada.idDocente, // ID para el WHERE
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar docente: ", err);
    // También puede fallar por FKs si intentas cambiar a un ID que no existe
    return {
      error:
        "No se pudo actualizar el docente. Verifique la existencia de los IDs relacionados.",
    };
  }
};

// --- Eliminar ---
export const eliminarDocente = async (idDocente: number) => {
  const [results] = await conexion.query(
    "DELETE FROM docente WHERE idDocente = ?",
    [idDocente]
  );
  return results;
};
