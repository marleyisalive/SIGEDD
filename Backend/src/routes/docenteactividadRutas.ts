import express, { Request, Response } from "express";
import * as docenteActividadServices from "../services/docenteactividadServices"; // Importa tu servicio
// (CORRECCIÓN: Se elimina 'NuevaDocenteActividad' de la importación)
import { docenteactividad } from "../typesDocenteActividad"; // Importa tu tipo

// Activamos las rutas
const router = express.Router();

// --- OBTENER TODAS LAS RELACIONES ---
// GET http://localhost:3001/api/docente-actividad
router.get("/", async (_req: Request, res: Response) => {
  try { // (Se añade try...catch para consistencia)
    let relaciones = await docenteActividadServices.obtenerTodasDocenteActividad();
    res.send(relaciones);
  } catch (err) {
    console.error("Error al obtener las relaciones:", err);
    res.status(500).send({ error: "No se pudieron obtener las relaciones" });
  }
});

// --- OBTENER UNA RELACIÓN POR PK COMPUESTA ---
// GET http://localhost:3001/api/docente-actividad/:idDocente/:idActividadInstitucional
router.get("/:idDocente/:idActividadInstitucional", async (req: Request, res: Response) => {
  try { // (Se añade try...catch para consistencia)
    let relacion = await docenteActividadServices.encontrarDocenteActividadPorPK(
      Number(req.params.idDocente),
      Number(req.params.idActividadInstitucional)
    );
    res.send(relacion);
  } catch (err) {
    console.error("Error al obtener la relación por PK:", err);
    res.status(400).send({ error: "No se pudo obtener la relación por PK" });
  }
});

// --- CREAR UNA NUEVA RELACIÓN ---
// POST http://localhost:3001/api/docente-actividad
router.post("/", async (req: Request, res: Response) => {
  try {
    // (CORRECCIÓN: Usamos 'docenteactividad' en lugar de 'NuevaDocenteActividad')
    // Asumimos que el req.body completo coincide con la interfaz
    const nuevaRelacion: docenteactividad = req.body; 
    
    const nuevo = await docenteActividadServices.agregarDocenteActividad(nuevaRelacion);
    res.send(nuevo);

  } catch (err) {
    console.error("Error al agregar la relación docente-actividad: ", err);
    res.status(400).send({ error: "No se pudo agregar la relación docente-actividad" });
  }
});

// --- ACTUALIZAR UNA RELACIÓN ---
// PUT http://localhost:3001/api/docente-actividad
router.put("/", async (req: Request, res: Response) => {
  try {
    // (CORRECCIÓN: Se pasa el req.body completo al servicio, igual que en el POST)
    // El servicio 'actualizarDocenteActividad' espera el objeto completo
    const modificado = await docenteActividadServices.actualizarDocenteActividad(req.body);
    res.send(modificado);

  } catch (err) {
    console.error("Error al actualizar la relación docente-actividad", err);
    res.status(400).send({ error: "No se pudo actualizar la relación docente-actividad" });
  }
});

// --- ELIMINAR UNA RELACIÓN ---
// DELETE http://localhost:3001/api/docente-actividad
router.delete("/", async (req: Request, res: Response) => {
  try {
    // (Mantenemos el estilo de tu compañero de tomar IDs del body para DELETE)
    const { idDocente, idActividadInstitucional } = req.body;
    
    const eliminado = await docenteActividadServices.eliminarDocenteActividad(
      idDocente,
      idActividadInstitucional
    );
    res.send(eliminado);

  } catch (err) {
    console.error("Error al eliminar la relación docente-actividad", err);
    res.status(400).send({ error: "No se pudo eliminar la relación docente-actividad" });
  }
});

// Exportamos las rutas
export default router;