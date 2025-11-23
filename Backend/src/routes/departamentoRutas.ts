import express, { Request, Response } from "express";
import * as departamentoServices from "../services/departamentoServices";
//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/departamento/ <---- obtener todos los departamento
router.get("/", async (_req: Request, res: Response) => {
  let departamento = await departamentoServices.obtieneDepartamento();
  res.send(departamento);
});

//http://localhost:3001/api/departamento/1 <---- busqueda por el id del departamento
router.get("/:id", async (req: Request, res: Response) => {
  let departamento = await departamentoServices.encuentraDepartamentoPorId(
    Number(req.params.id)
  );
  res.send(departamento);
});

//http://localhost:3001/api/departamento/ insertar un nuevo departamento
router.post("/", async (req: Request, res: Response) => {
  try {
    const { idDepartamento, nombreDepartamento, encargadoDepartamento } =
      req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await departamentoServices.agregarDepartamento({
      idDepartamento,
      nombreDepartamento,
      encargadoDepartamento,
    });
    res.send(nuevo);
  } catch (err: any) {
    console.error("error al agregar el departamento: ", err);

    // Verificar si es un error de entrada duplicada
    if (err.code === "ER_DUP_ENTRY" || err.errno === 1062) {
      res.status(400).send({
        error:
          "El ID del departamento ya existe. Por favor, use un ID diferente (Duplicate entry)",
      });
    } else {
      res.status(400).send({ error: "No se pudo agregar el departamento" });
    }
  }
});

//http://localhost:3001/api/departamento/ <---- editar un departamento
router.put("/", async (req: Request, res: Response) => {
  try {
    const { idDepartamento, nombreDepartamento, encargadoDepartamento } =
      req.body;
    const modificado = await departamentoServices.actualizarDepartamento({
      idDepartamento,
      nombreDepartamento,
      encargadoDepartamento,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el departamento", err);
    res.status(400).send({ error: "No se pudo actualizar el departamento" });
  }
});

//http://localhost:3001/api/departamento/ <---- eliminar un departamento
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idDepartamento } = req.body;
    const eliminado = await departamentoServices.eliminarDepartamento(
      idDepartamento
    );
    res.send(eliminado);
  } catch (err: any) {
    console.error("error al eliminar el departamento", err);

    // Verificar si es un error de clave foránea
    if (err.code === "ER_ROW_IS_REFERENCED_2" || err.errno === 1451) {
      res.status(400).send({
        error:
          "No se puede eliminar el departamento porque tiene registros asociados (foreign key constraint)",
      });
    } else {
      res.status(400).send({ error: "No se pudo eliminar el departamento" });
    }
  }
});

//exportamos las rutas
export default router;
