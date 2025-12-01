<template>
  <span class="docentes-generar">
    <header class="header-azul">
      <div class="header-content">
        <span class="icono-atras" @click="$router.go(-1)">
          <img src="@/assets/icono-back.png" alt="Atrás" class="img-white" />
        </span>
        <h1>Generación de Documentos</h1>
        <div class="spacer"></div>
      </div>
    </header>

    <main class="main-contenido">
      <div class="acciones-globales">
        <button class="btn-global btn-azul" @click="irAIndividual">
          <img src="@/assets/icono-elegir.png" class="btn-icon-white" />
          <span>Ver Carrusel (Vista Previa)</span>
        </button>

        <button
          class="btn-global btn-verde"
          @click="descargarExpedienteCompleto"
        >
          <img src="@/assets/icono-generar.png" class="btn-icon-white" />
          <span>Descargar Todo (ZIP)</span>
        </button>
      </div>

      <div class="buscador-container">
        <div class="input-wrapper">
          <span class="icono-lupa">🔍</span>
          <input 
            v-model="textoBusqueda" 
            type="text" 
            placeholder="Buscar por nombre de actividad o tipo de formato..." 
            class="input-buscador"
          />
          <button v-if="textoBusqueda" @click="textoBusqueda = ''" class="btn-limpiar">✕</button>
        </div>
      </div>

      <div class="filtros-container">
        <button 
          class="btn-filtro" 
          :class="{ activo: filtroEstado === 'todos' }"
          @click="filtroEstado = 'todos'"
        >
          Todos <span class="contador">{{ contar('todos') }}</span>
        </button>

        <button 
          class="btn-filtro" 
          :class="{ activo: filtroEstado === 'pendientes' }"
          @click="filtroEstado = 'pendientes'"
        >
          ⏳ Pendientes <span class="contador">{{ contar('pendientes') }}</span>
        </button>

        <button 
          class="btn-filtro" 
          :class="{ activo: filtroEstado === 'aprobados' }"
          @click="filtroEstado = 'aprobados'"
        >
          ✅ Aprobados <span class="contador">{{ contar('aprobados') }}</span>
        </button>

        <button 
          class="btn-filtro" 
          :class="{ activo: filtroEstado === 'rechazados' }"
          @click="filtroEstado = 'rechazados'"
        >
          ✖ Rechazados <span class="contador">{{ contar('rechazados') }}</span>
        </button>
      </div>

      <div class="tabla-contenedor">
        <div class="fila header-row">
          <div class="col-id-bd">ID</div>
          <div class="col-nombre">Formato / Actividad</div>
          <div class="col-fecha">Fecha Registro</div>
          <div class="col-estado">Estado</div>
          <div class="col-acciones">Acciones</div>
        </div>

        <div v-if="cargando" class="loading-box">
          <p>{{ mensajeCarga }}</p>
          <div v-if="progreso > 0" class="progress-bar">
            <div class="progress-fill" :style="{ width: progreso + '%' }"></div>
          </div>
        </div>

        <div v-else-if="listaDocumentos.length === 0" class="empty-state">
          <p>No hay documentos registrados para este docente.</p>
        </div>

        <div
          class="fila"
          v-for="doc in listaFiltrada" 
          :key="doc.idDocenteActividad"
        >
        <div v-if="listaFiltrada.length === 0 && listaDocumentos.length > 0" class="empty-search">
          <p>No se encontraron documentos que coincidan con "{{ textoBusqueda }}"</p>
        </div>
          <div class="col-id-bd">
            <span class="badge-id">#{{ doc.idDocenteActividad }}</span>
            </div>
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

            <div v-else-if="!doc.validadoPor && doc.motivoRechazo" class="badge badge-rechazado">
              <span class="icono-estado">✖</span> Rechazado
            </div>

            <div v-else class="badge badge-pendiente">
              <span class="icono-estado">⏳</span> En Revisión
            </div>
          </div>

          <div class="col-acciones">
            <button
              class="btn-icon download"
              @click="descargarUnicoPDF(doc)"
              :disabled="!doc.validadoPor"
              :title="
                doc.validadoPor
                  ? 'Descargar PDF'
                  : 'Documento en espera de aprobación'
              "
              :class="{ 'btn-disabled': !doc.validadoPor }"
            >
              <img src="@/assets/icono-generar.png" alt="PDF" />
            </button>

            <button
              v-if="doc.validadoPor === 0"
              class="btn-icon rechazo-info"
              @click.stop="verMotivo(doc.motivoRechazo)"
              title="Ver motivo de rechazo"
            >
              <strong>?</strong>
            </button>

            <button
              class="btn-icon view"
              @click="irADetalleUnico(doc.idDocenteActividad)"
              :disabled="!doc.validadoPor"
              :class="{ 'btn-disabled': !doc.validadoPor }"
              :title="doc.validadoPor ? 'Ver Detalle' : 'Solo disponible en documentos aprobados'"
            >
              <img src="@/assets/icono-elegir.png" alt="Ver" />
            </button>
          </div>
        </div>
      </div>

      <div id="render-oculto" style="position: fixed; left: -9999px; top: 0">
        <component
          v-if="componenteActivo"
          :is="componenteActivo"
          :datos="datosActivos"
          class="hoja-carta"
        />
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
import { ref, onMounted, shallowRef, computed } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import JSZip from "jszip";
import html2pdf from "html2pdf.js";
import { getUsuarioFromStorage } from "@/utils/auth";

