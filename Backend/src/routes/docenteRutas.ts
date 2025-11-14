// routes/docenteRoutes.ts

import express, { Request, Response } from "express";
import * as docenteServices from "../services/docenteServices"; // Asegúrate de que la ruta sea correcta
// import { Docente } from "../typesDocente"; // No necesitamos importar el tipo aquí si no lo usamos explícitamente

const router = express.Router();

// --- OBTENER TODOS LOS DOCENTES ---
// http://localhost:3001/api/docentes/ <---- obtener todos los docentes
router.get("/", async (_req: Request, res: Response) => {
  try {
    let docentes = await docenteServices.obtenerTodosLosDocentes();
    res.send(docentes); // Envía directamente lo que el servicio devuelve
  } catch (err) {
    console.error("error al obtener todos los docentes: ", err);
    res.status(500).send({ error: "No se pudieron obtener los docentes." });
  }
});

// --- OBTENER DOCENTE POR ID ---
// http://localhost:3001/api/docentes/501 <---- busqueda por el id del docente
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let docente = await docenteServices.encontrarDocentePorId(
      Number(req.params.id) // Convertimos el ID a número directamente
    );
    res.send(docente); // Envía directamente lo que el servicio devuelve
  } catch (err) {
    console.error("error al obtener el docente por id: ", err);
    res.status(400).send({ error: "No se pudo obtener el docente por id." });
  }
});

// --- INSERTAR UN NUEVO DOCENTE ---
// http://localhost:3001/api/docentes/ <---- insertar un nuevo docente
router.post("/", async (req: Request, res: Response) => {
  try {
    // Tomamos todo el body directamente, como el de tu compañero
    const nuevo = await docenteServices.agregarDocente(req.body); 
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el docente: ", err);
    res.status(400).send({ error: "No se pudo agregar el docente" });
  }
});

// --- EDITAR UN DOCENTE ---
// http://localhost:3001/api/docentes/ <---- editar un docente
router.put("/", async (req: Request, res: Response) => {
  try {
    // Tomamos todo el body directamente
    const modificado = await docenteServices.actualizarDocente(req.body);
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el docente", err);
    res.status(400).send({ error: "No se pudo actualizar el docente" });
  }
});

// --- ELIMINAR UN DOCENTE ---
// http://localhost:3001/api/docentes/ <---- eliminar un docente
router.delete("/", async (req: Request, res: Response) => {
  try {
    // Tu compañero envía el ID directamente desde el body para DELETE
    const { idDocente } = req.body; 
    const eliminado = await docenteServices.eliminarDocente(idDocente);
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el docente", err);
    res.status(400).send({ error: "No se pudo eliminar el docente" });
  }
});

// Exportamos las rutas
export default router;