import express, { Request, Response } from "express";
import * as tipoDocumentoServices from "../services/tipoDocumentoServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/tipoDocumento/ <---- obtener todos los tipos de documento
router.get("/", async (_req: Request, res: Response) => {
  let tipoDocumento = await tipoDocumentoServices.obtieneTipoDocumento();
  res.send(tipoDocumento);
});

//http://localhost:3001/api/tipoDocumento/1 <---- busqueda por el id del tipo de documento
router.get("/:id", async (req: Request, res: Response) => {
  let tipoDocumento = await tipoDocumentoServices.encuentraTipoDocumentoPorId(
    Number(req.params.id)
  );
  res.send(tipoDocumento);
});

//http://localhost:3001/api/tipoDocumento/ insertar un nuevo tipo de documento
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento, nombre, descripcion} = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await tipoDocumentoServices.agregarTipoDocumento({
      idTipoDocumento,
      nombre,
      descripcion,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el tipo de documento: ", err);
    res.status(400).send({ error: "No se pudo agregar el tipo de documento" });
  }
});

//http://localhost:3001/api/tipoDocumento/ <---- editar un tipo documento
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento, nombre, descripcion } = req.body;
    const modificado = await tipoDocumentoServices.actualizarTipoDocumento({
      idTipoDocumento,
      nombre,
      descripcion,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el tipo de documento", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar el tipo de documento" });
  }
});

//http://localhost:3001/api/tipoDocumento/ <---- eliminar un tipo documento
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idTipoDocumento } = req.body;
    const eliminado = await tipoDocumentoServices.eliminarTipoDocumento(
      idTipoDocumento
    );
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el tipo de documento", err);
    res.status(400).send({ error: "No se pudo eliminar el tipo de documento" });
  }
});

//exportamos las rutas
export default router;
