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
    } catch (err) {
        console.error("error al agregar aula: ", err);
        res.status(400).send({ error: "No se pudo agregar." });
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
    } catch (err) {
        console.error("error al eliminar aula", err);
        res.status(400).send({ error: "No se pudo eliminar." });
    }
});

export default router;