// --- IMPORTAR TODOS LOS COMPONENTES ---
// (Asegúrate de que las rutas sean correctas)
import ConstanciaPIT from "@/modulos/principal/vistas/plantillas/ConstanciaTutoriaVue.vue";
import ConstanciaAcreditacion from "@/modulos/principal/vistas/plantillas/ConstanciaAcreditacionVue.vue";
import ConstanciaComplementaria from "@/modulos/principal/vistas/plantillas/ConstanciaComplementariaVue.vue";
import ConstanciaRED from "@/modulos/principal/vistas/plantillas/ConstanciaREDVue.vue";
import ConstanciaManual from "@/modulos/principal/vistas/plantillas/ConstanciaManualVue.vue";
import ConstanciaEstrategia from "@/modulos/principal/vistas/plantillas/ConstanciaEstrategiaVue.vue";
import ConstanciaProductos from "@/modulos/principal/vistas/plantillas/ConstanciaProductosVue.vue";
import ConstanciaDiplomado from "@/modulos/principal/vistas/plantillas/ConstanciaDiplomadoVue.vue";
import ConstanciaExencion from "@/modulos/principal/vistas/plantillas/ConstanciaExencionVue.vue";
import OficioComision from "@/modulos/principal/vistas/plantillas/OficioComisionVue.vue";
import OficioComisionTecNM from "@/modulos/principal/vistas/plantillas/OficioComisionTecnmVue.vue";
import OficioPensamientoCritico from "@/modulos/principal/vistas/plantillas/OficioPensamientoCriticoVue.vue";
import OficioAmbientesVirtuales from "@/modulos/principal/vistas/plantillas/OficioAmbientesVirtualesVue.vue";
import ConstanciaRH from "@/modulos/principal/vistas/plantillas/ConstanciaRHVue.vue";
import CartaExclusividad from "@/modulos/principal/vistas/plantillas/CartaExclusividadVue.vue";
import ConstanciaCVU from "@/modulos/principal/vistas/plantillas/ConstanciaCVVue.vue";
import ConstanciaAlumnos from "@/modulos/principal/vistas/plantillas/ConstanciaAlumnosAtendidosVue.vue";
import HorarioActividades from "@/modulos/principal/vistas/plantillas/HorarioActividadesVue.vue";
import TalonPagoVue from "@/modulos/principal/vistas/plantillas/TalonPagoVue.vue";
import CedulaProfesional from "@/modulos/principal/vistas/plantillas/CedulaProfesionalVue.vue";
import ConstanciaPropuesta from "@/modulos/principal/vistas/plantillas/ConstanciaPropuestaVue.vue";
import OficioSabatico from "@/modulos/principal/vistas/plantillas/OficioSabaticoVue.vue";
import LiberacionActividades from "@/modulos/principal/vistas/plantillas/LiberacionActividadesVue.vue";
import LiberacionAcademicas from "@/modulos/principal/vistas/plantillas/LiberacionAcademicasVue.vue";
import ReporteInvestigacion from "@/modulos/principal/vistas/plantillas/ReporteInvestigacionVue.vue";
import EvaluacionDocente from "@/modulos/principal/vistas/plantillas/EvaluacionDocenteVue.vue";
import OficioInclusiva from "@/modulos/principal/vistas/plantillas/OficioInclusivaVue.vue";
import OficioEstrategicos from "@/modulos/principal/vistas/plantillas/OficioEstrategicosVue.vue";
import ConstanciaProyectosGenerico from "@/modulos/principal/vistas/plantillas/ConstanciaProyectosGenericoVue.vue";
import ConstanciaAsesoriaCBVue from "@/modulos/principal/vistas/plantillas/ConstanciaAsesoriaCBVue.vue";
import ConstanciaAsesoriaGenericVue from "@/modulos/principal/vistas/plantillas/ConstanciaAsesoriaGenericVue.vue";
import ConstanciaConcursoGenericVue from "@/modulos/principal/vistas/plantillas/ConstanciaConcursoGenericVue.vue";
import ConstanciaJuradoGenericVue from "@/modulos/principal/vistas/plantillas/ConstanciaJuradoGenericVue.vue";
import ConstanciaComiteGenericVue from "@/modulos/principal/vistas/plantillas/ConstanciaComiteGenericVue.vue";
import ConstanciaAuditoriaGenericVue from "@/modulos/principal/vistas/plantillas/ConstanciaAuditoriaGenericVue.vue";
import ConstanciaModuloEspecialidadVue from "@/modulos/principal/vistas/plantillas/ConstanciaModuloEspecialidadVue.vue";
import ConstanciaDesarrolloCurricularVue from "@/modulos/principal/vistas/plantillas/ConstanciaDesarrolloCurricularVue.vue";
import ConstanciaSinodalGenericVue from "@/modulos/principal/vistas/plantillas/ConstanciaSinodalGenericVue.vue";
import ConstanciaInvestigacionVue from "@/modulos/principal/vistas/plantillas/ConstanciaInvestigacionVue.vue";
import LicenciaGravidezVue from "@/modulos/principal/vistas/plantillas/LicenciaGravidezVue.vue";

