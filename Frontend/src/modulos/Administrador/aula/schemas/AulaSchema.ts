import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const AulaSchema = toTypedSchema(
  zod.object({
    idAula: zod
      .number({ message: "El ID del aula es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del aula es obligatorio"),
    nombre: zod
      .string({ message: "Requerido" })
      .min(1, "El nombre del aula es obligatorio")
      .max(100, "El nombre del aula no puede exceder los 100 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
  })
);
