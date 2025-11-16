import { usuario } from "../types/typesUsuario";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneUsuario = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM usuario");
    return results;
  } catch (err) {
    console.error("error al obtener los usuarios: ", err);
    return { error: "No se pueden obtener los usuarios" };
  }
};

export const encuentraUsuarioPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM usuario WHERE idUsuario = ?",
      id
    );
    return results;
  } catch (err) {
    console.error(`no se pudo obtener el usuario por id: ${id} `, err);
    return { error: "No se puede obtener el usuario por id" };
  }
};

export const agregarUsuario = async (nuevo: usuario) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO usuario (idUsuario, nombreUsuario, apePatUsuario, apeMatUsuario, telefono, correoUsuario, contrasenaUsuario, estatus, idRol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nuevo.idUsuario,
        nuevo.nombreUsuario,
        nuevo.apePatUsuario,
        nuevo.apeMatUsuario,
        nuevo.telefono,
        nuevo.correoUsuario,
        nuevo.contrasenaUsuario,
        nuevo.estatus,
        nuevo.idRol,
      ]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el usuario: ", err);
    return { error: "No se pudo agregar el usuario" };
  }
};

export const actualizarUsuario = async (modificado: usuario) => {
  try {
    const [results] = await conexion.query(
      "UPDATE usuario SET nombreUsuario = ?, apePatUsuario = ?, apeMatUsuario = ?, telefono = ?, correoUsuario = ?, contrasenaUsuario = ?, estatus = ?, idRol = ? WHERE idUsuario = ?",
      [
        modificado.nombreUsuario,
        modificado.apePatUsuario,
        modificado.apeMatUsuario,
        modificado.telefono,
        modificado.correoUsuario,
        modificado.contrasenaUsuario,
        modificado.estatus,
        modificado.idRol,
        modificado.idUsuario,
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el usuario: ", err);
    return { error: "No se pudo actualizar el usuario" };
  }
};

export const eliminarUsuario = async (idUsuario: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM usuario WHERE idUsuario = ?",
      idUsuario
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el usuario: ", err);
    return { error: "No se pudo eliminar el usuario" };
  }
};
