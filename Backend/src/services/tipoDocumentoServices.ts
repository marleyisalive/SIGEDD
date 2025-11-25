// src/services/tipoDocumentoServices.ts

// ¡OJO! Importamos el nombre en minúscula como lo definió tu compañero
import { tipoDocumento } from "../types/typesTipoDocumento";
import { createPool } from "mysql2/promise";
import { tipoDocumentoSchema } from "../schema/tipoDocumentoSchema"; // El esquema corregido

const conexion = createPool({
    host: "localhost",
    user: "administrador",
    password: "admin123456",
    database: "SIGEDD",
    // port: 3307, // Descomenta si usas otro puerto
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- Obtener todos ---
export const obtenerTodosTiposDocumento = async () => {
    try {
        const [results] = await conexion.query("SELECT * FROM tipodocumento");
        return results;
    } catch (err) {
        console.error("error al obtener tipos de documento: ", err);
        return { error: "No se pudieron obtener los tipos de documento." };
    }
};

// --- Encontrar por ID ---
export const encontrarTipoDocumentoPorId = async (id: number) => {
    try {
        const [results] = await conexion.query(
            "SELECT * FROM tipodocumento WHERE idTipoDocumento = ?",
            [id]
        );
        return results;
    } catch (err) {
        console.error("error al obtener tipo de documento por id: ", err);
        return { error: "No se pudo obtener el tipo de documento por id." };
    }
};

// --- Agregar nuevo (CON VALIDACIÓN ZOD) ---
// Usamos el tipo en minúscula 'tipoDocumento'
export const agregarTipoDocumento = async (nueva: tipoDocumento) => {
    try {
        // 1. Validar con el esquema corregido
        const validacion = tipoDocumentoSchema.safeParse(nueva);
        if (!validacion.success) {
            // Si falla, retornamos el error de Zod
            return { error: validacion.error };
        }

        // 2. Insertar (Si pasa la validación)
        // ¡IMPORTANTE! Convertimos el objeto JavaScript a string JSON antes de enviarlo a MySQL
        const plantillaString = JSON.stringify(nueva.plantillaJSON);

        const [results] = await conexion.query(
            "INSERT INTO tipodocumento (idTipoDocumento, nombre, descripcion, plantillaJSON) VALUES (?, ?, ?, ?)",
            [nueva.idTipoDocumento, nueva.nombre, nueva.descripcion, plantillaString]
        );
        return results;
    } catch (err) {
        console.error("error al agregar tipo de documento: ", err);
        return { error: "No se pudo agregar el tipo de documento." };
    }
};

// --- Actualizar existente ---
export const actualizarTipoDocumento = async (modificada: tipoDocumento) => {
    try {
        // También convertimos a string si se va a actualizar el JSON
        const plantillaString = JSON.stringify(modificada.plantillaJSON);

        // Nota: No validamos con Zod en el update siguiendo el patrón de tu equipo
        const [results] = await conexion.query(
            "UPDATE tipodocumento SET nombre = ?, descripcion = ?, plantillaJSON = ? WHERE idTipoDocumento = ?",
            [modificada.nombre, modificada.descripcion, plantillaString, modificada.idTipoDocumento]
        );
        return results;
    } catch (err) {
        console.error("error al actualizar tipo de documento: ", err);
        return { error: "No se pudo actualizar el tipo de documento." };
    }
};

// --- Eliminar ---
export const eliminarTipoDocumento = async (idTipoDocumento: number) => {
    try {
        const [results] = await conexion.query(
            "DELETE FROM tipodocumento WHERE idTipoDocumento = ?",
            [idTipoDocumento]
        );
        return results;
    } catch (err) {
        console.error("error al eliminar tipo de documento: ", err);
        return { error: "No se pudo eliminar el tipo de documento." };
    }
};