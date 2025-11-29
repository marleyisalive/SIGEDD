import { ref } from "vue";
import type { Plaza } from "../interfaces/plaza-interface";
import plazaApi from "../api/plazaAPI";

export const usePlaza = () => {
  const plaza = ref<Plaza[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traePlaza = async () => {
    try {
      const respuesta = await plazaApi.get<Plaza[]>("/");
      plaza.value = respuesta.data;
      //plaza.value = [];
      //console.log(plaza.value);
    } catch (error) {
      console.error("Error al cargar las plazas:", error);
      plaza.value = [];
    }
  };

  const traePlazaId = async (idPlaza: number) => {
    const respuesta = await plazaApi.get<Plaza[]>("/" + idPlaza);
    plaza.value = respuesta.data;
  };

  const agregarPlaza = async (plaza: Plaza) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await plazaApi.post("/", plaza);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar la plaza:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID de la plaza ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar la plaza. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarPlaza = async (plaza: Plaza) => {
    const respuesta = await plazaApi.put("/", plaza);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarPlaza = async (plaza: Plaza) => {
    try {
      mensajeError.value = "";
      const respuesta = await plazaApi.delete("/", {
        data: { idPlaza: plaza.idPlaza },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar la plaza:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar esta plaza porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al eliminar la plaza. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    plaza,
    mensaje,
    mensajeError,
    traePlaza,
    traePlazaId,
    agregarPlaza,
    actualizarPlaza,
    borrarPlaza,
  };
};
