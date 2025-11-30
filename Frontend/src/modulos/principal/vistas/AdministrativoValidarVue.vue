<template>
  <span class="admin-validar">
    <header class="header-azul">
      <div class="header-content">
        <span class="icono-atras" @click="$router.go(-1)">
          <img src="@/assets/icono-back.png" alt="Atrás" class="img-white" />
        </span>
        <div class="titulo-container">
          <h1>Validación de Documentos</h1>
          <h2 class="subtitulo" v-if="nombreDocente">
            Docente: <span class="resaltado">{{ nombreDocente }}</span>
          </h2>
        </div>
        <div class="spacer"></div>
      </div>
    </header>

    <main class="main-contenido">
      <div class="tabla-contenedor">
        <div class="fila header-row">
          <div class="col-nombre">Formato / Actividad</div>
          <div class="col-fecha">Fecha Registro</div>
          <div class="col-estado">Estado Actual</div>
          <div class="col-acciones">Validación</div>
        </div>

        <div v-if="cargando" class="loading-box">
          <p>Cargando documentos del docente...</p>
        </div>

        <div v-else-if="listaDocumentos.length === 0" class="empty-state">
          <p>Este docente no ha registrado actividades.</p>
        </div>

        <div
          class="fila"
          v-for="doc in listaDocumentos"
          :key="doc.idDocenteActividad"
        >
          <div class="col-nombre">
            <strong class="texto-formato-oficial">{{
              obtenerNombreFormato(doc.idTipoDocumento)
            }}</strong>
            <div class="texto-actividad-detalle">{{ doc.nombreActividad }}</div>
          </div>

          <div class="col-fecha">
            {{ formatearFecha(doc.fechaRegistro) }}
          </div>

          <div class="col-estado">
              <div v-if="doc.validadoPor > 0" class="badge badge-aprobado">
                <span class="icono-estado">✓</span> Aprobado
              </div>
              
              <div v-else-if="doc.validadoPor === 0" class="badge badge-rechazado">
                <span class="icono-estado">✖</span> Rechazado
              </div>

              <div v-else class="badge badge-pendiente">
                <span class="icono-estado">⏳</span> Pendiente
              </div>
            </div>

            <div class="col-acciones">
              <button class="btn-icon view" @click="verDetalle(doc)" title="Ver Documento">
                <img src="@/assets/icono-elegir.png" alt="Ver" />
              </button>

              <button
                class="btn-icon aprobar"
                @click="aprobarDocumento(doc)"
                :disabled="doc.validadoPor > 0"
                :class="{ 'btn-disabled': doc.validadoPor > 0 }"
                title="Aprobar"
              >
                <span>✓</span>
              </button>

              <button
                class="btn-icon rechazar"
                @click="rechazarDocumento(doc)"
                :disabled="doc.validadoPor === 0"
                :class="{ 'btn-disabled': doc.validadoPor === 0 }"
                title="Rechazar"
              >
            <span>✖</span>
          </button>
        </div>
        </div>
      </div>
    </main>

    <footer class="footer">
      <span class="icono-exit"
        ><img src="@/assets/icono-exit.png" alt="Salir"
      /></span>
    </footer>
  </span>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import { getUsuarioFromStorage } from "@/utils/auth";

const route = useRoute();
const router = useRouter();

// ESTADO
const listaDocumentos = ref([]);
const cargando = ref(false);
const nombreDocente = ref(""); // Lo tomaremos de la query string
const adminId = ref(null);

