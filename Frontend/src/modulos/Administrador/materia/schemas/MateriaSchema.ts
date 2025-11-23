import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const MateriaSchema = toTypedSchema(
  zod.object({
    idMateria: zod
      .number({ message: "El ID de la materia es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID de la materia es obligatorio"),
    nombre: zod
      .string({ message: "Requerido" })
      .min(1, "El nombre de la materia es obligatorio")
      .max(150, "El nombre de la materia no puede exceder los 150 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    idDepartamento: zod
      .number({ message: "El departamento es obligatorio" })
      .int({ message: "Debe seleccionar un departamento" })
      .min(1, "El departamento es obligatorio"),
    creditos: zod
      .number({ message: "Los créditos son obligatorios" })
      .int({ message: "Los créditos deben ser un número entero" })
      .min(1, "Los créditos deben ser al menos 1")
      .max(20, "Los créditos no pueden exceder 20"),
  })
);
