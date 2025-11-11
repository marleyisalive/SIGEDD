// se maneja en base a promesas
import { rol } from "../typesRol";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneRol = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM rol");
    return results;
  } catch (err) {
    console.error("error al obtener los rol: ", err);
    return { error: "No se puede obtener los roles" };
  }
};

export const encuentraRolPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM rol WHERE idRol = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el rol por id: ", err);
    return { error: "No se puede obtener el rol por id" };
  }
};

export const agregarRol = async (nuevo: rol) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO rol (idRol, descripcion) VALUES (?, ?)",
      [nuevo.idRol, nuevo.descripcion]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el rol: ", err);
    return { error: "No se pudo agregar el rol" };
  }
};

export const actualizarRol = async (modificado: rol) => {
  try {
    const [results] = await conexion.query(
      "UPDATE rol SET descripcion = ? WHERE idRol = ?",
      [modificado.descripcion, modificado.idRol]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el rol: ", err);
    return { error: "No se pudo actualizar el rol" };
  }
};

export const eliminarRol = async (idRol: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM rol WHERE idRol = ?",
      [idRol]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el rol: ", err);
    return { error: "No se pudo eliminar el rol" };
  }
};
