import { ref } from "vue";
import type { Usuario, Rol } from "../interfaces/usuario-interface";
import usuarioApi from "../api/usuarioAPI";
import rolApi from "../api/rolAPI";

export const useUsuario = () => {
  const usuario = ref<Usuario[]>([]);
  const roles = ref<Rol[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeUsuario = async () => {
    try {
      const respuesta = await usuarioApi.get<Usuario[]>("/");
      usuario.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
      usuario.value = [];
    }
  };

  const traeUsuarioId = async (idUsuario: number) => {
    const respuesta = await usuarioApi.get<Usuario[]>("/" + idUsuario);
    usuario.value = respuesta.data;
  };

  const traeRoles = async () => {
    try {
      const respuesta = await rolApi.get<Rol[]>("/");
      roles.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los roles:", error);
      roles.value = [];
    }
  };

  const obtenerDescripcionRol = (idRol: number | null) => {
    if (!idRol) return "N/A";
    const rol = roles.value.find((r) => r.idRol === idRol);
    return rol ? rol.descripcion : "N/A";
  };

  const agregarUsuario = async (usuario: Usuario) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await usuarioApi.post("/", usuario);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el usuario:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del usuario ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar el usuario. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarUsuario = async (usuario: Usuario) => {
    const respuesta = await usuarioApi.put("/", usuario);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarUsuario = async (usuario: Usuario) => {
    try {
      mensajeError.value = "";
      const respuesta = await usuarioApi.delete("/", {
        data: { idUsuario: usuario.idUsuario },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el usuario:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar este usuario porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar el usuario. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    usuario,
    roles,
    mensaje,
    mensajeError,
    traeUsuario,
    traeUsuarioId,
    traeRoles,
    obtenerDescripcionRol,
    agregarUsuario,
    actualizarUsuario,
    borrarUsuario,
  };
};
