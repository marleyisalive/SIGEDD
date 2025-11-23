// src/routes/docenteActividadRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio (usando un alias más corto)
import * as docenteActividadServices from "../services/docenteactividadServices";

const router = express.Router();

// --- OBTENER TODAS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
    try {
        let actividades = await docenteActividadServices.obtenerTodasDocenteActividad();
        // Nota: mysql2 convierte automáticamente el string JSON de la BD a objeto JS aquí.
        res.send(actividades);
    } catch (err) {
        console.error("error al obtener registros de actividades: ", err);
        res.status(500).send({ error: "Error interno." });
    }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
    try {
        let actividad = await docenteActividadServices.encontrarDocenteActividadPorId(Number(req.params.id));
        res.send(actividad);
    } catch (err) {
        console.error("error al obtener registro por id: ", err);
        res.status(400).send({ error: "Error al buscar ID." });
    }
});

// --- AGREGAR (POST) - SINTAXIS LIMPIA ---
router.post("/", async (req: Request, res: Response) => {
    try {
        // Pasamos el body directo.
        // El servicio validará con Zod y convertirá el JSON a string.
        const nueva = await docenteActividadServices.agregarDocenteActividad(req.body);
        res.send(nueva);
    } catch (err) {
        console.error("error al agregar registro de actividad: ", err);
        res.status(400).send({ error: "No se pudo agregar." });
    }
});

// --- ACTUALIZAR (PUT) - SINTAXIS LIMPIA ---
router.put("/", async (req: Request, res: Response) => {
    try {
        const modificada = await docenteActividadServices.actualizarDocenteActividad(req.body);
        res.send(modificada);
    } catch (err) {
        console.error("error al actualizar registro de actividad", err);
        res.status(400).send({ error: "No se pudo actualizar." });
    }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
    try {
        const { idDocenteActividad } = req.body;
        const eliminada = await docenteActividadServices.eliminarDocenteActividad(idDocenteActividad);
        res.send(eliminada);
    } catch (err) {
        console.error("error al eliminar registro de actividad", err);
        res.status(400).send({ error: "No se pudo eliminar." });
    }
});

export default router;