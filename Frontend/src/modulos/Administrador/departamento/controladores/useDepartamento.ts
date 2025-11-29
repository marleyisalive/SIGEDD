import { ref } from "vue";
import type { Departamento } from "../interfaces/departamento-interface";
import departamentoApi from "../api/departamentoAPI";
import usuarioApi from "../api/usuarioAPI";

export const useDepartamento = () => {
  const departamento = ref<Departamento[]>([]);
  const usuarios = ref<any[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeDepartamento = async () => {
    try {
      const respuesta = await departamentoApi.get<Departamento[]>("/");
      departamento.value = respuesta.data;
      //departamento.value = [];
      //console.log(departamento.value);
    } catch (error) {
      console.error("Error al cargar los departamentos:", error);
      departamento.value = [];
    }
  };

  const traeDepartamentoId = async (idDepartamento: number) => {
    const respuesta = await departamentoApi.get<Departamento[]>(
      "/" + idDepartamento
    );
    departamento.value = respuesta.data;
  };

  const agregarDepartamento = async (departamento: Departamento) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await departamentoApi.post("/", departamento);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar el departamento:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID del departamento ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al agregar el departamento. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarDepartamento = async (departamento: Departamento) => {
    const respuesta = await departamentoApi.put("/", departamento);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarDepartamento = async (departamento: Departamento) => {
    try {
      mensajeError.value = "";
      const respuesta = await departamentoApi.delete("/", {
        data: { idDepartamento: departamento.idDepartamento },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar el departamento:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar este departamento porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar el departamento. Intente nuevamente.";
        mensaje.value = -1;
      }
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

  const obtenerNombreUsuario = (idUsuario: number | null) => {
    if (!idUsuario) return "N/A";
    const usuario = usuarios.value.find((u) => u.idUsuario === idUsuario);
    return usuario
      ? `${usuario.nombreUsuario} ${usuario.apePatUsuario} ${usuario.apeMatUsuario}`
      : "N/A";
  };

  return {
    departamento,
    usuarios,
    mensaje,
    mensajeError,
    traeDepartamento,
    traeDepartamentoId,
    traeUsuarios,
    obtenerNombreUsuario,
    agregarDepartamento,
    actualizarDepartamento,
    borrarDepartamento,
  };
};