const router = useRouter();
const listaDocumentos = ref([]);
const cargando = ref(false);
const mensajeCarga = ref("Cargando...");
const progreso = ref(0);
const filtroEstado = ref('todos');
const componenteActivo = shallowRef(null);
const datosActivos = ref({});
const textoBusqueda = ref("");

// MAPA DE COMPONENTES (Para renderizar)
const mapaComponentes = {
  10: ConstanciaPIT,
  20: ConstanciaAcreditacion,
  30: ConstanciaComplementaria,
  40: ConstanciaRED,
  50: ConstanciaManual,
  60: ConstanciaEstrategia,
  70: ConstanciaDiplomado,
  80: ConstanciaProductos,
  90: ConstanciaExencion,
  100: OficioComision,
  110: OficioComisionTecNM,
  120: OficioPensamientoCritico,
  130: OficioAmbientesVirtuales,
  131: OficioInclusiva,
  132: OficioEstrategicos,
  140: ConstanciaRH,
  150: CartaExclusividad,
  155: ConstanciaInvestigacionVue,
  160: ConstanciaCVU,
  170: ConstanciaAlumnos,
  180: HorarioActividades,
  181: HorarioActividades,
  182: HorarioActividades,
  183: ConstanciaAlumnos,
  190: TalonPagoVue,
  195: CedulaProfesional,
  196: CedulaProfesional,
  200: ConstanciaPropuesta,
  210: OficioSabatico,
  215: LicenciaGravidezVue,
  216: CedulaProfesional,
  220: LiberacionActividades,
  230: LiberacionAcademicas,
  240: ReporteInvestigacion,
  250: EvaluacionDocente,
  312: ConstanciaExencion,
  313: ConstanciaExencion,
  315: ConstanciaExencion,
  314: ConstanciaExencion,
  316: ConstanciaExencion,
  410: ConstanciaAsesoriaCBVue,
  421: ConstanciaProyectosGenerico,
  422: ConstanciaProyectosGenerico,
  423: ConstanciaProyectosGenerico,
  431: ConstanciaAsesoriaGenericVue,
  432: ConstanciaAsesoriaGenericVue,
  433: ConstanciaAsesoriaGenericVue,
  434: ConstanciaAsesoriaGenericVue,
  435: ConstanciaAsesoriaGenericVue,
  436: ConstanciaAsesoriaGenericVue,
  441: ConstanciaConcursoGenericVue,
  442: ConstanciaConcursoGenericVue,
  443: ConstanciaConcursoGenericVue,
  444: ConstanciaConcursoGenericVue,
  445: ConstanciaConcursoGenericVue,
  446: ConstanciaConcursoGenericVue,
  451: ConstanciaJuradoGenericVue,
  452: ConstanciaJuradoGenericVue,
  453: ConstanciaJuradoGenericVue,
  454: ConstanciaJuradoGenericVue,
  461: ConstanciaComiteGenericVue,
  462: ConstanciaComiteGenericVue,
  463: ConstanciaComiteGenericVue,
  471: ConstanciaAuditoriaGenericVue,
  472: ConstanciaAuditoriaGenericVue,
  473: ConstanciaAuditoriaGenericVue,
  474: ConstanciaAuditoriaGenericVue,
  482: ConstanciaModuloEspecialidadVue,
  481: ConstanciaDesarrolloCurricularVue,
  483: ConstanciaDesarrolloCurricularVue,
  321: ConstanciaSinodalGenericVue,
  322: ConstanciaSinodalGenericVue,
  323: ConstanciaSinodalGenericVue,
  324: ConstanciaSinodalGenericVue,
  325: ConstanciaSinodalGenericVue,
};

