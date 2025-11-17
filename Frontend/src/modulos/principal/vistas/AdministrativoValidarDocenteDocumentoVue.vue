<template>
    <div class="admin-validar-documento">
    
    <header class="header">
      <span class="header-icono back-icono">
        <span class="icono"><img src="@/assets/icono-back.png" alt="Regresar"></span>
      </span>

      <span class="header-logo">
        <img src="@/assets/sigedd-logo.png" alt="SIGEDD Logo">
      </span>

      <span class="header-icono"></span>
    </header>

    <main class="main-contenido">

      <h2 class="titulo-docente">
        Docente: <span class="nito">{{ nombreDocente }}</span>
      </h2>

      <h2 class="titulo-actividad">
        Actividad: <span class="nito">{{ actividadActual }}</span>
      </h2>

      <div class="visor-wrapper">
        
              <div class="visor-formato">
          <button class="flecha" @click="anterior">
            <img src="@/assets/icono-flecha-izquierda.png" alt="Anterior">
          </button>

          <span class="contenedor-documento">
                    </span>

          <button class="flecha" @click="siguiente">
            <img src="@/assets/icono-flecha-derecha.png" alt="Siguiente">
          </button>
        </div>

        <div class="botones-accion">
          <button class="btn-accion btn-aprobar" @click="aprobar">
            <img src="@/assets/icono-check.png" alt=""> Aprobar
          </button>
          <button class="btn-accion btn-rechazar" @click="rechazar">
            <img src="@/assets/icono-x.png" alt=""> Aprobar
          </button>
        </div>

      </div>

      <span class="texto-formato">
        Formato: <span class="nito">{{ formatoActual }}</span>
      </span>

    </main>

    <footer class="footer">
      <span class="icono-exit"><img src="@/assets/icono-exit.png" alt="Salir"></span>
    </footer>

  </div>
</template>

<script setup>
import { ref } from 'vue';


const nombreDocente = ref('Clemente García');

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


const aprobar = () => {
  console.log(`Aprobado: ${actividadActual.value} de ${nombreDocente.value}`);

};

const rechazar = () => {
  console.log(`Rechazado: ${actividadActual.value} de ${nombreDocente.value}`);

};
</script>

<style scoped>
:global(:root) {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --color-border: #b0c4d4;
  --color-verde: #76c729; 
  --color-rojo: #e53935;
}


.admin-validar-documento {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: Arial, sans-serif;
  color: var(--color-text-osc);
}


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
  padding-top: 10px; 
  display: flex;
  flex-direction: column;
  align-items: center;
}


.titulo-docente,
.titulo-actividad {
  font-size: 1.8em;
  font-weight: 500;
  margin: 0;
}
.titulo-docente {
  margin-bottom: 5px;
}

.nito {
  font-weight: bold;
}

.visor-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
  gap: 30px; 
  width: 100%;
  max-width: 900px; 
  margin-left: auto;
  margin-right: auto;
}

.visor-formato {
  display: flex;
  justify-content: center;
  align-items: center;
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


.botones-accion {
  display: flex;
  flex-direction: column;
  gap: 15px; 
}

.btn-accion {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 170px; 
  padding: 10px 15px;
  border-radius: 8px;
  border: none;
  color: white;
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  gap: 10px; 
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.btn-accion:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.btn-accion img {
  width: 24px; 
  height: 24px;
}

.btn-aprobar {
  background-color: var(--color-verde);
}

.btn-rechazar {
  background-color: var(--color-rojo);
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