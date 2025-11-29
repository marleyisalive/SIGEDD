// src/routes/aulaRoutes.ts

import express, { Request, Response } from "express";
import * as aulaServices from "../services/aulaServices";

const router = express.Router();

// GET ALL
router.get("/", async (_req: Request, res: Response) => {
  try {
    let aulas = await aulaServices.obtenerTodasAulas();
    res.send(aulas);
  } catch (err) {
    console.error("error al obtener aulas: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// GET BY ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let aula = await aulaServices.encontrarAulaPorId(Number(req.params.id));
    res.send(aula);
  } catch (err) {
    console.error("error al obtener aula por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// POST (Agregar)
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos y pasamos al servicio (que valida con Zod)
    // ¡OJO! El campo se llama 'nombre' en el body
    const { idAula, nombre } = req.body; // <-- CORREGIDO
    const nueva = await aulaServices.agregarAula({ idAula, nombre }); // <-- CORREGIDO
    res.send(nueva);
  } catch (err: any) {
    console.error("error al agregar aula: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error: "El ID del aula ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar el aula" });
    }
  }
});

// PUT (Actualizar)
router.put("/", async (req: Request, res: Response) => {
  try {
    // ¡OJO! El campo se llama 'nombre' en el body
    const { idAula, nombre } = req.body; // <-- CORREGIDO
    const modificada = await aulaServices.actualizarAula({ idAula, nombre }); // <-- CORREGIDO
    res.send(modificada);
  } catch (err) {
    console.error("error al actualizar aula", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// DELETE (Eliminar - ID en body)
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idAula } = req.body;
    const eliminada = await aulaServices.eliminarAula(idAula);
    res.send(eliminada);
  } catch (err: any) {
    console.error("error al eliminar aula", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el aula porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el aula" });
    }
  }
});

export default router;
