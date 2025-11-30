// src/routes/grupoRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio de grupos
import * as grupoServices from "../services/grupoServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
  try {
    let grupos = await grupoServices.obtenerTodosGrupos();
    res.send(grupos);
  } catch (err) {
    console.error("error al obtener grupos: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let grupo = await grupoServices.encontrarGrupoPorId(Number(req.params.id));
    res.send(grupo);
  } catch (err) {
    console.error("error al obtener grupo por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) ---
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos TODOS los campos necesarios del body, incluyendo el opcional 'periodo'.
    const {
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    } = req.body;

    // Pasamos los datos al servicio (que validará con Zod).
    const nuevo = await grupoServices.agregarGrupo({
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar grupo: ", err);
    if (err.code === "ER_DUP_ENTRY") {
      res
        .status(409)
        .send({ error: "ER_DUP_ENTRY: El ID del grupo ya existe." });
    } else if (err.code === "ER_NO_REFERENCED_ROW_2") {
      res
        .status(409)
        .send({
          error:
            "Uno de los IDs referenciados (Docente, Materia o Aula) no existe.",
        });
    } else {
      res.status(400).send({ error: "No se pudo agregar el grupo." });
    }
  }
});

// --- ACTUALIZAR (PUT) ---
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    } = req.body;

    const modificado = await grupoServices.actualizarGrupo({
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar grupo", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idGrupo } = req.body;
    const eliminado = await grupoServices.eliminarGrupo(idGrupo);
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar grupo", err);
    if (err.code === "ER_ROW_IS_REFERENCED_2") {
      res
        .status(409)
        .send({
          error:
            "No se puede eliminar este grupo porque está referenciado en otras tablas.",
        });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el grupo." });
    }
  }
});

export default router;
