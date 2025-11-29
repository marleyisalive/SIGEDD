import express, { Request, Response } from "express";
import * as materiaServices from "../services/materiaServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/materia/ <---- obtener todas las materias
router.get("/", async (_req: Request, res: Response) => {
  let materia = await materiaServices.obtenerTodasMaterias();
  res.send(materia);
});

//http://localhost:3001/api/materia/1 <---- busqueda por el id de la materia
router.get("/:id", async (req: Request, res: Response) => {
  let Materia = await materiaServices.encontrarMateriaPorId(
    Number(req.params.id)
  );
  res.send(Materia);
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
  } catch (err: any) {
    console.error("error al agregar la materia: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID de la materia ya existe. Por favor, use un ID diferente (Duplicate entry)",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar la materia" });
    }
  }
});

//http://localhost:3001/api/materia/ <---- editar una materia
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idMateria, nombre, idDepartamento, creditos } = req.body;
    const modificado = await materiaServices.actualizarMateria({
      idMateria,
      nombre,
      idDepartamento,
      creditos,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar la materia", err);
    res.status(400).send({ error: "No se pudo actualizar la materia" });
  }
});

//http://localhost:3001/api/materia/ <---- eliminar una materia
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idMateria } = req.body;
    const eliminado = await materiaServices.eliminarMateria(idMateria);
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar la materia", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar la materia porque tiene registros asociados (foreign key constraint)",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar la materia" });
    }
  }
});

//exportamos las rutas
export default router;
