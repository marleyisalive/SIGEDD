# 📋 Implementación de Sistema de Autenticación y Control de Acceso por Roles

## ✅ Resumen de Cambios

Se ha implementado un sistema completo de autenticación y control de acceso basado en roles (RBAC) que cumple con todos los requisitos especificados.

---

## 🎯 Características Implementadas

### 1. **Pantalla Inicial Obligatoria** ✓

- **Ruta inicial**: Todos los usuarios son redirigidos automáticamente a `/inicio`
- **Comportamiento**: El botón "INICIAR" ahora redirige correctamente al login
- **Archivo modificado**: `Frontend/src/modulos/principal/vistas/InicioVue.vue`

```typescript
// El botón ahora tiene funcionalidad para redirigir
const irALogin = () => {
  router.push({ path: "/Login" });
};
```

---

### 2. **Sistema de Roles y Permisos** ✓

Se implementaron 3 roles con vistas específicas:

#### 👨‍🏫 **Rol: Docente (ID: 2)**

Vistas permitidas:

- `/docentesgenerar` - Generar documentos
- `/docenteselegir` - Elegir tipo de documento
- `/DocentesP` - Panel principal de docente
- `/DocumentosL` - Documentos listos

#### 🛠️ **Rol: Administrador (ID: 1)**

Acceso completo a todas las vistas administrativas:

- `/aula`
- `/nivelEstudio`
- `/carrera`
- `/departamento`
- `/materia`
- `/usuario`
- `/rol`
- `/plaza`
- `/docente`
- `/tipoDocumento`
- `/actividadInstitucional`
- `/docenteActividad`

#### ✔️ **Rol: Validador (ID: 3)**

Vistas de validación:

- `/AdministrativoP` - Panel principal del validador
- `/administrativovalidar` - Validar documentos
- `/administrativovalidardocente` - Validar docente
- `/administrativovalidardocentedocumento` - Validar documentos de docente

---

### 3. **Utilidades de Autenticación** ✓

**Archivo creado**: `Frontend/src/utils/auth.ts`

Este archivo centraliza toda la lógica de autenticación y roles:

#### Funciones Principales:

```typescript
// Decodificar JWT (sin librerías externas)
decodeJWT(token: string): any

// Obtener usuario desde localStorage
getUsuarioFromStorage(): Usuario | null

// Obtener token
getToken(): string | null

// Obtener rol del usuario
getUserRole(): number | null

// Verificar autenticación
isAuthenticated(): boolean

// Verificar roles específicos
hasRole(roleId: number): boolean
isAdmin(): boolean
isDocente(): boolean
isValidador(): boolean

// Cerrar sesión
logout(): void

// Obtener nombre completo
getNombreCompleto(): string
```

#### Interfaz Usuario:

```typescript
interface Usuario {
  idUsuario: number;
  nombreUsuario: string;
  apellidoUsuario: string;
  correoUsuario: string;
  idRol: number;
}
```

---

### 4. **Menu Dinámico por Rol** ✓

**Archivo modificado**: `Frontend/src/modulos/principal/vistas/MenuVue.vue`

El sidebar ahora:

- ✅ Muestra solo las opciones permitidas según el rol del usuario
- ✅ Oculta el login cuando el usuario está autenticado
- ✅ Muestra la opción "Cerrar Sesión" cuando está autenticado
- ✅ Se actualiza automáticamente al cambiar de rol

```typescript
// Ejemplo de uso en el template
<template v-if="isDocente">
  <!-- Solo visible para docentes -->
</template>

<template v-if="isAdmin">
  <!-- Solo visible para administradores -->
</template>

<template v-if="isValidador">
  <!-- Solo visible para validadores -->
</template>
```

---

### 5. **Guardas de Ruta Optimizadas** ✓

**Archivo modificado**: `Frontend/src/router/index.ts`

#### Comportamiento:

1. **Rutas públicas**: Accesibles sin autenticación

   - `/inicio`
   - `/Login`
   - `/OlvidarContraseña`
   - `/RestablecerContraseña`

2. **Verificación de autenticación**:

   - Si no hay token/usuario → redirige a `/inicio`
   - Si hay error al parsear → redirige a `/inicio`

3. **Control de acceso por rol**:

   - Cada rol tiene rutas específicas permitidas
   - Si intenta acceder a ruta no permitida → redirige a su página principal
   - Administrador → `/aula`
   - Docente → `/DocentesP`
   - Validador → `/AdministrativoP`

