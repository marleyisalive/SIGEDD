import { ref } from "vue";
import type { DocenteActividad } from "../interfaces/docenteActividad-interface";
import docenteActividadApi from "../api/docenteActividadAPI";
import actividadInstitucionalApi from "../api/actividadInstitucionalAPI";
import docenteApi from "../api/docenteAPI";
import usuarioApi from "../api/usuarioAPI";
import tipoDocumentoApi from "../api/tipoDocumentoAPI";

export const useDocenteActividad = () => {
  const docenteActividad = ref<DocenteActividad[]>([]);
  const actividadesInstitucionales = ref<any[]>([]);
  const docentes = ref<any[]>([]);
  const usuarios = ref<any[]>([]);
  const tiposDocumento = ref<any[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeDocenteActividad = async () => {
    try {
      const respuesta = await docenteActividadApi.get<DocenteActividad[]>("/");
      docenteActividad.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar las actividades de docente:", error);
      docenteActividad.value = [];
    }
  };

  const traeDocenteActividadId = async (idDocenteActividad: number) => {
    const respuesta = await docenteActividadApi.get<DocenteActividad[]>(
      "/" + idDocenteActividad
    );
    docenteActividad.value = respuesta.data;
  };

  const agregarDocenteActividad = async (docenteAct: DocenteActividad) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;

      // Convertir datosCapturados de string a objeto antes de enviar
      const docenteActParaEnviar = {
        ...docenteAct,
        datosCapturados: JSON.parse(docenteAct.datosCapturados),
      };

      const respuesta = await docenteActividadApi.post(
        "/",
        docenteActParaEnviar
      );
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar la actividad de docente:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID de la actividad de docente ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al agregar la actividad de docente. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarDocenteActividad = async (docenteAct: DocenteActividad) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;

      // Convertir datosCapturados de string a objeto antes de enviar
      const docenteActParaEnviar = {
        ...docenteAct,
        datosCapturados: JSON.parse(docenteAct.datosCapturados),
      };

      const respuesta = await docenteActividadApi.put(
        "/",
        docenteActParaEnviar
      );
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al actualizar la actividad de docente:", error);
      if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al actualizar la actividad de docente. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const borrarDocenteActividad = async (docenteAct: DocenteActividad) => {
    try {
      mensajeError.value = "";
      const respuesta = await docenteActividadApi.delete("/", {
        data: { idDocenteActividad: docenteAct.idDocenteActividad },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar la actividad de docente:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar esta actividad de docente porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar la actividad de docente. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const traeActividadesInstitucionales = async () => {
    try {
      const respuesta = await actividadInstitucionalApi.get("/");
      actividadesInstitucionales.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar las actividades institucionales:", error);
      actividadesInstitucionales.value = [];
    }
  };

  const traeDocentes = async () => {
    try {
      const respuesta = await docenteApi.get("/");
      docentes.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los docentes:", error);
      docentes.value = [];
    }
  };

  const traeUsuarios = async () => {
    try {
      const respuesta = await usuarioApi.get("/");
      usuarios.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los usuarios:", error);
      usuarios.value = [];
    }
  };

  const obtenerNombreActividadInstitucional = (
    idActividadInstitucional: number | null
  ) => {
    if (!idActividadInstitucional) return "N/A";
    const actividad = actividadesInstitucionales.value.find(
      (a) => a.idActividadInstitucional === idActividadInstitucional
    );
    return actividad ? actividad.nombre : "N/A";
  };

  const obtenerNombreDocente = (idDocente: number | null) => {
    if (!idDocente) return "N/A";
    const docente = docentes.value.find((d) => d.idDocente === idDocente);
    if (!docente) return "N/A";
    // Buscar el usuario asociado al docente
    const usuario = usuarios.value.find(
      (u) => u.idUsuario === docente.idUsuario
    );
    if (!usuario) return "N/A";
    return `${usuario.nombreUsuario} ${usuario.apePatUsuario || ""} ${
      usuario.apeMatUsuario || ""
    }`.trim();
  };

  const obtenerNombreUsuario = (idUsuario: number | null) => {
    if (!idUsuario) return "N/A";
    const usuario = usuarios.value.find((u) => u.idUsuario === idUsuario);
    if (!usuario) return "N/A";
    return `${usuario.nombreUsuario} ${usuario.apePatUsuario || ""} ${
      usuario.apeMatUsuario || ""
    }`.trim();
  };

  // Helper para obtener la cantidad de campos del JSON
  const obtenerCantidadCampos = (datosCapturados: string): number => {
    try {
      const parsed = JSON.parse(datosCapturados);
      return Object.keys(parsed).length;
    } catch {
      return 0;
    }
  };

  // Helper para formatear el JSON para visualización
  const formatearJSON = (datosCapturados: string): string => {
    try {
      const parsed = JSON.parse(datosCapturados);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return datosCapturados;
    }
  };

  // Helper para formatear fecha
  const formatearFecha = (fecha: string | null | undefined): string => {
    if (!fecha) return "N/A";
    try {
      const date = new Date(fecha);
      return date.toLocaleString("es-MX", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "N/A";
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

  const obtenerCamposPlantilla = (
    idActividadInstitucional: number | null
  ): string[] => {
    if (!idActividadInstitucional) return [];
    const actividad = actividadesInstitucionales.value.find(
      (a) => a.idActividadInstitucional === idActividadInstitucional
    );
    if (!actividad) return [];

    const tipoDoc = tiposDocumento.value.find(
      (t) => t.idTipoDocumento === actividad.idTipoDocumento
    );
    if (!tipoDoc || !tipoDoc.plantillaJSON) return [];

    try {
      const plantilla =
        typeof tipoDoc.plantillaJSON === "string"
          ? JSON.parse(tipoDoc.plantillaJSON)
          : tipoDoc.plantillaJSON;
      return plantilla.campos || [];
    } catch {
      return [];
    }
  };

  return {
    docenteActividad,
    actividadesInstitucionales,
    docentes,
    usuarios,
    tiposDocumento,
    mensaje,
    mensajeError,
    traeDocenteActividad,
    traeDocenteActividadId,
    traeActividadesInstitucionales,
    traeDocentes,
    traeUsuarios,
    traeTiposDocumento,
    obtenerNombreActividadInstitucional,
    obtenerNombreDocente,
    obtenerNombreUsuario,
    obtenerCamposPlantilla,
    agregarDocenteActividad,
    actualizarDocenteActividad,
    borrarDocenteActividad,
    obtenerCantidadCampos,
    formatearJSON,
    formatearFecha,
  };
};
