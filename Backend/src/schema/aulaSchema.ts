// src/schema/aulaSchema.ts
import { z } from "zod";
export const aulaSchema = z.object({
    idAula: z.number().min(1).int().positive(),
    nombre: z.string().min(1).max(50),
});