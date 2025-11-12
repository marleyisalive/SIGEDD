// Se maneja en base a promesas
import { tipoDocumento } from "../typesTipoDocumento";
import { createPool } from "mysql2/promise";
import { tipoDocumentoSchema } from "../schema/tipoDocumentoSchema";

// Configuración de conexión a la base de datos
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

// =====================================================
// Obtener todos los tipos de documento
// =====================================================
export const obtieneTipoDocumento = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM tipoDocumento");
    return results;
  } catch (err) {
    console.error("Error al obtener los tipos de documento: ", err);
    return { error: "No se pueden obtener los tipos de documento" };
  }
};

// =====================================================
// Buscar un tipo de documento por ID
// =====================================================
export const encuentraTipoDocumentoPorId = async (id: number) => {
  try {
    // El segundo parámetro debe ser un array con los valores
    const [results] = await conexion.query(
      "SELECT * FROM tipoDocumento WHERE idTipoDocumento = ?",
      [id]
    );
    return results;
  } catch (err) {
    console.error("Error al obtener el tipo de documento por ID: ", err);
    return { error: "No se puede obtener el tipo de documento por ID" };
  }
};

// =====================================================
// Agregar un nuevo tipo de documento
// =====================================================
export const agregarTipoDocumento = async (nuevo: tipoDocumento) => {
  try {
    const validacion = tipoDocumentoSchema.safeParse(nuevo);
    if (!validacion.success) {
      return { error: validacion.error };
    }

    const [results] = await conexion.query(
      "INSERT INTO tipoDocumento (idTipoDocumento, nombre, descripcion) VALUES (?, ?, ?)",
      [nuevo.idTipoDocumento, nuevo.nombre, nuevo.descripcion]
    );

    return results;
  } catch (err) {
    console.error("Error al agregar el tipo de documento: ", err);
    return { error: "No se pudo agregar el tipo de documento" };
  }
};

// =====================================================
// Actualizar un tipo de documento existente
// =====================================================
export const actualizarTipoDocumento = async (modificado: tipoDocumento) => {
  try {
    const [results] = await conexion.query(
      "UPDATE tipoDocumento SET nombre = ?, descripcion = ? WHERE idTipoDocumento = ?",
      [modificado.nombre, modificado.descripcion, modificado.idTipoDocumento]
    );
    return results;
  } catch (err) {
    console.error("Error al actualizar el tipo de documento: ", err);
    return { error: "No se pudo actualizar el tipo de documento" };
  }
};

// =====================================================
// Eliminar un tipo de documento
// =====================================================
export const eliminarTipoDocumento = async (idTipoDocumento: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM tipoDocumento WHERE idTipoDocumento = ?",
      [idTipoDocumento]
    );
    return results;
  } catch (err) {
    console.error("Error al eliminar el tipo de documento: ", err);
    return { error: "No se pudo eliminar el tipo de documento" };
  }
};