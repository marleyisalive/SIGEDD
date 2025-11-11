// se maneja en base a promesas
import { Aula } from "../typesAula";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneAula = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM Aula");
    return results;
  } catch (err) {
    console.error("error al obtener las aulas: ", err);
    return { error: "No se pueden obtener las aulas" };
  }
};

export const encuentraAulaPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM Aula WHERE idAula = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el aula por id: ", err);
    return { error: "No se puede obtener el aula por id" };
  }
};

export const agregarAula = async (nuevo: Aula) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO Aula (idAula, nombre) VALUES (?, ?)",
      [nuevo.idAula, nuevo.nombre]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el aula: ", err);
    return { error: "No se pudo agregar el aula" };
  }
};

export const actualizarAula = async (modificado: Aula) => {
  try {
    const [results] = await conexion.query(
      "UPDATE Aula SET nombre = ? WHERE idAula = ?",
      [modificado.nombre, modificado.idAula]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el aula: ", err);
    return { error: "No se pudo actualizar el aula" };
  }
};

export const eliminarAula = async (idAula: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM Aula WHERE idAula = ?",
      [idAula]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el aula: ", err);
    return { error: "No se pudo eliminar el aula" };
  }
};
