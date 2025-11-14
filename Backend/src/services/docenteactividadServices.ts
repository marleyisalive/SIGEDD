// se maneja en base a promesas
import { docenteactividad } from "../typesDocenteActividad"; // Asegúrate que la ruta a tus types sea correcta
import { createPool } from "mysql2/promise";
// import { docenteActividadSchema } from "../schema/docenteActividadSchema"; // <-- ¡ESTA LÍNEA ES ELIMINADA!

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307, // Si cambiaste el puerto de MySQL en XAMPP, asegúrate de que esté aquí
});

/**
 * Obtiene todas las relaciones docente-actividad.
 */
export const obtenerTodasDocenteActividad = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM docenteActividad");
    return results;
  } catch (err) {
    console.error("error al obtener las relaciones docente-actividad: ", err);
    return { error: "No se pudieron obtener las relaciones docente-actividad." };
  }
};

/**
 * Encuentra una relación por su clave primaria compuesta (PK).
 */
export const encontrarDocenteActividadPorPK = async (
  idDocente: number,
  idActividadInstitucional: number
) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM docenteActividad WHERE idDocente = ? AND idActividadInstitucional = ?",
      [idDocente, idActividadInstitucional] // Array con ambos IDs
    );
    return results; // Retorna el array de resultados (o vacío si no encuentra)
  } catch (err) {
    console.error("error al obtener la relación por pk: ", err);
    return { error: "No se puede obtener la relación por pk" };
  }
};

/**
 * Agrega una nueva relación docente-actividad.
 */
export const agregarDocenteActividad = async (nueva: docenteactividad) => {
  try {
    // --- ¡TODA LA LÓGICA DE VALIDACIÓN CON ZOD HA SIDO ELIMINADA DE AQUÍ! ---
    // const validacion = docenteActividadSchema.safeParse(nueva);
    // if (!validacion.success) {
    //   return { error: validacion.error };
    // }

    const [results] = await conexion.query(
      "INSERT INTO docenteActividad (idDocente, idActividadInstitucional, rol, periodo) VALUES (?, ?, ?, ?)",
      [
        nueva.idDocente,
        nueva.idActividadInstitucional,
        nueva.rol,
        nueva.periodo,
      ]
    );
    return results;
  } catch (err: any) { // Se usa 'any' para poder acceder a 'err.code'
    console.error("error al agregar la relación: ", err);
    // Manejo de errores específicos de BD (buena práctica)
    if (err.code === 'ER_NO_REFERENCED_ROW_2') {
      return { error: "Error: El idDocente o idActividadInstitucional no existen." };
    }
    if (err.code === 'ER_DUP_ENTRY') {
      return { error: "Error: Este docente ya tiene esta actividad registrada." };
    }
    return { error: "No se pudo agregar la relación" };
  }
};

/**
 * Actualiza una relación docente-actividad (solo rol y periodo).
 */
export const actualizarDocenteActividad = async (modificada: docenteactividad) => {
  try {
    const [results] = await conexion.query(
      "UPDATE docenteActividad SET rol = ?, periodo = ? WHERE idDocente = ? AND idActividadInstitucional = ?",
      [
        modificada.rol,
        modificada.periodo,
        modificada.idDocente,
        modificada.idActividadInstitucional,
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar la relación: ", err);
    return { error: "No se pudo actualizar la relación" };
  }
};

/**
 * Elimina una relación docente-actividad por su PK compuesta.
 */
export const eliminarDocenteActividad = async (
  idDocente: number,
  idActividadInstitucional: number
) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM docenteActividad WHERE idDocente = ? AND idActividadInstitucional = ?",
      [idDocente, idActividadInstitucional] // Array con ambos IDs
    );
    return results;
  } catch (err) {
    console.error("error al eliminar la relación: ", err);
    return { error: "No se pudo eliminar la relación" };
  }
};