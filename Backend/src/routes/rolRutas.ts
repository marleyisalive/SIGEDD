import express, { Request, Response } from "express";
import * as rolServices from "../services/rolServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/rol/ <---- obtener todos los rol
router.get("/", async (_req: Request, res: Response) => {
  let rol = await rolServices.obtieneRol();
  res.send(rol);
});

//http://localhost:3001/api/rol/1 <---- busqueda por el id del rol
router.get("/:id", async (req: Request, res: Response) => {
  let rol = await rolServices.encuentraRolPorId(Number(req.params.id));
  res.send(rol);
});

//http://localhost:3001/api/rol/ insertar un nuevo rol
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idRol, descripcion } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await rolServices.agregarRol({
      idRol,
      descripcion,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar el rol: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error: "El ID del rol ya existe. Por favor, use un ID diferente.",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar el rol" });
    }
  }
});

//http://localhost:3001/api/rol/ <---- editar un rol
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idRol, descripcion } = req.body;
    const modificado = await rolServices.actualizarRol({
      idRol,
      descripcion,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el rol", err);
    res.status(400).send({ error: "No se pudo actualizar el rol" });
  }
});

//http://localhost:3001/api/rol/ <---- eliminar un rol
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idRol } = req.body;
    const eliminado = await rolServices.eliminarRol(idRol);
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar el rol", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el rol porque tiene registros asociados. Elimine primero los registros relacionados.",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el rol" });
    }
  }
});

//exportamos las rutas
export default router;
