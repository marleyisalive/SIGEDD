// src/routes/departamentoRoutes.ts

import express, { Request, Response } from "express";
import * as departamentoServices from "../services/departamentoServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
  try {
    let departamentos = await departamentoServices.obtenerTodosDepartamentos();
    res.send(departamentos);
  } catch (err) {
    console.error("error al obtener departamentos: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let departamento = await departamentoServices.encontrarDepartamentoPorId(
      Number(req.params.id)
    );
    res.send(departamento);
  } catch (err) {
    console.error("error al obtener departamento por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) ---
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos los campos, incluyendo el opcional
    const { idDepartamento, nombreDepartamento, encargadoDepartamento } =
      req.body;
    const nuevo = await departamentoServices.agregarDepartamento({
      idDepartamento,
      nombreDepartamento,
      encargadoDepartamento,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar departamento: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID del departamento ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar el departamento" });
    }
  }
});

// --- ACTUALIZAR (PUT) ---
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idDepartamento, nombreDepartamento, encargadoDepartamento } =
      req.body;
    const modificado = await departamentoServices.actualizarDepartamento({
      idDepartamento,
      nombreDepartamento,
      encargadoDepartamento,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar departamento", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idDepartamento } = req.body;
    const eliminado = await departamentoServices.eliminarDepartamento(
      idDepartamento
    );
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar departamento", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el departamento porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el departamento" });
    }
  }
});

export default router;
