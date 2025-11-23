// src/services/materiaServices.ts

// Importamos el tipo en minúscula
import { materia } from "../types/typesMateria";
import { createPool } from "mysql2/promise";
import { materiaSchema } from "../schema/materiaSchema"; // Importamos el esquema

// Configuración de la conexión
const conexion = createPool({
    host: "localhost",
    user: "administrador",
    password: "admin123456",
    database: "SIGEDD",
    // port: 3307, // Descomenta si es necesario
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

// --- Obtener todas ---
export const obtenerTodasMaterias = async () => {
    try {
        // Podrías hacer un JOIN aquí si quisieras traer el nombre del departamento,
        // pero por ahora lo mantenemos simple con un SELECT *
        const [results] = await conexion.query("SELECT * FROM materia");
        return results;
    } catch (err) {
        console.error("error al obtener materias: ", err);
        return { error: "No se pudieron obtener las materias." };
    }
};

// --- Encontrar por ID ---
export const encontrarMateriaPorId = async (id: number) => {
    try {
        const [results] = await conexion.query(
            "SELECT * FROM materia WHERE idMateria = ?",
            [id]
        );
        return results;
    } catch (err) {
        console.error("error al obtener materia por id: ", err);
        return { error: "No se pudo obtener la materia por id." };
    }
};

// --- Agregar nueva (CON VALIDACIÓN ZOD) ---
export const agregarMateria = async (nueva: materia) => {
    try {
        // 1. Validar con el esquema (checa el límite de 6 créditos)
        const validacion = materiaSchema.safeParse(nueva);
        if (!validacion.success) {
            return { error: validacion.error };
        }

        // 2. Insertar
        const [results] = await conexion.query(
            "INSERT INTO materia (idMateria, nombre, idDepartamento, creditos) VALUES (?, ?, ?, ?)",
            [nueva.idMateria, nueva.nombre, nueva.idDepartamento, nueva.creditos]
        );
        return results;
    } catch (err) {
        console.error("error al agregar materia: ", err);
        // Error común: el idDepartamento no existe
        return { error: "No se pudo agregar la materia. Verifique que el departamento exista." };
    }
};

// --- Actualizar existente ---
export const actualizarMateria = async (modificada: materia) => {
    try {
        // No validamos en update siguiendo el patrón
        const [results] = await conexion.query(
            "UPDATE materia SET nombre = ?, idDepartamento = ?, creditos = ? WHERE idMateria = ?",
            [modificada.nombre, modificada.idDepartamento, modificada.creditos, modificada.idMateria]
        );
        return results;
    } catch (err) {
        console.error("error al actualizar materia: ", err);
        return { error: "No se pudo actualizar la materia. Verifique que el departamento exista." };
    }
};

// --- Eliminar ---
export const eliminarMateria = async (idMateria: number) => {
    try {
        const [results] = await conexion.query(
            "DELETE FROM materia WHERE idMateria = ?",
            [idMateria]
        );
        return results;
    } catch (err) {
        console.error("error al eliminar materia: ", err);
        // Error común: la materia se está usando en un grupo
        return { error: "No se pudo eliminar la materia. Puede estar asignada a un grupo." };
    }
};