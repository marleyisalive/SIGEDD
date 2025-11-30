<template>
  <span class="docentes-elegir">
    
    <header class="header-azul">
      <div class="header-content">
        <span class="icono-atras" @click="$router.go(-1)">
          <img src="@/assets/icono-back.png" alt="Atrás" class="img-white">
        </span>
        <h1>Vista Previa de Documentos</h1>
        <div class="spacer"></div>
      </div>
    </header>

    <main class="main-contenido">

      <div class="info-superior">
        <h2 class="titulo-actividad">
          {{ actividadActual ? actividadActual.nombre : 'Cargando...' }}
        </h2>
        <span class="subtitulo-formato">
          Formato: <span class="nito">{{ formatoActual }}</span>
        </span>
      </div>

      <div class="visor-formato">

        <button class="flecha" @click="anterior" :disabled="index === 0">
          <img src="@/assets/icono-flecha-izquierda.png" alt="Anterior">
        </button>

        <span class="contenedor-documento">
          
          <div v-if="cargando" class="mensaje-estado">
            <div class="spinner"></div>
            <p>Cargando documento...</p>
          </div>

          <div v-else-if="errorCarga" class="mensaje-estado error">
            <p>⚠️ No se pudo cargar la vista previa.</p>
            <small>Verifica que el registro esté completo.</small>
          </div>

          <component 
            v-else-if="componenteActivo && datosDocumento"
            :is="componenteActivo"
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />

          <div v-else class="mensaje-estado">
            Vista previa no disponible para este formato.
          </div>

        </span>

        <button class="flecha" @click="siguiente" :disabled="!listaActividades.length || index === listaActividades.length - 1">
          <img src="@/assets/icono-flecha-derecha.png" alt="Siguiente">
        </button>

      </div>

      <div style="margin-top: 30px;">
        <button @click="descargarPDF" class="btn-verde-global" v-if="!cargando && !errorCarga && actividadActual">
          <img src="@/assets/icono-generar.png" class="btn-icon-white" alt="">
          <span>Descargar PDF Actual</span>
        </button>
      </div>

    </main>

    <footer class="footer">
      <span class="icono-exit"><img src="@/assets/icono-exit.png" alt="Salir"></span>
    </footer>

  </span>
</template>

<script setup>
import { ref, computed, onMounted, shallowRef } from 'vue';
import axios from 'axios';
import html2pdf from 'html2pdf.js';
import { getUsuarioFromStorage } from "@/utils/auth";

