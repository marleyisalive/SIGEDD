import * as zod from "zod";
import { toTypedSchema } from "@vee-validate/zod";

export const DocenteActividadSchema = toTypedSchema(
  zod.object({
    idDocenteActividad: zod
      .number({ message: "El ID debe ser un número" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, { message: "El ID debe ser mayor que 0" }),
    idActividadInstitucional: zod
      .number({ message: "Debe seleccionar una actividad institucional" })
      .int({ message: "Debe seleccionar una actividad institucional válida" })
      .min(1, { message: "Debe seleccionar una actividad institucional" }),
    idDocente: zod
      .number({ message: "Debe seleccionar un docente" })
      .int({ message: "Debe seleccionar un docente válido" })
      .min(1, { message: "Debe seleccionar un docente" }),
    datosCapturados: zod
      .string({ message: "Los datos capturados son requeridos" })
      .min(1, { message: "Los datos capturados no pueden estar vacíos" }),
    fechaRegistro: zod.string().optional(),
    validadoPor: zod.number().optional(),
    fechaValidacion: zod.string().optional(),
  })
);
