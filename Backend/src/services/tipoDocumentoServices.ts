// se maneja en base a promesas
import { tipoDocumento } from "../typesTipoDocumento";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneTipoDocumento = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM tipoDocumento");
    return results;
  } catch (err) {
    console.error("error al obtener tipo documento: ", err);
    return { error: "No se puede obtener tipo documento" };
  }
};

export const encuentraTipoDocumentoPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM tipoDocumento WHERE idTipoDocumento = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el tipo de documento por id: ", err);
    return { error: "No se puede obtener el tipo de documento por id" };
  }
};

export const agregarTipoDocumento = async (nuevo: tipoDocumento) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO tipoDocumento (idTipoDocumento, nombre, descripcion) VALUES (?, ?, ?)",
      [nuevo.idTipoDocumento, nuevo.nombre, nuevo.descripcion]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el tipo de documento: ", err);
    return { error: "No se pudo agregar el tipo de documento" };
  }
};

export const actualizarTipoDocumento = async (modificado: tipoDocumento) => {
  try {
    const [results] = await conexion.query(
      "UPDATE tipoDocumento SET nombre = ?, descripcion = ? WHERE idTipoDocumento = ?",
      [modificado.nombre, modificado.descripcion, modificado.idTipoDocumento]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el tipo de documento: ", err);
    return { error: "No se pudo actualizar el tipo de documento" };
  }
};

export const eliminarTipoDocumento = async (idTipoDocumento: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM tipoDocumento WHERE idTipoDocumento = ?",
      [idTipoDocumento]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el tipo documento: ", err);
    return { error: "No se pudo eliminar el tipo documento" };
  }
};
