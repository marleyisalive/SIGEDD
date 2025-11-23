import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const CarreraSchema = toTypedSchema(
  zod.object({
    idCarrera: zod
      .number({ message: "El ID de la carrera es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID de la carrera es obligatorio"),
    nombre: zod
      .string({ message: "Requerido" })
      .min(1, "El nombre de la carrera es obligatorio")
      .max(100, "El nombre de la carrera no puede exceder los 100 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    acreditado: zod
      .number({ message: "El campo acreditado es obligatorio" })
      .int({ message: "Debe ser un número entero" })
      .min(0, "El valor mínimo es 0")
      .max(1, "El valor máximo es 1"),
  })
);