// --- IMPORTS DE TODOS LOS COMPONENTES ---
import ConstanciaPIT from '@/modulos/principal/vistas/plantillas/ConstanciaTutoriaVue.vue'; 
import ConstanciaAcreditacion from '@/modulos/principal/vistas/plantillas/ConstanciaAcreditacionVue.vue';
import ConstanciaComplementaria from '@/modulos/principal/vistas/plantillas/ConstanciaComplementariaVue.vue';
import ConstanciaRED from '@/modulos/principal/vistas/plantillas/ConstanciaREDVue.vue';
import ConstanciaManual from '@/modulos/principal/vistas/plantillas/ConstanciaManualVue.vue';
import ConstanciaEstrategia from '@/modulos/principal/vistas/plantillas/ConstanciaEstrategiaVue.vue';
import ConstanciaProductos from '@/modulos/principal/vistas/plantillas/ConstanciaProductosVue.vue';
import ConstanciaDiplomado from '@/modulos/principal/vistas/plantillas/ConstanciaDiplomadoVue.vue';
import ConstanciaExencion from '@/modulos/principal/vistas/plantillas/ConstanciaExencionVue.vue';
import OficioComision from '@/modulos/principal/vistas/plantillas/OficioComisionVue.vue';
import OficioComisionTecNM from '@/modulos/principal/vistas/plantillas/OficioComisionTecnmVue.vue';
import OficioPensamientoCritico from '@/modulos/principal/vistas/plantillas/OficioPensamientoCriticoVue.vue';
import OficioAmbientesVirtuales from '@/modulos/principal/vistas/plantillas/OficioAmbientesVirtualesVue.vue';
import ConstanciaRH from '@/modulos/principal/vistas/plantillas/ConstanciaRHVue.vue';
import CartaExclusividad from '@/modulos/principal/vistas/plantillas/CartaExclusividadVue.vue';
import ConstanciaCVU from '@/modulos/principal/vistas/plantillas/ConstanciaCVVue.vue';
import ConstanciaAlumnos from '@/modulos/principal/vistas/plantillas/ConstanciaAlumnosAtendidosVue.vue';
import HorarioActividades from '@/modulos/principal/vistas/plantillas/HorarioActividadesVue.vue';
import TalonPago from '@/modulos/principal/vistas/plantillas/TalonPagoVue.vue';
import CedulaProfesional from '@/modulos/principal/vistas/plantillas/CedulaProfesionalVue.vue';
import ConstanciaPropuesta from '@/modulos/principal/vistas/plantillas/ConstanciaPropuestaVue.vue';
import OficioSabatico from '@/modulos/principal/vistas/plantillas/OficioSabaticoVue.vue';
import LiberacionActividades from '@/modulos/principal/vistas/plantillas/LiberacionActividadesVue.vue';
import LiberacionAcademicas from '@/modulos/principal/vistas/plantillas/LiberacionAcademicasVue.vue';
import ReporteInvestigacion from '@/modulos/principal/vistas/plantillas/ReporteInvestigacionVue.vue';
import EvaluacionDocente from '@/modulos/principal/vistas/plantillas/EvaluacionDocenteVue.vue';
import OficioInclusiva from '@/modulos/principal/vistas/plantillas/OficioInclusivaVue.vue';
import OficioEstrategicos from '@/modulos/principal/vistas/plantillas/OficioEstrategicosVue.vue';
import ConstanciaProyectosGenerico from '@/modulos/principal/vistas/plantillas/ConstanciaProyectosGenericoVue.vue';
import ConstanciaAsesoriaCBVue from '@/modulos/principal/vistas/plantillas/ConstanciaAsesoriaCBVue.vue';
import ConstanciaAsesoriaGenericVue from '@/modulos/principal/vistas/plantillas/ConstanciaAsesoriaGenericVue.vue';
import ConstanciaConcursoGenericVue from '@/modulos/principal/vistas/plantillas/ConstanciaConcursoGenericVue.vue';
import ConstanciaJuradoGenericVue from '@/modulos/principal/vistas/plantillas/ConstanciaJuradoGenericVue.vue';
import ConstanciaComiteGenericVue from '@/modulos/principal/vistas/plantillas/ConstanciaComiteGenericVue.vue';
import ConstanciaAuditoriaGenericVue from '@/modulos/principal/vistas/plantillas/ConstanciaAuditoriaGenericVue.vue';
import ConstanciaModuloEspecialidadVue from '@/modulos/principal/vistas/plantillas/ConstanciaModuloEspecialidadVue.vue';
import ConstanciaDesarrolloCurricularVue from '@/modulos/principal/vistas/plantillas/ConstanciaDesarrolloCurricularVue.vue';
import ConstanciaSinodalGenericVue from '@/modulos/principal/vistas/plantillas/ConstanciaSinodalGenericVue.vue';
import ConstanciaInvestigacionVue from '@/modulos/principal/vistas/plantillas/ConstanciaInvestigacionVue.vue';
import LicenciaGravidezVue from '@/modulos/principal/vistas/plantillas/LicenciaGravidezVue.vue';

// ESTADO
const index = ref(0);
const listaActividades = ref([]);
const datosDocumento = ref(null);
const cargando = ref(false);
const errorCarga = ref(false);
const componenteActivo = shallowRef(null);

