import { ref } from "vue";
import type { NivelEstudio } from "../interfaces/nivelEstudio-interface";
import nivelEstudioApi from "../api/nivelEstudioAPI";

export const useNivelEstudio = () => {
  const nivelEstudio = ref<NivelEstudio[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeNivelEstudio = async () => {
    try {
      const respuesta = await nivelEstudioApi.get<NivelEstudio[]>("/");
      nivelEstudio.value = respuesta.data;
      //nivelEstudio.value = [];
      //console.log(nivelEstudio.value);
    } catch (error) {
      console.error("Error al cargar los niveles de estudio:", error);
      nivelEstudio.value = [];
    }
  };

  const traeNivelEstudioId = async (idNivelEstudio: number) => {
    const respuesta = await nivelEstudioApi.get<NivelEstudio[]>(
      "/" + idNivelEstudio
    );
    nivelEstudio.value = respuesta.data;
  };

  const agregarNivelEstudio = async (nivelEstudio: NivelEstudio) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await nivelEstudioApi.post("/", nivelEstudio);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el nivel de estudio:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del nivel de estudio ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al agregar el nivel de estudio. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarNivelEstudio = async (nivelEstudio: NivelEstudio) => {
    const respuesta = await nivelEstudioApi.put("/", nivelEstudio);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarNivelEstudio = async (nivelEstudio: NivelEstudio) => {
    try {
      mensajeError.value = "";
      const respuesta = await nivelEstudioApi.delete("/", {
        data: { idNivelEstudio: nivelEstudio.idNivelEstudio },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el nivel de estudio:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar este nivel de estudio porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar el nivel de estudio. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    nivelEstudio,
    mensaje,
    mensajeError,
    traeNivelEstudio,
    traeNivelEstudioId,
    agregarNivelEstudio,
    actualizarNivelEstudio,
    borrarNivelEstudio,
  };
};
