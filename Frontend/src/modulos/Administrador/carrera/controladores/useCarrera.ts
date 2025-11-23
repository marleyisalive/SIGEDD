import { ref } from "vue";
import type { Carrera } from "../interfaces/carrera-interface";
import carreraApi from "../api/carreraAPI";

export const useCarrera = () => {
  const carrera = ref<Carrera[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeCarrera = async () => {
    try {
      const respuesta = await carreraApi.get<Carrera[]>("/");
      carrera.value = respuesta.data;
      //carrera.value = [];
      //console.log(carrera.value);
    } catch (error) {
      console.error("Error al cargar las carreras:", error);
      carrera.value = [];
    }
  };

  const traeCarreraId = async (idCarrera: number) => {
    const respuesta = await carreraApi.get<Carrera[]>("/" + idCarrera);
    carrera.value = respuesta.data;
  };

  const agregarCarrera = async (carrera: Carrera) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await carreraApi.post("/", carrera);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar la carrera:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID de la carrera ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar la carrera. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarCarrera = async (carrera: Carrera) => {
    const respuesta = await carreraApi.put("/", carrera);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarCarrera = async (carrera: Carrera) => {
    try {
      mensajeError.value = "";
      const respuesta = await carreraApi.delete("/", {
        data: { idCarrera: carrera.idCarrera },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar la carrera:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar esta carrera porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar la carrera. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    carrera,
    mensaje,
    mensajeError,
    traeCarrera,
    traeCarreraId,
    agregarCarrera,
    actualizarCarrera,
    borrarCarrera,
  };
};
