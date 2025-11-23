import express, { Request, Response } from "express";
import * as nivelEstudioServices from "../services/nivelEstudioServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/nivelEstudio/ <---- obtener todos los niveles de estudio
router.get("/", async (_req: Request, res: Response) => {
  let nivelEstudio = await nivelEstudioServices.obtieneNivelEstudio();
  res.send(nivelEstudio);
});

//http://localhost:3001/api/nivelEstudio/1 <---- busqueda por el id del nivel de estudio
router.get("/:id", async (req: Request, res: Response) => {
  let nivelEstudio = await nivelEstudioServices.encuentraNivelEstudioPorId(
    Number(req.params.id)
  );
  res.send(nivelEstudio);
});

//http://localhost:3001/api/nivelEstudio/ insertar un nuevo nivel de estudio
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idNivelEstudio, nombre } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await nivelEstudioServices.agregarNivelEstudio({
      idNivelEstudio,
      nombre,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar el nivel de estudio: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID del nivel de estudio ya existe. Por favor, use un ID diferente (Duplicate entry)",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar el nivel de estudio" });
    }
  }
});

//http://localhost:3001/api/nivelEstudio/ <---- editar un nivel de estudio
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idNivelEstudio, nombre } = req.body;
    const modificado = await nivelEstudioServices.actualizarNivelEstudio({
      idNivelEstudio,
      nombre,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el nivel de estudio", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar el nivel de estudio" });
  }
});

//http://localhost:3001/api/nivelEstudio/ <---- eliminar un nivel de estudio
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idNivelEstudio } = req.body;
    const eliminado = await nivelEstudioServices.eliminarNivelEstudio(
      idNivelEstudio
    );
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar el nivel de estudio", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el nivel de estudio porque tiene registros asociados (foreign key constraint)",
      });
    } else {
      res
        .status(400)
        .send({ error: "No se pudo eliminar el nivel de estudio" });
    }
  }
});

//exportamos las rutas
export default router;
