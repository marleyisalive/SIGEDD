export interface tipoDocumento {
  idTipoDocumento: number;
  nombre: string;
  descripcion?: string | null;
  plantillaJSON: Record<string, any>;
}
