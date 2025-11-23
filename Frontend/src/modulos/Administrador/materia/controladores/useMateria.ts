import { ref } from "vue";
import type { Materia, Departamento } from "../interfaces/materia-interface";
import materiaApi from "../api/materiaAPI";
import departamentoApi from "../api/departamentoAPI";

export const useMateria = () => {
  const materia = ref<Materia[]>([]);
  const departamentos = ref<Departamento[]>([]);
  let mensaje = ref(0);
  let mensajeError = ref("");

  const traeMateria = async () => {
    try {
      const respuesta = await materiaApi.get<Materia[]>("/");
      materia.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar las materias:", error);
      materia.value = [];
    }
  };

  const traeMateriaId = async (idMateria: number) => {
    const respuesta = await materiaApi.get<Materia[]>("/" + idMateria);
    materia.value = respuesta.data;
  };

  const traeDepartamentos = async () => {
    try {
      const respuesta = await departamentoApi.get<Departamento[]>("/");
      departamentos.value = respuesta.data;
    } catch (error) {
      console.error("Error al cargar los departamentos:", error);
      departamentos.value = [];
    }
  };

  const obtenerNombreDepartamento = (idDepartamento: number | null) => {
    if (!idDepartamento) return "N/A";
    const departamento = departamentos.value.find(
      (d) => d.idDepartamento === idDepartamento
    );
    return departamento ? departamento.nombreDepartamento : "N/A";
  };

  const agregarMateria = async (materia: Materia) => {
    try {
      mensajeError.value = "";
      mensaje.value = 0;
      const respuesta = await materiaApi.post("/", materia);
      if (respuesta.data.affectedRows >= 1) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al agregar la materia:", error);
      if (
        error.response?.data?.error?.includes("Duplicate entry") ||
        error.response?.data?.error?.includes("duplicate key") ||
        error.response?.data?.error?.includes("ER_DUP_ENTRY")
      ) {
        mensajeError.value =
          "El ID de la materia ya existe. Por favor, use un ID diferente.";
        mensaje.value = -1;
      } else if (error.response?.data?.error) {
        mensajeError.value = error.response.data.error;
        mensaje.value = -1;
      } else {
        mensajeError.value = "Error al agregar la materia. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  const actualizarMateria = async (materia: Materia) => {
    const respuesta = await materiaApi.put("/", materia);
    if (respuesta.data.affectedRows >= 1) {
      mensaje.value = 1;
    }
  };

  const borrarMateria = async (materia: Materia) => {
    try {
      mensajeError.value = "";
      const respuesta = await materiaApi.delete("/", {
        data: { idMateria: materia.idMateria },
      });
      if (respuesta.data.fieldCount == 0) {
        mensaje.value = 1;
      }
    } catch (error: any) {
      console.error("Error al borrar la materia:", error);
      if (
        error.response?.data?.error?.includes("foreign key") ||
        error.response?.data?.error?.includes("REFERENCES") ||
        error.response?.status === 400
      ) {
        mensajeError.value =
          "No se puede eliminar esta materia porque tiene registros asociados. Elimine primero los registros relacionados.";
        mensaje.value = -1;
      } else {
        mensajeError.value =
          "Error al eliminar la materia. Intente nuevamente.";
        mensaje.value = -1;
      }
    }
  };

  return {
    materia,
    departamentos,
    mensaje,
    mensajeError,
    traeMateria,
    traeMateriaId,
    traeDepartamentos,
    obtenerNombreDepartamento,
    agregarMateria,
    actualizarMateria,
    borrarMateria,
  };
};
