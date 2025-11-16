import express, { Request, Response } from "express";
import * as usuarioServices from "../services/usuarioServices";

//activamos las rutas
const router = express.Router();

//http://localhost:3001/api/usuario/ <---- obtener todos los usuarios
router.get("/", async (_req: Request, res: Response) => {
  try {
    let usuario = await usuarioServices.obtieneUsuario();
    res.send(usuario);
  } catch (err) {
    console.error("error al obtener los usuarios: ", err);
    res.status(400).send({ error: "No se pudieron obtener los usuarios" });
  }
});

//http://localhost:3001/api/usuario/1 <---- busqueda por el id del usuario
router.get("/:id", async (req: Request, res: Response) => {
  try {
    let usuario = await usuarioServices.encuentraUsuarioPorId(
      Number(req.params.id)
    );
    res.send(usuario);
  } catch (err) {
    console.error("error al obtener el usuario por id: ", err);
    res.status(400).send({ error: "No se pudo obtener el usuario por id" });
  }
});

//http://localhost:3001/api/usuario/ insertar un nuevo usuario
router.post("/", async (req: Request, res: Response) => {
  try {
    const {
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    } = req.body; // desestructuring
    //enviamos un objeto con los datos al servicio
    const nuevo = await usuarioServices.agregarUsuario({
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    });
    res.send(nuevo);
  } catch (err) {
    console.error("error al agregar el usuario: ", err);
    res.status(400).send({ error: "No se pudo agregar el usuario" });
  }
});

//http://localhost:3001/api/usuario/ <---- editar un usuario
router.put("/", async (req: Request, res: Response) => {
  try {
    const {
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    } = req.body;
    const modificado = await usuarioServices.actualizarUsuario({
      idUsuario,
      nombreUsuario,
      apePatUsuario,
      apeMatUsuario,
      telefono,
      correoUsuario,
      contrasenaUsuario,
      estatus,
      idRol,
    });
    res.send(modificado);
  } catch (err) {
    console.error("error al actualizar el usuario", err);
    res.status(400).send({ error: "No se pudo actualizar el usuario" });
  }
});

//http://localhost:3001/api/usuario/ <---- eliminar un usuario
router.delete("/", async (req: Request, res: Response) => {
  try {
    const { idUsuario } = req.body;
    const eliminado = await usuarioServices.eliminarUsuario(idUsuario);
    res.send(eliminado);
  } catch (err) {
    console.error("error al eliminar el usuario", err);
    res.status(400).send({ error: "No se pudo eliminar el usuario" });
  }
});

//exportamos las rutas
export default router;
