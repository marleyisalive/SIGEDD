import express, { Request, Response } from "express";
import * as plazaServices from "../services/plazaServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/plaza/ <---- obtener la plaza
router.get("/", async (_req: Request, res: Response) => {
  let rol = await plazaServices.obtieneRol();
  res.send(rol);
});

//http://localhost:3001/api/plaza/1 <---- busqueda por el id de la plaza
router.get("/:id", async (req: Request, res: Response) => {
  let plaza = await plazaServices.encuentraPlazaPorId(
    Number(req.params.id)
  );
  res.send(plaza);
});

//http://localhost:3001/api/plaza/ insertar una nueva plaza
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idPlaza, descripcion } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await plazaServices.agregarPlaza({
      idPlaza,
      descripcion,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar la plaza: ", err);
    res.status(400).send({ error: "No se pudo agregar la plaza" });
  }
});

//http://localhost:3001/api/plaza/ <---- editar un plaza
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idPlaza, descripcion } = req.body;
    const modificado = await plazaServices.actualizarPlaza({
      idPlaza,
      descripcion,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar la plaza", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar la plaza" });
  }
});

//http://localhost:3001/api/plaza/ <---- eliminar un plaza
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idPlaza } = req.body;
    const eliminado = await plazaServices.eliminarPlaza(
      idPlaza
    );
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar la plaza", err);
    res.status(400).send({ error: "No se pudo eliminar la plaza" });
  }
});

//exportamos las rutas
export default router;