// MAPA DE COMPONENTES (ID -> Componente Vue)
const mapaComponentes = {
  10: ConstanciaPIT, 20: ConstanciaAcreditacion, 30: ConstanciaComplementaria, 40: ConstanciaRED,
  50: ConstanciaManual, 60: ConstanciaEstrategia, 70: ConstanciaDiplomado, 80: ConstanciaProductos,
  90: ConstanciaExencion, 100: OficioComision, 110: OficioComisionTecNM, 120: OficioPensamientoCritico,
  130: OficioAmbientesVirtuales, 131: OficioInclusiva, 132: OficioEstrategicos, 140: ConstanciaRH,
  150: CartaExclusividad, 155: ConstanciaInvestigacionVue, 160: ConstanciaCVU, 170: ConstanciaAlumnos,
  180: HorarioActividades, 181: HorarioActividades, 182: HorarioActividades, 183: ConstanciaAlumnos,
  190: TalonPago, 195: CedulaProfesional, 196: CedulaProfesional, 200: ConstanciaPropuesta,
  210: OficioSabatico, 215: LicenciaGravidezVue, 216: CedulaProfesional, 220: LiberacionActividades,
  230: LiberacionAcademicas, 240: ReporteInvestigacion, 250: EvaluacionDocente, 312: ConstanciaExencion,
  313: ConstanciaExencion, 315: ConstanciaExencion, 314: ConstanciaExencion, 316: ConstanciaExencion,
  410: ConstanciaAsesoriaCBVue, 421: ConstanciaProyectosGenerico, 422: ConstanciaProyectosGenerico, 423: ConstanciaProyectosGenerico,
  431: ConstanciaAsesoriaGenericVue, 432: ConstanciaAsesoriaGenericVue, 433: ConstanciaAsesoriaGenericVue,
  434: ConstanciaAsesoriaGenericVue, 435: ConstanciaAsesoriaGenericVue, 436: ConstanciaAsesoriaGenericVue,
  441: ConstanciaConcursoGenericVue, 442: ConstanciaConcursoGenericVue, 443: ConstanciaConcursoGenericVue,
  444: ConstanciaConcursoGenericVue, 445: ConstanciaConcursoGenericVue, 446: ConstanciaConcursoGenericVue,
  451: ConstanciaJuradoGenericVue, 452: ConstanciaJuradoGenericVue, 453: ConstanciaJuradoGenericVue,
  454: ConstanciaJuradoGenericVue, 461: ConstanciaComiteGenericVue, 462: ConstanciaComiteGenericVue,
  463: ConstanciaComiteGenericVue, 471: ConstanciaAuditoriaGenericVue, 472: ConstanciaAuditoriaGenericVue,
  473: ConstanciaAuditoriaGenericVue, 474: ConstanciaAuditoriaGenericVue, 482: ConstanciaModuloEspecialidadVue,
  481: ConstanciaDesarrolloCurricularVue, 483: ConstanciaDesarrolloCurricularVue, 321: ConstanciaSinodalGenericVue,
  322: ConstanciaSinodalGenericVue, 323: ConstanciaSinodalGenericVue, 324: ConstanciaSinodalGenericVue, 325: ConstanciaSinodalGenericVue,
};

