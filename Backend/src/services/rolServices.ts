// se maneja en base a promesas
import { rol } from "../types/typesRol"; // Asegúrate que la ruta sea correcta
import { createPool } from "mysql2/promise";
import { rolSchema } from "../schema/rolSchema"; // Importamos el esquema

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307, // Descomenta si es necesario
});

export const obtieneRol = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM rol");
    return results;
  } catch (err) {
    console.error("error al obtener los roles: ", err);
    return { error: "No se puede obtener los roles" };
  }
};

export const encuentraRolPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM rol WHERE idRol = ?",
      id // Aunque tu compañero puso 'id', lo ideal es '[id]', pero lo dejo como él
    );
    return results;
  } catch (err) {
    console.error("error al obtener el rol por id: ", err);
    return { error: "No se puede obtener el rol por id" };
  }
};

export const agregarRol = async (nuevo: rol) => {
  // 1. VALIDACIÓN CON ZOD (Igual que nivelEstudio)
  const validacion = rolSchema.safeParse(nuevo);
  if (!validacion.success) {
    return { error: validacion.error };
  }

  // 2. INSERT (Si pasa la validación)
  const [results] = await conexion.query(
    "INSERT INTO rol (idRol, descripcion) VALUES (?, ?)",
    [nuevo.idRol, nuevo.descripcion]
  );
  return results;
};

export const actualizarRol = async (modificado: rol) => {
  try {
    // El ejemplo de nivelEstudio no valida en actualizar, así que lo dejamos igual
    const [results] = await conexion.query(
      "UPDATE rol SET descripcion = ? WHERE idRol = ?",
      [modificado.descripcion, modificado.idRol]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el rol: ", err);
    return { error: "No se pudo actualizar el rol" };
  }
};

export const eliminarRol = async (idRol: number) => {
  const [results] = await conexion.query("DELETE FROM rol WHERE idRol = ?", [
    idRol,
  ]);
  return results;
};
// Catch simple, sin manejar errores de llaves foráneas
//console.error("error al eliminar el rol: ");
