<template>
  <div class="contenedor-principal">

    <!-- ENCABEZADO CON LOGO Y BIENVENIDA -->
    <div class="encabezado">
      <img src="../../../assets/sigedd-logo.png" class="logo-sigedd" alt="logo" />

      <h2 class="bienvenida">
        Bienvenid@, <span class="nombre-usuario">{{ usuario }}</span>
      </h2>
    </div>

    <!-- BOTONES PRINCIPALES -->
    <div class="botones">
      <button class="btn btn-azul">Documentos <br /> Listos</button>
      <button class="btn btn-verde">Generar <br /> Documentos</button>
    </div>

    <!-- HISTORIAL -->
    <div class="historial">
      <h3>Historial de documentos generados</h3>

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
          <!-- Si NO hay documentos -->
          <tr v-if="documentos.length === 0">
            <td colspan="8" class="sin-documentos">No hay documentos generados todavía</td>
          </tr>

          <!-- Si hay documentos -->
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

  </div>
</template>


<script setup>
import { ref } from "vue";

// ← Aquí asignas el nombre que venga del login
const usuario = ref("Nombre del Usuario");

// ← Tabla dinámica 
const documentos = ref([]);

// OPCIONAL: para probar, agrega elementos así:
// documentos.value.push({
//   id: "001",
//   actividad: "Tutoria",
//   plantilla: "001",
//   docente: "Norma Godoy",
//   estatus: "Generado",
//   validador: "Subdireccion",
//   fechaEnvio: "10/12/25",
//   fechaValidacion: "-"
// });

</script>


<style scoped>
:global(:root){
  --azul-oscuro: #0F3B75;
  --azul-claro: #D9EAF7;
  --verde: #4CAF50;
  --texto-oscuro: #1a1a1a;

  --font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}

/* FONDO GENERAL */
.contenedor-principal {
  min-height: 100vh;
  background-color: var(--azul-claro);
  padding: 40px;
  font-family: var(--font-family);
}

/* ENCABEZADO */
.encabezado {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 40px;
}

.logo-sigedd {
  width: 560px;
  
}

.bienvenida {
  font-size: 1.8rem;
  margin: 0;
  color: var(--texto-oscuro);
}

.nombre-usuario {
  font-weight: bold;
}

/* BOTONES */
.botones {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 50px;
}

.btn {
  width: 250px;
  padding: 20px;
  text-align: center;
  border-radius: 18px;
  border: none;
  font-size: 1.4rem;
  font-weight: bold;
  cursor: pointer;
  color: white;
  transition: 0.3s;
  line-height: 1.2;
}

.btn-azul {
  background-color: #1657b5;
}

.btn-verde {
  background-color: #38b32b;
}

.btn:hover {
  opacity: 0.85;
}

/* CONTENEDOR DEL HISTORIAL */
.historial {
  background-color: var(--azul-oscuro);
  padding: 40px;
  border-radius: 15px;
  color: white;
}

.historial h3 {
  margin-bottom: 20px;
  font-size: 1.4rem;
}
.sin-documentos {
  text-align: center;
  padding: 20px;
  opacity: 0.8;
}


/* TABLA */
.tabla-historial {
  width: 100%;
  border-collapse: collapse;
  font-size: 1rem;
}

.tabla-historial th {
  text-align: left;
  padding: 12px;
  border-bottom: 2px solid rgba(255,255,255,0.2);
}

.tabla-historial td {
  padding: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.tabla-historial tr:last-child td {
  border-bottom: none;
}
</style>
