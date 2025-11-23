// src/routes/materiaRoutes.ts

import express, { Request, Response } from "express";
import * as materiaServices from "../services/materiaServices";

const router = express.Router();

// --- OBTENER TODAS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
    try {
        let materias = await materiaServices.obtenerTodasMaterias();
        res.send(materias);
    } catch (err) {
        console.error("error al obtener materias: ", err);
        res.status(500).send({ error: "Error interno." });
    }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let materia = await materiaServices.encontrarMateriaPorId(Number(req.params.id));
        res.send(materia);
    } catch (err) {
        console.error("error al obtener materia por id: ", err);
        res.status(400).send({ error: "Error al buscar ID." });
    }
});

// --- AGREGAR (POST) ---
router.post("/", async (req: Request, res: Response) => {
    try {
        // Desestructuramos todos los campos obligatorios
        const { idMateria, nombre, idDepartamento, creditos } = req.body;
        const nueva = await materiaServices.agregarMateria({ idMateria, nombre, idDepartamento, creditos });
        res.send(nueva);
    } catch (err) {
        console.error("error al agregar materia: ", err);
        res.status(400).send({ error: "No se pudo agregar." });
    }
});

// --- ACTUALIZAR (PUT) ---
router.put("/", async (req: Request, res: Response) => {
    try {
        const { idMateria, nombre, idDepartamento, creditos } = req.body;
        const modificada = await materiaServices.actualizarMateria({ idMateria, nombre, idDepartamento, creditos });
        res.send(modificada);
    } catch (err) {
        console.error("error al actualizar materia", err);
        res.status(400).send({ error: "No se pudo actualizar." });
    }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
    try {
        const { idMateria } = req.body;
        const eliminada = await materiaServices.eliminarMateria(idMateria);
        res.send(eliminada);
    } catch (err) {
        console.error("error al eliminar materia", err);
        res.status(400).send({ error: "No se pudo eliminar." });
    }
});

export default router;
