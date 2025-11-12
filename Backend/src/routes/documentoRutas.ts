import express, { Request, Response } from "express";
import * as documentoServices from "../services/documentoServices";

const router = express.Router();

// =====================================================
// GET: obtener todos los documentos
// =====================================================
router.get("/", async (_req: Request, res: Response) => {
  let docs = await documentoServices.obtieneDocumentos();
  res.send(docs);
});

// =====================================================
// GET: buscar documento por id
// =====================================================
router.get("/:id", async (req: Request, res: Response) => {
  let doc = await documentoServices.encuentraDocumentoPorId(
    Number(req.params.id)
  );
  res.send(doc);
});

// =====================================================
// POST: insertar un nuevo documento
// =====================================================
router.post("/", async (req: Request, res: Response) => {
  try {
    const nuevo = await documentoServices.agregarDocumento(req.body);
    res.send(nuevo);
  } catch (err) {
    console.error("Error al agregar el documento:", err);
    res.status(400).send({ error: "No se pudo agregar el documento" });
  }
});

// =====================================================
// PUT: actualizar documento
// =====================================================
router.put("/", async (req: Request, res: Response) => {
  try {
    const actualizado = await documentoServices.actualizarDocumento(req.body);
    res.send(actualizado);
  } catch (err) {
    console.error("Error al actualizar el documento:", err);
    res.status(400).send({ error: "No se pudo actualizar el documento" });
  }
});

// =====================================================
// DELETE: eliminar documento
// =====================================================
router.delete("/", async (req: Request, res: Response) => {
  try {
    const eliminado = await documentoServices.eliminarDocumento(req.body.idDocumento);
    res.send(eliminado);
  } catch (err) {
    console.error("Error al eliminar el documento:", err);
    res.status(400).send({ error: "No se pudo eliminar el documento" });
  }
});

export default router;
