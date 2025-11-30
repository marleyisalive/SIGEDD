<script setup lang="ts">
import MenuVue from "./modulos/principal/vistas/MenuVue.vue";
import { RouterView, useRoute } from "vue-router";
import { computed } from "vue";
import { isAuthenticated } from "@/utils/auth";

const route = useRoute();

// Rutas donde NO se debe mostrar el sidebar (pantallas públicas)
const rutasSinSidebar = [
  "/inicio",
  "/Login",
  "/OlvidarContraseña",
  "/RestablecerContraseña",
];

// Mostrar sidebar solo si está autenticado y no está en una ruta pública
const mostrarSidebar = computed(() => {
  return isAuthenticated() && !rutasSinSidebar.includes(route.path);
});
</script>

<template>
  <header v-if="mostrarSidebar">
    <MenuVue />
  </header>
  <RouterView />
</template>

<style>
/* Estilos globales para ajustar contenido cuando sidebar está colapsado */
body.sidebar-collapsed .contenedor-principal {
  margin-left: 70px !important;
}

@media (max-width: 768px) {
  body.sidebar-collapsed .contenedor-principal {
    margin-left: 0 !important;
  }
}
</style>
