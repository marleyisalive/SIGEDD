export interface TipoDocumento {
  idTipoDocumento: number;
  nombre: string;
  descripcion?: string | null;
  plantillaJSON: string; // En frontend se maneja como string para textarea
}
