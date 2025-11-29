import { ref } from "vue";
import type { ActividadInstitucional } from "../interfaces/actividadInstitucional-interface";
import actividadInstitucionalApi from "../api/actividadInstitucionalAPI";
import tipoDocumentoApi from "../api/tipoDocumentoAPI";

export const useActividadInstitucional = () => {
  const actividadInstitucional = ref<ActividadInstitucional[]>([]);
  const tiposDocumento = ref<any[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeActividadInstitucional = async () => {
    try {
      const respuesta = await actividadInstitucionalApi.get<
        ActividadInstitucional[]
      >("/");
      actividadInstitucional.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar las actividades institucionales:", error);
      actividadInstitucional.value = [];
    }
  };

  const traeActividadInstitucionalId = async (
    idActividadInstitucional: number
  ) => {
    const respuesta = await actividadInstitucionalApi.get<
      ActividadInstitucional[]
    >("/" + idActividadInstitucional);
    actividadInstitucional.value = respuesta.data;
  };

  const agregarActividadInstitucional = async (
    actividad: ActividadInstitucional
  ) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await actividadInstitucionalApi.post("/", actividad);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar la actividad institucional:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID de la actividad institucional ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al agregar la actividad institucional. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarActividadInstitucional = async (
    actividad: ActividadInstitucional
  ) => {
    const respuesta = await actividadInstitucionalApi.put("/", actividad);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarActividadInstitucional = async (
    actividad: ActividadInstitucional
  ) => {
    try {
      mensajeError.value = "";
      const respuesta = await actividadInstitucionalApi.delete("/", {
        data: {
          idActividadInstitucional: actividad.idActividadInstitucional,
        },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar la actividad institucional:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar esta actividad institucional porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar la actividad institucional. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const traeTiposDocumento = async () => {
    try {
      const respuesta = await tipoDocumentoApi.get("/");
      tiposDocumento.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los tipos de documento:", error);
      tiposDocumento.value = [];
    }
  };

  const obtenerNombreTipoDocumento = (idTipoDocumento: number | null) => {
    if (!idTipoDocumento) return "N/A";
    const tipoDoc = tiposDocumento.value.find(
      (t) => t.idTipoDocumento === idTipoDocumento
    );
    return tipoDoc ? `${tipoDoc.nombre} - ${tipoDoc.idTipoDocumento}` : "N/A";
  };

  return {
    actividadInstitucional,
    tiposDocumento,
    mensaje,
    mensajeError,
    traeActividadInstitucional,
    traeActividadInstitucionalId,
    traeTiposDocumento,
    obtenerNombreTipoDocumento,
    agregarActividadInstitucional,
    actualizarActividadInstitucional,
    borrarActividadInstitucional,
  };
};
