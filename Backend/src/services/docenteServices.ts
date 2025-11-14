// services/docenteService.ts

import { Docente } from "../typesDocente"; // Solo importamos Docente
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307, // Deja esta línea si has cambiado el puerto
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export const obtenerTodosLosDocentes = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM docente");
    return results; // Retorna 'results' directo
  } catch (err: any) {
    console.error("error al obtener los docentes: ", err);
    return { error: "No se pudieron obtener los docentes." };
  }
};

export const encontrarDocentePorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM docente WHERE idDocente = ?",
      [id]
    );
    return results; // Retorna 'results' directo, como el de tu compañero
  } catch (err: any) {
    console.error("error al obtener el docente por id: ", err);
    return { error: "No se pudo obtener el docente por id." };
  }
};

export const agregarDocente = async (nuevo: Docente) => { // 'nuevo' es de tipo Docente
  try {
    const [results] = await conexion.query(
      "INSERT INTO docente (idDocente, idUsuario, rfc, idNivelEstudio, idDepartamento, idPlaza, estatusExclusividad, folioEdd) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        nuevo.idDocente,
        nuevo.idUsuario,
        nuevo.rfc,
        nuevo.idNivelEstudio,
        nuevo.idDepartamento,
        nuevo.idPlaza,
        nuevo.estatusExclusividad,
        nuevo.folioEdd,
      ]
    );
    return results;
  } catch (err: any) {
    console.error("error al agregar el docente: ", err);
    return { error: "No se pudo agregar el docente." }; // Error genérico
  }
};

export const actualizarDocente = async (modificado: Docente) => { // 'modificado' es de tipo Docente
  try {
    const [results] = await conexion.query(
      "UPDATE docente SET idUsuario = ?, rfc = ?, idNivelEstudio = ?, idDepartamento = ?, idPlaza = ?, estatusExclusividad = ?, folioEdd = ? WHERE idDocente = ?",
      [
        modificado.idUsuario,
        modificado.rfc,
        modificado.idNivelEstudio,
        modificado.idDepartamento,
        modificado.idPlaza,
        modificado.estatusExclusividad,
        modificado.folioEdd,
        modificado.idDocente, // idDocente para el WHERE
      ]
    );
    return results;
  } catch (err: any) {
    console.error("error al actualizar el docente: ", err);
    return { error: "No se pudo actualizar el docente." }; // Error genérico
  }
};

export const eliminarDocente = async (idDocente: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM docente WHERE idDocente = ?",
      [idDocente]
    );
    return results;
  } catch (err: any) {
    console.error("error al eliminar el docente: ", err);
    return { error: "No se pudo eliminar el docente." }; // Error genérico
  }
};