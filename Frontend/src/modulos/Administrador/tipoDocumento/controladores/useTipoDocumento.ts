import { ref } from "vue";
import type { TipoDocumento } from "../interfaces/tipodocumento-interface";
import tipoDocumentoApi from "../api/tipoDocumentoAPI";

export const useTipoDocumento = () => {
  const tipoDocumento = ref<TipoDocumento[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeTipoDocumento = async () => {
    try {
      const respuesta = await tipoDocumentoApi.get<TipoDocumento[]>("/");
      tipoDocumento.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los tipos de documento:", error);
      tipoDocumento.value = [];
    }
  };

  const traeTipoDocumentoId = async (idTipoDocumento: number) => {
    const respuesta = await tipoDocumentoApi.get<TipoDocumento[]>(
      "/" + idTipoDocumento
    );
    tipoDocumento.value = respuesta.data;
  };

  const agregarTipoDocumento = async (tipoDoc: TipoDocumento) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;

      // Convertir la plantillaJSON de string a objeto antes de enviar
      const tipoDocParaEnviar = {
        ...tipoDoc,
        plantillaJSON: JSON.parse(tipoDoc.plantillaJSON),
      };

      const respuesta = await tipoDocumentoApi.post("/", tipoDocParaEnviar);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el tipo de documento:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del tipo de documento ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al agregar el tipo de documento. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarTipoDocumento = async (tipoDoc: TipoDocumento) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;

      // Convertir la plantillaJSON de string a objeto antes de enviar
      const tipoDocParaEnviar = {
        ...tipoDoc,
        plantillaJSON: JSON.parse(tipoDoc.plantillaJSON),
      };

      const respuesta = await tipoDocumentoApi.put("/", tipoDocParaEnviar);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al actualizar el tipo de documento:", error);
      if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al actualizar el tipo de documento. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const borrarTipoDocumento = async (tipoDoc: TipoDocumento) => {
    try {
      mensajeError.value = "";
      const respuesta = await tipoDocumentoApi.delete("/", {
        data: { idTipoDocumento: tipoDoc.idTipoDocumento },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el tipo de documento:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar este tipo de documento porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar el tipo de documento. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  // Helper para obtener la cantidad de campos del JSON
  const obtenerCantidadCampos = (plantillaJSON: string): number => {
    try {
      const parsed = JSON.parse(plantillaJSON);
      if (parsed.campos && Array.isArray(parsed.campos)) {
        return parsed.campos.length;
      }
      return 0;
    } catch {
      return 0;
    }
  };

  // Helper para formatear el JSON para visualización
  const formatearJSON = (plantillaJSON: string): string => {
    try {
      const parsed = JSON.parse(plantillaJSON);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return plantillaJSON;
    }
  };

  return {
    tipoDocumento,
    mensaje,
    mensajeError,
    traeTipoDocumento,
    traeTipoDocumentoId,
    agregarTipoDocumento,
    actualizarTipoDocumento,
    borrarTipoDocumento,
    obtenerCantidadCampos,
    formatearJSON,
  };
};
