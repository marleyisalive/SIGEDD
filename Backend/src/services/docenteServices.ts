// Importaciones necesarias
import { Docente, NuevoDocente } from "../types/typesDocente"; // Asegúrate de que la ruta sea correcta
import { createPool } from "mysql2/promise";
//import { crearDocenteSchema, actualizarDocenteSchema } from "../schemas/docenteSchema"; // Asumiendo que esta es la ruta

// Configuración de la conexión a la base de datos (puedes mover esto a un archivo de configuración separado)
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  waitForConnections: true, // Esperar si todas las conexiones están en uso
  connectionLimit: 10, // Número máximo de conexiones en el pool
  queueLimit: 0, // Número ilimitado de peticiones en cola
});

/**
 * Obtiene todos los docentes de la base de datos.
 * @returns Un array de objetos Docente o un objeto de error.
 */
export const obtenerTodosLosDocentes = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM docente");
    return results;
  } catch (err) {
    console.error("Error al obtener todos los docentes:", err);
    return { error: "No se pudieron obtener los docentes." };
  }
};

/**
 * Encuentra un docente por su ID.
 * @param idDocente El ID del docente a buscar.
 * @returns El objeto Docente encontrado o un objeto de error.
 */
export const encontrarDocentePorId = async (idDocente: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM docente WHERE idDocente = ?",
      [idDocente]
    );
    return results;
  } catch (err) {
    console.error(`Error al obtener el docente con ID ${idDocente}:`, err);
    return { error: `No se pudo obtener el docente con ID ${idDocente}.` };
  }
};

/**
 * Agrega un nuevo docente a la base de datos.
 * @param nuevoDocente Los datos del nuevo docente.
 * @returns El resultado de la inserción o un objeto de error.
 */
export const agregarDocente = async (nuevoDocente: NuevoDocente) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO docente (idUsuario, filiacion, idNivelEstudio, idDepartamento, idPlaza, estatusExclusividad, folioEdd) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nuevoDocente.idUsuario,
        nuevoDocente.filiacion,
        nuevoDocente.idNivelEstudio,
        nuevoDocente.idDepartamento,
        nuevoDocente.idPlaza,
        nuevoDocente.estatusExclusividad,
        nuevoDocente.folioEdd,
      ]
    );
    return results; // Retorna el objeto de resultados de la inserción
  } catch (err) {
    console.error("Error al agregar el docente:", err);
    return { error: "No se pudo agregar el docente." };
  }
};

export const actualizarDocente = async (modificado: Docente) => {
  try {
    const [results] = await conexion.query(
      "UPDATE documento SET idDocente = ?, idUsuario = ?, filiacion = ?, idNivelEstudio = ?, idDepartamento = ?, idPlaza = ?, estatusExclusividad = ?, folioEdd = ? WHERE idDocente = ?",
      [
        modificado.idDocente,
        modificado.idUsuario,
        modificado.filiacion,
        modificado.idNivelEstudio,
        modificado.idDepartamento,
        modificado.idPlaza,
        modificado.estatusExclusividad,
        modificado.folioEdd
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el docente: ", err);
    return { error: "No se pudo actualizar el docente" };
  }
};

export const eliminarDocente = async (idDocente: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM docente WHERE idDocente = ?",
      [idDocente]
    );
    return results; // Retorna el objeto de resultados de la eliminación
  } catch (err) {
    console.error(`Error al eliminar el docente con ID ${idDocente}:`, err);
    return { error: `No se pudo eliminar el docente con ID ${idDocente}.` };
  }
};
