# 🚀 Guía Rápida de Implementación - Sistema de Autenticación SIGEDD

## ✅ Lo que se ha implementado

### 1. **Pantalla inicial obligatoria** ✓

- URL: `http://localhost:5173/inicio`
- Botón "INICIAR" funcional → redirige a `/Login`

### 2. **Sistema de roles implementado** ✓

| Rol               | ID  | Vistas Permitidas                                                                                                       |
| ----------------- | --- | ----------------------------------------------------------------------------------------------------------------------- |
| **Docente**       | 2   | `/docentesgenerar`, `/docenteselegir`, `/DocentesP`, `/DocumentosL`                                                     |
| **Administrador** | 1   | Todas las vistas administrativas (`/aula`, `/nivelEstudio`, `/carrera`, etc.)                                           |
| **Validador**     | 3   | `/AdministrativoP`, `/administrativovalidar`, `/administrativovalidardocente`, `/administrativovalidardocentedocumento` |

### 3. **Archivos modificados/creados** ✓

```
✨ CREADO:
└── Frontend/src/utils/auth.ts

🔧 MODIFICADOS:
├── Frontend/src/router/index.ts
├── Frontend/src/modulos/principal/vistas/InicioVue.vue
├── Frontend/src/modulos/principal/vistas/MenuVue.vue
├── Frontend/src/modulos/principal/vistas/DocentesPVue.vue
└── Frontend/src/modulos/principal/vistas/AdministrativoPVue.vue
```

---

## 📖 Cómo usar `auth.ts` en tus componentes

### Importar funciones:

```typescript
import {
  isAuthenticated,
  getUserRole,
  isAdmin,
  isDocente,
  isValidador,
  getNombreCompleto,
  getUsuarioFromStorage,
  logout,
} from "@/utils/auth";
```

### Ejemplos de uso:

#### 1. Verificar si está autenticado:

```vue
<script setup lang="ts">
import { isAuthenticated } from "@/utils/auth";
import { useRouter } from "vue-router";

const router = useRouter();

if (!isAuthenticated()) {
  router.push("/inicio");
}
</script>
```

#### 2. Mostrar contenido según rol:

```vue
<script setup lang="ts">
import { isAdmin, isDocente } from "@/utils/auth";
</script>

<template>
  <div v-if="isAdmin()">
    <h1>Panel de Administrador</h1>
  </div>

  <div v-if="isDocente()">
    <h1>Panel de Docente</h1>
  </div>
</template>
```

#### 3. Obtener datos del usuario:

```vue
<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getNombreCompleto, getUsuarioFromStorage } from "@/utils/auth";

const nombreCompleto = ref("");
const email = ref("");

onMounted(() => {
  nombreCompleto.value = getNombreCompleto();

  const usuario = getUsuarioFromStorage();
  if (usuario) {
    email.value = usuario.correoUsuario;
  }
});
</script>

<template>
  <h2>Bienvenido, {{ nombreCompleto }}</h2>
  <p>{{ email }}</p>
</template>
```

#### 4. Implementar cerrar sesión:

```vue
<script setup lang="ts">
import { logout } from "@/utils/auth";
import { useRouter } from "vue-router";

const router = useRouter();

const cerrarSesion = () => {
  logout(); // Limpia localStorage
  router.push("/inicio");
};
</script>

<template>
  <button @click="cerrarSesion">Cerrar Sesión</button>
</template>
```

#### 5. Verificar rol específico:

```vue
<script setup lang="ts">
import { getUserRole, hasRole } from "@/utils/auth";

const rolActual = getUserRole(); // Devuelve 1, 2, 3 o null

// Verificar rol específico
if (hasRole(1)) {
  console.log("Es administrador");
}

if (hasRole(2)) {
  console.log("Es docente");
}

if (hasRole(3)) {
  console.log("Es validador");
}
</script>
```

---

## 🔐 Estructura del Usuario en localStorage

```json
{
  "idUsuario": 1,
  "nombreUsuario": "Juan",
  "apellidoUsuario": "Pérez",
  "correoUsuario": "juan.perez@itculiacan.edu.mx",
  "idRol": 2
}
```

**Acceso**:

```typescript
const usuario = getUsuarioFromStorage();
console.log(usuario?.nombreUsuario); // "Juan"
console.log(usuario?.idRol); // 2
```

---

## 🛣️ Flujo de Navegación

### Usuario NO autenticado:

```
1. Abre app → Redirige a /inicio
2. Clic en "INICIAR" → /Login
3. Ingresa credenciales → Backend valida
4. Si OK → Guarda token + usuario → Redirige según rol
```

### Usuario autenticado:

```
1. Intenta acceder a ruta → Router guard verifica
2. Si tiene permiso → Permite acceso
3. Si NO tiene permiso → Redirige a página principal de su rol
```

