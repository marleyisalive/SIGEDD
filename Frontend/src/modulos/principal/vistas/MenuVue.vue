<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark navbar-fija">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Navbar</a>

      <button 
        class="navbar-toggler" 
        type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item margin">
            <RouterLink class="nav-link item" to="/inicio">Inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link item" to="/docentesgenerar">Docentes-Generar</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link item" to="/docenteselegir">Docentes-Elegir</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link item" to="/administrativovalidar">Administrativo-Validar</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link item" to="/administrativovalidardocente">Administrativo-Validar-Docente</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link item" to="/administrativovalidardocentedocumento">Admin-Validar-Docente-Docto.</RouterLink>
          </li>
          <li class="nav-item margin">
            <RouterLink class="nav-link item" to="/Login">Login</RouterLink>
          </li>
          <li class="nav-item margin">
            <RouterLink class="nav-link item" to="/OlvidarContraseña">Olvidar Contraseña</RouterLink>
          </li>
          <li class="nav-item margin">
            <RouterLink class="nav-link item" to="/RestablecerContraseña">Restablecer Contraseña</RouterLink>
          </li>
          <li class="nav-item margin">
            <RouterLink class="nav-link item" to="/DocentesP">Docentes Principal</RouterLink>
          </li>
           <li class="nav-item margin">
            <RouterLink class="nav-link item" to="/DocumentosL">Documentos Listos</RouterLink>
          </li>
            <li class="nav-item margin">
              <RouterLink class="nav-link item" to="/AdministrativoP">Administrativo Principal</RouterLink>
            </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router';
</script>

<style scoped>
  .navbar-fija {
    position: fixed !important;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2000; /* encima de todo */
  }

  /* Para evitar que el contenido quede escondido detrás del navbar */
  :global(body) {
    padding-top: 56px; /* Altura del navbar estándar */
  }
</style>