// NUEVO: MAPA DE NOMBRES OFICIALES (Para mostrar en la tabla)
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

// MAPA DE SUFIJOS URL (Para la API)
const getEndpointSuffix = (id) => {
  const map = {
    10: "pit",
    20: "acreditacion",
    30: "complementaria",
    40: "red",
    50: "manual",
    60: "estrategia",
    70: "diplomado",
    80: "productos",
    90: "exencion",
    100: "comision",
    110: "comision-tecnm",
    120: "comision-pensamiento",
    130: "comision-ambientes",
    131: "comision-inclusiva",
    132: "comision-estrategicas",
    140: "constancia-rh",
    150: "exclusividad",
    155: "investigacion-05",
    160: "cvu",
    170: "alumnos-atendidos",
    180: "horario",
    181: "horario-adicional",
    182: "horario-posgrado",
    183: "estudiantes-114",
    190: "talon",
    195: "cedula",
    196: "cedula",
    200: "propuesta",
    210: "sabatico",
    215: "licencia-gravidez",
    216: "cedula",
    220: "liberacion",
    230: "liberacion-academica",
    240: "reporte-investigacion",
    250: "evaluacion-docente",
    312: "exencion",
    313: "exencion",
    315: "exencion",
    314: "exencion",
    316: "exencion",
    410: "asesoria-cb",
    421: "constancia-proyectos",
    422: "constancia-proyectos",
    423: "constancia-proyectos",
    431: "asesoria-generic",
    432: "asesoria-generic",
    433: "asesoria-generic",
    434: "asesoria-generic",
    435: "asesoria-generic",
    436: "asesoria-generic",
    441: "concurso-generic",
    442: "concurso-generic",
    443: "concurso-generic",
    444: "concurso-generic",
    445: "concurso-generic",
    446: "concurso-generic",
    451: "jurado-generic",
    452: "jurado-generic",
    453: "jurado-generic",
    454: "jurado-generic",
    461: "comite-generic",
    462: "comite-generic",
    463: "comite-generic",
    471: "auditoria-generic",
    472: "auditoria-generic",
    473: "auditoria-generic",
    474: "auditoria-generic",
    482: "modulo-especialidad",
    481: "desarrollo-curricular",
    483: "desarrollo-curricular",
    321: "sinodal-generic",
    322: "sinodal-generic",
    323: "sinodal-generic",
    324: "sinodal-generic",
    325: "sinodal-generic",
  };
  return map[id];
};

