import express, { Request, Response } from "express";
import * as aulaServices from "../services/aulaServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/aula/ <---- obtener todas las aulas
router.get("/", async (_req: Request, res: Response) => {
  let aula = await aulaServices.obtieneAula();
  res.send(aula);
});

//http://localhost:3001/api/aula/1 <---- busqueda por el id del aula
router.get("/:id", async (req: Request, res: Response) => {
  let Aula = await aulaServices.encuentraAulaPorId(Number(req.params.id));
  res.send(Aula);
});

//http://localhost:3001/api/aula/ insertar una nueva aula
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idAula, nombre } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await aulaServices.agregarAula({
      idAula,
      nombre,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el aula: ", err);
    res.status(400).send({ error: "No se pudo agregar el aula" });
  }
});

//http://localhost:3001/api/Aula/ <---- editar un aula
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idAula, nombre } = req.body;
    const modificado = await aulaServices.actualizarAula({
      idAula,
      nombre,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el aula", err);
    res.status(400).send({ error: "No se pudo actualizar el aula" });
  }
});

//http://localhost:3001/api/nivelEstudio/ <---- eliminar un aula
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idAula } = req.body;
    const eliminado = await aulaServices.eliminarAula(idAula);
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el aula", err);
    res.status(400).send({ error: "No se pudo eliminar el aula" });
  }
});

//exportamos las rutas
export default router;
