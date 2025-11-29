import { toTypedSchema } from "@vee-validate/zod";
import zod from "zod";

export const UsuarioSchema = toTypedSchema(
  zod.object({
    idUsuario: zod
      .number({ message: "El ID del usuario es obligatorio" })
      .int({ message: "El ID debe ser un número entero" })
      .min(1, "El ID del usuario es obligatorio"),
    nombreUsuario: zod
      .string({ message: "Requerido" })
      .min(1, "El nombre del usuario es obligatorio")
      .max(50, "El nombre del usuario no puede exceder los 50 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
        "El nombre solo puede contener letras y espacios"
      ),
    apePatUsuario: zod
      .string()
      .max(50, "El apellido paterno no puede exceder los 50 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
        "El apellido paterno solo puede contener letras y espacios"
      )
      .optional()
      .or(zod.literal("")),
    apeMatUsuario: zod
      .string()
      .max(50, "El apellido materno no puede exceder los 50 caracteres")
      .regex(
        /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/,
        "El apellido materno solo puede contener letras y espacios"
      )
      .optional()
      .or(zod.literal("")),
    telefono: zod
      .string()
      .length(10, "El teléfono debe tener 10 dígitos")
      .regex(/^\d{10}$/, "El teléfono solo puede contener números")
      .optional()
      .or(zod.literal("")),
    correoUsuario: zod
      .string({ message: "Requerido" })
      .min(1, "El correo del usuario es obligatorio")
      .max(100, "El correo no puede exceder los 100 caracteres")
      .email("Debe ser un correo electrónico válido"),
    contrasenaUsuario: zod
      .string({ message: "Requerido" })
      .min(1, "La contraseña es obligatoria")
      .max(150, "La contraseña no puede exceder los 150 caracteres"),
    estatus: zod
      .number({ message: "El estatus es obligatorio" })
      .int({ message: "El estatus debe ser un número entero" })
      .min(0, "El estatus debe ser 0 o 1")
      .max(1, "El estatus debe ser 0 o 1"),
    idRol: zod
      .number({ message: "El rol es obligatorio" })
      .int({ message: "Debe seleccionar un rol" })
      .min(1, "El rol es obligatorio"),
  })
);
