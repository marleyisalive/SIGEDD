import express, { Request, Response } from "express";
import * as documentoServices from "../services/documentoServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/documento/ <---- obtener todos los documentos
router.get("/", async (_req: Request, res: Response) => {
  let documento = await documentoServices.obtieneDocumento();
  res.send(documento);
});

//http://localhost:3001/api/documento/1 <---- busqueda por el id del documento
router.get("/:id", async (req: Request, res: Response) => {
  let documento = await documentoServices.encuentraDocumentoPorId(
    Number(req.params.id)
  );
  res.send(documento);
});

//http://localhost:3001/api/documento/ insertar un nuevo documento
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idDocumento, idDocenteActividad,fechaGeneracion,urlArchivo,version} = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await documentoServices.agregarDocumento({
      idDocumento, idDocenteActividad, fechaGeneracion, urlArchivo, version
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el documento: ", err);
    res.status(400).send({ error: "No se pudo agregar el documento" });
  }
});

//http://localhost:3001/api/documento/ <---- editar un documento
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idDocumento, idDocenteActividad,fechaGeneracion,urlArchivo,version} = req.body;
    const modificado = await documentoServices.actualizarDocumento({
      idDocumento, idDocenteActividad, fechaGeneracion, urlArchivo, version
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el documento", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar el documento" });
  }
});

//http://localhost:3001/api/documento/ <---- eliminar un documento
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idDocumento } = req.body;
    const eliminado = await documentoServices.eliminarDocumento(
      idDocumento
    );
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el documento", err);
    res.status(400).send({ error: "No se pudo eliminar el documento" });
  }
});

//exportamos las rutas
export default router;
