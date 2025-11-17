import { materia } from "../types//typesMateria";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneMateria = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM materia");
    return results;
  } catch (err) {
    console.error("error al obtener las materias: ", err);
    return { error: "No se puede obtener las materias" };
  }
};

export const encuentraMateriaPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM materia WHERE idMateria = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener la materia por id: ", err);
    return { error: "No se puede obtener la materia por id" };
  }
};

export const agregarMateria = async (nuevo: materia) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO materia (idMateria, nombre, idDepartamento, creditos) VALUES (?, ?, ?, ?)",
      [nuevo.idMateria, nuevo.nombre, nuevo.idDepartamento, nuevo.creditos]
    );
    return results;
  } catch (err) {
    console.error("error al agregar la materia: ", err);
    return { error: "No se pudo agregar la materia" };
  }
};

export const actualizarMateria = async (modificado: materia) => {
  try {
    const [results] = await conexion.query(
      "UPDATE materia SET nombre = ?, idDepartamento = ?, creditos = ? WHERE idMateria = ?",
      [
        modificado.nombre,
        modificado.idDepartamento,
        modificado.creditos,
        modificado.idMateria,
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar la materia: ", err);
    return { error: "No se pudo actualizar la materia" };
  }
};

export const eliminarMateria = async (idMateria: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM materia WHERE idMateria = ?",
      [idMateria]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar la materia: ", err);
    return { error: "No se pudo eliminar la materia" };
  }
};
