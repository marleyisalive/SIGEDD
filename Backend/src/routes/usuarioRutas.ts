// src/routes/usuarioRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio de usuarios
import * as usuarioServices from "../services/usuarioServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
// http://localhost:3001/api/usuarios/
router.get("/", async (_req: Request, res: Response) => {
  try {
    // El servicio ya se encarga de NO devolver las contraseñas
    let usuarios = await usuarioServices.obtieneUsuario();
    res.send(usuarios);
  } catch (err) {
    console.error("error al obtener usuarios: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER POR ID (GET) ---
// http://localhost:3001/api/usuarios/1201
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let usuario = await usuarioServices.encuentraUsuarioPorId(
      Number(req.params.id)
    );
    res.send(usuario);
  } catch (err) {
    console.error("error al obtener usuario por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) ---
// http://localhost:3001/api/usuarios/
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos TODOS los campos necesarios del body.
    // ¡IMPORTANTE! Aquí 'contrasenaUsuario' viene en texto plano desde el cliente.
    const {
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario, // <-- Texto plano
      estatus,
      idRol,
    } = req.body;

    // Pasamos los datos al servicio. Él validará con Zod y hasheará la contraseña.
    const nuevo = await usuarioServices.agregarUsuario({
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar usuario: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error: "El ID del usuario ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar el usuario" });
    }
  }
});

// --- ACTUALIZAR (PUT) ---
// http://localhost:3001/api/usuarios/
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario, // <-- Texto plano (nueva contraseña o la misma)
      estatus,
      idRol,
    } = req.body;

    // El servicio re-hasheará la contraseña recibida antes de actualizar.
    const modificado = await usuarioServices.actualizarUsuario({
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar usuario", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
// http://localhost:3001/api/usuarios/
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idUsuario } = req.body;
    const eliminado = await usuarioServices.eliminarUsuario(idUsuario);
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar usuario", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el usuario porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el usuario" });
    }
  }
});

export default router;