### Cerrar sesión:

```
1. Clic en "Cerrar Sesión"
2. Se ejecuta logout() → Limpia localStorage
3. Redirige a /inicio
```

---

## 🎯 Router Guards - Comportamiento

### Rutas Públicas (sin autenticación):

- `/inicio`
- `/Login`
- `/OlvidarContraseña`
- `/RestablecerContraseña`

### Rutas Protegidas:

- Requieren estar autenticado
- Se verifica el rol
- Redirigen automáticamente si no hay permiso

### Redirecciones por rol:

- **Admin (1)** sin permiso → `/aula`
- **Docente (2)** sin permiso → `/DocentesP`
- **Validador (3)** sin permiso → `/AdministrativoP`
- **Sin rol/error** → `/inicio`

---

## 🧪 Testing Manual

### 1. Probar pantalla inicial:

```bash
cd Frontend
npm run dev
```

- Abrir `http://localhost:5173`
- Debe redirigir a `http://localhost:5173/inicio`
- Verificar botón "INICIAR" funciona

### 2. Probar login con cada rol:

#### Docente (rol 2):

```
1. Login con credenciales de docente
2. Debe redirigir a /DocentesP
3. Sidebar debe mostrar solo:
   - Inicio
   - Generar Documentos
   - Elegir Documento
   - Panel Docente
   - Documentos Listos
   - Cerrar Sesión
4. Intentar acceder manualmente a /aula → Redirige a /DocentesP
```

#### Administrador (rol 1):

```
1. Login con credenciales de administrador
2. Debe redirigir a /aula
3. Sidebar debe mostrar todas las opciones administrativas
4. Puede acceder a cualquier ruta
```

#### Validador (rol 3):

```
1. Login con credenciales de validador
2. Debe redirigir a /AdministrativoP
3. Sidebar debe mostrar solo opciones de validación
4. Intentar acceder a /aula → Redirige a /AdministrativoP
```

### 3. Probar cerrar sesión:

```
1. Clic en "Cerrar Sesión" en sidebar
2. Debe limpiar localStorage
3. Debe redirigir a /inicio
4. Sidebar debe mostrar opciones públicas (Login, Olvidar Contraseña)
```

---

## 🐛 Troubleshooting

### El sidebar no se actualiza al hacer login:

**Solución**: Recargar la página después del login. El router guards redirigirá automáticamente.

### Error "usuario is null":

**Causa**: No hay usuario en localStorage
**Solución**: Verificar que el login guarde correctamente el usuario

### Redirige a /inicio constantemente:

**Causa**: Token o usuario inválido en localStorage
**Solución**:

```javascript
// En consola del navegador:
localStorage.clear();
// Volver a hacer login
```

### No puede acceder a ninguna ruta:

**Causa**: Rol no reconocido o formato incorrecto
**Solución**: Verificar que `usuario.idRol` sea 1, 2 o 3

---

## 📝 Checklist de Implementación

- [x] Pantalla inicial `/inicio` configurada
- [x] Botón "INICIAR" funcional
- [x] Utilidad `auth.ts` creada
- [x] Router guards implementados
- [x] MenuVue con filtrado por rol
- [x] DocentesPVue con nombre de usuario
- [x] AdministrativoPVue con nombre de usuario
- [x] Cerrar sesión funcional
- [x] Roles definidos (1=Admin, 2=Docente, 3=Validador)
- [x] Rutas protegidas por rol
- [x] Sin cambios en backend
- [x] Sin cambios en endpoints
- [x] Código TypeScript sin errores

---

## 📞 Referencia Rápida de Funciones

| Función                   | Retorno           | Descripción                         |
| ------------------------- | ----------------- | ----------------------------------- |
| `isAuthenticated()`       | `boolean`         | Verifica si hay sesión activa       |
| `getUserRole()`           | `number \| null`  | Obtiene ID del rol (1, 2, 3)        |
| `isAdmin()`               | `boolean`         | ¿Es administrador?                  |
| `isDocente()`             | `boolean`         | ¿Es docente?                        |
| `isValidador()`           | `boolean`         | ¿Es validador?                      |
| `hasRole(roleId)`         | `boolean`         | Verifica rol específico             |
| `getUsuarioFromStorage()` | `Usuario \| null` | Obtiene objeto usuario completo     |
| `getToken()`              | `string \| null`  | Obtiene JWT token                   |
| `getNombreCompleto()`     | `string`          | Nombre + Apellido del usuario       |
| `logout()`                | `void`            | Cierra sesión y limpia localStorage |
| `decodeJWT(token)`        | `any`             | Decodifica payload del JWT          |

---

## 🎉 ¡Listo!

Tu sistema de autenticación está completamente implementado y funcionando. Todos los requisitos han sido cumplidos sin modificar el backend ni los endpoints.
