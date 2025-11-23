// src/routes/carreraRoutes.ts

import express, { Request, Response } from "express";
import * as carreraServices from "../services/carreraServices";

const router = express.Router();

// --- OBTENER TODAS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
    try {
        let carreras = await carreraServices.obtenerTodasCarreras();
        res.send(carreras);
    } catch (err) {
        console.error("error al obtener carreras: ", err);
        res.status(500).send({ error: "Error interno." });
    }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let carrera = await carreraServices.encontrarCarreraPorId(Number(req.params.id));
        res.send(carrera);
    } catch (err) {
        console.error("error al obtener carrera por id: ", err);
        res.status(400).send({ error: "Error al buscar ID." });
    }
});

// --- AGREGAR (POST) ---
router.post("/", async (req: Request, res: Response) => {
    try {
        // Desestructuramos los campos del body, incluyendo 'acreditado'
        const { idCarrera, nombre, acreditado } = req.body;
        const nueva = await carreraServices.agregarCarrera({ idCarrera, nombre, acreditado });
        res.send(nueva);
    } catch (err) {
        console.error("error al agregar carrera: ", err);
        res.status(400).send({ error: "No se pudo agregar." });
    }
});

// --- ACTUALIZAR (PUT) ---
router.put("/", async (req: Request, res: Response) => {
    try {
        const { idCarrera, nombre, acreditado } = req.body;
        const modificada = await carreraServices.actualizarCarrera({ idCarrera, nombre, acreditado });
        res.send(modificada);
    } catch (err) {
        console.error("error al actualizar carrera", err);
        res.status(400).send({ error: "No se pudo actualizar." });
    }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
    try {
        const { idCarrera } = req.body;
        const eliminada = await carreraServices.eliminarCarrera(idCarrera);
        res.send(eliminada);
    } catch (err) {
        console.error("error al eliminar carrera", err);
        res.status(400).send({ error: "No se pudo eliminar." });
    }
});

export default router;