// --- CICLO DE VIDA ---
onMounted(async () => {
  try {
    cargando.value = true;
    mensajeCarga.value = "Cargando lista de documentos...";

    // Obtener el usuario logueado
    const usuario = getUsuarioFromStorage();
    if (!usuario || !usuario.idUsuario) {
      console.error("No se encontró el usuario logueado");
      return;
    }

    // Obtener solo las actividades del usuario logueado
    const res = await axios.get(
      `http://localhost:3001/api/docenteactividad/usuario/${usuario.idUsuario}`
    );
    listaDocumentos.value = res.data;
    console.log(
      `Documentos cargados para el usuario ${usuario.idUsuario}:`,
      res.data.length
    );
  } catch (error) {
    console.error(error);
  } finally {
    cargando.value = false;
  }
});



// Helper fecha
const formatearFecha = (fecha) => {
  if (!fecha) return "--/--/----";
  return new Date(fecha).toLocaleDateString("es-MX");
};

// NUEVO: Helper nombre formato
const obtenerNombreFormato = (id) => {
  return mapaNombresFormatos[id] || "Documento Desconocido";
};

// --- NAVEGACIÓN ---
const irAIndividual = () => {
  router.push({ name: "docenteselegir" });
};

const irADetalleUnico = (idDocenteActividad) => {
  router.push({ name: "docenteselegir" });
};

 // opciones: 'todos', 'pendientes', 'aprobados', 'rechazados'
const listaFiltrada = computed(() => {
  let resultado = listaDocumentos.value;

  // A) Primero filtramos por ESTADO (si no es 'todos')
  if (filtroEstado.value === 'aprobados') {
    resultado = resultado.filter(doc => doc.validadoPor > 0);
  } else if (filtroEstado.value === 'rechazados') {
    // Rechazado: No tiene validador PERO sí tiene motivo
    resultado = resultado.filter(doc => !doc.validadoPor && doc.motivoRechazo);
  } else if (filtroEstado.value === 'pendientes') {
    // Pendiente: No tiene validador Y no tiene motivo
    resultado = resultado.filter(doc => !doc.validadoPor && !doc.motivoRechazo);
  }

  // B) Luego filtramos por TEXTO (Buscador) si hay algo escrito
  if (textoBusqueda.value) {
    const termino = textoBusqueda.value.toLowerCase();
    resultado = resultado.filter(doc => {
      const nombreActividad = (doc.nombreActividad || "").toLowerCase();
      const nombreFormato = obtenerNombreFormato(doc.idTipoDocumento).toLowerCase();
      return nombreActividad.includes(termino) || nombreFormato.includes(termino);
    });
  }

  return resultado;
});


const contar = (estado) => {
  if (estado === 'todos') return listaDocumentos.value.length;
  if (estado === 'aprobados') return listaDocumentos.value.filter(d => d.validadoPor > 0).length;
  if (estado === 'rechazados') return listaDocumentos.value.filter(d => !d.validadoPor && d.motivoRechazo).length;
  if (estado === 'pendientes') return listaDocumentos.value.filter(d => !d.validadoPor && !d.motivoRechazo).length;
  return 0;
};

// --- FUNCIONES DE DESCARGA ---

