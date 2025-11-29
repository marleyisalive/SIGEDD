import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const NivelEstudioSchema = toTypedSchema(
  zod.object({
    idNivelEstudio: zod
      .number({ message: "El ID del nivel de estudio es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del nivel de estudio es obligatorio"),
    nombre: zod
      .string({ message: "Requerido" })
      .min(1, "El nombre del nivel de estudio es obligatorio")
      .max(
        100,
        "El nombre del nivel de estudio no puede exceder los 100 caracteres"
      )
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
  })
);
