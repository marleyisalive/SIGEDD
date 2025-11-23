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
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM materia WHERE idMateria = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener la materia por id: ", err);
    return { error: "No se puede obtener la materia por id" };
  }
};

export const agregarMateria = async (nuevo: materia) => {
  const [results] = await conexion.query(
    "INSERT INTO materia (idMateria, nombre, idDepartamento, creditos) VALUES (?, ?, ?, ?)",
    [nuevo.idMateria, nuevo.nombre, nuevo.idDepartamento, nuevo.creditos]
  );
  return results;
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

export const eliminarMateria = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM materia WHERE idMateria = ?",
      id
    );
    return results;
  } catch (err) {
    throw err;
  }
};