const generarBlobPDF = async (doc) => {
  const Comp = mapaComponentes[doc.idTipoDocumento];
  if (!Comp) {
    console.error("No hay componente para ID:", doc.idTipoDocumento);
    return null;
  }

  const suffix = getEndpointSuffix(doc.idTipoDocumento);
  if (!suffix) {
    console.error("No hay sufijo URL para ID:", doc.idTipoDocumento);
    return null;
  }

  try {
    // 1. Obtener datos detallados
    const url = `http://localhost:3001/api/docenteactividad/${doc.idDocenteActividad}/${suffix}`;
    console.log("Pidiendo datos a:", url); // <--- DEBUG

    const resDetalle = await axios.get(url);

    // Verificar si llegaron datos
    if (!resDetalle.data || Object.keys(resDetalle.data).length === 0) {
      console.error("Datos vacíos recibidos para:", doc.nombreActividad);
      return null;
    }

    // 2. Montar componente en el DOM oculto
    componenteActivo.value = Comp;
    datosActivos.value = resDetalle.data;

    // 3. ESPERA CRÍTICA: Dar tiempo a Vue para renderizar los datos nuevos
    await new Promise((r) => setTimeout(r, 500)); // Aumentamos a 500ms por seguridad

    const element = document.querySelector("#render-oculto .hoja-carta");
    if (!element) {
      console.error("No se encontró el elemento .hoja-carta en el DOM");
      return null;
    }

    // 4. Generar PDF con configuración específica según tipo de documento
    const windowWidth = doc.idTipoDocumento === 180 ? 1000 : 816; // Horario de Actividades necesita más ancho

    return await html2pdf()
      .set({
        margin: 0,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: {
          scale: 2,
          useCORS: true,
          scrollY: 0,
          windowWidth: windowWidth,
          x: 0,
          y: 0,
        },
        jsPDF: { unit: "mm", format: "letter" },
      })
      .from(element)
      .output("blob");
  } catch (error) {
    console.error("Error generando blob PDF:", error);
    return null;
  }
};

const descargarUnicoPDF = async (doc) => {
  try {
    cargando.value = true;
    mensajeCarga.value = "Generando PDF...";
    const blob = await generarBlobPDF(doc);

    if (blob) {
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      // Usamos el nombre del formato para el archivo
      const nombreArchivo = obtenerNombreFormato(doc.idTipoDocumento).replace(
        /[^a-z0-9]/gi,
        "_"
      );
      link.download = `${nombreArchivo}.pdf`;
      link.click();
    }
  } catch (e) {
    console.error(e);
    alert("Error al generar el PDF");
  } finally {
    cargando.value = false;
    componenteActivo.value = null;
  }
};

const descargarExpedienteCompleto = async () => {
  // 1. FILTRADO: Solo tomamos los documentos que tienen 'validadoPor' (aprobados)
  // Asegúrate de que tu backend esté enviando este campo en la lista (como vimos en el paso anterior)
  const docsAprobados = listaDocumentos.value.filter((doc) => doc.validadoPor);
  const total = listaDocumentos.value.length;
  const aprobados = docsAprobados.length;

  // 2. VALIDACIONES
  if (aprobados === 0) {
    alert("No tienes documentos aprobados para descargar.");
    return;
  }

  // 3. CONFIRMACIÓN AL USUARIO
  // Le avisamos que no se bajarán todos, solo los listos.
  let mensaje = `¿Descargar expediente?`;
  if (aprobados < total) {
    mensaje = `Se descargarán solo los ${aprobados} documentos aprobados (de un total de ${total}). Los pendientes se omitirán. ¿Continuar?`;
  }

  if (!confirm(mensaje)) return;

  try {
    cargando.value = true;
    const zip = new JSZip();
    const raiz = zip.folder("Expediente_Aprobado_SPD");

    let i = 0;
    // 4. ITERAMOS SOLO SOBRE LOS APROBADOS
    for (const doc of docsAprobados) {
      progreso.value = (i / aprobados) * 100;
      mensajeCarga.value = `Procesando: ${obtenerNombreFormato(
        doc.idTipoDocumento
      )}`;

      const nombreGrupo = doc.grupo || "Varios";
      const carpeta = raiz.folder(nombreGrupo.replace(/[^a-z0-9]/gi, "_"));

      const pdfBlob = await generarBlobPDF(doc);
      if (pdfBlob) {
        const nombreArchivo = obtenerNombreFormato(doc.idTipoDocumento).replace(
          /[^a-z0-9]/gi,
          "_"
        );
        carpeta.file(`${nombreArchivo}.pdf`, pdfBlob);
      }
      i++;
    }

    mensajeCarga.value = "Comprimiendo...";
    const content = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(content);
    link.download = "Expediente_Aprobado.zip";
    link.click();
  } catch (e) {
    console.error(e);
    alert("Ocurrió un error al generar el ZIP.");
  } finally {
    componenteActivo.value = null;
    cargando.value = false;
    progreso.value = 0;
  }
};

