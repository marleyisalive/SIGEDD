import { ref } from "vue";
import type { Grupo } from "../interfaces/grupo-interface";
import {
  obtenerGrupos,
  obtenerGrupoPorId,
  crearGrupo,
  actualizarGrupo,
  eliminarGrupo,
} from "../api/grupoAPI";
import docenteApi from "../api/docenteAPI";
import materiaApi from "../api/materiaAPI";
import aulaApi from "../api/aulaAPI";
import usuarioApi from "../api/usuarioAPI";

export const useGrupo = () => {
  const grupo = ref<Grupo[]>([]);
  const grupos = ref<Grupo[]>([]);
  const docentes = ref<any[]>([]);
  const materias = ref<any[]>([]);
  const aulas = ref<any[]>([]);
  const usuarios = ref<any[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeGrupo = async () => {
    const data = await obtenerGrupos();
    grupos.value = data;
    return data;
  };

  const traeGrupoId = async (id: number) => {
    const data = await obtenerGrupoPorId(id);
    grupo.value = data;
    return data;
  };

  const traeDocentes = async () => {
    const response = await docenteApi.get("/");
    const docentesData = response.data;

    // Combinar docentes con usuarios para tener los nombres
    docentes.value = docentesData.map((docente: any) => {
      const usuario = usuarios.value.find(
        (u: any) => u.idUsuario === docente.idUsuario
      );
      return {
        ...docente,
        usuario: usuario || null,
      };
    });

    return docentes.value;
  };

  const traeMaterias = async () => {
    const response = await materiaApi.get("/");
    materias.value = response.data;
    return response.data;
  };

  const traeAulas = async () => {
    const response = await aulaApi.get("/");
    aulas.value = response.data;
    return response.data;
  };

  const traeUsuarios = async () => {
    const response = await usuarioApi.get("/");
    usuarios.value = response.data;
    return response.data;
  };

  const obtenerNombreDocente = async (idDocente: number) => {
    try {
      const response = await docenteApi.get(`/${idDocente}`);
      const docente = response.data[0];
      if (docente && docente.idUsuario) {
        const usuarioResponse = await usuarioApi.get(`/${docente.idUsuario}`);
        const usuario = usuarioResponse.data[0];
        return `${usuario.nombreUsuario} ${usuario.apePatUsuario} ${usuario.apeMatUsuario}`;
      }
      return "N/A";
    } catch (error) {
      console.error("Error obteniendo nombre del docente:", error);
      return "N/A";
    }
  };

  const obtenerNombreMateria = async (idMateria: number) => {
    try {
      const response = await materiaApi.get(`/${idMateria}`);
      const materia = response.data[0];
      return materia ? materia.nombre : "N/A";
    } catch (error) {
      console.error("Error obteniendo nombre de la materia:", error);
      return "N/A";
    }
  };

  const obtenerNombreAula = async (idAula: number) => {
    try {
      const response = await aulaApi.get(`/${idAula}`);
      const aula = response.data[0];
      return aula ? aula.nombre : "N/A";
    } catch (error) {
      console.error("Error obteniendo nombre del aula:", error);
      return "N/A";
    }
  };

  const agregarGrupo = async (grupoData: any) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await crearGrupo(grupoData);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el grupo:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del grupo ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar el grupo. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarGrupoData = async (id: number, grupoData: any) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await actualizarGrupo(id, grupoData);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al actualizar el grupo:", error);
      if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
      } else {
        mensajeError.value =
          "Error al actualizar el grupo. Intente nuevamente.";
      }
      mensaje.value = -1;
    }
  };

  const borrarGrupo = async (grupoData: any) => {
    try {
      mensajeError.value = "";
      const respuesta = await eliminarGrupo(grupoData.idGrupo);
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el grupo:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar este grupo porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al eliminar el grupo. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    grupo,
    grupos,
    docentes,
    materias,
    aulas,
    usuarios,
    mensaje,
    mensajeError,
    traeGrupo,
    traeGrupoId,
    traeDocentes,
    traeMaterias,
    traeAulas,
    traeUsuarios,
    obtenerNombreDocente,
    obtenerNombreMateria,
    obtenerNombreAula,
    agregarGrupo,
    actualizarGrupoData,
    borrarGrupo,
  };
};