// MAPA DE SUFIJOS API (ID -> String URL) - ¡AQUÍ ESTABA TU ERROR ANTES!
const getEndpointSuffix = (id) => {
  const map = {
    10: "pit", 20: "acreditacion", 30: "complementaria", 40: "red", 50: "manual", 60: "estrategia",
    70: "diplomado", 80: "productos", 90: "exencion", 100: "comision", 110: "comision-tecnm",
    120: "comision-pensamiento", 130: "comision-ambientes", 131: "comision-inclusiva", 132: "comision-estrategicos",
    140: "constancia-rh", 150: "exclusividad", 155: "investigacion-05", 160: "cvu", 170: "alumnos-atendidos",
    180: "horario", 181: "horario-adicional", 182: "horario-posgrado", 183: "estudiantes-114",
    190: "talon", 195: "cedula", 196: "cedula", 200: "propuesta", 210: "sabatico", 215: "licencia-gravidez",
    216: "cedula", 220: "liberacion", 230: "liberacion-academica", 240: "reporte-investigacion",
    250: "evaluacion-docente", 312: "exencion", 313: "exencion", 315: "exencion", 314: "codireccion", 316: "codireccion",
    410: "asesoria-cb", 421: "constancia-proyectos", 422: "constancia-proyectos", 423: "constancia-proyectos",
    431: "asesoria-generic", 432: "asesoria-generic", 433: "asesoria-generic", 434: "asesoria-generic",
    435: "asesoria-generic", 436: "asesoria-generic", 441: "concurso-generic", 442: "concurso-generic",
    443: "concurso-generic", 444: "concurso-generic", 445: "concurso-generic", 446: "concurso-generic",
    451: "jurado-generic", 452: "jurado-generic", 453: "jurado-generic", 454: "jurado-generic",
    461: "comite-generic", 462: "comite-generic", 463: "comite-generic", 471: "auditoria-generic",
    472: "auditoria-generic", 473: "auditoria-generic", 474: "auditoria-generic", 482: "modulo-especialidad",
    481: "desarrollo-curricular", 483: "desarrollo-curricular", 321: "sinodal-generic", 322: "sinodal-generic",
    323: "sinodal-generic", 324: "sinodal-generic", 325: "sinodal-generic",
  };
  return map[id];
};

const mapaNombresFormatos = {
  10: "Constancia PIT (1.1.5)", 20: "Actividad de Acreditación (1.1.6)", 30: "Actividad Complementaria (1.1.7)",
  40: "Recurso Educativo Digital (1.2.1.1)", 50: "Manual de Prácticas (1.2.1.2)", 60: "Estrategias Innovadoras (1.2.1.3)",
  70: "Instructor Diplomado (1.2.2.4)", 80: "Constancia Productos (1.2.1.4)", 90: "Exención Examen Profesional (1.3.1.1)",
  100: "Oficio Comisión (1.2.2.1)", 110: "Oficio Comisión TecNM (1.2.2.2)", 120: "Comisión Pensamiento Crítico (1.2.2.3)",
  130: "Comisión Ambientes Virtuales (1.2.2.5)", 131: "Comisión Inclusiva (1.2.2.6)", 132: "Comisión Estratégicos (1.2.2.7)",
  140: "Constancia Recursos Humanos (01)", 150: "Carta Exclusividad Laboral (04)", 155: "Constancia Proyecto Investigación (05)",
  160: "Constancia CVU (06)", 170: "Constancia Alumnos Atendidos (07)", 180: "Horario de Actividades (1.1.1)",
  181: "Asignaturas Adicionales (1.1.2)", 182: "Horario Posgrado (1.1.3)", 183: "Estudiantes Atendidos (1.1.4)",
  190: "Talón de Pago (02)", 195: "Cédula Doctorado (1.4.9.1)", 196: "Cédula Maestría (1.4.9.2)",
  200: "Propuesta Programa (1.4.8.3)", 210: "Oficio Sabático/Beca (08)", 215: "Licencia por Gravidez (09)",
  216: "Cédula Profesional (10)", 220: "Liberación de Actividades Docentes (11)", 230: "Liberación de Actividades Académicas (12)",
  240: "Reporte de Investigación (13)", 250: "Evaluación Docente (14)", 312: "Exención Especialización (1.3.1.2)",
  313: "Exención Maestría (1.3.1.3)", 315: "Exención Doctorado (1.3.1.5)", 314: "Codirección Maestría (1.3.1.4)",
  316: "Codirección Doctorado (1.3.1.6)", 410: "Asesoría en Ciencias Básicas (1.4.1)", 421: "Proyectos Locales (1.4.2.1)",
  422: "Proyectos Nacionales (1.4.2.2)", 423: "Proyectos Internacionales (1.4.2.3)", 431: "Asesoría Concurso 3er Lugar Nacional (1.4.3.1)",
  432: "Asesoría Concurso 2do Lugar Nacional (1.4.3.2)", 433: "Asesoría Concurso 1er Lugar Nacional (1.4.3.3)",
  434: "Asesoría Concurso 3er Lugar Internacional (1.4.3.4)", 435: "Asesoría Concurso 2do Lugar Internacional (1.4.3.5)",
  436: "Asesoría Concurso 1er Lugar Internacional (1.4.3.6)", 441: "Coordinador Concurso General Local (1.4.4.1)",
  442: "Coordinador Concurso General Regional(1.4.4.2)", 443: "Coordinador Concurso General Nacional o Internacional (1.4.4.3)",
  444: "Colaborador Concurso Local (1.4.4.4)", 445: "Colaborador Concurso Regional (1.4.4.5)",
  446: "Colaborador Concurso Nacional o Internacional (1.4.4.6)", 451: "Jurado Local (1.4.5.1)", 452: "Jurado Regional (1.4.5.2)",
  453: "Jurado Nacional (1.4.5.3)", 454: "Jurado Internacional (1.4.5.4)", 461: "Comité Local o Regional(1.4.6.1)",
  462: "Comité Nacional (1.4.6.2)", 463: "Comité Internacional (1.4.6.3)", 471: "Constancia Auditor Interno en la Institución (1.4.7.1)",
  472: "Constancia Auditor Interno Fuera de la Institución (1.4.7.2)", 473: "Constancia Auditor Líder en la Institución (1.4.7.3)",
  474: "Constancia Auditor Líder Fuera de la Institución (1.4.7.4)", 482: "Constancia Módulo de Especialidad (1.4.8.2)",
  481: "Constancia de Desarrollo Curricular Local (1.4.8.1.1)", 483: "Constancia de Desarrollo Curricular Nacional (1.4.8.1.2)",
  321: "Constancia de Sinodal Técnico Superior (1.3.2.1)", 322: "Constancia de Sinodal Licenciatura (1.3.2.2)",
  323: "Constancia de Sinodal Especialización (1.3.2.3)", 324: "Constancia de Sinodal Maestría (1.3.2.4)",
  325: "Constancia de Sinodal Técnico Doctorado (1.3.2.5)"
};

