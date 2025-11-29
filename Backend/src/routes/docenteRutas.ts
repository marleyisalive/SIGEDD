// src/routes/docenteRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio de docentes
import * as docenteServices from "../services/docenteServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
  try {
    let docentes = await docenteServices.obtenerTodosDocentes();
    res.send(docentes);
  } catch (err) {
    console.error("error al obtener docentes: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let docente = await docenteServices.encontrarDocentePorId(
      Number(req.params.id)
    );
    res.send(docente);
  } catch (err) {
    console.error("error al obtener docente por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) ---
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos TODOS los campos necesarios del body, incluyendo los opcionales.
    const {
      idDocente,
      idUsuario,
      filiacion,
      idNivelEstudio,
      idDepartamento,
      idPlaza,
      estatusExclusividad,
      folioEdd,
    } = req.body;

    // Pasamos los datos al servicio (que validará con Zod).
    const nuevo = await docenteServices.agregarDocente({
      idDocente,
      idUsuario,
      filiacion,
      idNivelEstudio,
      idDepartamento,
      idPlaza,
      estatusExclusividad,
      folioEdd,
    });
    return res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar docente: ", err);
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      return res.status(400).json({
        error: "El ID del docente ya existe. Por favor, utiliza otro ID.",
      });
    }
    return res.status(400).send({ error: "No se pudo agregar." });
  }
});

// --- ACTUALIZAR (PUT) ---
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idDocente,
      idUsuario,
      filiacion,
      idNivelEstudio,
      idDepartamento,
      idPlaza,
      estatusExclusividad,
      folioEdd,
    } = req.body;

    const modificado = await docenteServices.actualizarDocente({
      idDocente,
      idUsuario,
      filiacion,
      idNivelEstudio,
      idDepartamento,
      idPlaza,
      estatusExclusividad,
      folioEdd,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar docente", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idDocente } = req.body;
    const eliminado = await docenteServices.eliminarDocente(idDocente);
    return res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar docente", err);
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      return res.status(400).json({
        error:
          "No se puede eliminar el docente porque está siendo utilizado en otros registros.",
      });
    }
    return res.status(400).send({ error: "No se pudo eliminar." });
  }
});

export default router;
