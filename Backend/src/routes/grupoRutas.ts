import express, { Request, Response } from "express";
import * as grupoServices from "../services/grupoServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/grupo/ <---- obtener todos los grupos
router.get("/", async (_req: Request, res: Response) => {
  try {
    let grupo = await grupoServices.obtieneGrupo();
    res.send(grupo);
  } catch (err) {
    console.log("no se puede obtener los grupos", err);
  }
});

//http://localhost:3001/api/aula/1 <---- obtener grupos por id
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let grupo = await grupoServices.encuentraGrupoPorId(Number(req.params.id));
    res.send(grupo);
  } catch (err) {
    console.log("no se puede obtener los grupos por id", err);
    res.status(400).send("Error al obtener los grupos por id");
  }
});

//http://localhost:3001/api/grupo/ insertar un nuevo grupo
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await grupoServices.agregarGrupo({
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el grupo: ", err);
    res.status(400).send({ error: "No se pudo agregar el grupo" });
  }
});

//http://localhost:3001/api/grupo/ <---- editar un grupo
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    } = req.body;
    const modificado = await grupoServices.actualizarGrupo({
      idGrupo,
      idDocente,
      idMateria,
      idAula,
      periodo,
      horario,
      numeroAlumnos,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al modificar el grupo: ", err);
    res.status(400).send({ error: "No se pudo modificar el grupo" });
  }
});

//http://localhost:3001/api/grupo/ <---- eliminar un grupo
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idGrupo } = req.body;
    const eliminado = await grupoServices.eliminarGrupo(idGrupo);
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el grupo", err);
    res.status(400).send({ error: "No se pudo eliminar el grupo" });
  }
});

export default router;
