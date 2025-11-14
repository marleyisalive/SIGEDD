import { TipoActividad } from "../typesTipoActividad";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneTipoActividad = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM TipoActividad");
    return results;
  } catch (err) {
    console.error("error al obtener el tipo de actividad: ", err);
    return { error: "No se puede obtener el tipo de actividad" };
  }
};

export const encuentraTipoActividadPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM TipoActividad WHERE idTipoActividad = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el tipo de actividad por id: ", err);
    return { error: "No se puede obtener el tipo de actividad por id" };
  }
};

export const agregarTipoActividad = async (nuevo: TipoActividad) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO TipoActividad (idTipoActividad, nombre, descripcion) VALUES (?, ?, ?)",
      [nuevo.idTipoActividad, nuevo.nombre, nuevo.descripcion]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el tipo de actividad: ", err);
    return { error: "No se pudo agregar el tipo de actividad" };
  }
};

export const actualizarTipoActividad = async (modificado: TipoActividad) => {
  try {
    const [results] = await conexion.query(
      "UPDATE TipoActividad SET nombre = ?, descripcion = ? WHERE IdTipoActividad = ?",
      [modificado.nombre, modificado.descripcion, modificado.idTipoActividad]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el tipo de actividad: ", err);
    return { error: "No se pudo actualizar el tipo de actividad" };
  }
};

export const eliminarTipoActividad = async (IdTipoActividad: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM TipoActividad WHERE idTipoActividad= ?",
      [IdTipoActividad]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el tipo de actividad: ", err);
    return { error: "No se pudo eliminar el tipo de actividad" };
  }
};
