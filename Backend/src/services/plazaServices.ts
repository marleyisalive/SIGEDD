// src/services/plazaServices.ts

import { plaza } from "../types/typesPlaza"; // Asegúrate de la ruta
import { createPool } from "mysql2/promise";
import { plazaSchema } from "../schema/plazaSchema"; // Importamos el esquema

// Configuración de la conexión
const conexion = createPool({
    host: "localhost",
    user: "administrador",
    password: "admin123456",
    database: "SIGEDD",
});

// --- Obtener todas las plazas ---
export const obtenerTodasPlazas = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM plaza");
        return results;
    } catch (err) {
        console.error("error al obtener plazas: ", err);
        return { error: "No se pudieron obtener las plazas." };
    }
};

// --- Encontrar plaza por ID ---
export const encontrarPlazaPorId = async (id: number) => {
    try {
        const [results] = await conexion.query(
            "SELECT * FROM plaza WHERE idPlaza = ?",
            [id]
        );
        return results;
    } catch (err) {
        console.error("error al obtener plaza por id: ", err);
        return { error: "No se pudo obtener la plaza por id." };
    }
};

// --- Agregar nueva plaza (CON VALIDACIÓN ZOD) ---
export const agregarPlaza = async (nueva: plaza) => {
    try {
        // 1. Validar datos de entrada
        const validacion = plazaSchema.safeParse(nueva);
        if (!validacion.success) {
            return { error: validacion.error };
        }

        // 2. Insertar si la validación pasa
        const [results] = await conexion.query(
            "INSERT INTO plaza (idPlaza, descripcion) VALUES (?, ?)",
            [nueva.idPlaza, nueva.descripcion]
        );
        return results;
    } catch (err) {
        console.error("error al agregar plaza: ", err);
        return { error: "No se pudo agregar la plaza." };
    }
};

// --- Actualizar plaza existente ---
export const actualizarPlaza = async (modificada: plaza) => {
    try {
        // No validamos en update siguiendo el patrón de tu equipo
        const [results] = await conexion.query(
            "UPDATE plaza SET descripcion = ? WHERE idPlaza = ?",
            [modificada.descripcion, modificada.idPlaza]
        );
        return results;
    } catch (err) {
        console.error("error al actualizar plaza: ", err);
        return { error: "No se pudo actualizar la plaza." };
    }
};

// --- Eliminar plaza ---
export const eliminarPlaza = async (idPlaza: number) => {
    try {
        const [results] = await conexion.query(
            "DELETE FROM plaza WHERE idPlaza = ?",
            [idPlaza]
        );
        return results;
    } catch (err) {
        console.error("error al eliminar plaza: ", err);
        return { error: "No se pudo eliminar la plaza." };
    }
};