// COMPUTADAS
const actividadActual = computed(() => {
  if (listaActividades.value.length === 0) return null;
  return listaActividades.value[index.value];
});

const formatoActual = computed(() => {
  if (!actividadActual.value) return '---';
  return mapaNombresFormatos[actividadActual.value.idTipoDocumento] || "Documento Genérico";
});

// CICLO DE VIDA
onMounted(async () => {
  await cargarListaActividades();
});

// 1. CARGAR LISTA
const cargarListaActividades = async () => {
  try {
    const usuario = getUsuarioFromStorage();
    if (!usuario) return;

    const res = await axios.get(
      `http://localhost:3001/api/docenteactividad/usuario/${usuario.idUsuario}`
    );

    listaActividades.value = res.data.map((item) => ({
      idDocenteActividad: item.idDocenteActividad,
      nombre: item.nombreActividad || "Actividad sin nombre",
      idTipoDocumento: item.idTipoDocumento,
    }));

    if (listaActividades.value.length > 0) {
      await cargarDetalleDocumento();
    }
  } catch (error) {
    console.error("Error cargando lista:", error);
  }
};

// 2. CARGAR DETALLE (LÓGICA LIMPIA)
const cargarDetalleDocumento = async () => {
  const actual = actividadActual.value;
  if (!actual) return;

  cargando.value = true;
  errorCarga.value = false;
  datosDocumento.value = null;
  componenteActivo.value = null;

  try {
    const tipo = actual.idTipoDocumento;
    
    // 1. Obtener componente del mapa
    const Componente = mapaComponentes[tipo];
    if (!Componente) throw new Error(`No existe componente para tipo ${tipo}`);

    // 2. Obtener sufijo URL del mapa
    const suffix = getEndpointSuffix(tipo);
    if (!suffix) throw new Error(`No existe sufijo URL para tipo ${tipo}`);

    // 3. Llamada API Dinámica
    const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/${suffix}`;
    const res = await axios.get(url);

    // 4. Asignar datos
    datosDocumento.value = res.data;
    componenteActivo.value = Componente;

  } catch (error) {
    console.error("Error cargando detalle:", error);
    errorCarga.value = true;
  } finally {
    cargando.value = false;
  }
};

// NAVEGACIÓN
const anterior = () => {
  if (index.value > 0) {
    index.value--;
    cargarDetalleDocumento();
  }
};

const siguiente = () => {
  if (index.value < listaActividades.value.length - 1) {
    index.value++;
    cargarDetalleDocumento();
  }
};

const descargarPDF = () => {
  const element = document.getElementById("documento-para-imprimir");
  if (!element) return;

  const opt = {
    margin: 0, 
    filename: `Constancia_${datosDocumento.value.nombreDocente || "Documento"}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }, 
  };
  html2pdf().set(opt).from(element).save();
};
</script>

