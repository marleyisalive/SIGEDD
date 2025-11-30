// src/services/documentoServices.ts

// Importamos el tipo en minúscula
import { documento } from "../types/typesDocumento";
import { createPool } from "mysql2/promise";
// Importamos el esquema para validar
import { documentoSchema } from "../schema/documentoSchema";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// --- Obtener todos ---
export const obtenerTodosDocumentos = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM documento");
    return results;
  } catch (err) {
    console.error("error al obtener documentos: ", err);
    return { error: "No se pudieron obtener los documentos." };
  }
};

// --- Encontrar por ID ---
export const encontrarDocumentoPorId = async (id: number) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM documento WHERE idDocumento = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("error al obtener documento por id: ", err);
    return { error: "No se pudo obtener el documento por id." };
  }
};

// --- Agregar nuevo (SINTAXIS LIMPIA) ---
export const agregarDocumento = async (nuevo: documento) => {
  try {
    // 1. Validar con Zod (checa URL max 500 chars)
    const validacion = documentoSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }

    // 2. Insertar
    // Si 'nuevo' no trae fechaGeneracion o version, MySQL usa los DEFAULTs.
    const [results] = await conexion.query("INSERT INTO documento SET ?", [
      nuevo,
    ]);
    return results;
  } catch (err) {
    console.error("error al agregar documento: ", err);
    // Error común: no existe el idDocenteActividad
    return {
      error:
        "No se pudo agregar el documento. Verifique el ID de la Actividad Docente.",
    };
  }
};

// --- Actualizar existente (SINTAXIS LIMPIA) ---
export const actualizarDocumento = async (modificado: documento) => {
  try {
    // Separamos el ID de los datos a actualizar
    const { idDocumento, ...datosAActualizar } = modificado;

    const [results] = await conexion.query(
      "UPDATE documento SET ? WHERE idDocumento = ?",
      [datosAActualizar, idDocumento]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar documento: ", err);
    return { error: "No se pudo actualizar el documento." };
  }
};

// --- Eliminar ---
export const eliminarDocumento = async (idDocumento: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM documento WHERE idDocumento = ?",
      [idDocumento]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar documento: ", err);
    return { error: "No se pudo eliminar el documento." };
  }
};

// --- Obtener documentos de un docente por idUsuario ---
export const obtenerDocumentosPorUsuario = async (idUsuario: number) => {
  try {
    const query = `
            SELECT 
                d.idDocumento,
                d.urlArchivo,
                d.fechaGeneracion,
                d.version,
                da.idDocenteActividad,
                da.datosCapturados,
                da.fechaRegistro,
                da.validadoPor,
                da.fechaValidacion,
                ai.nombreActividad,
                td.nombreTipoDocumento,
                doc.idDocente,
                CONCAT(u.nombreUsuario, ' ', IFNULL(u.apePatUsuario, ''), ' ', IFNULL(u.apeMatUsuario, '')) as nombreDocente,
                CASE 
                    WHEN da.validadoPor IS NOT NULL THEN 'Validado'
                    ELSE 'Pendiente'
                END as estatus
            FROM documento d
            INNER JOIN docenteactividad da ON d.idDocenteActividad = da.idDocenteActividad
            INNER JOIN docente doc ON da.idDocente = doc.idDocente
            INNER JOIN usuario u ON doc.idUsuario = u.idUsuario
            INNER JOIN actividadinstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
            INNER JOIN tipodocumento td ON ai.idTipoDocumento = td.idTipoDocumento
            WHERE u.idUsuario = ?
            ORDER BY d.fechaGeneracion DESC
        `;

    const [results] = await conexion.query(query, [idUsuario]);
    return results;
  } catch (err) {
    console.error("error al obtener documentos por usuario: ", err);
    return { error: "No se pudieron obtener los documentos del docente." };
  }
};
