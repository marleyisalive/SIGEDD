import { ref } from "vue";
import type { Aula } from "../interfaces/aula-interface";
import aulaApi from "../api/aulaAPI";

export const useAula = () => {
  const aula = ref<Aula[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeAula = async () => {
    try {
      const respuesta = await aulaApi.get<Aula[]>("/");
      aula.value = respuesta.data;
      //aula.value = [];
      //console.log(aula.value);
    } catch (error) {
      console.error("Error al cargar las aulas:", error);
      aula.value = [];
    }
  };

  const traeAulaId = async (idAula: number) => {
    const respuesta = await aulaApi.get<Aula[]>("/" + idAula);
    aula.value = respuesta.data;
  };

  const agregarAula = async (aula: Aula) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await aulaApi.post("/", aula);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el aula:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del aula ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar el aula. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarAula = async (aula: Aula) => {
    const respuesta = await aulaApi.put("/", aula);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarAula = async (aula: Aula) => {
    try {
      mensajeError.value = "";
      const respuesta = await aulaApi.delete("/", {
        data: { idAula: aula.idAula },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el aula:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar esta aula porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al eliminar el aula. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    aula,
    mensaje,
    mensajeError,
    traeAula,
    traeAulaId,
    agregarAula,
    actualizarAula,
    borrarAula,
  };
};
