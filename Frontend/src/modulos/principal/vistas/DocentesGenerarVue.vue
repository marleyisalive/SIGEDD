<template>
  <span class="docentes-generar">
    
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
      <span class="actividad-list">
        
        <span class="actividad-row header-row">
          <span class="col-actividad">Actividad</span>
          <span class="col-generar">Generar todos</span>
          <span class="col-elegir">Elegir</span>
        </span>

        <span 
          class="actividad-row" 
          v-for="actividad in actividades" 
          :key="actividad.id"
        >
          <span class="col-actividad">{{ actividad.name }}</span>
          
          <span class="col-generar">
            <span class="icono"><img src="@/assets/icono-generar.png" alt=""></span>
          </span>
          
          <span class="col-elegir">
            <span class="icono"><img src="@/assets/icono-elegir.png" alt=""></span>
          </span>
        </span>

      </span>
    </main>

    <footer class="footer">
      <span class="icono-exit"><img src="@/assets/icono-exit.png" alt=""></span>
    </footer>

  </span>
</template>

<script setup>
// script ejemplo, si no sirve lo quitamos alv
import { ref } from 'vue';

const actividades = ref([
  { id: 1, name: 'aasdsad' },
  { id: 2, name: 'dsadxzc' }
]);
</script>

<style scoped>
:global(:root) {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --color-border: #b0c4d4;
}

.docentes-generar {
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

.header-logo img{
  margin: 0;
  width: 400px;
  margin: -150px;
}

.header-icono{
  flex-basis: 40px; 
}

.back-icono {
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
}

.main-contenido {
  flex: 1;
  padding: 20px 40px;
  overflow-y: auto;
}

.actividad-list {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.actividad-row {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 16px 20px;
  box-sizing: border-box;
  margin: 0 auto;
  max-width: 800px;
  border-bottom: 2px solid var(--color-border);
}

.actividad-row.header-row {
  font-weight: bold;
  font-size: 1.5em;
  border-bottom: 3px solid var(--color-border);
}

.col-actividad {
  flex: 1; 
  text-align: left;
  font-size: 1em;
}

.col-generar,
.col-elegir {
  flex: 1; 
  text-align: center;
}

.footer {
  width: 100%;
  background-color: var(--color-sigedd-osc);
  padding: 16px 20px;
  box-sizing: border-box;
}

.footer img{
  width: 50px;
  cursor: pointer;
}

.icono img{
  width: 40px;
  cursor: pointer;
}


</style>