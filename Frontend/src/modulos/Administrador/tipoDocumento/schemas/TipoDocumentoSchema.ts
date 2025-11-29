import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const TipoDocumentoSchema = toTypedSchema(
  zod.object({
    idTipoDocumento: zod
      .number({ message: "El ID del tipo de documento es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del tipo de documento es obligatorio"),
    nombre: zod
      .string({ message: "El nombre es obligatorio" })
      .min(1, "El nombre del tipo de documento es obligatorio")
      .max(150, "El nombre no puede exceder los 150 caracteres"),
    descripcion: zod.string().optional().nullable(),
    plantillaJSON: zod
      .string({ message: "La plantilla JSON es obligatoria" })
      .min(1, "La plantilla JSON es obligatoria")
      .refine(
        (val) => {
          try {
            const parsed = JSON.parse(val);
            return (
              parsed.campos &&
              Array.isArray(parsed.campos) &&
              parsed.campos.length > 0
            );
          } catch {
            return false;
          }
        },
        {
          message:
            'La plantilla JSON debe tener el formato: {"campos": ["campo1", "campo2", ...]}',
        }
      ),
  })
);
