
import { z } from "zod";

export const tipoDocumentoSchema = z.object({
    idTipoDocumento: z.number().min(1).int().positive(),
    nombre: z.string().min(1).max(150),
    // Campo opcional y nullable
    descripcion: z.string().optional().nullable(),
    plantillaJSON: z.record(z.string(), z.any()),
});