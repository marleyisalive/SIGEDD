import express, { Request, Response } from "express";
import * as docenteActividadServices from "../services/docenteactividadServices"; // Importa tu servicio
import {
  docenteactividad,
  NuevaDocenteActividad,
} from "../types/typesDocenteActividad"; // Importa tus tipos

// Activamos las rutas
const router = express.Router();

// --- OBTENER TODAS LAS RELACIONES ---
// GET http://localhost:3001/api/docente-actividad
router.get("/", async (_req: Request, res: Response) => {
  let relaciones =
    await docenteActividadServices.obtenerTodasDocenteActividad();
  res.send(relaciones);
});

// --- OBTENER UNA RELACIÓN POR PK COMPUESTA ---
// GET http://localhost:3001/api/docente-actividad/:idDocente/:idActividadInstitucional
// (Esta ruta es la única que difiere porque la PK es compuesta)
router.get(
  "/:idDocente/:idActividadInstitucional",
  async (req: Request, res: Response) => {
    let relacion =
      await docenteActividadServices.encontrarDocenteActividadPorPK(
        Number(req.params.idDocente),
        Number(req.params.idActividadInstitucional)
      );
    res.send(relacion);
  }
);

// --- CREAR UNA NUEVA RELACIÓN ---
// POST http://localhost:3001/api/docente-actividad
router.post("/", async (req: Request, res: Response) => {
  try {
    const nuevaRelacion: NuevaDocenteActividad = req.body;

    const nuevo = await docenteActividadServices.agregarDocenteActividad(
      nuevaRelacion
    );
    res.send(nuevo);
  } catch (err) {
    console.error("Error al agregar la relación docente-actividad: ", err);
    res
      .status(400)
      .send({ error: "No se pudo agregar la relación docente-actividad" });
  }
});

// --- ACTUALIZAR UNA RELACIÓN ---
// PUT http://localhost:3001/api/docente-actividad
router.put("/", async (req: Request, res: Response) => {
  try {
    // La PK compuesta (idDocente, idActividadInstitucional) debe venir en el body
    const {
      idDocente,
      idActividadInstitucional,
      ...datosParaModificar
    }: docenteactividad = req.body;

    const modificado =
      await docenteActividadServices.actualizarDocenteActividad(
        idDocente,
        idActividadInstitucional,
        datosParaModificar // Contiene 'rol' y/o 'periodo'
      );
    res.send(modificado);
  } catch (err) {
    console.error("Error al actualizar la relación docente-actividad", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar la relación docente-actividad" });
  }
});

// --- ELIMINAR UNA RELACIÓN ---
// DELETE http://localhost:3001/api/docente-actividad
router.delete("/", async (req: Request, res: Response) => {
  try {
    // La PK compuesta (idDocente, idActividadInstitucional) debe venir en el body
    const { idDocente, idActividadInstitucional } = req.body;

    const eliminado = await docenteActividadServices.eliminarDocenteActividad(
      idDocente,
      idActividadInstitucional
    );
    res.send(eliminado);
  } catch (err) {
    console.error("Error al eliminar la relación docente-actividad", err);
    res
      .status(400)
      .send({ error: "No se pudo eliminar la relación docente-actividad" });
  }
});

// Exportamos las rutas
export default router;
