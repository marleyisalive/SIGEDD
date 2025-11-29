import express from "express";
import { encuentraUsuarioPorCorreo } from "../services/usuarioServices";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { encontrarDocentePorUsuario } from "../services/docenteServices";

const router = express.Router();

// POST /api/auth/login
router.post("/login", async (req, res) => {
  try {
    const { correoUsuario, contrasena } = req.body;
    if (!correoUsuario || !contrasena) {
      return res.status(400).send({ error: "Faltan credenciales" });
    }

    const usuario: any = await encuentraUsuarioPorCorreo(correoUsuario);
    if (!usuario) return res.status(401).send({ error: "Credenciales inválidas" });

    const hash = usuario.contrasenaUsuario;

    let ok = false;
    // Si el campo parece un hash bcrypt, usar compare; si no, comparar en texto plano (migración)
    if (typeof hash === "string" && hash.startsWith("$2")) {
      ok = await bcrypt.compare(contrasena, hash);
    } else {
      ok = contrasena === hash;
    }

    if (!ok) return res.status(401).send({ error: "Credenciales inválidas" });

    // Si el usuario está desactivado -> mensaje claro
    if (usuario.estatus === 0)
      return res
        .status(403)
        .send({ error: "El docente no esta activo actualmente, comunicate con el administrador" });

    // Validaciones específicas para docentes (idRol === 2)
    if (usuario.idRol === 2) {
      const docente: any = await encontrarDocentePorUsuario(usuario.idUsuario);

      // Si no existe registro de docente o folioEdd es nulo -> no participa
      if (!docente || !docente.folioEdd)
        return res.status(403).send({ error: "El docente no esta participando en la convocatoria, comunicate con el administrador" });

      // Si la plaza del docente no es tiempo completo (381700) -> no cumple horas
      if (docente.idPlaza !== 381700)
        return res.status(403).send({ error: "No puedes iniciar sesion ya que no cumples con la cantidad minima de horas, comunicate el administrador" });
    }

    // Construir payload y firmar JWT
    const payload = {
      idUsuario: usuario.idUsuario,
      idRol: usuario.idRol,
    };

    const secret = process.env.JWT_SECRET || "cambiar_esta_clave_en_produccion";
    const token = jwt.sign(payload, secret, { expiresIn: "8h" });

    // No enviar la contraseña al cliente
    delete usuario.contrasenaUsuario;

    return res.send({ token, usuario });
  } catch (err) {
    console.error("error en login: ", err);
    return res.status(500).send({ error: "Error interno" });
  }
});

export default router;
