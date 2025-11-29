import { ref } from "vue";
import type { Rol } from "../interfaces/rol-interface";
import rolApi from "../api/rolAPI";

export const useRol = () => {
  const rol = ref<Rol[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeRol = async () => {
    try {
      const respuesta = await rolApi.get<Rol[]>("/");
      rol.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los roles:", error);
      rol.value = [];
    }
  };

  const traeRolId = async (idRol: number) => {
    const respuesta = await rolApi.get<Rol[]>("/" + idRol);
    rol.value = respuesta.data;
  };

  const agregarRol = async (rol: Rol) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await rolApi.post("/", rol);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el rol:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del rol ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar el rol. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarRol = async (rol: Rol) => {
    const respuesta = await rolApi.put("/", rol);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarRol = async (rol: Rol) => {
    try {
      mensajeError.value = "";
      const respuesta = await rolApi.delete("/", {
        data: { idRol: rol.idRol },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el rol:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar este rol porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al eliminar el rol. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    rol,
    mensaje,
    mensajeError,
    traeRol,
    traeRolId,
    agregarRol,
    actualizarRol,
    borrarRol,
  };
};
