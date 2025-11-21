// se maneja en base a promesas
import { actividadInstitucional } from "../types/typesActividadInstitucional";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneActividadInstitucional = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM actividadInstitucional");
    return results;
  } catch (err) {
    console.error("error al obtener la actividad institucional: ", err);
    return { error: "No se puede obtener la actividad institucional" };
  }
};

export const encuentraActividadInstitucionalPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM actividadInstitucional WHERE idActividadInstitucional = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener la actividad por id: ", err);
    return { error: "No se puede obtener la actividad por id" };
  }
};

export const agregarActividadInstitucional = async (nuevo: actividadInstitucional) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO actividadInstitucional (idActividadInstitucional, idTipoDocumento, nombre, descricion, periodo, fechaInicio, fechaFin) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nuevo.idActividadInstitucional, nuevo.idTipoDocumento,nuevo.nombre, nuevo.descripcion,nuevo.periodo,nuevo.fechaInicio,nuevo.fechaFin]
    );
    return results;
  } catch (err) {
    console.error("error al agregar actividad: ", err);
    return { error: "No se pudo agregar la actividad" };
  }
};

export const actualizarActividadInstitucional = async (modificado: actividadInstitucional) => {
  try {
    const [results] = await conexion.query(
      "UPDATE actividadInstitucional SET idTipoDocumento = ?, nombre = ?, descripcion = ?, periodo = ?, fechaInicio = ?, fechaFin = ? WHERE idActividadInstitucional = ?",
      [modificado.idTipoDocumento,modificado.nombre, modificado.descripcion,modificado.periodo,modificado.fechaInicio,modificado.fechaFin, modificado.idActividadInstitucional]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar la actividad: ", err);
    return { error: "No se pudo actualizar la actividad" };
  }
};

export const eliminarActividadInstitucional = async (idActividadInstitucional: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM actividadInstitucional WHERE idActividadInstitucional = ?",
      [idActividadInstitucional]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar la actividad: ", err);
    return { error: "No se pudo eliminar la actividad" };
  }
};
