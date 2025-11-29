import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const DocenteSchema = toTypedSchema(
  zod.object({
    idDocente: zod
      .number({ message: "El ID del docente es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del docente es obligatorio"),
    idUsuario: zod
      .number({ message: "El ID del usuario es obligatorio" })
      .int({ message: "El ID del usuario debe ser un número entero" })
      .min(1, "Debe seleccionar un usuario"),
    filiacion: zod
      .string({ message: "La filiación es obligatoria" })
      .length(18, "La filiación debe tener exactamente 18 caracteres")
      .regex(
        /^[a-zA-Z0-9]+$/,
        "La filiación solo puede contener letras y números"
      ),
    idNivelEstudio: zod
      .number({ message: "El ID del nivel de estudio es obligatorio" })
      .int({ message: "El ID del nivel de estudio debe ser un número entero" })
      .min(1, "Debe seleccionar un nivel de estudio"),
    idDepartamento: zod
      .number({ message: "El ID del departamento es obligatorio" })
      .int({ message: "El ID del departamento debe ser un número entero" })
      .min(1, "Debe seleccionar un departamento"),
    idPlaza: zod
      .number({ message: "El ID de la plaza es obligatorio" })
      .int({ message: "El ID de la plaza debe ser un número entero" })
      .min(1, "Debe seleccionar una plaza"),
    estatusExclusividad: zod
      .number({ message: "El estatus de exclusividad es obligatorio" })
      .int({ message: "El estatus debe ser un número entero" })
      .min(0, "El estatus debe ser 0 o 1")
      .max(1, "El estatus debe ser 0 o 1")
      .nullable()
      .optional(),
    folioEdd: zod
      .string()
      .length(9, "El folio EDD debe tener exactamente 9 caracteres")
      .nullable()
      .optional()
      .or(zod.literal("")),
  })
);
