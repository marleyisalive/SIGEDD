import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const GrupoSchema = toTypedSchema(
  zod.object({
    idGrupo: zod
      .number({ message: "El ID del grupo es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del grupo es obligatorio"),
    idDocente: zod
      .number({ message: "El docente es obligatorio" })
      .int({ message: "El ID del docente debe ser un número entero" })
      .min(1, "Debe seleccionar un docente"),
    idMateria: zod
      .number({ message: "La materia es obligatoria" })
      .int({ message: "El ID de la materia debe ser un número entero" })
      .min(1, "Debe seleccionar una materia"),
    idAula: zod
      .number({ message: "El aula es obligatoria" })
      .int({ message: "El ID del aula debe ser un número entero" })
      .min(1, "Debe seleccionar un aula"),
    periodo: zod
      .string({ message: "Requerido" })
      .min(1, "El periodo es obligatorio")
      .max(50, "El periodo no puede exceder los 50 caracteres"),
    horario: zod
      .string({ message: "Requerido" })
      .min(1, "El horario es obligatorio")
      .max(50, "El horario no puede exceder los 50 caracteres"),
    numeroAlumnos: zod
      .number({ message: "El número de alumnos es obligatorio" })
      .int({ message: "El número de alumnos debe ser un número entero" })
      .min(1, "El número de alumnos debe ser mayor a 0"),
  })
);