// DICCIONARIO DE NOMBRES (Copia del otro componente)
const mapaNombresFormatos = {
  10: "Constancia PIT (1.1.5)",
  20: "Actividad de Acreditación (1.1.6)",
  30: "Actividad Complementaria (1.1.7)",
  40: "Recurso Educativo Digital (1.2.1.1)",
  50: "Manual de Prácticas (1.2.1.2)",
  60: "Estrategias Innovadoras (1.2.1.3)",
  70: "Instructor Diplomado (1.2.2.4)",
  80: "Constancia Productos (1.2.1.4)",
  90: "Exención Examen Profesional (1.3.1.1)",
  100: "Oficio Comisión (1.2.2.1)",
  110: "Oficio Comisión TecNM (1.2.2.2)",
  120: "Comisión Pensamiento Crítico (1.2.2.3)",
  130: "Comisión Ambientes Virtuales (1.2.2.5)",
  131: "Comisión Inclusiva (1.2.2.6)",
  132: "Comisión Estratégicas (1.2.2.7)",
  140: "Constancia Recursos Humanos (01)",
  150: "Carta Exclusividad Laboral (04)",
  155: "Constancia Proyecto Investigación (05)",
  160: "Constancia CVU (06)",
  170: "Constancia Alumnos Atendidos (07)",
  180: "Horario de Actividades (1.1.1)",
  181: "Asignaturas Adicionales (1.1.2)",
  182: "Horario Posgrado (1.1.3)",
  183: "Estudiantes Atendidos (1.1.4)",
  190: "Talón de Pago (02)",
  195: "Cédula Doctorado (1.4.9.1)",
  196: "Cédula Maestría (1.4.9.2)",
  200: "Propuesta Programa (1.4.8.3)",
  210: "Oficio Sabático/Beca (08)",
  215: "Licencia por Gravidez (09)",
  216: "Cédula Profesional (10)",
  220: "Liberación de Actividades Docentes (11)",
  230: "Liberación de Actividades Académicas (12)",
  240: "Reporte de Investigación (13)",
  250: "Evaluación Docente (14)",
  312: "Constancia Exención Especialización (1.3.1.2)",
  313: "Constancia Exención Maestría (1.3.1.3)",
  315: "Constancia Exención Doctorado (1.3.1.5)",
  314: "Constancia Exención Codirección Maestría (1.3.1.4)",
  316: "Constancia Exención Codirección Doctorado (1.3.1.6)",
  410: "Asesoría en Ciencias Básicas (1.4.1)",
  421: "Proyectos Locales (1.4.2.1)",
  422: "Proyectos Nacionales (1.4.2.2)",
  423: "Proyectos Internacionales (1.4.2.3)",
  431: "Asesoría Concurso 3er Lugar Nacional (1.4.3.1)",
  432: "Asesoría Concurso 2do Lugar Nacional (1.4.3.2)",
  433: "Asesoría Concurso 1er Lugar Nacional (1.4.3.3)",
  434: "Asesoría Concurso 3er Lugar Internacional (1.4.3.4)",
  435: "Asesoría Concurso 2do Lugar Internacional (1.4.3.5)",
  436: "Asesoría Concurso 1er Lugar Internacional (1.4.3.6)",
  441: "Coordinador Concurso General Local (1.4.4.1)",
  442: "Coordinador Concurso General Regional(1.4.4.2)",
  443: "Coordinador Concurso General Nacional o Internacional (1.4.4.3)",
  444: "Colaborador Concurso Local (1.4.4.4)",
  445: "Colaborador Concurso Regional (1.4.4.5)",
  446: "Colaborador Concurso Nacional o Internacional (1.4.4.6)",
  451: "Constancia Jurado Local (1.4.5.1)",
  452: "Constancia Jurado Regional (1.4.5.2)",
  453: "Constancia Jurado Nacional (1.4.5.3)",
  454: "Constancia Jurado Internacional (1.4.5.4)",
  461: "Comité Local o Regional(1.4.6.1)",
  462: "Comité Nacional (1.4.6.2)",
  463: "Comité Internacional (1.4.6.3)",
  471: "Constancia Auditor Interno en la Institución (1.4.7.1)",
  472: "Constancia Auditor Interno Fuera de la Institución (1.4.7.2)",
  473: "Constancia Auditor Líder en la Institución (1.4.7.3)",
  474: "Constancia Auditor Líder Fuera de la Institución (1.4.7.4)",
  482: "Constancia Módulo de Especialidad (1.4.8.2)",
  481: "Constancia Desarrollo Curricular Local (1.4.8.1.1)",
  483: "Constancia Desarrollo Curricular Nacional (1.4.8.1.2)",
  321: "Constancia de Sinodal Técnico Superior (1.3.2.1)",
  322: "Constancia de Sinodal Licenciatura (1.3.2.2)",
  323: "Constancia de Sinodal Especialización (1.3.2.3)",
  324: "Constancia de Sinodal Maestría (1.3.2.4)",
  325: "Constancia de Sinodal Técnico Doctorado (1.3.2.5)",
};

const obtenerNombreFormato = (id) => {
  return mapaNombresFormatos[id] || "Documento Desconocido";
};

const formatearFecha = (fecha) => {
  if (!fecha) return "--/--/----";
  return new Date(fecha).toLocaleDateString("es-MX");
};

// --- CICLO DE VIDA ---
onMounted(async () => {
  try {
    // 1. Obtener ID del docente a validar (desde URL params)
    const idDocenteObjetivo = route.params.idUsuario;
    // 2. Obtener Nombre (desde Query params para facilitar)
    nombreDocente.value = route.query.nombre || "Docente Seleccionado";

    // 3. Obtener ID del administrador logueado
    const admin = getUsuarioFromStorage();
    if (admin) adminId.value = admin.idUsuario;

    if (!idDocenteObjetivo) {
      alert("Error: No se especificó un docente.");
      return;
    }

    cargando.value = true;
    // REUTILIZAMOS LA MISMA RUTA DE OBTENER DOCUMENTOS
    const res = await axios.get(
      `http://localhost:3001/api/docenteactividad/usuario/${idDocenteObjetivo}`
    );
    listaDocumentos.value = res.data;
  } catch (e) {
    console.error(e);
    alert("Error cargando documentos.");
  } finally {
    cargando.value = false;
  }
});

