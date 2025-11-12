// Se maneja en base a promesas
import { documento } from "../typesDocumento";
import { createPool } from "mysql2/promise";
import { documentoSchema } from "../schema/documentoSchema";

// Configuración de conexión
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

// Obtener todos los documentos
export const obtieneDocumentos = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM documento");
    return results;
  } catch (err) {
    console.error("Error al obtener los documentos:", err);
    return { error: "No se pueden obtener los documentos" };
  }
};

// Buscar documento por ID
export const encuentraDocumentoPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM documento WHERE idDocumento = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("Error al obtener el documento por ID:", err);
    return { error: "No se puede obtener el documento por ID" };
  }
};

// Agregar un nuevo documento
export const agregarDocumento = async (nuevo: documento) => {
  try {
    const validacion = documentoSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }

    const [results] = await conexion.query(
      `INSERT INTO documento 
        (idDocumento, idTipoDocumento, idDocente, idActividadInstitucional, idGrupo, 
         nombreArchivo, rutaArchivo, lugar, fecha, hora, validador)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nuevo.idDocumento,
        nuevo.idTipoDocumento,
        nuevo.idDocente,
        nuevo.idActividadInstitucional ?? null,
        nuevo.idGrupo ?? null,
        nuevo.nombreArchivo,
        nuevo.rutaArchivo,
        nuevo.lugar,
        nuevo.fecha ?? null,
        nuevo.hora ?? null,
        nuevo.validador,
      ]
    );

    return results;
  } catch (err) {
    console.error("Error al agregar el documento:", err);
    return { error: "No se pudo agregar el documento" };
  }
};

// Actualizar documento existente
export const actualizarDocumento = async (modificado: documento) => {
  try {
    const [results] = await conexion.query(
      `UPDATE documento 
         SET idTipoDocumento = ?, idDocente = ?, idActividadInstitucional = ?, idGrupo = ?, 
             nombreArchivo = ?, rutaArchivo = ?, lugar = ?, fecha = ?, hora = ?, validador = ?
       WHERE idDocumento = ?`,
      [
        modificado.idTipoDocumento,
        modificado.idDocente,
        modificado.idActividadInstitucional ?? null,
        modificado.idGrupo ?? null,
        modificado.nombreArchivo,
        modificado.rutaArchivo,
        modificado.lugar,
        modificado.fecha ?? null,
        modificado.hora ?? null,
        modificado.validador,
        modificado.idDocumento,
      ]
    );

    return results;
  } catch (err) {
    console.error("Error al actualizar el documento:", err);
    return { error: "No se pudo actualizar el documento" };
  }
};

// Eliminar documento
export const eliminarDocumento = async (idDocumento: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM documento WHERE idDocumento = ?",
      [idDocumento]
    );
    return results;
  } catch (err) {
    console.error("Error al eliminar el documento:", err);
    return { error: "No se pudo eliminar el documento" };
  }
};
