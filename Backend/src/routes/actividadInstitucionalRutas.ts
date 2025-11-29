// src/routes/actividadInstitucionalRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio (usando un alias más corto para facilitar la lectura)
import * as actividadServices from "../services/actividadInstitucionalServices";

const router = express.Router();

// --- OBTENER TODAS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
  try {
    let actividades = await actividadServices.obtenerTodasActividades();
    res.send(actividades);
  } catch (err) {
    console.error("error al obtener actividades: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let actividad = await actividadServices.encontrarActividadPorId(
      Number(req.params.id)
    );
    res.send(actividad);
  } catch (err) {
    console.error("error al obtener actividad por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) - SINTAXIS LIMPIA ---
router.post("/", async (req: Request, res: Response) => {
  try {
    // Pasamos el body directo.
    // El servicio validará con Zod que las fechas vengan en formato "YYYY-MM-DD"
    const nueva = await actividadServices.agregarActividad(req.body);
    res.send(nueva);
  } catch (err: any) {
    console.error("error al agregar actividad: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID de la actividad institucional ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res
        .status(400)
        .send({ error: "No se pudo agregar la actividad institucional" });
    }
  }
});

// --- ACTUALIZAR (PUT) - SINTAXIS LIMPIA ---
router.put("/", async (req: Request, res: Response) => {
  try {
    const modificada = await actividadServices.actualizarActividad(req.body);
    res.send(modificada);
  } catch (err) {
    console.error("error al actualizar actividad", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idActividadInstitucional } = req.body;
    const eliminada = await actividadServices.eliminarActividad(
      idActividadInstitucional
    );
    res.send(eliminada);
  } catch (err: any) {
    console.error("error al eliminar actividad", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar esta actividad institucional porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res
        .status(400)
        .send({ error: "No se pudo eliminar la actividad institucional" });
    }
  }
});

export default router;