// --- ACCIONES ---

const aprobarDocumento = async (doc) => {
  if (!confirm("¿Confirma que desea aprobar este documento?")) return;

  try {
    // LLAMADA AL ENDPOINT QUE CREAMOS ANTES
    await axios.put(
      `http://localhost:3001/api/docenteactividad/aprobar/${doc.idDocenteActividad}`,
      {
        idAdministrativo: adminId.value,
      }
    );

    // Actualización optimista en el Frontend (para que se ponga verde rápido)
    doc.validadoPor = adminId.value;
    alert("Documento aprobado con éxito.");
  } catch (error) {
    console.error(error);
    alert("Hubo un error al aprobar el documento.");
  }

};

const verDetalle = (doc) => {
  // Aquí podrías redirigir al visor de documentos que ya tienes
  // pero pasándole el ID de la actividad específica.
  // Por ahora, solo un console log o alert si no tienes ruta específica de vista previa
  alert("Aquí se abriría el visor para revisar el contenido antes de firmar.");
  // router.push(...)
};

const rechazarDocumento = async (doc) => {
  if (!confirm("¿Seguro que deseas RECHAZAR este documento?")) return;

  try {
    await axios.put(`http://localhost:3001/api/docenteactividad/rechazar/${doc.idDocenteActividad}`);
    
    // Actualizamos visualmente al instante
    doc.validadoPor = 0; 
    alert("Documento marcado como RECHAZADO.");
  } catch (error) {
    console.error(error);
    alert("Error al rechazar.");
  }
};
</script>

<style scoped>
:global(:root) {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --verde-ok: #28a745;
}

.admin-validar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: "Segoe UI", Arial, sans-serif;
  color: var(--color-text-osc);
}

/* HEADER */
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
  max-width: 1200px;
  margin: 0 auto;
}
.titulo-container h1 {
  margin: 0;
  font-size: 1.4rem;
}
.subtitulo {
  margin: 5px 0 0 0;
  font-size: 1rem;
  font-weight: 400;
  opacity: 0.9;
}
.resaltado {
  font-weight: bold;
  color: #aaddff;
}
.img-white {
  width: 30px;
  cursor: pointer;
  filter: brightness(0) invert(1);
}

/* TABLA */
.main-contenido {
  flex: 1;
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.tabla-contenedor {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.fila {
  display: flex;
  align-items: center;
  padding: 15px 25px;
  border-bottom: 1px solid #eee;
}
.fila:last-child {
  border-bottom: none;
}
.header-row {
  background-color: #f1f3f5;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.85em;
  color: #555;
}

/* COLUMNAS */
.col-nombre {
  flex: 4;
}
.col-fecha {
  flex: 1;
  text-align: center;
}
.col-estado {
  flex: 1.5;
  display: flex;
  justify-content: center;
}
.col-acciones {
  flex: 1.5;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.texto-formato-oficial {
  font-size: 1.05em;
  color: var(--color-text-osc);
}
.texto-actividad-detalle {
  font-size: 0.85em;
  color: #777;
}

/* BADGES */
.badge {
  padding: 5px 10px;
  border-radius: 15px;
  font-size: 0.85em;
  font-weight: bold;
  display: flex;
  align-items: center;
  gap: 5px;
}
.badge-aprobado {
  background-color: #e6f4ea;
  color: #1e7e34;
}
.badge-pendiente {
  background-color: #fff3cd;
  color: #856404;
}

/* BOTONES ACCION */
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

/* Estilo Botón Aprobar */
.btn-icon.aprobar {
  border-color: var(--verde-ok);
  color: var(--verde-ok);
  font-size: 1.2em;
}
.btn-icon.aprobar:hover {
  background-color: var(--verde-ok);
  color: white;
}

/* Estilo Botón Deshabilitado (Ya aprobado) */
.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f0f0f0 !important;
  color: #aaa !important;
  border-color: #ddd !important;
}

/* LOADING / EMPTY */
.loading-box,
.empty-state {
  padding: 40px;
  text-align: center;
  color: #777;
}

.footer {
  background: var(--color-sigedd-osc);
  padding: 15px 30px;
  text-align: right;
}
.icono-exit img {
  width: 35px;
}

/* Badge Rojo */
.badge-rechazado {
  background-color: #f8d7da;
  color: #721c24;
  border: 1px solid #f5c6cb;
}

/* Botón Rojo */
.btn-icon.rechazar {
  border-color: #dc3545;
  color: #dc3545;
  font-size: 1.2em;
}
.btn-icon.rechazar:hover {
  background-color: #dc3545;
  color: white;
}
</style>