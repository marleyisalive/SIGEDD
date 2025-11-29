export interface Usuario {
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

export interface Rol {
  idRol: number;
  descripcion: string;
}
