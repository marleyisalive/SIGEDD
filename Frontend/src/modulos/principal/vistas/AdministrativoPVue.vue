<template>
  <div class="contenedor-principal">
    <!-- ENCABEZADO -->
    <div class="encabezado">
      <img
        src="../../../assets/sigedd-logo.png"
        class="logo-sigedd"
        alt="logo"
      />

      <div class="bienvenida-con-icono">
        <h2 class="bienvenida">
          Bienvenid@, <span class="nombre-usuario">{{ usuario }}</span>
        </h2>
      </div>
    </div>

    <!-- BOTÓN PRINCIPAL -->
    <div class="boton-centro">
      <button class="btn-validar" @click="validarDocentes">
        Validar <br />
        Docentes
      </button>
    </div>

    <!-- HISTORIAL -->
    <div class="historial">
      <h3>Historial de documentos validados</h3>

      <table class="tabla-historial">
        <thead>
          <tr>
            <th># ID</th>
            <th>Actividad</th>
            <th>Plantilla</th>
            <th>Docente</th>
            <th>Estatus</th>
            <th>Validador</th>
            <th>Fecha envío</th>
            <th>Fecha validación</th>
          </tr>
        </thead>

        <tbody>
          <!-- Si no hay registros -->
          <tr v-if="documentos.length === 0">
            <td colspan="8" class="sin-documentos">
              No hay documentos validados todavía
            </td>
          </tr>

          <!-- Si hay registros -->
          <tr v-for="doc in documentos" :key="doc.id">
            <td>{{ doc.id }}</td>
            <td>{{ doc.actividad }}</td>
            <td>{{ doc.plantilla }}</td>
            <td>{{ doc.docente }}</td>
            <td>{{ doc.estatus }}</td>
            <td>{{ doc.validador }}</td>
            <td>{{ doc.fechaEnvio }}</td>
            <td>{{ doc.fechaValidacion }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- ICONO SALIR -->
    <div class="exit-container">
      <img
        src="../../../assets/icons/exit.png"
        class="exit-icon"
        alt="Salir"
        @click="salir"
      />
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();

// Nombre del administrativo
const usuario = ref("Nombre Administrativo");

// Registros del historial
const documentos = ref([
  {
    id: "001",
    actividad: "Tutoria",
    plantilla: "001",
    docente: "Norma Godoy",
    estatus: "Generado",
    validador: "Subdireccion",
    fechaEnvio: "10/12/25",
    fechaValidacion: "-",
  },
  {
    id: "002",
    actividad: "Didactico",
    plantilla: "002",
    docente: "Norma Godoy",
    estatus: "Validado",
    validador: "D. Docencia",
    fechaEnvio: "10/12/25",
    fechaValidacion: "15/12/25",
  },
  {
    id: "003",
    actividad: "Innovatec",
    plantilla: "003",
    docente: "Norma Godoy",
    estatus: "Rechazado",
    validador: "Planeacion",
    fechaEnvio: "10/12/25",
    fechaValidacion: "15/12/25",
  },
]);

// Botón validar
const validarDocentes = () => {
  router.push("/validar-docentes");
};

// Salir
const salir = () => {
  router.push("/login");
};
</script>
<style scoped>
:global(:root) {
  --azul-oscuro: #0f3b75;
  --azul-claro: #d9eaf7;
  --verde: #4caf50;
  --texto-oscuro: #1a1a1a;
}

/* FONDO GENERAL */
.contenedor-principal {
  min-height: 100vh;
  background-color: var(--azul-claro);
  padding: 40px;
  position: relative;
}

/* ICONO CONTACTO */
.icono-contacto {
  width: 65px;
  position: absolute;
  top: 25px;
  right: 35px;
  cursor: pointer;
}

/* ENCABEZADO */
.encabezado {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.logo-sigedd {
  width: 360px;
}

.bienvenida {
  font-size: 2rem;
  color: var(--texto-oscuro);
}

.nombre-usuario {
  font-weight: bold;
}

/* BOTÓN PRINCIPAL */
.boton-centro {
  text-align: center;
  margin-bottom: 40px;
}

.btn-validar {
  background-color: #5fd953;
  color: white;
  border: none;
  font-size: 2rem;
  padding: 25px 60px;
  border-radius: 20px;
  cursor: pointer;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
}
.btn-validar:hover {
  background-color: #4eb947;
}

/* HISTORIAL */
.historial {
  background-color: var(--azul-oscuro);
  padding: 40px;
  border-radius: 15px;
  color: white;
}

.historial h3 {
  text-align: center;
  font-size: 1.6rem;
  margin-bottom: 25px;
}

/* TABLA */
.tabla-historial {
  width: 100%;
  border-collapse: collapse;
}

.tabla-historial th {
  padding: 12px;
  background-color: rgba(255, 255, 255, 0.2);
}

.tabla-historial td {
  padding: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;
}

.sin-documentos {
  text-align: center;
  padding: 20px;
  opacity: 0.7;
}

/* ICONO SALIR */
.exit-container {
  position: absolute;
  bottom: 30px;
  left: 30px;
}

.exit-icon {
  width: 50px;
  cursor: pointer;
  transition: 0.2s;
}

.exit-icon:hover {
  transform: scale(1.15);
}
.historial {
  background-color: var(--azul-oscuro);
  padding: 40px;
  border-radius: 15px;
  color: white;

  width: 85%;
  margin: 0 auto;
}
.historial {
  width: 80%;
  max-width: 1300px;
  margin: 0 auto;
}
</style>
