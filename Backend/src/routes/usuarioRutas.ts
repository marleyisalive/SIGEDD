// src/routes/usuarioRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio de usuarios
import * as usuarioServices from "../services/usuarioServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
// http://localhost:3001/api/usuarios/
router.get("/", async (_req: Request, res: Response) => {
  try {
    let usuarios = await usuarioServices.obtieneUsuario();
    res.send(usuarios);
  } catch (err) {
    console.error("error al obtener usuarios: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// http://localhost:3001/api/usuarios/docentes/listado
router.get("/docente/listado", async (_req: Request, res: Response) => {
  try {
    // Llamamos a la nueva función del servicio
    const docentes = await usuarioServices.obtenerListaDocentes();
    res.send(docentes);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Error al obtener docentes" });
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
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    } = req.body;

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
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    } = req.body;

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

// --- ELIMINAR (DELETE) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idUsuario } = req.body;
    const eliminado = await usuarioServices.eliminarUsuario(idUsuario);
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar usuario", err);
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el usuario porque tiene registros asociados.",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el usuario" });
    }
  }
});

export default router;