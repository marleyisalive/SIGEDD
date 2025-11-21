import express, { Request, Response } from "express";
import * as actividadInstitucionalServices from "../services/actividadInstitucionalServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/documento/ <---- obtener todos los documentos
router.get("/", async (_req: Request, res: Response) => {
  let actividad = await actividadInstitucionalServices.obtieneActividadInstitucional();
  res.send(actividad);
});

//http://localhost:3001/api/documento/1 <---- busqueda por el id del documento
router.get("/:id", async (req: Request, res: Response) => {
  let actividad = await actividadInstitucionalServices.encuentraActividadInstitucionalPorId(
    Number(req.params.id)
  );
  res.send(actividad);
});

//http://localhost:3001/api/documento/ insertar un nuevo documento
router.post("/", async (req: Request, res: Response) => {
  try {
    const {idActividadInstitucional,idTipoDocumento,nombre,descripcion,periodo,fechaInicio,fechaFin} = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await actividadInstitucionalServices.agregarActividadInstitucional({
      idActividadInstitucional, idTipoDocumento,nombre, descripcion,periodo,fechaInicio,fechaFin
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar actividad: ", err);
    res.status(400).send({ error: "No se pudo agregar la actividad" });
  }
});

//http://localhost:3001/api/documento/ <---- editar un documento
router.put("/", async (req: Request, res: Response) => {
  try {
    const {idActividadInstitucional,idTipoDocumento,nombre,descripcion,periodo,fechaInicio,fechaFin} = req.body;
    const modificado = await actividadInstitucionalServices.actualizarActividadInstitucional({
      idActividadInstitucional,idTipoDocumento,nombre,descripcion,periodo,fechaInicio,fechaFin
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar la actividad", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar la actividad" });
  }
});

//http://localhost:3001/api/documento/ <---- eliminar un documento
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idActividadInstitucional } = req.body;
    const eliminado = await actividadInstitucionalServices.eliminarActividadInstitucional(
      idActividadInstitucional
    );
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar la actividad", err);
    res.status(400).send({ error: "No se pudo eliminar la actividad" });
  }
});

//exportamos las rutas
export default router;