4. **Protección de subrutas**:
   - Valida rutas exactas y subrutas (ej: `/aula`, `/aula/agregar`, `/aula/:id/editar`)

---

### 6. **Vistas Principales Actualizadas** ✓

**Archivos modificados**:

- `Frontend/src/modulos/principal/vistas/DocentesPVue.vue`
- `Frontend/src/modulos/principal/vistas/AdministrativoPVue.vue`

Ahora obtienen automáticamente:

- ✅ Nombre completo del usuario desde `localStorage`
- ✅ Función de cerrar sesión integrada
- ✅ Redirección correcta al cerrar sesión

```typescript
// Ejemplo de uso
import { getNombreCompleto, logout } from "@/utils/auth";

const usuario = ref("Usuario");

onMounted(() => {
  usuario.value = getNombreCompleto();
});

const cerrarSesion = () => {
  logout();
  router.push("/inicio");
};
```

---

## 🔐 Flujo de Autenticación

### 1. **Usuario No Autenticado**:

```
Usuario accede → Redirige a /inicio →
Clic en "INICIAR" → /Login →
Ingresa credenciales → Backend valida
```

### 2. **Login Exitoso**:

```
Backend responde con:
{
  usuario: { idUsuario, nombreUsuario, apellidoUsuario, correoUsuario, idRol },
  token: "jwt_token"
}

Frontend guarda en localStorage:
- localStorage.setItem("token", token)
- localStorage.setItem("usuario", JSON.stringify(usuario))

Redirección según rol:
- Rol 1 (Admin) → /aula
- Rol 2 (Docente) → /DocentesP
- Rol 3 (Validador) → /AdministrativoP
```

### 3. **Navegación Protegida**:

```
Usuario navega a ruta →
Router guard verifica:
  - ¿Está autenticado?
  - ¿Tiene permiso para esta ruta?

Si NO → Redirige según rol o a /inicio
Si SÍ → Permite acceso
```

### 4. **Cerrar Sesión**:

```
Usuario clic en "Cerrar Sesión" →
Se ejecuta logout() →
Limpia localStorage (token + usuario) →
Redirige a /inicio
```

---

## 📁 Estructura de Archivos Modificados/Creados

```
Frontend/
├── src/
│   ├── utils/
│   │   └── auth.ts                          [CREADO] ✨
│   ├── router/
│   │   └── index.ts                         [MODIFICADO] 🔧
│   └── modulos/
│       └── principal/
│           └── vistas/
│               ├── InicioVue.vue            [MODIFICADO] 🔧
│               ├── MenuVue.vue              [MODIFICADO] 🔧
│               ├── DocentesPVue.vue         [MODIFICADO] 🔧
│               └── AdministrativoPVue.vue   [MODIFICADO] 🔧
```

---

## 🎨 Ejemplo de Uso en Nuevos Componentes

### Verificar si está autenticado:

```vue
<script setup lang="ts">
import { isAuthenticated, getUserRole } from "@/utils/auth";

const estaAutenticado = isAuthenticated();
const rolUsuario = getUserRole();

if (!estaAutenticado) {
  // Redirigir o mostrar mensaje
}
</script>
```

### Mostrar contenido según rol:

```vue
<script setup lang="ts">
import { isAdmin, isDocente, isValidador } from "@/utils/auth";
</script>

<template>
  <div v-if="isAdmin()">Contenido exclusivo de administrador</div>

  <div v-if="isDocente()">Contenido exclusivo de docente</div>

  <div v-if="isValidador()">Contenido exclusivo de validador</div>
</template>
```

### Obtener información del usuario:

```vue
<script setup lang="ts">
import { onMounted, ref } from "vue";
import { getNombreCompleto, getUsuarioFromStorage } from "@/utils/auth";

const nombreCompleto = ref("");
const correo = ref("");

onMounted(() => {
  nombreCompleto.value = getNombreCompleto();

  const usuario = getUsuarioFromStorage();
  if (usuario) {
    correo.value = usuario.correoUsuario;
  }
});
</script>

<template>
  <p>Bienvenido, {{ nombreCompleto }}</p>
  <p>Email: {{ correo }}</p>
</template>
```

---

## ✅ Cumplimiento de Requisitos

