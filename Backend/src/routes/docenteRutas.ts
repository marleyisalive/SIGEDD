import express, { Request, Response } from "express";
import * as docenteServices from "../services/docenteServices"; // Importa tu servicio de docente
import {  NuevoDocente } from "../types/typesDocente"; // Importa tus tipos

// Activamos las rutas
const router = express.Router();

// --- OBTENER TODOS LOS DOCENTES ---
// GET http://localhost:3001/api/docentes
router.get("/", async (_req: Request, res: Response) => {
  let docentes = await docenteServices.obtenerTodosLosDocentes();
  res.send(docentes); // El servicio devuelve los datos o el objeto de error
});

// --- OBTENER UN DOCENTE POR ID ---
// GET http://localhost:3001/api/docentes/:idDocente
router.get("/:idDocente", async (req: Request, res: Response) => {
  let docente = await docenteServices.encontrarDocentePorId(
    Number(req.params.idDocente)
  );
  res.send(docente); // El servicio devuelve el docente o el objeto de error
});

// --- CREAR UN NUEVO DOCENTE ---
// POST http://localhost:3001/api/docentes
router.post("/", async (req: Request, res: Response) => {
  try {
    // Tomamos todos los campos del body que coinciden con NuevoDocente
    const nuevoDocente: NuevoDocente = req.body;

    // Enviamos el objeto completo al servicio
    const nuevo = await docenteServices.agregarDocente(nuevoDocente);
    res.send(nuevo);
  } catch (err) {
    console.error("Error al agregar el docente: ", err);
    res.status(400).send({ error: "No se pudo agregar el docente" });
  }
});

// --- ACTUALIZAR UN DOCENTE ---
// PUT http://localhost:3001/api/docentes
router.put("/", async (req: Request, res: Response) => {
  try {
    // En otras rutas se envía un único objeto al servicio; hacemos lo mismo aquí
    const { idDocente, idUsuario, filiacion, idNivelEstudio, idDepartamento, idPlaza, estatusExclusividad, folioEdd } = req.body;

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
    console.error("Error al actualizar el docente", err);
    res.status(400).send({ error: "No se pudo actualizar el docente" });
  }
});

// --- ELIMINAR UN DOCENTE ---
// DELETE http://localhost:3001/api/docentes
router.delete("/", async (req: Request, res: Response) => {
  try {
    // Seguimos el patrón de tu compañero de enviar el ID en el body
    const { idDocente } = req.body;

    const eliminado = await docenteServices.eliminarDocente(idDocente);
    res.send(eliminado);
  } catch (err) {
    console.error("Error al eliminar el docente", err);
    res.status(400).send({ error: "No se pudo eliminar el docente" });
  }
});

// Exportamos las rutas
export default router;

