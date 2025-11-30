<template>
  <div class="contenedor-principal">
    <!-- ENCABEZADO CON LOGO -->
    <div class="encabezado">
      <img
        src="../../../assets/sigedd-logo.png"
        class="logo-sigedd"
        alt="logo"
      />
    </div>

    <!-- TARJETA DE PERFIL DEL ADMINISTRADOR -->
    <div class="perfil-card">
      <div class="perfil-header">
        <div class="avatar">
          <i class="fa fa-user-shield"></i>
        </div>
        <div class="perfil-info">
          <h2 class="nombre-usuario">{{ nombreCompleto }}</h2>
          <p class="rol-badge">Administrador</p>
          <p class="email">{{ email }}</p>
        </div>
      </div>
    </div>

    <!-- DESCRIPCIÓN DEL ROL -->
    <div class="descripcion-container">
      <h3 class="titulo-seccion">
        <i class="fa fa-info-circle"></i> Tu rol como Administrador
      </h3>
      <div class="descripcion-content">
        <p class="descripcion-texto">
          Como <strong>Administrador</strong> del sistema SIGEDD, tienes acceso
          completo a todas las funcionalidades de gestión. Tus responsabilidades
          incluyen:
        </p>
        <ul class="lista-responsabilidades">
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Gestionar usuarios del sistema y asignar roles apropiados</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Administrar catálogos: aulas, niveles de estudio, carreras y
              departamentos</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Configurar plazas docentes y gestionar información de
              profesores</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span
              >Mantener actualizados los tipos de documentos y actividades
              institucionales</span
            >
          </li>
          <li>
            <i class="fa fa-check-circle"></i>
            <span>Supervisar materias y grupos académicos del instituto</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { getNombreCompleto, getUsuarioFromStorage } from "@/utils/auth";

// Datos del usuario
const nombreCompleto = ref("Usuario");
const email = ref("");

onMounted(() => {
  nombreCompleto.value = getNombreCompleto();

  const usuario = getUsuarioFromStorage();
  if (usuario) {
    email.value = usuario.correoUsuario;
  }
});
</script>

<style scoped>
:global(:root) {
  --azul-oscuro: #0f3b75;
  --azul-claro: #d9eaf7;
  --verde: #4caf50;
  --texto-oscuro: #1a1a1a;
  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* FONDO GENERAL */
.contenedor-principal {
  min-height: 100vh;
  background-color: var(--azul-claro);
  padding: 40px;
  margin-left: 280px; /* Espacio para el sidebar */
  font-family: var(--font-family);
  transition: margin-left 0.3s ease;
}

@media (max-width: 768px) {
  .contenedor-principal {
    margin-left: 0;
    padding: 20px;
  }
}

/* ENCABEZADO */
.encabezado {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.logo-sigedd {
  width: 240px;
}

/* TARJETA DE PERFIL */
.perfil-card {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.perfil-header {
  display: flex;
  align-items: center;
  gap: 25px;
}

.avatar {
  width: 100px;
  height: 100px;
  background: linear-gradient(135deg, #0f3b75 0%, #1a5fb4 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.perfil-info {
  flex: 1;
}

.nombre-usuario {
  font-size: 2rem;
  margin: 0 0 10px 0;
  color: var(--azul-oscuro);
  font-weight: 600;
}

.rol-badge {
  display: inline-block;
  background: linear-gradient(135deg, #0f3b75 0%, #1a5fb4 100%);
  color: white;
  padding: 6px 20px;
  border-radius: 20px;
  font-size: 0.9rem;
  font-weight: 600;
  margin: 0 0 10px 0;
}

.email {
  color: #666;
  font-size: 1rem;
  margin: 5px 0 0 0;
}

/* DESCRIPCIÓN */
.descripcion-container {
  background: white;
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 30px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.titulo-seccion {
  color: var(--azul-oscuro);
  font-size: 1.5rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.titulo-seccion i {
  color: #1a5fb4;
}

.descripcion-content {
  line-height: 1.8;
}

.descripcion-texto {
  color: var(--texto-oscuro);
  font-size: 1.1rem;
  margin-bottom: 20px;
}

.lista-responsabilidades {
  list-style: none;
  padding: 0;
  margin: 0;
}

.lista-responsabilidades li {
  display: flex;
  align-items: flex-start;
  gap: 15px;
  margin-bottom: 15px;
  color: var(--texto-oscuro);
  font-size: 1rem;
}

.lista-responsabilidades i {
  color: var(--verde);
  font-size: 1.2rem;
  margin-top: 3px;
  flex-shrink: 0;
}

/* Responsive */
@media (max-width: 768px) {
  .logo-sigedd {
    width: 250px;
  }

  .perfil-header {
    flex-direction: column;
    text-align: center;
  }

  .avatar {
    width: 80px;
    height: 80px;
    font-size: 2.5rem;
  }

  .nombre-usuario {
    font-size: 1.5rem;
  }
}

/* Animaciones */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.perfil-card,
.descripcion-container {
  animation: fadeIn 0.5s ease forwards;
}

.perfil-card {
  animation-delay: 0.1s;
}

.descripcion-container {
  animation-delay: 0.2s;
}
</style>
