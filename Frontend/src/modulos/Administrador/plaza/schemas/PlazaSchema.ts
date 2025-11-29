import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const PlazaSchema = toTypedSchema(
  zod.object({
    idPlaza: zod
      .number({ message: "El ID de la plaza es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID de la plaza es obligatorio"),
    descripcion: zod
      .string({ message: "Requerido" })
      .min(1, "La descripción de la plaza es obligatoria")
      .max(50, "La descripción de la plaza no puede exceder los 50 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "La descripción solo puede contener letras y espacios"
      ),
  })
);
