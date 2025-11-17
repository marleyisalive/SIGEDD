export interface usuario {
  idUsuario: number;
  nombreUsuario: string;
  apePatUsuario?: string | null;
  apeMatUsuario?: string | null;
  telefono?: string | null;
  correoUsuario: string;
  contrasenaUsuario: string;
  estatus: number;
  idRol: number;
}
