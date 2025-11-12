import express, { Request, Response } from "express";
import * as tipoDocumentoServices from "../services/tipoDocumentoServices";

// Activamos las rutas
const router = express.Router();

// http://localhost:3001/api/tipoDocumento/ <--Obtener todos los tipos de documento
router.get("/", async (_req: Request, res: Response) => {
  try {
    const tipos = await tipoDocumentoServices.obtieneTipoDocumento();
    res.send(tipos);
  } catch (err) {
    console.error("Error al obtener los tipos de documento:", err);
    res.status(500).send({ error: "Error al obtener los tipos de documento" });
  }
});

// http://localhost:3001/api/tipoDocumento/id <-- Buscar un tipo de documento por ID
router.get("/:id", async (req: Request, res: Response) => {
  try {
    const tipo = await tipoDocumentoServices.encuentraTipoDocumentoPorId(Number(req.params.id));
    res.send(tipo);
  } catch (err) {
    console.error("Error al buscar tipo de documento:", err);
    res.status(500).send({ error: "Error al buscar el tipo de documento" });
  }
});

//http://localhost:3001/api/tipoDocumento/ <--- Insertar un tipo de documento
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento, nombre, descripcion } = req.body;
    const nuevo = await tipoDocumentoServices.agregarTipoDocumento({
      idTipoDocumento,
      nombre,
      descripcion,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("Error al agregar tipo de documento:", err);
    res.status(400).send({ error: "No se pudo agregar el tipo de documento" });
  }
});

// http://localhost:3001/api/tipoDocumento/id <--- Actualizar un tipo de documento existente
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento, nombre, descripcion } = req.body;
    const actualizado = await tipoDocumentoServices.actualizarTipoDocumento({
      idTipoDocumento,
      nombre,
      descripcion,
    });
    res.send(actualizado);
  } catch (err) {
    console.error("Error al actualizar tipo de documento:", err);
    res.status(400).send({ error: "No se pudo actualizar el tipo de documento" });
  }
});

// http://localhost:3001/api/tipoDocumento/id <--- Eliminar un tipo de documento
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento } = req.body;
    const eliminado = await tipoDocumentoServices.eliminarTipoDocumento(idTipoDocumento);
    res.send(eliminado);
  } catch (err) {
    console.error("Error al eliminar tipo de documento:", err);
    res.status(400).send({ error: "No se pudo eliminar el tipo de documento" });
  }
});

// Exportamos las rutas
export default router;
