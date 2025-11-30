<template>
  <div class="contenedor-principal">
    <!-- CONTENEDOR CENTRAL -->
    <div class="contenedor-blanco">
      <!-- ENCABEZADO -->
      <div class="encabezado">
        <img
          src="../../../assets/sigedd-logo.png"
          class="logo-sigedd"
          alt="logo"
        />
        <h2 class="titulo">Documentos Generados</h2>
      </div>

      <!-- CONTROLES SUPERIORES -->
      <div class="controles">
        <label class="sort">Ordenar:</label>
        <select>
          <option>ID</option>
          <option>Actividad</option>
          <option>Estatus</option>
        </select>

        <label class="sort">Ver:</label>
        <select>
          <option>10</option>
          <option>20</option>
          <option>50</option>
        </select>
      </div>

      <!-- TABLA -->
      <table class="tabla-historial">
        <thead>
          <tr>
            <th>#ID</th>
            <th>Actividad</th>
            <th>Plantilla</th>
            <th>Docente</th>
            <th>Estatus</th>
            <th>Validador</th>
            <th>Fecha Envío</th>
            <th>Fecha Validación</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          <!-- Mensaje de carga -->
          <tr v-if="loading">
            <td colspan="9" class="sin-documentos">
              <p class="empty-message">Cargando documentos...</p>
            </td>
          </tr>

          <!-- Mensaje de error -->
          <tr v-else-if="error">
            <td colspan="9" class="sin-documentos">
              <p class="empty-message" style="color: red">{{ error }}</p>
            </td>
          </tr>

          <!-- Si está vacía -->
          <tr v-else-if="documentos.length === 0">
            <td colspan="9" class="sin-documentos">
              <p class="empty-message">No hay documentos generados todavía.</p>
            </td>
          </tr>

          <!-- Documentos dinámicos -->
          <tr v-else v-for="doc in documentos" :key="doc.id">
            <td>{{ doc.id }}</td>
            <td>{{ doc.actividad }}</td>
            <td>{{ doc.plantilla }}</td>
            <td>{{ doc.docente }}</td>
            <td>{{ doc.estatus }}</td>
            <td>{{ doc.validador }}</td>
            <td>{{ doc.fechaEnvio }}</td>
            <td>{{ doc.fechaValidacion }}</td>

            <td class="acciones">
              <img
                src="../../../assets/descarga.png"
                class="icono"
                @click="descargar(doc)"
              />
              <img
                src="../../../assets/ocultar.png"
                class="icono"
                @click="ver(doc)"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div class="exit-container">
        <img src="../../../assets/Exit.png" alt="Salir" class="exit-icon" />
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getUsuarioFromStorage } from "@/utils/auth";

const documentos = ref([]);
const loading = ref(true);
const error = ref("");

const formatearFecha = (fecha) => {
  if (!fecha) return "-";
  const date = new Date(fecha);
  return date.toLocaleDateString("es-MX", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
};

const cargarDocumentos = async () => {
  try {
    loading.value = true;
    error.value = "";

    // Obtener usuario del localStorage
    const usuario = getUsuarioFromStorage();
    if (!usuario) {
      error.value = "No se encontró información del usuario";
      return;
    }

    console.log("Usuario logueado:", usuario);
    console.log("idUsuario enviado:", usuario.idUsuario);

    // Llamar al endpoint con el idUsuario
    const response = await fetch(
      `http://localhost:3000/documento/usuario/${usuario.idUsuario}`
    );

    if (!response.ok) {
      throw new Error("Error al cargar documentos");
    }

    const data = await response.json();
    console.log("Documentos recibidos del backend:", data);

    // Mapear los datos al formato esperado por la tabla
    documentos.value = data.map((doc) => ({
      id: doc.idDocumento,
      actividad: doc.nombreActividad || "-",
      plantilla: doc.nombreTipoDocumento || "-",
      docente: doc.nombreDocente || "-",
      estatus: doc.estatus || "Pendiente",
      validador: doc.validadoPor ? `ID: ${doc.validadoPor}` : "-",
      fechaEnvio: formatearFecha(doc.fechaRegistro),
      fechaValidacion: formatearFecha(doc.fechaValidacion),
      urlArchivo: doc.urlArchivo,
      validadoPor: doc.validadoPor,
    }));
  } catch (err) {
    console.error("Error al cargar documentos:", err);
    error.value = "No se pudieron cargar los documentos";
  } finally {
    loading.value = false;
  }
};

const descargar = (doc) => {
  // Aquí implementarás la lógica de descarga
  console.log("Descargar:", doc.id, doc.urlArchivo);
  // window.open(doc.urlArchivo, '_blank');
};

const ver = (doc) => {
  console.log("Ver documento:", doc.id);
  // Aquí puedes abrir un modal o navegar a vista previa
};

onMounted(() => {
  cargarDocumentos();
});
</script>
<style scoped>
:global(:root) {
  --azul-oscuro: #0f3b75;
  --azul-claro: #d9eaf7;
  --gris-header: #c9c9c9;
  --blanco: #ffffff;
}

/* fondo general */
.contenedor-principal {
  min-height: 100vh;
  background-color: var(--azul-claro);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

/* contenedor central */
.contenedor-blanco {
  width: 90%;
  max-width: 1100px;
  background: var(--blanco);
  padding: 30px 40px;
  border-radius: 20px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.1);
  border: 6px solid var(--azul-oscuro);
  position: relative;
}

/* encabezado */
.encabezado {
  text-align: center;
  margin-bottom: 25px;
}

.logo-sigedd {
  width: 350px;
  margin-bottom: -50px;
}

.titulo {
  margin-top: 15px;
  font-size: 1.8rem;
  color: var(--azul-oscuro);
  font-weight: 700;
}

/* controles superiores */
.controles {
  margin-bottom: 15px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.controles select {
  padding: 3px 6px;
  border-radius: 4px;
}

/* tabla */
.tabla-historial {
  width: 100%;
  border-collapse: collapse;
}

.tabla-historial thead th {
  background: var(--gris-header);
  padding: 8px;
  text-align: left;
  border-bottom: 2px solid #333;
  color: var(--azul-oscuro);
  font-weight: bold;
}

.tabla-historial tbody td {
  padding: 10px;
  border-bottom: 2px solid #999;
}

/* mensaje tabla vacía */
.sin-documentos {
  text-align: center;
  padding: 20px;
  opacity: 0.7;
}
.empty-message {
  color: #333; /* oscuro */
  font-size: 16px;
  text-align: center;
}

.sort {
  color: #1a1a1a; /* Color oscuro */
  font-weight: 600;
}

/* iconos */
.icono {
  width: 28px;
  margin-right: 10px;
  cursor: pointer;
  transition: 0.2s;
}
.exit-container {
  position: absolute;
  bottom: 25px;
  left: 40px;
}

.exit-icon {
  width: 40px;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.exit-icon:hover {
  transform: scale(1.1);
}

.icono:hover {
  opacity: 0.7;
}

.acciones {
  display: flex;
  align-items: center;
}
</style>
