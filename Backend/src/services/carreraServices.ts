// se maneja en base a promesas
import { carrera } from "../types/typesCarrera";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneCarrera = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM carrera");
    return results;
  } catch (err) {
    console.error("error al obtener las carreras: ", err);
    return { error: "No se pueden obtener las carreras" };
  }
};

export const encuentraCarreraPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM carrera WHERE idCarrera = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener la carrera por id: ", err);
    return { error: "No se puede obtener la carrera por id" };
  }
};

export const agregarCarrera = async (nuevo: carrera) => {
  const [results] = await conexion.query(
    "INSERT INTO carrera (idCarrera, nombre, acreditado) VALUES (?, ?, ?)",
    [nuevo.idCarrera, nuevo.nombre, nuevo.acreditado]
  );
  return results;
};

export const actualizarCarrera = async (modificado: carrera) => {
  try {
    const [results] = await conexion.query(
      "UPDATE carrera SET nombre = ?, acreditado = ? WHERE idCarrera = ?",
      [modificado.nombre, modificado.acreditado, modificado.idCarrera]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar la carrera: ", err);
    return { error: "No se pudo actualizar la carrera" };
  }
};

export const eliminarCarrera = async (idCarrera: number) => {
  const [results] = await conexion.query(
    "DELETE FROM carrera WHERE idCarrera = ?",
    [idCarrera]
  );
  return results;
};
