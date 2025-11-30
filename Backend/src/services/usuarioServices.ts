// src/services/usuarioServices.ts

// Usamos el nombre en minúscula que acordamos
import { usuario } from "../types/typesUsuario";
import { createPool } from "mysql2/promise";
// Importamos bcrypt para la seguridad
import bcrypt from "bcrypt";
// ¡CORRECCIÓN IMPORTANTE! Importamos el esquema para validar
import { usuarioSchema } from "../schema/usuarioSchema";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  // port: 3307, // Descomenta si es necesario
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export const obtieneUsuario = async () => {
  try {
    // OJO: Es buena práctica NO devolver la contraseña en el SELECT
    const [results] = await conexion.query(
      "SELECT idUsuario, nombreUsuario, apePatUsuario, apeMatUsuario, telefono, correoUsuario, estatus, idRol FROM usuario"
    );
    return results;
  } catch (err) {
    console.error("error al obtener los usuarios: ", err);
    return { error: "No se pueden obtener los usuarios" };
  }
};

export const encuentraUsuarioPorCorreo = async (correo: string) => {
  try {
    // Aquí sí necesitamos la contraseña para la verificación de login
    const [results] = await conexion.query(
      "SELECT idUsuario, nombreUsuario, apePatUsuario, apeMatUsuario, telefono, correoUsuario, contrasenaUsuario, estatus, idRol FROM usuario WHERE correoUsuario = ?",
      [correo]
    );
    // results es un array; retornamos el primer elemento si existe
    const rows: any = results as any;
    if (rows.length === 0) return null;
    return rows[0];
  } catch (err) {
    console.error("error al obtener usuario por correo: ", err);
    return null;
  }
};

export const encuentraUsuarioPorId = async (id: number) => {
  try {
    // También excluimos la contraseña aquí
    const [results] = await conexion.query(
      "SELECT idUsuario, nombreUsuario, apePatUsuario, apeMatUsuario, telefono, correoUsuario, estatus, idRol FROM usuario WHERE idUsuario = ?",
      [id] // Array
    );
    return results;
  } catch (err) {
    console.error(`no se pudo obtener el usuario por id: ${id} `, err);
    return { error: "No se puede obtener el usuario por id" };
  }
};

// --- Agregar usuario (CON VALIDACIÓN ZOD Y HASH) ---
export const agregarUsuario = async (nuevo: usuario) => {
  // 1. ¡CORRECCIÓN! VALIDAR CON ZOD PRIMERO
  const validacion = usuarioSchema.safeParse(nuevo);
  if (!validacion.success) {
    // Si los datos están mal (ej. contraseña corta, email inválido), retornamos el error aquí.
    return { error: validacion.error };
  }

  // 2. SI PASA LA VALIDACIÓN, HASHEAMOS LA CONTRASEÑA
  const saltRounds = 10;
  // Hasheamos la contraseña que viene del objeto 'nuevo' ya validado
  const hashContrasena = await bcrypt.hash(nuevo.contrasenaUsuario, saltRounds);

  // 3. INSERTAR EN BD USANDO EL HASH
  const [results] = await conexion.query(
    "INSERT INTO usuario (idUsuario, nombreUsuario, apePatUsuario, apeMatUsuario, telefono, correoUsuario, contrasenaUsuario, estatus, idRol) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      nuevo.idUsuario,
      nuevo.nombreUsuario,
      nuevo.apePatUsuario,
      nuevo.apeMatUsuario,
      nuevo.telefono,
      nuevo.correoUsuario,
      hashContrasena,
      nuevo.estatus,
      nuevo.idRol,
    ]
  );
  return results;
};

// --- Actualizar usuario (CON HASH) ---
export const actualizarUsuario = async (modificado: usuario) => {
  try {
    // Nota: Siguiendo el patrón de tu compañero, no validamos con Zod en el update.

    // 1. HASHEAR LA CONTRASEÑA NUEVA ANTES DE ACTUALIZAR
    const saltRounds = 10;
    const hashContrasena = await bcrypt.hash(
      modificado.contrasenaUsuario,
      saltRounds
    );

    // 2. UPDATE USANDO EL HASH
    const [results] = await conexion.query(
      "UPDATE usuario SET nombreUsuario = ?, apePatUsuario = ?, apeMatUsuario = ?, telefono = ?, correoUsuario = ?, contrasenaUsuario = ?, estatus = ?, idRol = ? WHERE idUsuario = ?",
      [
        modificado.nombreUsuario,
        modificado.apePatUsuario,
        modificado.apeMatUsuario,
        modificado.telefono,
        modificado.correoUsuario,
        hashContrasena,
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
  const [results] = await conexion.query(
    "DELETE FROM usuario WHERE idUsuario = ?",
    [idUsuario] // Array
  );
  return results;
};

// En src/services/usuarioServices.ts

export const obtenerListaDocentes = async () => {
  try {
    const query = `
      SELECT 
        u.idUsuario, 
        u.nombreUsuario, 
        u.apePatUsuario, 
        u.apeMatUsuario,
        d.idDocente
      FROM usuario u
      JOIN docente d ON u.idUsuario = d.idUsuario
      WHERE u.idRol = 2
      ORDER BY u.apePatUsuario ASC
    `;
    const [rows] = await conexion.query(query);
    return rows;
  } catch (err) {
    console.error("Error obteniendo lista de docentes:", err);
    return []; // Retorna array vacío en caso de error
  }
};