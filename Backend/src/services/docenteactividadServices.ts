// src/services/docenteActividadServices.ts

import { docenteactividad } from "../types/typesDocenteActividad";
import { createPool } from "mysql2/promise";
import { docenteActividadSchema } from "../schema/docenteActividadSchema";

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
export const obtenerTodasDocenteActividad = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM docenteactividad");
        return results;
    } catch (err) {
        console.error("error al obtener registros de actividades: ", err);
        return { error: "No se pudieron obtener los registros." };
    }
};

// --- Encontrar por ID ---
export const encontrarDocenteActividadPorId = async (id: number) => {
    try {
        const [results] = await conexion.query(
            "SELECT * FROM docenteactividad WHERE idDocenteActividad = ?",
            [id]
        );
        return results;
    } catch (err) {
        console.error("error al obtener registro por id: ", err);
        return { error: "No se pudo obtener el registro por id." };
    }
};

// --- Agregar nuevo (SINTAXIS LIMPIA + JSON) ---
export const agregarDocenteActividad = async (nueva: docenteactividad) => {
    try {
        // 1. Validar con Zod
        const validacion = docenteActividadSchema.safeParse(nueva);
        if (!validacion.success) {
            return { error: validacion.error };
        }

        // 2. Preparar JSON (Necesario para MySQL)
        const datosParaInsertar = { ...nueva };
        // Convertimos el objeto JS a string JSON
        datosParaInsertar.datosCapturados = JSON.stringify(nueva.datosCapturados) as any;

        // 3. Insertar
        const [results] = await conexion.query(
            "INSERT INTO docenteactividad SET ?",
            [datosParaInsertar]
        );
        return results;

    } catch (err) {
        console.error("error al agregar registro de actividad: ", err);
        return { error: "No se pudo agregar el registro." };
    }
};

// --- Actualizar existente (SINTAXIS LIMPIA + JSON) ---
export const actualizarDocenteActividad = async (modificado: docenteactividad) => {
    try {
        const { idDocenteActividad, ...datosAActualizar } = modificado;

        // Si hay JSON nuevo, convertirlo a string
        if (datosAActualizar.datosCapturados) {
             (datosAActualizar as any).datosCapturados = JSON.stringify(datosAActualizar.datosCapturados);
        }

        const [results] = await conexion.query(
            "UPDATE docenteactividad SET ? WHERE idDocenteActividad = ?",
            [datosAActualizar, idDocenteActividad]
        );
        return results;

    } catch (err) {
        console.error("error al actualizar registro de actividad: ", err);
        return { error: "No se pudo actualizar el registro." };
    }
};

// --- Eliminar ---
export const eliminarDocenteActividad = async (idDocenteActividad: number) => {
    try {
        const [results] = await conexion.query(
            "DELETE FROM docenteactividad WHERE idDocenteActividad = ?",
            [idDocenteActividad]
        );
        return results;
    } catch (err) {
        console.error("error al eliminar registro de actividad: ", err);
        return { error: "No se pudo eliminar el registro." };
    }
};