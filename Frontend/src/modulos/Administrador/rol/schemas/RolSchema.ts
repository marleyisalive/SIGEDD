import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const RolSchema = toTypedSchema(
  zod.object({
    idRol: zod
      .number({ message: "El ID del rol es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del rol es obligatorio"),
    descripcion: zod
      .string({ message: "Requerido" })
      .min(1, "La descripción del rol es obligatoria")
      .max(50, "La descripción del rol no puede exceder los 50 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "La descripción solo puede contener letras y espacios"
      ),
  })
);
