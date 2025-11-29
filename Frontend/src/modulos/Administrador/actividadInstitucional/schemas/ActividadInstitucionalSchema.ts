import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const ActividadInstitucionalSchema = toTypedSchema(
  zod
    .object({
      idActividadInstitucional: zod
        .number({
          message: "El ID de la actividad institucional es obligatorio",
        })
        .int({ message: "El ID debe ser un número entero" })
        .min(1, "El ID de la actividad institucional es obligatorio"),
      idTipoDocumento: zod
        .number({ message: "El tipo de documento es obligatorio" })
        .int({ message: "El tipo de documento debe ser un número entero" })
        .min(1, "Seleccione un tipo de documento"),
      nombre: zod
        .string({ message: "El nombre es obligatorio" })
        .min(1, "El nombre de la actividad es obligatorio")
        .max(200, "El nombre no puede exceder los 200 caracteres"),
      descripcion: zod.string().optional().nullable(),
      periodo: zod
        .string()
        .max(50, "El periodo no puede exceder los 50 caracteres")
        .optional()
        .nullable(),
      fechaInicio: zod.string().optional().nullable(),
      fechaFin: zod.string().optional().nullable(),
    })
    .refine(
      (data) => {
        // Si ambas fechas están presentes, validar que fechaFin >= fechaInicio
        if (data.fechaInicio && data.fechaFin) {
          const inicio = new Date(data.fechaInicio);
          const fin = new Date(data.fechaFin);
          return fin >= inicio;
        }
        return true; // Si no hay ambas fechas, no validar
      },
      {
        message: "La fecha de fin no puede ser anterior a la fecha de inicio",
        path: ["fechaFin"], // Mostrar el error en el campo fechaFin
      }
    )
);
