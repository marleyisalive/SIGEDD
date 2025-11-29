// src/services/actividadInstitucionalServices.ts

// Importamos el tipo en minúscula
import { actividadInstitucional } from "../types/typesActividadInstitucional";
import { createPool } from "mysql2/promise";
// Importamos el esquema para validar
import { actividadInstitucionalSchema } from "../schema/actividadInstitucionalSchema";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --- Obtener todas ---
export const obtenerTodasActividades = async () => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM actividadInstitucional"
    );
    return results;
  } catch (err) {
    console.error("error al obtener actividades: ", err);
    return { error: "No se pudieron obtener las actividades." };
  }
};

// --- Encontrar por ID ---
export const encontrarActividadPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM actividadInstitucional WHERE idActividadInstitucional = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener actividad por id: ", err);
    return { error: "No se pudo obtener la actividad por id." };
  }
};

// --- Agregar nueva (SINTAXIS LIMPIA) ---
export const agregarActividad = async (nuevo: actividadInstitucional) => {
  // 1. Validar con Zod (checa el formato de fechas YYYY-MM-DD)
  const validacion = actividadInstitucionalSchema.safeParse(nuevo);
  if (!validacion.success) {
    return { error: validacion.error };
  }

  // 2. Convertir fechas ISO a formato YYYY-MM-DD si existen
  const datosAInsertar = { ...nuevo };
  if (datosAInsertar.fechaInicio) {
    datosAInsertar.fechaInicio = new Date(datosAInsertar.fechaInicio as any)
      .toISOString()
      .split("T")[0] as any;
  }
  if (datosAInsertar.fechaFin) {
    datosAInsertar.fechaFin = new Date(datosAInsertar.fechaFin as any)
      .toISOString()
      .split("T")[0] as any;
  }

  // 3. Insertar
  const [results] = await conexion.query(
    "INSERT INTO actividadInstitucional SET ?",
    [datosAInsertar]
  );
  return results;
};

// --- Actualizar existente (SINTAXIS LIMPIA) ---
export const actualizarActividad = async (
  modificado: actividadInstitucional
) => {
  try {
    const { idActividadInstitucional, ...datosAActualizar } = modificado;

    // Convertir fechas ISO a formato YYYY-MM-DD si existen
    if (datosAActualizar.fechaInicio) {
      datosAActualizar.fechaInicio = new Date(
        datosAActualizar.fechaInicio as any
      )
        .toISOString()
        .split("T")[0] as any;
    }
    if (datosAActualizar.fechaFin) {
      datosAActualizar.fechaFin = new Date(datosAActualizar.fechaFin as any)
        .toISOString()
        .split("T")[0] as any;
    }

    const [results] = await conexion.query(
      "UPDATE actividadInstitucional SET ? WHERE idActividadInstitucional = ?",
      [datosAActualizar, idActividadInstitucional]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar actividad: ", err);
    return { error: "No se pudo actualizar la actividad." };
  }
};

// --- Eliminar ---
export const eliminarActividad = async (idActividadInstitucional: number) => {
  const [results] = await conexion.query(
    "DELETE FROM actividadInstitucional WHERE idActividadInstitucional = ?",
    [idActividadInstitucional]
  );
  return results;
};
