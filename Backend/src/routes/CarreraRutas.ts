import express, { Request, Response } from "express";
import * as CarreraServices from "../services/CarreraServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/Carrera/ <---- obtener todas las carreras
router.get("/", async (_req: Request, res: Response) => {
  let Carrera = await CarreraServices.obtieneCarrera();
  res.send(Carrera);
});

//http://localhost:3001/api/Carrera/1 <---- busqueda por el id de la carrera
router.get("/:id", async (req: Request, res: Response) => {
  let Carrera = await CarreraServices.encuentraCarreraPorId(
    Number(req.params.id)
  );
  res.send(Carrera);
});

//http://localhost:3001/api/Carrera/ insertar una nueva carrera
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idCarrera, nombreCarrera, acreditada, nivel } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await CarreraServices.agregarCarrera({
      idCarrera,
      nombreCarrera,
      acreditada,
      nivel,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar la carrera: ", err);
    res.status(400).send({ error: "No se pudo agregar la carrera" });
  }
});

//http://localhost:3001/api/Carrera/ <---- editar una carrera
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idCarrera, nombreCarrera, acreditada, nivel } = req.body;
    const modificado = await CarreraServices.actualizarCarrera({
      idCarrera,
      nombreCarrera,
      acreditada,
      nivel,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar la carrera", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar la carrera" });
  }
});

//http://localhost:3001/api/Carrera/ <---- eliminar una carrera
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idCarrera } = req.body;
    const eliminado = await CarreraServices.eliminarCarrera(
      idCarrera
    );
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar la carrera", err);
    res.status(400).send({ error: "No se pudo eliminar la carrera" });
  }
});

//exportamos las rutas
export default router;
