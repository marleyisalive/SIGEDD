<template>
  <div class="contenedor-principal">
    <div class="main-contenido">
      <!-- LOGO -->
      <img
        src="../../../assets/sigedd-logo.png"
        alt="SigeddLogo"
        class="Logo"
      />
      <img
        src="../../../assets/sigedd-icono.png"
        class="IconoSigedd"
        alt="SIGEDD"
      />

      <!-- TEXTO -->
      <p class="main-texto">
        ¡Olvida la guerra de papeles! <br />
        Ahora puedes generar, validar y gestionar tus constancias oficiales
        <br />
        de forma rápida y precisa, para participar en el programa EDD.
      </p>

      <!-- BOTÓN -->
      <button class="main-boton" @click="irALogin">INICIAR</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const irALogin = () => {
  router.push({ path: "/Login" });
};
</script>

<style scoped>
:global(:root) {
  --azul-oscuro: #0f3b75;
  --azul-claro: #d9eaf7;
  --texto-oscuro: #1a1a1a;
  --btn-texto: #0f3b75;

  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu,
    Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

.contenedor-principal {
  min-height: 100vh;
  background-color: var(--azul-oscuro);
  position: relative;
  overflow: hidden;
  font-family: var(--font-family);
}

/* Triángulo en forma de V */
.contenedor-principal::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 90%;
  background-color: var(--azul-claro);

  /* V gigante */
  clip-path: polygon(0 0, 100% 0, 50% 100%);
}

.main-contenido {
  position: absolute;
  top: 38%;
  left: 50%;
  transform: translate(-50%, -38%);
  text-align: center;
  width: 80%;
  max-width: 900px;
  color: var(--texto-oscuro);
}

/* LOGO */
.main-logo {
  width: 320px;
  margin-bottom: 20px;
}

/* TEXTO */
.main-texto {
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1.9;
  margin-bottom: 40px;
  position: relative;
  top: -420px;
}

/* BOTÓN */
.main-boton {
  border: none;
  padding: 12px 40px;
  font-size: 1rem;
  font-weight: bold;
  border-radius: 6px;
  cursor: pointer;
  background-color: #ebeff3;
  color: #5a5a6a;
  transition: 0.3s;
  position: relative;
  top: -60px;
}

.main-boton:hover {
  opacity: 0.85;
}

.Logo {
  position: relative;
  top: -200px;
  right: 210px;
}

.IconoSigedd {
  position: absolute;
  bottom: -200px; /* distancia desde abajo */
  right: -450px; /* distancia desde la derecha */
  width: 150px; /* tamaño */
}
</style>
