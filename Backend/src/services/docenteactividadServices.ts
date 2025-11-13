// Importaciones necesarias
import { docenteactividad, NuevaDocenteActividad } from "../typesDocenteActividad"; // Asegúrate de que la ruta sea correcta
import { createPool } from "mysql2/promise";

// Reutiliza la configuración de la conexión (idealmente esto debería estar en un archivo de configuración compartido)
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

/**
 * Obtiene todas las relaciones docente-actividad de la base de datos.
 * @returns Un array de objetos DocenteActividad o un objeto de error.
 */
export const obtenerTodasDocenteActividad = async () => {
  try {
    // Especificamos el tipo de los resultados para mejor tipado
    const [results] = await conexion.query("SELECT * FROM docenteActividad");
    return results;
  } catch (err) {
    console.error("Error al obtener las relaciones docente-actividad:", err);
    return { error: "No se pudieron obtener las relaciones docente-actividad." };
  }
};

/**
 * Encuentra una relación docente-actividad por su clave primaria compuesta.
 * @param idDocente El ID del docente.
 * @param idActividadInstitucional El ID de la actividad institucional.
 * @returns El objeto DocenteActividad encontrado o null si no existe.
 */
export const encontrarDocenteActividadPorPK = async (
  idDocente: number,
  idActividadInstitucional: number
) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM docenteActividad WHERE idDocente = ? AND idActividadInstitucional = ?",
      [idDocente, idActividadInstitucional]
    );
    // query devuelve un array, si encuentra algo, el objeto estará en la primera posición
    return results; // Retorna el objeto o null si no lo encuentra
  } catch (err) {
    console.error(`Error al obtener la relación docente-actividad con DocenteID ${idDocente} y ActividadID ${idActividadInstitucional}:`, err);
    return { error: "No se pudo obtener la relación docente-actividad." };
  }
};

/**
 * Agrega una nueva relación docente-actividad a la base de datos.
 * @param nuevaDocenteActividad Los datos de la nueva relación.
 * @returns El resultado de la inserción o un objeto de error.
 */
export const agregarDocenteActividad = async (nuevaDocenteActividad: NuevaDocenteActividad) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO docenteActividad (idDocente, idActividadInstitucional, rol, periodo) VALUES (?, ?, ?, ?)",
      [
        nuevaDocenteActividad.idDocente,
        nuevaDocenteActividad.idActividadInstitucional,
        // Si rol o periodo son opcionales y vienen como undefined, MySQL espera NULL.
        // Convertimos undefined a null explícitamente.
        nuevaDocenteActividad.rol === undefined ? null : nuevaDocenteActividad.rol,
        nuevaDocenteActividad.periodo === undefined ? null : nuevaDocenteActividad.periodo
      ]
    );
    return results;
  } catch (err: any) { // Usamos 'any' para acceder a 'err.code' de forma segura
    console.error("Error al agregar la relación docente-actividad:", err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return { error: "No se pudo agregar la relación. Verifique los IDs de Docente o Actividad Institucional." };
    }
    if (err.code === 'ER_DUP_ENTRY') {
        return { error: "Ya existe una entrada para este docente y actividad. (Violación de clave primaria)" };
    }
    return { error: "No se pudo agregar la relación docente-actividad." };
  }
};

export const actualizarDocenteActividad = async (
  idDocente: number,
  idActividadInstitucional: number,
  docenteActividadModificada: Partial<docenteactividad>
) => {
  try {
    const fields: string[] = [];
    const values: any[] = [];
    
    // Solo permitimos actualizar 'rol' y 'periodo', y convertimos undefined a null
    if (docenteActividadModificada.rol !== undefined) {
      fields.push("rol = ?");
      values.push(docenteActividadModificada.rol === undefined ? null : docenteActividadModificada.rol);
    }
    if (docenteActividadModificada.periodo !== undefined) {
      fields.push("periodo = ?");
      values.push(docenteActividadModificada.periodo === undefined ? null : docenteActividadModificada.periodo);
    }

    if (fields.length === 0) {
      return { warning: "No se proporcionaron datos válidos para actualizar (solo 'rol' y 'periodo' son actualizables)." };
    }

    // Los IDs de la PK compuesta van al final para la cláusula WHERE
    values.push(idDocente, idActividadInstitucional); 

    const [results] = await conexion.query(
      `UPDATE docenteActividad SET ${fields.join(", ")} WHERE idDocente = ? AND idActividadInstitucional = ?`,
      values
    );
    return results;
  } catch (err: any) {
    console.error(`Error al actualizar la relación docente-actividad con DocenteID ${idDocente} y ActividadID ${idActividadInstitucional}:`, err);
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return { error: "No se pudo actualizar la relación. Verifique los IDs de Docente o Actividad Institucional." };
    }
    return { error: "No se pudo actualizar la relación docente-actividad." };
  }
};

export const eliminarDocenteActividad = async (
  idDocente: number,
  idActividadInstitucional: number
) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM docenteActividad WHERE idDocente = ? AND idActividadInstitucional = ?",
      [idDocente, idActividadInstitucional]
    );
    return results;
  } catch (err: any) {
    console.error(`Error al eliminar la relación docente-actividad con DocenteID ${idDocente} y ActividadID ${idActividadInstitucional}:`, err);
    return { error: "No se pudo eliminar la relación docente-actividad." };
  }
};