// src/schema/plazaSchema.ts
import { z } from "zod";
export const plazaSchema = z.object({
    idPlaza: z.number().min(1).int().positive(),
    descripcion: z.string().min(1).max(50),
});