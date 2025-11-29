import { ref } from "vue";
import { useRouter } from "vue-router";
import docenteApi from "../api/docenteAPI";
import usuarioApi from "../api/usuarioAPI";
import nivelEstudioApi from "../api/nivelEstudioAPI";
import departamentoApi from "../api/departamentoAPI";
import plazaApi from "../api/plazaAPI";
import type { Docente } from "../interfaces/docente-interface";

export const useDocente = () => {
  const docente = ref<Docente[]>([]);
  const usuarios = ref<any[]>([]);
  const niveles = ref<any[]>([]);
  const departamentos = ref<any[]>([]);
  const plazas = ref<any[]>([]);
  const mensaje = ref(0);
  const mensajeError = ref("");

  const router = useRouter();

  const traeDocente = async () => {
    const respuesta = await docenteApi.get("/");
    docente.value = respuesta.data;
  };

  const traeDocenteId = async (idDocente: number) => {
    const respuesta = await docenteApi.get("/" + idDocente);
    docente.value = respuesta.data;
  };

  const traeUsuarios = async () => {
    const respuesta = await usuarioApi.get("/");
    usuarios.value = respuesta.data;
  };

  const traeNiveles = async () => {
    const respuesta = await nivelEstudioApi.get("/");
    niveles.value = respuesta.data;
  };

  const traeDepartamentos = async () => {
    const respuesta = await departamentoApi.get("/");
    departamentos.value = respuesta.data;
  };

  const traePlazas = async () => {
    const respuesta = await plazaApi.get("/");
    plazas.value = respuesta.data;
  };

  const obtenerNombreUsuario = (idUsuario: number | null) => {
    if (!idUsuario) return "N/A";
    const usuario = usuarios.value.find((u) => u.idUsuario === idUsuario);
    return usuario
      ? `${usuario.nombreUsuario} ${usuario.apePatUsuario} ${usuario.apeMatUsuario}`
      : "N/A";
  };

  const obtenerNombreNivel = (idNivelEstudio: number | null) => {
    if (!idNivelEstudio) return "N/A";
    const nivel = niveles.value.find((n) => n.idNivelEstudio == idNivelEstudio);
    return nivel ? nivel.nombre : "N/A";
  };

  const obtenerNombreDepartamento = (idDepartamento: number | null) => {
    if (!idDepartamento) return "N/A";
    const departamento = departamentos.value.find(
      (d) => d.idDepartamento === idDepartamento
    );
    return departamento ? departamento.nombreDepartamento : "N/A";
  };

  const obtenerNombrePlaza = (idPlaza: number | null) => {
    if (!idPlaza) return "N/A";
    const plaza = plazas.value.find((p) => p.idPlaza === idPlaza);
    return plaza ? plaza.descripcion : "N/A";
  };

  const agregarDocente = async (docenteNuevo: Docente) => {
    try {
      mensaje.value = 0;
      mensajeError.value = "";
      await docenteApi.post("/", docenteNuevo);
      mensaje.value = 1;
      setTimeout(() => {
        router.push("/docente");
      }, 2000);
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        if (
          error.response.data.error.includes("ID del docente ya existe") ||
          error.response.data.error.includes("Duplicate entry")
        ) {
          mensajeError.value =
            "El ID del docente ya existe. Por favor, utiliza otro ID.";
        } else {
          mensajeError.value = error.response.data.error;
        }
      } else {
        mensajeError.value = "Error al agregar el docente";
      }
    }
  };

  const actualizarDocente = async (docenteModificado: Docente) => {
    try {
      mensaje.value = 0;
      mensajeError.value = "";
      await docenteApi.put("/", docenteModificado);
      mensaje.value = 1;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        mensajeError.value = error.response.data.error;
      } else {
        mensajeError.value = "Error al actualizar el docente";
      }
    }
  };

  const borrarDocente = async (docenteBorrar: Docente) => {
    try {
      mensaje.value = 0;
      mensajeError.value = "";
      await docenteApi.delete("/", { data: docenteBorrar });
      mensaje.value = 1;
    } catch (error: any) {
      console.log(error);
      if (error.response && error.response.data && error.response.data.error) {
        if (
          error.response.data.error.includes(
            "está siendo utilizado en otros registros"
          ) ||
          error.response.data.error.includes("foreign key constraint fails")
        ) {
          mensajeError.value =
            "No se puede eliminar el docente porque está siendo utilizado en otros registros (grupos, actividades, etc.).";
        } else {
          mensajeError.value = error.response.data.error;
        }
      } else {
        mensajeError.value = "Error al eliminar el docente";
      }
    }
  };

  return {
    traeDocente,
    traeDocenteId,
    traeUsuarios,
    traeNiveles,
    traeDepartamentos,
    traePlazas,
    obtenerNombreUsuario,
    obtenerNombreNivel,
    obtenerNombreDepartamento,
    obtenerNombrePlaza,
    agregarDocente,
    actualizarDocente,
    borrarDocente,
    docente,
    usuarios,
    niveles,
    departamentos,
    plazas,
    mensaje,
    mensajeError,
  };
};
