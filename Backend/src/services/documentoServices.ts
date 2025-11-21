// se maneja en base a promesas
import { documento } from "../types/typesDocumento";
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
      "INSERT INTO documento (idDocumento, idDocenteActividad, fechaGeneracion, urlArchivo, version ) VALUES (?, ?, ?, ?, ?)",
      [
        nuevo.idDocumento,
        nuevo.idDocenteActividad,
        nuevo.fechaGeneracion,
        nuevo.urlArchivo,
        nuevo.version
      ]
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
      "UPDATE documento SET idDocenteActividad = ?, fechaGeneracion = ?, urlArchivo = ?, version = ? WHERE idDocumento = ?",
      [
        modificado.idDocenteActividad,
        modificado.fechaGeneracion,
        modificado.urlArchivo,
        modificado.version,
        modificado.idDocumento
      ]
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
      "DELETE FROM documento WHERE idDocumento = ?",
      [idDocumento]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el documento: ", err);
    return { error: "No se pudo eliminar el documento" };
  }
};
