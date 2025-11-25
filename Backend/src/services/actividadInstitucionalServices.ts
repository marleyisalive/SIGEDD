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
    queueLimit: 0
});

// --- Obtener todas ---
export const obtenerTodasActividades = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM actividadInstitucional");
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
    try {
        // 1. Validar con Zod (checa el formato de fechas YYYY-MM-DD)
        const validacion = actividadInstitucionalSchema.safeParse(nuevo);
        if (!validacion.success) {
            return { error: validacion.error };
        }

        // 2. Insertar
        // MySQL maneja automáticamente las fechas en string si están en formato correcto.
        const [results] = await conexion.query(
            "INSERT INTO actividadInstitucional SET ?",
            [nuevo]
        );
        return results;
    } catch (err) {
        console.error("error al agregar actividad: ", err);
        return { error: "No se pudo agregar la actividad. Verifique el ID del Tipo de Documento." };
    }
};

// --- Actualizar existente (SINTAXIS LIMPIA) ---
export const actualizarActividad = async (modificado: actividadInstitucional) => {
    try {
        const { idActividadInstitucional, ...datosAActualizar } = modificado;

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
    try {
        const [results] = await conexion.query(
            "DELETE FROM actividadInstitucional WHERE idActividadInstitucional = ?",
            [idActividadInstitucional]
        );
        return results;
    } catch (err) {
        console.error("error al eliminar actividad: ", err);
        return { error: "No se pudo eliminar la actividad." };
    }
};