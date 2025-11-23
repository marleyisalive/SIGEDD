import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const DepartamentoSchema = toTypedSchema(
  zod.object({
    idDepartamento: zod
      .number({ message: "El ID del departamento es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del departamento es obligatorio"),
    nombreDepartamento: zod
      .string({ message: "Requerido" })
      .min(1, "El nombre del departamento es obligatorio")
      .max(
        100,
        "El nombre del departamento no puede exceder los 100 caracteres"
      )
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    encargadoDepartamento: zod
      .number({ message: "El ID del encargado debe ser un número" })
      .int({ message: "El ID del encargado debe ser un número entero" })
      .nullable(),
  })
);
