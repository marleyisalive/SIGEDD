import { z } from "zod";

export const tipoDocumentoSchema = z.object({
  idTipoDocumento: z.number().int().positive(),
  nombre: z.string().min(1),
  descripcion: z.string().optional(),
});