const verMotivo = (motivo) => {
  alert(
    "MOTIVO DE RECHAZO:\n\n" +
      (motivo || "Sin especificaciones. Contacte a su jefe.")
  );
};
</script>

<style scoped>
:global(:root) {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --color-border: #b0c4d4;
  --verde-btn: #28a745;
  --azul-btn: #007bff;
}

.docentes-generar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: "Segoe UI", Arial, sans-serif;
  color: var(--color-text-osc);
}

/* HEADER AZUL */
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

.buscador-container {
  max-width: 1200px; /* Mismo ancho que la tabla */
  margin: 0 auto 20px auto; /* Centrado y con margen abajo */
  width: 100%;
}

.col-id-bd {
  flex: 0.5; /* Ocupa poco espacio */
  text-align: center;
  font-weight: bold;
  color: #888;
  font-size: 0.9em;
  display: flex;
  justify-content: center;
  align-items: center;
}

.input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.input-buscador {
  width: 100%;
  padding: 12px 15px 12px 45px; /* Espacio a la izq para la lupa */
  font-size: 1em;
  border: 1px solid #ddd;
  border-radius: 8px;
  outline: none;
  transition: border-color 0.3s, box-shadow 0.3s;
}

.input-buscador:focus {
  border-color: var(--azul-btn); /* O el color azul de tu tema */
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.1);
}

.icono-lupa {
  position: absolute;
  left: 15px;
  font-size: 1.2em;
  opacity: 0.5;
  pointer-events: none;
}

.btn-limpiar {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  color: #999;
  font-weight: bold;
  cursor: pointer;
  font-size: 1.1em;
}

.empty-search {
  padding: 30px;
  text-align: center;
  color: #777;
  font-style: italic;
  background: white;
  border-bottom: 1px solid #eee;
}

.header-content h1 {
  margin: 0;
  font-size: 1.5rem;
  font-weight: 600;
}

