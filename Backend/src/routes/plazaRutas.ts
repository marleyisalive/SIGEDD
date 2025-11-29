// src/routes/plazaRoutes.ts

import express, { Request, Response } from "express";
import * as plazaServices from "../services/plazaServices";

const router = express.Router();

// GET ALL
router.get("/", async (_req: Request, res: Response) => {
  try {
    let plazas = await plazaServices.obtenerTodasPlazas();
    res.send(plazas);
  } catch (err) {
    console.error("error al obtener plazas: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// GET BY ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let plaza = await plazaServices.encontrarPlazaPorId(Number(req.params.id));
    res.send(plaza);
  } catch (err) {
    console.error("error al obtener plaza por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// POST (Agregar)
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos y pasamos al servicio (que valida con Zod)
    const { idPlaza, descripcion } = req.body;
    const nueva = await plazaServices.agregarPlaza({ idPlaza, descripcion });
    res.send(nueva);
  } catch (err: any) {
    console.error("error al agregar plaza: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error: "El ID de la plaza ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar." });
    }
  }
});

// PUT (Actualizar)
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idPlaza, descripcion } = req.body;
    const modificada = await plazaServices.actualizarPlaza({
      idPlaza,
      descripcion,
    });
    res.send(modificada);
  } catch (err) {
    console.error("error al actualizar plaza", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// DELETE (Eliminar - ID en body)
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idPlaza } = req.body;
    const eliminada = await plazaServices.eliminarPlaza(idPlaza);
    res.send(eliminada);
  } catch (err: any) {
    console.error("error al eliminar plaza", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar la plaza porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar." });
    }
  }
});

export default router;