<style scoped>
:global(:root) {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --verde-ok: #28a745;
}

.docentes-elegir {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: "Segoe UI", Arial, sans-serif;
  color: var(--color-text-osc);
}

/* HEADER AZUL ESTANDAR */
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
  width: 100%;
}
.header-content h1 { margin: 0; font-size: 1.5rem; }
.img-white { width: 30px; cursor: pointer; filter: brightness(0) invert(1); transition: transform 0.2s; }
.img-white:hover { transform: scale(1.1); }
.spacer { width: 30px; }

/* CONTENIDO PRINCIPAL */
.main-contenido {
  flex: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* INFORMACIÓN SUPERIOR */
.info-superior { text-align: center; margin-bottom: 20px; }
.titulo-actividad { font-size: 1.8em; margin-bottom: 5px; color: var(--color-text-osc); }
.subtitulo-formato { font-size: 1.1em; color: #555; }
.nito { font-weight: bold; color: var(--color-sigedd-osc); }

/* VISOR */
.visor-formato { display: flex; justify-content: center; align-items: center; gap: 20px; }
.flecha { background: none; border: none; cursor: pointer; transition: transform 0.2s; padding: 10px; }
.flecha:hover:not(:disabled) { transform: scale(1.2); }
.flecha img { width: 40px; }
.flecha:disabled { opacity: 0.2; cursor: not-allowed; }

/* CONTENEDOR DEL DOCUMENTO */
.contenedor-documento {
  width: 480px; 
  height: 620px; 
  background-color: #525659;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 5px 15px rgba(0,0,0,0.3);
  border: 1px solid #444;
}

.documento-escalado {
  transform: scale(0.95);
  transform-origin: center center;
  margin: 0;
  box-shadow: 0 0 10px rgba(0,0,0,0.5);
  background-color: white;
}

/* ESTADOS */
.mensaje-estado { color: white; font-size: 1.2em; display: flex; flex-direction: column; align-items: center; gap: 15px; }
.mensaje-estado.error { color: #ffcccc; text-align: center; }
.spinner {
  border: 4px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top: 4px solid white;
  width: 30px;
  height: 30px;
  animation: spin 1s linear infinite;
}
@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }

/* BOTÓN DESCARGAR */
.btn-verde-global {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 12px 25px;
  border: none;
  border-radius: 30px;
  background-color: var(--verde-ok);
  color: white;
  font-size: 1.1em;
  font-weight: bold;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0,0,0,0.15);
  transition: all 0.2s ease;
}
.btn-verde-global:hover { background-color: #218838; transform: translateY(-2px); }
.btn-icon-white { width: 24px; filter: brightness(0) invert(1); }

/* FOOTER */
.footer { width: 100%; background-color: var(--color-sigedd-osc); padding: 15px 30px; text-align: right; margin-top: auto; }
.icono-exit img { width: 35px; cursor: pointer; filter: brightness(0) invert(1); }
</style>