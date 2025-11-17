import express, { Request, Response } from "express";
import * as materiaServices from "../services/materiaServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/materia/ <---- obtener todas las materias
router.get("/", async (_req: Request, res: Response) => {
  try {
    let materia = await materiaServices.obtieneMateria();
    res.send(materia);
  } catch (err) {
    console.log("no se puede obtener las materias", err);
    res.status(400).send("Error al obtener las materias");
  }
});

//http://localhost:3001/api/materia/1 <---- obtener materia por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let materia = await materiaServices.encuentraMateriaPorId(
      Number(req.params.id)
    );
    res.send(materia);
  } catch (err) {
    console.log("no se puede obtener la materia por id", err);
    res.status(400).send("Error al obtener la materia por id");
  }
});

//http://localhost:3001/api/materia/ insertar una nueva materia
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idMateria, nombre, idDepartamento, creditos } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await materiaServices.agregarMateria({
      idMateria,
      nombre,
      idDepartamento,
      creditos,
    });
    res.send(nuevo);
  } catch (err) {
    console.log("no se puede insertar la materia", err);
    res.status(400).send("Error al insertar la materia");
  }
});

//http://localhost:3001/api/materia/ <---- editar una materia
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idMateria, nombre, idDepartamento, creditos } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const modificado = await materiaServices.actualizarMateria({
      idMateria,
      nombre,
      idDepartamento,
      creditos,
    });
    res.send(modificado);
  } catch (err) {
    console.log("no se puede actualizar la materia", err);
    res.status(400).send("Error al actualizar la materia");
  }
});

//http://localhost:3001/api/materia/1 <---- eliminar una materia
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idMateria } = req.body;
    const eliminado = await materiaServices.eliminarMateria(idMateria);
    res.send(eliminado);
  } catch (err) {
    console.log("no se puede eliminar la materia", err);
    res.status(400).send("Error al eliminar la materia");
  }
});

export default router;
