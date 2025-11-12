import express, { Request, Response } from "express";
import * as TipoActividadServices from "../services/tipoActividadServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/TipoActividad/ <---- obtener todos los TipoActividad
router.get("/", async (_req: Request, res: Response) => {
  let TipoActividad = await TipoActividadServices.obtieneTipoActividad();
  res.send(TipoActividad);
});

//http://localhost:3001/api/TipoActividad/1 <---- busqueda por el id del TipoActividad
router.get("/:id", async (req: Request, res: Response) => {
  let TipoActividad = await TipoActividadServices.encuentraTipoActividadPorId(
    Number(req.params.id)
  );
  res.send(TipoActividad);
});

//http://localhost:3001/api/TipoActividad/ insertar un nuevo tipo de actividad
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idTipoActividad, nombre, descripcion } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await TipoActividadServices.agregarTipoActividad({
      idTipoActividad,
      nombre,
      descripcion,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el tipo de actividad: ", err);
    res.status(400).send({ error: "No se pudo agregar el tipo de actividad" });
  }
});

//http://localhost:3001/api/TipoActividad/ <---- editar tipo de actividad
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idTipoActividad, nombre, descripcion } = req.body;
    const modificado = await TipoActividadServices.actualizarTipoActividad({
      idTipoActividad,
      nombre,
      descripcion,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el tipo de actividad", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar el tipo de actividad" });
  }
});

//http://localhost:3001/api/TipoActividad/ <---- eliminar un TipoActividad
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idTipoActividad } = req.body;
    const eliminado = await TipoActividadServices.eliminarTipoActividad(
      idTipoActividad
    );
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el tipo de actividad", err);
    res.status(400).send({ error: "No se pudo eliminar el tipo de actividad" });
  }
});

//exportamos las rutas
export default router;
