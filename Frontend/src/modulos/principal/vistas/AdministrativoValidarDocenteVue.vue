<template>
  <span class="admin-docentes">
    <header class="header-azul">
      <div class="header-content">
        <span class="icono-atras" @click="$router.go(-1)">
          <img src="@/assets/icono-back.png" alt="Atrás" class="img-white" />
        </span>
        <h1>Validación - Selección de Docente</h1>
        <div class="spacer"></div>
      </div>
    </header>

    <main class="main-contenido">
      <div class="tabla-contenedor">
        <div class="fila header-row">
          <div class="col-nombre">Nombre del Docente</div>
          <div class="col-id">ID / Ficha</div>
          <div class="col-acciones">Acción</div>
        </div>

        <div v-if="cargando" class="loading-box">
          <p>Cargando lista de docentes...</p>
        </div>

        <div v-else-if="listaDocentes.length === 0" class="empty-state">
          <p>No se encontraron docentes registrados.</p>
        </div>

        <div
          class="fila"
          v-for="docente in listaDocentes"
          :key="docente.idUsuario"
        >
          <div class="col-nombre">
            <strong class="texto-nombre">
              {{ docente.apePatUsuario }} {{ docente.apeMatUsuario }}
              {{ docente.nombreUsuario }}
            </strong>
          </div>

          <div class="col-id">
            Docente #{{ docente.idDocente }}
          </div>

          <div class="col-acciones">
            <button
              class="btn-icon view"
              @click="irAValidar(docente)"
              title="Ver Documentos de este Docente"
            >
              <img src="@/assets/icono-elegir.png" alt="Ir" />
            </button>
          </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <span class="icono-exit">
        <img src="@/assets/icono-exit.png" alt="Salir" />
      </span>
    </footer>
  </span>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

const router = useRouter();
const listaDocentes = ref([]);
const cargando = ref(false);

// CARGAR DATOS
onMounted(async () => {
  cargando.value = true;
  try {
    // Ajusta la URL a donde hayas puesto la ruta del paso 1
    const res = await axios.get("http://localhost:3001/api/usuario/docente/listado");
    listaDocentes.value = res.data;
  } catch (error) {
    console.error("Error cargando docentes:", error);
    // Datos dummy por si falla el back en la demo
    listaDocentes.value = [
      { idUsuario: 4, idDocente: 101, nombreUsuario: "Juan", apePatUsuario: "Pérez", apeMatUsuario: "López" },
      { idUsuario: 17, idDocente: 202, nombreUsuario: "María", apePatUsuario: "García", apeMatUsuario: "Méndez" },
    ];
  } finally {
    cargando.value = false;
  }
});

// NAVEGACIÓN
const irAValidar = (docente) => {
  const nombreCompleto = `${docente.nombreUsuario} ${docente.apePatUsuario}`;
  
  // Redirigimos a la vista que creamos anteriormente
  router.push({
    name: "administrativo-validar", 
    params: { idUsuario: docente.idUsuario },
    query: { nombre: nombreCompleto }
  });
};
</script>

<style scoped>
:global(:root) {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --azul-btn: #007bff;
}

.admin-docentes {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: "Segoe UI", Arial, sans-serif;
  color: var(--color-text-osc);
}

/* HEADER CONSISTENTE (1200px) */
.header-azul {
  background-color: var(--color-sigedd-osc);
  color: white;
  padding: 15px 30px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px; /* Igual que en validar documentos */
  margin: 0 auto;
  width: 100%;
}
.header-content h1 {
  margin: 0;
  font-size: 1.5rem;
}
.img-white {
  width: 30px;
  cursor: pointer;
  filter: brightness(0) invert(1);
}
.spacer { width: 30px; }

/* CONTENIDO CENTRADO (1200px) */
.main-contenido {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  width: 100%;
  
  /* Ajuste para centrado idéntico al otro módulo */
  max-width: 1200px; 
  margin: 0 auto;
  display: block; /* Quitamos flex para que use el margin auto */
}

.tabla-contenedor {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 100%;
  /* max-width removido para que llene el contenedor de 1200px */
}

/* FILAS Y COLUMNAS */
.fila {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
}
.header-row {
  background-color: #f1f3f5;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.85em;
  color: #555;
}

.col-nombre {
  flex: 3;
  text-align: left;
}
.texto-nombre {
  font-size: 1.1em;
  color: var(--color-text-osc);
  text-transform: uppercase;
}

.col-id {
  flex: 1;
  text-align: center;
  color: #777;
}

.col-acciones {
  flex: 1;
  display: flex;
  justify-content: center;
}

/* BOTÓN IR */
.btn-icon {
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-icon img {
  width: 22px;
}
.btn-icon.view:hover {
  background-color: #e3f2fd;
  border-color: var(--azul-btn);
}

/* FOOTER */
.footer {
  background: var(--color-sigedd-osc);
  padding: 15px 30px;
  text-align: right;
}
.icono-exit img {
  width: 35px;
  cursor: pointer;
  filter: brightness(0) invert(1);
}

.loading-box, .empty-state {
  padding: 30px;
  text-align: center;
  color: #666;
}
</style>