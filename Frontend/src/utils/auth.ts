/**
 * Utilidades de autenticación
 * Manejo de JWT y roles de usuario
 */

export interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  apePatUsuario?: string;
  apeMatUsuario?: string;
  correoUsuario: string;
  idRol: number;
}

/**
 * Decodifica un token JWT sin necesidad de librerías externas
 * Los tokens JWT tienen el formato: header.payload.signature
 * Solo necesitamos el payload que está en base64
 */
export function decodeJWT(token: string): any {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) {
      throw new Error("Token JWT inválido");
    }

    // El payload es la segunda parte
    const payload = parts[1];
    if (!payload) {
      throw new Error("Payload vacío");
    }

    // Decodificar base64
    const decoded = atob(payload);

    // Parsear JSON
    return JSON.parse(decoded);
  } catch (error) {
    console.error("Error decodificando JWT:", error);
    return null;
  }
}

/**
 * Obtiene el usuario desde localStorage
 */
export function getUsuarioFromStorage(): Usuario | null {
  try {
    const raw = localStorage.getItem("usuario");
    if (!raw) return null;

    return JSON.parse(raw) as Usuario;
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    return null;
  }
}

/**
 * Obtiene el token desde localStorage
 */
export function getToken(): string | null {
  return localStorage.getItem("token");
}

/**
 * Obtiene el rol del usuario desde localStorage
 * Roles: 1 = Administrador, 2 = Docente, 3 = Validador
 */
export function getUserRole(): number | null {
  const usuario = getUsuarioFromStorage();
  return usuario?.idRol ?? null;
}

/**
 * Verifica si el usuario está autenticado
 */
export function isAuthenticated(): boolean {
  return getToken() !== null && getUsuarioFromStorage() !== null;
}

/**
 * Verifica si el usuario tiene un rol específico
 */
export function hasRole(roleId: number): boolean {
  return getUserRole() === roleId;
}

/**
 * Verifica si el usuario es administrador
 */
export function isAdmin(): boolean {
  return hasRole(1);
}

/**
 * Verifica si el usuario es docente
 */
export function isDocente(): boolean {
  return hasRole(2);
}

/**
 * Verifica si el usuario es validador
 */
export function isValidador(): boolean {
  return hasRole(3);
}

/**
 * Cierra sesión del usuario
 */
export function logout(): void {
  localStorage.removeItem("token");
  localStorage.removeItem("usuario");
}

/**
 * Obtiene el nombre completo del usuario
 */
export function getNombreCompleto(): string {
  const usuario = getUsuarioFromStorage();
  if (!usuario) return "Usuario";

  const nombre = usuario.nombreUsuario || "";
  const apellidoPaterno = usuario.apePatUsuario || "";
  const apellidoMaterno = usuario.apeMatUsuario || "";

  // Construir nombre completo con los apellidos que existan
  const nombreCompleto = [nombre, apellidoPaterno, apellidoMaterno]
    .filter((part) => part && part.trim())
    .join(" ");

  return nombreCompleto.trim() || "Usuario";
}
