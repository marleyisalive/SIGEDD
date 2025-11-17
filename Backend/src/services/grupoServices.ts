// se maneja en base a promesas
import { grupo } from "../types/typesGrupo";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneGrupo = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM grupo");
    return results;
  } catch (err) {
    console.error("error al obtener los grupos: ", err);
    return { error: "No se pueden obtener los grupos" };
  }
};

export const encuentraGrupoPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM grupo WHERE idGrupo = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el grupo por id: ", err);
    return { error: "No se puede obtener el grupo por id" };
  }
};

export const agregarGrupo = async (nuevo: grupo) => {
  try {
    const result = await conexion.query(
      "INSERT INTO grupo (idGrupo, idDocente, idMateria, idAula, periodo, horario, numeroAlumnos) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        nuevo.idGrupo,
        nuevo.idDocente,
        nuevo.idMateria,
        nuevo.idAula,
        nuevo.periodo,
        nuevo.horario,
        nuevo.numeroAlumnos,
      ]
    );
    return result;
  } catch (err) {
    console.error("error al agregar el grupo: ", err);
    return { error: "No se pudo agregar el grupo" };
  }
};

export const actualizarGrupo = async (modificado: grupo) => {
  try {
    const result = await conexion.query(
      "UPDATE grupo SET idDocente = ?, idMateria = ?, idAula = ?, periodo = ?, horario = ?, numeroAlumnos = ? WHERE idGrupo = ?",
      [
        modificado.idDocente,
        modificado.idMateria,
        modificado.idAula,
        modificado.periodo,
        modificado.horario,
        modificado.numeroAlumnos,
        modificado.idGrupo,
      ]
    );
    return result;
  } catch (err) {
    console.error("error al actualizar el grupo: ", err);
    return { error: "No se pudo actualizar el grupo" };
  }
};

export const eliminarGrupo = async (idGrupo: number) => {
  try {
    const result = await conexion.query("DELETE FROM grupo WHERE idGrupo = ?", [
      idGrupo,
    ]);
    return result;
  } catch (err) {
    console.error("No se puede eliminar el grupo", err);
    return { error: "No se pudo eliminar el grupo" };
  }
};
