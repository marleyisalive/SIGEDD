<template>
  <!-- Sidebar Moderno -->
  <div class="sidebar" :class="{ collapsed: isCollapsed }">
    <!-- Header del Sidebar -->
    <div class="sidebar-header">
      <h4 v-if="!isCollapsed">SIGEDD</h4>
      <button class="btn-toggle" @click="toggleSidebar">
        <i class="fa" :class="isCollapsed ? 'fa-bars' : 'fa-times'"></i>
      </button>
    </div>

    <!-- Navegación -->
    <nav class="sidebar-nav">
      <ul class="nav-list">
        <li class="nav-item">
          <RouterLink class="nav-link" to="/inicio">
            <i class="fa fa-home"></i>
            <span v-if="!isCollapsed">Inicio</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/docentesgenerar">
            <i class="fa fa-file-text"></i>
            <span v-if="!isCollapsed">Docentes-Generar</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/docenteselegir">
            <i class="fa fa-check-square"></i>
            <span v-if="!isCollapsed">Docentes-Elegir</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/administrativovalidar">
            <i class="fa fa-check-circle"></i>
            <span v-if="!isCollapsed">Administrativo-Validar</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/administrativovalidardocente">
            <i class="fa fa-user-check"></i>
            <span v-if="!isCollapsed">Administrativo-Validar-Docente</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink
            class="nav-link"
            to="/administrativovalidardocentedocumento"
          >
            <i class="fa fa-file-check"></i>
            <span v-if="!isCollapsed">Admin-Validar-Docente-Docto.</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/Login">
            <i class="fa fa-sign-in"></i>
            <span v-if="!isCollapsed">Login</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/OlvidarContraseña">
            <i class="fa fa-question-circle"></i>
            <span v-if="!isCollapsed">Olvidar Contraseña</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/RestablecerContraseña">
            <i class="fa fa-key"></i>
            <span v-if="!isCollapsed">Restablecer Contraseña</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/DocentesP">
            <i class="fa fa-chalkboard-teacher"></i>
            <span v-if="!isCollapsed">Docentes Principal</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/DocumentosL">
            <i class="fa fa-folder-open"></i>
            <span v-if="!isCollapsed">Documentos Listos</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/AdministrativoP">
            <i class="fa fa-user-shield"></i>
            <span v-if="!isCollapsed">Administrativo Principal</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/aula">
            <i class="fa fa-door-open"></i>
            <span v-if="!isCollapsed">Aula</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/nivelEstudio">
            <i class="fa fa-graduation-cap"></i>
            <span v-if="!isCollapsed">Nivel de Estudio</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/carrera">
            <i class="fa fa-book"></i>
            <span v-if="!isCollapsed">Carrera</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/departamento">
            <i class="fa fa-building"></i>
            <span v-if="!isCollapsed">Departamento</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/materia">
            <i class="fa fa-book-open"></i>
            <span v-if="!isCollapsed">Materia</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/usuario">
            <i class="fa fa-user"></i>
            <span v-if="!isCollapsed">Usuario</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/rol">
            <i class="fa fa-user-tag"></i>
            <span v-if="!isCollapsed">Rol</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/plaza">
            <i class="fa fa-briefcase"></i>
            <span v-if="!isCollapsed">Plaza</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/docente">
            <i class="fa fa-user-tie"></i>
            <span v-if="!isCollapsed">Docente</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/tipoDocumento">
            <i class="fa fa-file-alt"></i>
            <span v-if="!isCollapsed">Tipo de Documento</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/actividadInstitucional">
            <i class="fa fa-calendar-alt"></i>
            <span v-if="!isCollapsed">Actividad Institucional</span>
          </RouterLink>
        </li>
        <li class="nav-item">
          <RouterLink class="nav-link" to="/docenteActividad">
            <i class="fa fa-clipboard-list"></i>
            <span v-if="!isCollapsed">Actividad de Docente</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>

  <!-- Overlay para cerrar sidebar en móvil -->
  <div
    class="sidebar-overlay"
    :class="{ active: !isCollapsed }"
    @click="toggleSidebar"
  ></div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { RouterLink } from "vue-router";

const isCollapsed = ref(false);

const toggleSidebar = () => {
  isCollapsed.value = !isCollapsed.value;
};
</script>

<style scoped>
/* Sidebar principal */
.sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 280px;
  background: linear-gradient(180deg, #1b0b76 0%, #0d1f2d 100%);
  box-shadow: 2px 0 10px rgba(0, 0, 0, 0.3);
  transition: all 0.3s ease;
  z-index: 1000;
  overflow-y: auto;
  overflow-x: hidden;
}

.sidebar.collapsed {
  width: 70px;
}

/* Header del sidebar */
.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 15px;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header h4 {
  color: white;
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 1px;
}

.btn-toggle {
  background: transparent;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 5px 10px;
  transition: all 0.3s ease;
}

.btn-toggle:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 5px;
}

/* Navegación */
.sidebar-nav {
  padding: 10px 0;
}

.nav-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

/* Items de navegación */
.nav-item {
  margin: 2px 10px;
}

.nav-link {
  display: flex;
  align-items: center;
  padding: 12px 15px;
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.3s ease;
  font-size: 0.95rem;
  position: relative;
  overflow: hidden;
}

.nav-link i {
  font-size: 1.1rem;
  min-width: 25px;
  margin-right: 12px;
  transition: all 0.3s ease;
}

.collapsed .nav-link {
  justify-content: center;
  padding: 12px 10px;
}

.collapsed .nav-link i {
  margin-right: 0;
  font-size: 1.3rem;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
  transform: translateX(5px);
}

.collapsed .nav-link:hover {
  transform: translateX(0) scale(1.1);
}

/* Link activo */
.nav-link.router-link-active {
  background: linear-gradient(90deg, #4a90e2 0%, #357abd 100%);
  color: white;
  box-shadow: 0 2px 8px rgba(74, 144, 226, 0.4);
}

.nav-link.router-link-active::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 100%;
  width: 4px;
  background: white;
}

/* Scrollbar personalizado */
.sidebar::-webkit-scrollbar {
  width: 6px;
}

.sidebar::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.1);
}

.sidebar::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 3px;
}

.sidebar::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Overlay para móvil */
.sidebar-overlay {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  opacity: 0;
  transition: opacity 0.3s ease;
}

/* Ajustar contenido principal */
:global(body) {
  margin: 0;
  padding: 0;
}

:global(.container),
:global(.container-fluid),
:global(main) {
  margin-left: 280px;
  transition: margin-left 0.3s ease;
}

:global(body:has(.sidebar.collapsed) .container),
:global(body:has(.sidebar.collapsed) .container-fluid),
:global(body:has(.sidebar.collapsed) main) {
  margin-left: 70px;
}

/* Responsive */
@media (max-width: 768px) {
  .sidebar {
    transform: translateX(-100%);
  }

  .sidebar:not(.collapsed) {
    transform: translateX(0);
  }

  .sidebar-overlay.active {
    display: block;
    opacity: 1;
  }

  :global(.container),
  :global(.container-fluid),
  :global(main) {
    margin-left: 0 !important;
  }
}

/* Animaciones */
@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.nav-item {
  animation: slideIn 0.3s ease forwards;
}

.nav-item:nth-child(1) {
  animation-delay: 0.05s;
}
.nav-item:nth-child(2) {
  animation-delay: 0.1s;
}
.nav-item:nth-child(3) {
  animation-delay: 0.15s;
}
</style>
