// se maneja en base a promesas
import { nivelEstudio } from "../types/typesNivelEstudio";
import { createPool } from "mysql2/promise";
import { nivelEstudioSchema } from "../schema/nivelEstudioSchema";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneNivelEstudio = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM nivelEstudio");
    return results;
  } catch (err) {
    console.error("error al obtener los niveles de estudio: ", err);
    return { error: "No se puede obtener los niveles de estudio" };
  }
};

export const encuentraNivelEstudioPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM nivelEstudio WHERE idNivelEstudio = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el nivel de estudio por id: ", err);
    return { error: "No se puede obtener el nivel de estudio por id" };
  }
};

export const agregarNivelEstudio = async (nuevo: nivelEstudio) => {
  try {
    const validacion = nivelEstudioSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }
    const [results] = await conexion.query(
      "INSERT INTO nivelEstudio (idNivelEstudio, nombre) VALUES (?, ?)",
      [nuevo.idNivelEstudio, nuevo.nombre]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el nivel de estudio: ", err);
    return { error: "No se pudo agregar el nivel de estudio" };
  }
};

export const actualizarNivelEstudio = async (modificado: nivelEstudio) => {
  try {
    const [results] = await conexion.query(
      "UPDATE nivelEstudio SET nombre = ? WHERE idNivelEstudio = ?",
      [modificado.nombre, modificado.idNivelEstudio]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el nivel de estudio: ", err);
    return { error: "No se pudo actualizar el nivel de estudio" };
  }
};

export const eliminarNivelEstudio = async (idNivelEstudio: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM nivelEstudio WHERE idNivelEstudio = ?",
      [idNivelEstudio]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el nivel de estudio: ", err);
    return { error: "No se pudo eliminar el nivel de estudio" };
  }
};
