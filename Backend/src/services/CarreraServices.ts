// se maneja en base a promesas
import { Carrera } from "../typesCarrera";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneCarrera = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM Carrera");
    return results;
  } catch (err) {
    console.error("error al obtener las carreras: ", err);
    return { error: "No se puede obtener las carreras" };
  }
};

export const encuentraCarreraPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM Carrera WHERE idCarrera = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener la carrera por id: ", err);
    return { error: "No se puede obtener la carrera por id" };
  }
};

export const agregarCarrera = async (nuevo: Carrera) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO Carrera (idCarrera, nombreCarrera, acreditada, nivel) VALUES (?, ?, ?, ?)",
      [nuevo.idCarrera, nuevo.nombreCarrera, nuevo.acreditada, nuevo.nivel]
    );
    return results;
  } catch (err) {
    console.error("error al agregar la carrera: ", err);
    return { error: "No se pudo agregar la carrera" };
  }
};

export const actualizarCarrera = async (modificado: Carrera) => {
  try {
    const [results] = await conexion.query(
      "UPDATE Carrera SET nombreCarrera = ?, acreditada = ?, nivel = ? WHERE idCarrera = ?",
      [modificado.nombreCarrera, modificado.acreditada, modificado.nivel, modificado.idCarrera]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar la carrera: ", err);
    return { error: "No se pudo actualizar la carrera" };
  }
};

export const eliminarCarrera = async (idCarrera: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM Carrera WHERE idCarrera = ?",
      [idCarrera]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar la carrera: ", err);
    return { error: "No se pudo eliminar la carrera" };
  }
};
