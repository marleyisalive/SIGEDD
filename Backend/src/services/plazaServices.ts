// se maneja en base a promesas
import { plaza } from "../typesPlaza";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneRol = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM plaza");
    return results;
  } catch (err) {
    console.error("error al obtener los plaza: ", err);
    return { error: "No se puede obtener los plaza" };
  }
};

export const encuentraPlazaPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM plaza WHERE idPlaza = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el plaza por id: ", err);
    return { error: "No se puede obtener el plaza por id" };
  }
};

export const agregarPlaza = async (nuevo: plaza) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO plaza (idPlaza, descripcion) VALUES (?, ?)",
      [nuevo.idPlaza, nuevo.descripcion]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el plaza: ", err);
    return { error: "No se pudo agregar el plaza" };
  }
};

export const actualizarPlaza = async (modificado: plaza) => {
  try {
    const [results] = await conexion.query(
      "UPDATE plaza SET descripcion = ? WHERE idPlaza = ?",
      [modificado.descripcion, modificado.idPlaza]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el plaza: ", err);
    return { error: "No se pudo actualizar el plaza" };
  }
};

export const eliminarPlaza = async (idPlaza: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM plaza WHERE idPlaza = ?",
      [idPlaza]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el plaza: ", err);
    return { error: "No se pudo eliminar el plaza" };
  }
};
