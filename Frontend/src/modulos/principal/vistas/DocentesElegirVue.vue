<template>
  <span class="docentes-elegir">
    
    <header class="header">
      <span class="header-icono back-icono">
        <span class="icono"><img src="@/assets/icono-back.png" alt=""></span>
      </span>

      <span class="header-logo">
        <img src="@/assets/sigedd-logo.png" alt="">
      </span>

      <span class="header-icono"></span>
    </header>

    <main class="main-contenido">

      <span class="titulo-actividad">
        Actividad: <span class="nito">{{ actividadActual }}</span>
      </span>

      <div class="visor-formato">

        <button class="flecha" @click="anterior">
          <img src="@/assets/icono-flecha-izquierda.png" alt="">
        </button>

        <span class="contenedor-documento">
          <!-- placeholder pdf -->
        </span>

        <button class="flecha" @click="siguiente">
          <img src="@/assets/icono-flecha-derecha.png" alt="">
        </button>

      </div>

      <span class="texto-formato">
        Formato: <span class="nito">{{ formatoActual }}</span>
      </span>

    </main>

    <footer class="footer">
      <span class="icono-exit"><img src="@/assets/icono-exit.png" alt=""></span>
    </footer>

  </span>
</template>

<script setup>
import { ref } from 'vue';

const actividades = [
  { actividad: "Tutorías", formato: "Nombre formato" },
  { actividad: "Asesorías", formato: "Formato 2" },
  { actividad: "Proyecto", formato: "Formato 3" }
];

const index = ref(0);

const actividadActual = ref(actividades[index.value].actividad);
const formatoActual = ref(actividades[index.value].formato);

const actualizar = () => {
  actividadActual.value = actividades[index.value].actividad;
  formatoActual.value = actividades[index.value].formato;
};

const anterior = () => {
  if (index.value > 0) index.value--;
  actualizar();
};

const siguiente = () => {
  if (index.value < actividades.length - 1) index.value++;
  actualizar();
};
</script>

<style scoped>
:root {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --color-border: #b0c4d4;
}

.docentes-elegir {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: Arial, sans-serif;
  color: var(--color-text-osc);
}

/* HEADER */
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 20px;
  width: 100%;
}

.header-logo img {
  width: 400px;
  margin: -150px; 
}

.header-icono {
  width: 40px;
}

.icono img {
  width: 40px;
  cursor: pointer;
}

.main-contenido {
  flex: 1;
  text-align: center;
  padding-top: 20px;
}

.titulo-actividad {
  font-size: 1.8em;
}

.nito {
  font-weight: bold;
}

.visor-formato {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.flecha {
  background: none;
  border: none;
  cursor: pointer;
}

.flecha img {
  width: 30px;
}

.contenedor-documento {
  width: 350px;
  height: 430px;
  background-color: #cfcfcf;
  margin: 0 25px;
  border-radius: 4px;
}

.texto-formato {
  margin-top: 15px;
  font-size: 1.3em;
}

.footer {
  width: 100%;
  background-color: var(--color-sigedd-osc);
  padding: 16px 20px;
}

.footer img {
  width: 50px;
  cursor: pointer;
}
</style>