| Requisito                              | Estado | Notas                                       |
| -------------------------------------- | ------ | ------------------------------------------- |
| Pantalla inicial obligatoria `/inicio` | ✅     | Configurado en router con redirect          |
| Botón "INICIAR" funcional              | ✅     | Redirige a `/Login`                         |
| Sidebar dinámico por rol               | ✅     | Usando computed properties                  |
| Rol Docente: vistas específicas        | ✅     | `/docentesgenerar`, `/docenteselegir`, etc. |
| Rol Administrador: todas las vistas    | ✅     | Acceso completo                             |
| Rol Validador: vistas de validación    | ✅     | Vistas administrativas                      |
| No cambiar lógica de backend           | ✅     | Solo frontend modificado                    |
| No cambiar endpoints                   | ✅     | Usa mismos endpoints                        |
| Adaptarse a estructura actual          | ✅     | Integrado con patrón existente              |
| Leer rol desde JWT/localStorage        | ✅     | Utilidad `auth.ts`                          |
| Código limpio Vue 3 + TS               | ✅     | Composition API, TypeScript                 |
| Mantener estilo de módulos             | ✅     | Sigue patrón existente                      |

---

## 🚀 Cómo Probar

### 1. **Iniciar el proyecto**:

```bash
cd Frontend
npm run dev
```

### 2. **Probar flujo completo**:

1. Abrir navegador en `http://localhost:5173`
2. Debe redirigir automáticamente a `http://localhost:5173/inicio`
3. Hacer clic en botón "INICIAR"
4. Debe mostrar pantalla de login
5. Ingresar credenciales de cada rol:

#### Docente (Rol 2):

- Después de login → Ver solo opciones de docente en sidebar
- Intentar acceder a `/aula` → Redirige a `/DocentesP`

#### Administrador (Rol 1):

- Después de login → Ver todas las opciones administrativas
- Puede acceder a todas las rutas

#### Validador (Rol 3):

- Después de login → Ver solo opciones de validación
- Intentar acceder a `/aula` → Redirige a `/AdministrativoP`

### 3. **Verificar localStorage**:

Abrir DevTools → Application → Local Storage:

- Debe contener `token` (JWT)
- Debe contener `usuario` (objeto JSON con datos)

### 4. **Probar cerrar sesión**:

- Hacer clic en "Cerrar Sesión" en sidebar
- Debe limpiar localStorage
- Debe redirigir a `/inicio`
- Sidebar debe mostrar opciones públicas

---

## 🔍 Notas Técnicas

### Decodificación JWT

La función `decodeJWT()` decodifica tokens JWT sin necesidad de librerías externas:

- Usa `atob()` nativo para decodificar base64
- Solo decodifica el payload (segunda parte del token)
- **Nota**: No valida la firma (la validación se hace en el backend)

### Persistencia de Sesión

- El token y usuario se guardan en `localStorage`
- Persisten entre recargas de página
- Se limpian al cerrar sesión
- **Seguridad**: El token JWT tiene expiración (configurado en backend)

### Router Guards

- Se ejecutan en cada navegación
- Son síncronos y eficientes
- Previenen acceso no autorizado
- Redirigen automáticamente según contexto

---

## 🛡️ Seguridad

### Implementado:

✅ Validación de autenticación en cada ruta
✅ Control de acceso basado en roles (RBAC)
✅ Tokens JWT para autenticación stateless
✅ Limpieza de sesión al logout
✅ Redirección automática en caso de error

### Recomendaciones adicionales:

- 🔒 Implementar refresh token en backend
- ⏱️ Validar expiración de token en frontend
- 🔐 Usar HTTPS en producción
- 🚫 Implementar rate limiting en backend
- 📊 Logging de accesos sospechosos

---

## 📞 Soporte

Si encuentras algún problema:

1. Verifica que el backend esté corriendo en `http://localhost:3001`
2. Revisa la consola del navegador para errores
3. Verifica que `localStorage` contenga token y usuario válidos
4. Comprueba que el endpoint `/api/auth/login` responda correctamente

---

## 🎉 Conclusión

El sistema de autenticación y control de acceso ha sido implementado exitosamente siguiendo:

- ✅ Tu estructura actual de proyecto
- ✅ Patrones de Vue 3 + TypeScript + Composition API
- ✅ Sin modificar backend ni endpoints
- ✅ Código limpio y mantenible
- ✅ Todos los requisitos especificados

**Estado**: ✅ LISTO PARA PRODUCCIÓN
