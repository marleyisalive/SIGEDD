import express, { Request, Response } from "express";
import * as carreraServices from "../services/carreraServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/carrera/ <---- obtener todas las carreras
router.get("/", async (_req: Request, res: Response) => {
  let carrera = await carreraServices.obtieneCarrera();
  res.send(carrera);
});

//http://localhost:3001/api/carrera/1 <---- busqueda por el id de la carrera
router.get("/:id", async (req: Request, res: Response) => {
  let Carrera = await carreraServices.encuentraCarreraPorId(
    Number(req.params.id)
  );
  res.send(Carrera);
});

//http://localhost:3001/api/carrera/ insertar una nueva carrera
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idCarrera, nombre, acreditado } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await carreraServices.agregarCarrera({
      idCarrera,
      nombre,
      acreditado,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar la carrera: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID de la carrera ya existe. Por favor, use un ID diferente (Duplicate entry)",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar la carrera" });
    }
  }
});

//http://localhost:3001/api/carrera/ <---- editar una carrera
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idCarrera, nombre, acreditado } = req.body;
    const modificado = await carreraServices.actualizarCarrera({
      idCarrera,
      nombre,
      acreditado,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar la carrera", err);
    res.status(400).send({ error: "No se pudo actualizar la carrera" });
  }
});

//http://localhost:3001/api/carrera/ <---- eliminar una carrera
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idCarrera } = req.body;
    const eliminado = await carreraServices.eliminarCarrera(idCarrera);
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar la carrera", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar la carrera porque tiene registros asociados (foreign key constraint)",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar la carrera" });
    }
  }
});

//exportamos las rutas
export default router;
