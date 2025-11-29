// src/routes/tipoDocumentoRoutes.ts

import express, { Request, Response } from "express";
// Importamos el servicio que acabamos de crear
import * as tipoDocumentoServices from "../services/tipoDocumentoServices";

const router = express.Router();

// --- OBTENER TODOS (GET) ---
router.get("/", async (_req: Request, res: Response) => {
  try {
    let tipos = await tipoDocumentoServices.obtenerTodosTiposDocumento();
    res.send(tipos);
  } catch (err) {
    console.error("error al obtener tipos de documento: ", err);
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER POR ID (GET) ---
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let tipo = await tipoDocumentoServices.encontrarTipoDocumentoPorId(
      Number(req.params.id)
    );
    res.send(tipo);
  } catch (err) {
    console.error("error al obtener tipo de documento por id: ", err);
    res.status(400).send({ error: "Error al buscar ID." });
  }
});

// --- AGREGAR (POST) ---
router.post("/", async (req: Request, res: Response) => {
  try {
    // Desestructuramos el body.
    // ¡IMPORTANTE! 'plantillaJSON' aquí se espera como un objeto de JavaScript normal.
    // El servicio se encargará de validarlo con Zod y convertirlo a string para la BD.
    const { idTipoDocumento, nombre, descripcion, plantillaJSON } = req.body;

    const nuevo = await tipoDocumentoServices.agregarTipoDocumento({
      idTipoDocumento,
      nombre,
      descripcion,
      plantillaJSON,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar tipo de documento: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID del tipo de documento ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res
        .status(400)
        .send({ error: "No se pudo agregar el tipo de documento" });
    }
  }
});

// --- ACTUALIZAR (PUT) ---
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento, nombre, descripcion, plantillaJSON } = req.body;

    const modificado = await tipoDocumentoServices.actualizarTipoDocumento({
      idTipoDocumento,
      nombre,
      descripcion,
      plantillaJSON,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar tipo de documento", err);
    res.status(400).send({ error: "No se pudo actualizar." });
  }
});

// --- ELIMINAR (DELETE - ID en body) ---
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento } = req.body;
    const eliminado = await tipoDocumentoServices.eliminarTipoDocumento(
      idTipoDocumento
    );
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar tipo de documento", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar este tipo de documento porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res
        .status(400)
        .send({ error: "No se pudo eliminar el tipo de documento" });
    }
  }
});

export default router;
