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
                v-if="doc.validadoPor === 0"
                class="btn-icon rechazo-info"
                @click.stop="verMotivo(doc.motivoRechazo)" 
                title="Ver motivo de rechazo"
              >
                <strong>?</strong>
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
import { ref, onMounted, h, render } from "vue";
import { useRoute, useRouter } from "vue-router";
import axios from "axios";
import html2pdf from "html2pdf.js";
import { getUsuarioFromStorage } from "@/utils/auth";

// Importar plantillas de documentos
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

const route = useRoute();
const router = useRouter();

// ESTADO
const listaDocumentos = ref([]);
const cargando = ref(false);
const nombreDocente = ref(""); // Lo tomaremos de la query string
const adminId = ref(null);

// MAPA DE COMPONENTES
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

// MAPA DE SUFIJOS API
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

const verDetalle = async (doc) => {
  try {
    // Obtener el componente y endpoint correspondientes
    const tipo = doc.idTipoDocumento;
    const Componente = mapaComponentes[tipo];
    const suffix = getEndpointSuffix(tipo);

    if (!Componente || !suffix) {
      alert("No se puede generar el PDF para este tipo de documento.");
      return;
    }

    // Obtener los datos del documento
    const url = `http://localhost:3001/api/docenteactividad/${doc.idDocenteActividad}/${suffix}`;
    const res = await axios.get(url);
    const datosDocumento = res.data;

    // Crear un contenedor temporal para renderizar el componente
    const container = document.createElement('div');
    container.style.position = 'absolute';
    container.style.left = '-9999px';
    container.style.top = '0';
    document.body.appendChild(container);

    // Renderizar el componente con los datos
    const vnode = h(Componente, { datos: datosDocumento });
    render(vnode, container);

    // Esperar un momento para que el componente se renderice completamente
    await new Promise(resolve => setTimeout(resolve, 500));

    // Generar el PDF
    const opt = {
      margin: 0,
      filename: `Documento_${doc.nombreActividad || 'documento'}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true, scrollY: 0 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    await html2pdf().set(opt).from(container.firstChild).save();

    // Limpiar el contenedor temporal
    render(null, container);
    document.body.removeChild(container);

  } catch (error) {
    console.error("Error al generar el PDF:", error);
    alert("Error al generar el documento PDF.");
  }
};

const rechazarDocumento = async (doc) => {
  // Usamos prompt en lugar de confirm para pedir texto
  const motivo = prompt("Describe el motivo del rechazo para el docente:");
  
  if (motivo === null) return; // Si le da Cancelar, no hace nada
  if (motivo.trim() === "") {
    alert("Debes escribir un motivo.");
    return;
  }

  try {
    await axios.put(`http://localhost:3001/api/docenteactividad/rechazar/${doc.idDocenteActividad}`, {
      motivo: motivo // Enviamos lo que escribió
    });
    
    doc.validadoPor = 0; 
    alert("Documento rechazado y motivo enviado.");
  } catch (error) {
    console.error(error);
    alert("Error al rechazar.");
  }
};

const verMotivo = (motivo) => {
  alert("MOTIVO DE RECHAZO:\n\n" + (motivo || "Sin especificaciones."));
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
  /* CAMBIO CLAVE 1: Usar min-height en lugar de height */
  min-height: 100vh; 
  width: 100%; /* Asegurar ancho completo */
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
  /* Opcional: Si quieres que el header se quede fijo al scrollear */
  /* position: sticky; top: 0; z-index: 100; */
}
.header-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
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
  /* CAMBIO CLAVE 2: Quitamos overflow-y: auto para que scrollee toda la página */
  /* overflow-y: auto; <--- ELIMINADO */
  
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: block;
}

.tabla-contenedor {
  background: white;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  width: 100%;
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
.col-nombre { flex: 3; text-align: left; }
.col-fecha { flex: 1; text-align: center; }
.col-estado { flex: 1.5; display: flex; justify-content: center; }

/* CAMBIO 3: Ajuste de acciones para que no se encimen */
.col-acciones { 
  flex: 2; 
  display: flex; 
  justify-content: center; 
  align-items: center;
  gap: 10px; 
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
.badge-aprobado { background-color: #e6f4ea; color: #1e7e34; }
.badge-pendiente { background-color: #fff3cd; color: #856404; }
.badge-rechazado { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }

/* BOTONES */
.btn-icon {
  background: none;
  border: 1px solid #ddd;
  border-radius: 6px;
  min-width: 38px;
  width: 38px;
  height: 38px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
  padding: 0;
}
.btn-icon img { width: 20px; }

.btn-icon.aprobar { border-color: var(--verde-ok); color: var(--verde-ok); font-size: 1.2em; }
.btn-icon.aprobar:hover { background-color: var(--verde-ok); color: white; }

.btn-icon.rechazar { border-color: #dc3545; color: #dc3545; font-size: 1.2em; }
.btn-icon.rechazar:hover { background-color: #dc3545; color: white; }

.btn-disabled {
  opacity: 0.5;
  cursor: not-allowed;
  background-color: #f0f0f0 !important;
  color: #aaa !important;
  border-color: #ddd !important;
}

.loading-box, .empty-state {
  padding: 40px;
  text-align: center;
  color: #777;
}

.footer {
  background: var(--color-sigedd-osc);
  padding: 15px 30px;
  text-align: right;
  margin-top: auto; /* Empuja el footer al fondo si hay poco contenido */
}
.icono-exit img { width: 35px; cursor: pointer; filter: brightness(0) invert(1); }
</style>