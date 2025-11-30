// src/routes/documentoRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio (usando un alias más corto)
import * as documentoServices from "../services/documentoServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
  try {
    let documentos = await documentoServices.obtenerTodosDocumentos();
    res.send(documentos);
  } catch (err) {
    console.error("error al obtener documentos: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER DOCUMENTOS POR USUARIO (GET) ---
router.get("/usuario/:idUsuario", async (req: Request, res: Response) => {
  try {
    let documentos = await documentoServices.obtenerDocumentosPorUsuario(
      Number(req.params.idUsuario)
    );
    res.send(documentos);
  } catch (err) {
    console.error("error al obtener documentos por usuario: ", err);
    res.status(400).send({ error: "Error al buscar documentos del usuario." });
  }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let documento = await documentoServices.encontrarDocumentoPorId(
      Number(req.params.id)
    );
    res.send(documento);
  } catch (err) {
    console.error("error al obtener documento por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) - SINTAXIS LIMPIA ---
router.post("/", async (req: Request, res: Response) => {
  try {
    // Pasamos el body directo.
    // El servicio validará con Zod (URL max 500 chars).
    // Si no vienen fechaGeneracion o version, MySQL usará los DEFAULTs.
    const nuevo = await documentoServices.agregarDocumento(req.body);
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar documento: ", err);
    res.status(400).send({ error: "No se pudo agregar." });
  }
});

// --- ACTUALIZAR (PUT) - SINTAXIS LIMPIA ---
router.put("/", async (req: Request, res: Response) => {
  try {
    const modificado = await documentoServices.actualizarDocumento(req.body);
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar documento", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idDocumento } = req.body;
    const eliminado = await documentoServices.eliminarDocumento(idDocumento);
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar documento", err);
    res.status(400).send({ error: "No se pudo eliminar." });
  }
});

export default router;