.badge-id {
  background-color: #f0f0f0;
  padding: 2px 6px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

.img-white {
  width: 30px;
  cursor: pointer;
  filter: brightness(0) invert(1);
  transition: transform 0.2s;
}
.img-white:hover {
  transform: scale(1.1);
}

.spacer {
  width: 30px;
}

/* CONTENIDO */
.main-contenido {
  flex: 1;
  padding: 40px;
  overflow-y: auto;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
}

/* BOTONES SUPERIORES */
.acciones-globales {
  display: flex;
  justify-content: center;
  gap: 30px;
  margin-bottom: 40px;
}

.btn-global {
  display: flex;
  align-items: center;
  gap: 15px;
  padding: 20px 30px;
  border: none;
  border-radius: 12px;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  color: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  width: 350px;
  justify-content: center;
}
.btn-global:hover {
  transform: translateY(-3px);
}
.btn-azul {
  background-color: var(--azul-btn);
}
.btn-verde {
  background-color: var(--verde-btn);
}
.btn-icon-white {
  width: 28px;
  filter: brightness(0) invert(1);
}

/* TABLA DE DOCUMENTOS */
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

/* FLEX AJUSTADO: Col-nombre ahora ocupa más espacio */
.col-nombre {
  flex: 3; /* Bajamos de 3.5 a 3 para hacerle espacio al ID */
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 10px;
}
/* .col-tipo ELIMINADO */
.col-fecha {
  flex: 1.2;
  text-align: center;
  font-size: 0.9em;
  color: #666;
}
.col-acciones {
  flex: 2; /* Aumentamos de 1 a 2 para que tenga más espacio horizontal */
  display: flex;
  justify-content: center; /* Centrados */
  align-items: center;
  gap: 12px; /* Espacio entre botones */
}

.texto-formato-oficial {
  font-size: 1.05em;
  color: var(--color-text-osc);
}
.texto-actividad-detalle {
  font-size: 0.85em;
  color: #777;
  margin-top: 2px;
}

/* Botones Pequeños de la tabla */
.btn-icon {
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;

  /* Tamaño fijo para que no se aplasten */
  min-width: 38px;
  width: 38px;
  height: 38px;

  padding: 0; /* Quitamos padding interno variable */
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}
.btn-icon img {
  width: 20px;
  height: 20px;
}
.btn-icon.download:hover {
  background-color: #e8f5e9;
  border-color: var(--verde-btn);
}
.btn-icon.view:hover {
  background-color: #e3f2fd;
  border-color: var(--azul-btn);
}

/* LOADING Y EMPTY */
.loading-box {
  padding: 30px;
  text-align: center;
  background: #f9f9f9;
}
.empty-state {
  padding: 40px;
  text-align: center;
  color: #888;
  font-style: italic;
}

.progress-bar {
  width: 100%;
  height: 6px;
  background: #ddd;
  border-radius: 3px;
  margin-top: 10px;
  overflow: hidden;
}
.progress-fill {
  height: 100%;
  background: var(--verde-btn);
  transition: width 0.3s;
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

/* NUEVA COLUMNA ESTADO */
.col-estado {
  flex: 1.5; /* Un poco más ancha que fecha/acciones */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* BADGES (ETIQUETAS) */
.badge {
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 0.85em;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-aprobado {
  background-color: #e6f4ea; /* Verde muy claro */
  color: #1e7e34; /* Verde oscuro */
  border: 1px solid #c3e6cb;
}

.badge-pendiente {
  background-color: #fff3cd; /* Amarillo claro */
  color: #856404; /* Amarillo oscuro/café */
  border: 1px solid #ffeeba;
}

.icono-estado {
  font-size: 1.1em;
}

/* BOTÓN DESHABILITADO */
.btn-disabled {
  opacity: 0.4;
  cursor: not-allowed;
  filter: grayscale(100%);
  background-color: #f0f0f0 !important; /* Forzar fondo gris */
  border-color: #ddd !important;
}

/* Ajustar flex del resto para que quepa bien */
.col-nombre {
  flex: 3.5;
} /* Reducimos un poco el nombre */
.col-fecha {
  flex: 1.2;
}
.col-acciones {
  flex: 1.2;
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

.btn-icon.rechazo-info {
  background-color: #f8d7da;
  border-color: #f5c6cb;
  color: #721c24;
}
.btn-icon.rechazo-info:hover {
  background-color: #f1b0b7;
}

/* CONTENEDOR DE FILTROS */
.filtros-container {
  max-width: 1200px;
  margin: 0 auto 15px auto;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

/* BOTÓN BASE */
.btn-filtro {
  background: white;
  border: 1px solid #ddd;
  padding: 8px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.95em;
  color: #555;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 8px;
}

.btn-filtro:hover {
  background-color: #f8f9fa;
  border-color: #ccc;
}

/* CONTADOR (NUMERITO GRIS) */
.contador {
  background-color: #eee;
  padding: 2px 6px;
  border-radius: 10px;
  font-size: 0.8em;
  font-weight: bold;
  color: #666;
}

/* ESTADO ACTIVO (SELECCIONADO) */
.btn-filtro.activo {
  background-color: var(--color-sigedd-osc); /* Azul oscuro del tema */
  color: white;
  border-color: var(--color-sigedd-osc);
}

.btn-filtro.activo .contador {
  background-color: rgba(255,255,255,0.3);
  color: white;
}
</style>
