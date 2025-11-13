// se maneja en base a promesas
import { documento } from "../typesDocumento";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneDocumento = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM documento");
    return results;
  } catch (err) {
    console.error("error al obtener los documentos: ", err);
    return { error: "No se puede obtener los documentos" };
  }
};

export const encuentraDocumentoPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM documento WHERE idDocumento = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el documento por id: ", err);
    return { error: "No se puede obtener el documento por id" };
  }
};

export const agregarDocumento = async (nuevo: documento) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO documento (idDocumento, idTipoDocumento, idDocente, idActividadInstitucional, idGrupo, nombreArchivo, rutaArchivo, lugar, fecha, hora, validador)VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [nuevo.idDocumento,
        nuevo.idTipoDocumento,
        nuevo.idDocente,
        nuevo.idActividadInstitucional ?? null,
        nuevo.idGrupo ?? null,
        nuevo.nombreArchivo,
        nuevo.rutaArchivo,
        nuevo.lugar,
        nuevo.fecha ?? null,
        nuevo.hora ?? null,
        nuevo.validador,]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el documento: ", err);
    return { error: "No se pudo agregar el documento" };
  }
};

export const actualizarDocumento = async (modificado: documento) => {
  try {
    const [results] = await conexion.query(
      "UPDATE documento SET idTipoDocumento = ?, idDocente = ?, idActividadInstitucional = ?, idGrupo = ?, nombreArchivo = ?, rutaArchivo = ?, lugar = ?, fecha = ?, hora = ?, validador = ? WHERE idDocumento = ?",
      [modificado.idTipoDocumento,
        modificado.idDocente,
        modificado.idActividadInstitucional ?? null,
        modificado.idGrupo ?? null,
        modificado.nombreArchivo,
        modificado.rutaArchivo,
        modificado.lugar,
        modificado.fecha ?? null,
        modificado.hora ?? null,
        modificado.validador,
        modificado.idDocumento,]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el documento: ", err);
    return { error: "No se pudo actualizar el documento" };
  }
};

export const eliminarDocumento = async (idDocumento: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM documento WHERE documento = ?",
      [idDocumento]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el documento: ", err);
    return { error: "No se pudo eliminar el documento" };
  }
};
