<template>
  <span class="docentes-elegir">
    <header class="header">
      <span class="header-icono back-icono">
        <span class="icono"
          ><img src="@/assets/icono-back.png" alt="Atrás"
        /></span>
      </span>

      <span class="header-logo">
        <img src="@/assets/sigedd-logo.png" alt="Logo" />
      </span>

      <span class="header-icono"></span>
    </header>

    <main class="main-contenido">
      <span class="titulo-actividad">
        Actividad:
        <span class="nito">{{
          actividadActual ? actividadActual.nombre : "Cargando..."
        }}</span>
      </span>

      <div class="visor-formato">
        <button class="flecha" @click="anterior" :disabled="index === 0">
          <img src="@/assets/icono-flecha-izquierda.png" alt="Anterior" />
        </button>

        <span class="contenedor-documento">
          <div v-if="cargando" class="mensaje-estado">
            Cargando documento...
          </div>

          <ConstanciaTutoria
            v-else-if="
              actividadActual && actividadActual.idTipoDocumento === 10
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <div
            v-else-if="
              actividadActual && actividadActual.idTipoDocumento === 10
            "
            class="mensaje-estado"
          >
            Cargando datos del documento...
          </div>
          <ConstanciaAcreditacion
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 20 &&
              datosDocumento.programaEducativo
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaComplementaria
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 30 &&
              datosDocumento.numOficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaRED
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 40 &&
              datosDocumento.asignatura
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaManual
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 50 &&
              datosDocumento.carrera
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaEstrategia
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 60 &&
              datosDocumento.estrategia
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaProductos
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 80 &&
              datosDocumento.producto
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaDiplomado
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 70 &&
              datosDocumento.diplomado
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaExencion
            v-else-if="
              actividadActual &&
              [90, 312, 313, 315, 314, 316].includes(
                actividadActual.idTipoDocumento
              ) &&
              datosDocumento.nombreEstudiante
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioComision
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 100 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioComisionTecNM
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 110 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioPensamientoCritico
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 120 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioAmbientesVirtuales
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 130 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaRH
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 140 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <CartaExclusividad
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 150 &&
              datosDocumento.filiacion
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaInvestigacionVue
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 155 &&
              datosDocumento.tituloProyecto
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaCVU
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 160 &&
              datosDocumento.registro
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaAlumnos
            v-else-if="
              actividadActual &&
              (actividadActual.idTipoDocumento === 170 ||
                actividadActual.idTipoDocumento === 183) &&
              datosDocumento.materias
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <HorarioActividades
            v-else-if="
              actividadActual &&
              (actividadActual.idTipoDocumento === 180 ||
                actividadActual.idTipoDocumento === 181 ||
                actividadActual.idTipoDocumento === 182) &&
              datosDocumento.encabezado
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <TalonPago
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 190 &&
              datosDocumento.rfc
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <CedulaProfesional
            v-else-if="
              actividadActual &&
              [195, 196, 216].includes(actividadActual.idTipoDocumento) &&
              datosDocumento.numeroCedula
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaPropuesta
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 200 &&
              datosDocumento.nombreProyecto
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioSabatico
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 210 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <LiberacionActividades
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 220 &&
              datosDocumento.semestre
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />

          <LiberacionAcademicas
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 230 &&
              datosDocumento.semestre
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ReporteInvestigacion
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 240 &&
              datosDocumento.proyectos
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <EvaluacionDocente
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 250 &&
              datosDocumento.calificacion
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioInclusiva
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 131 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <OficioEstrategicos
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 132 &&
              datosDocumento.oficio
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaProyectosGenerico
            v-else-if="
              actividadActual &&
              [421, 422, 423].includes(actividadActual.idTipoDocumento) &&
              datosDocumento.proyectos
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaAsesoriaCBVue
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 410 &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaAsesoriaGenericVue
            v-else-if="
              actividadActual &&
              [431, 432, 433, 434, 435, 436].includes(
                actividadActual.idTipoDocumento
              ) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaConcursoGenericVue
            v-else-if="
              actividadActual &&
              [441, 442, 443, 444, 445, 446].includes(
                actividadActual.idTipoDocumento
              ) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaJuradoGenericVue
            v-else-if="
              actividadActual &&
              [451, 452, 453, 454].includes(actividadActual.idTipoDocumento) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaComiteGenericVue
            v-else-if="
              actividadActual &&
              [461, 462, 463].includes(actividadActual.idTipoDocumento) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaAuditoriaGenericVue
            v-else-if="
              actividadActual &&
              [471, 472, 473, 474].includes(actividadActual.idTipoDocumento) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaModuloEspecialidadVue
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 482 &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaDesarrolloCurricularVue
            v-else-if="
              actividadActual &&
              [481, 483].includes(actividadActual.idTipoDocumento) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <ConstanciaSinodalGenericVue
            v-else-if="
              actividadActual &&
              [321, 322, 323, 324, 325].includes(
                actividadActual.idTipoDocumento
              ) &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />
          <LicenciaGravidezVue
            v-else-if="
              actividadActual &&
              actividadActual.idTipoDocumento === 215 &&
              datosDocumento.nombreDocente
            "
            :datos="datosDocumento"
            class="documento-escalado"
            id="documento-para-imprimir"
          />

          <div v-else-if="actividadActual" class="mensaje-estado">
            Vista previa no disponible para este formato.
          </div>

          <div v-else class="mensaje-estado">No hay actividades asignadas.</div>
        </span>

        <button
          class="flecha"
          @click="siguiente"
          :disabled="
            !listaActividades.length || index === listaActividades.length - 1
          "
        >
          <img src="@/assets/icono-flecha-derecha.png" alt="Siguiente" />
        </button>
      </div>

      <span class="texto-formato">
        Formato: <span class="nito">{{ formatoActual }}</span>
      </span>

      <div style="margin-top: 20px">
        <button
          @click="descargarPDF"
          class="btn-descargar"
          v-if="!cargando && actividadActual"
        >
          Descargar PDF
        </button>
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
import { ref, computed, onMounted, watch } from "vue";
import axios from "axios";
import html2pdf from "html2pdf.js";

import ConstanciaTutoria from "@/modulos/principal/vistas/plantillas/ConstanciaTutoriaVue.vue";
import ConstanciaAcreditacion from "@/modulos/principal/vistas/plantillas/ConstanciaAcreditacionVue.vue";
import ConstanciaComplementaria from "@/modulos/principal/vistas/plantillas/ConstanciaComplementariaVue.vue";
import ConstanciaRED from "@/modulos/principal/vistas/plantillas/ConstanciaREDVue.vue";
import ConstanciaEstrategia from "@/modulos/principal/vistas/plantillas/ConstanciaEstrategiaVue.vue";
import ConstanciaExencion from "@/modulos/principal/vistas/plantillas/ConstanciaExencionVue.vue";
import ConstanciaManual from "@/modulos/principal/vistas/plantillas/ConstanciaManualVue.vue";
import ConstanciaProductos from "@/modulos/principal/vistas/plantillas/ConstanciaProductosVue.vue";
import ConstanciaDiplomado from "@/modulos/principal/vistas/plantillas/ConstanciaDiplomadoVue.vue";
import OficioComision from "@/modulos/principal/vistas/plantillas/OficioComisionVue.vue";
import OficioComisionTecNM from "@/modulos/principal/vistas/plantillas/OficioComisionTecnmVue.vue";
import OficioPensamientoCritico from "@/modulos/principal/vistas/plantillas/OficioPensamientoCriticoVue.vue";
import OficioAmbientesVirtuales from "@/modulos/principal/vistas/plantillas/OficioAmbientesVirtualesVue.vue";
import ConstanciaRH from "@/modulos/principal/vistas/plantillas/ConstanciaRHVue.vue";
import CartaExclusividad from "@/modulos/principal/vistas/plantillas/CartaExclusividadVue.vue";
import ConstanciaCVU from "@/modulos/principal/vistas/plantillas/ConstanciaCVVue.vue";
import ConstanciaAlumnos from "@/modulos/principal/vistas/plantillas/ConstanciaAlumnosAtendidosVue.vue";
import HorarioActividades from "@/modulos/principal/vistas/plantillas/HorarioActividadesVue.vue";
import TalonPago from "@/modulos/principal/vistas/plantillas/TalonPagoVue.vue";
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
import { getUsuarioFromStorage } from "@/utils/auth";

// ESTADO
const index = ref(0);
const listaActividades = ref([]);
const datosDocumento = ref({}); // Aquí se guarda el JSON que viene del backend
const cargando = ref(false);

// COMPUTADAS
const actividadActual = computed(() => {
  if (listaActividades.value.length === 0) return null;
  return listaActividades.value[index.value];
});

const formatoActual = computed(() => {
  if (!actividadActual.value) return "---";
  // Mapeo simple de nombres según el tipo (puedes traer esto de la BD también)
  if (actividadActual.value.idTipoDocumento === 10)
    return "Constancia PIT (1.1.5)";
  if (actividadActual.value.idTipoDocumento === 20)
    return "Actividad de Acreditación (1.1.6)";
  if (actividadActual.value.idTipoDocumento === 30)
    return "Actividad Complementaria (1.1.7)";
  if (actividadActual.value.idTipoDocumento === 40)
    return "Recurso Educativo Digital (1.2.1.1)";
  if (actividadActual.value.idTipoDocumento === 50)
    return "Manual de Prácticas (1.2.1.2)";
  if (actividadActual.value.idTipoDocumento === 60)
    return "Estrategias Innovadoras (1.2.1.3)";
  if (actividadActual.value.idTipoDocumento === 80)
    return "Constancia Productos (1.2.1.4)";
  if (actividadActual.value.idTipoDocumento === 70)
    return "Instructor Diplomado (1.2.2.4)";
  if (actividadActual.value.idTipoDocumento === 90)
    return "Exención Examen Profesional (1.3.1.1)";
  if (actividadActual.value.idTipoDocumento === 100)
    return "Oficio Comisión (1.2.2.1)";
  if (actividadActual.value.idTipoDocumento === 110)
    return "Oficio Comisión TecNM (1.2.2.2)";
  if (actividadActual.value.idTipoDocumento === 120)
    return "Comisión Pensamiento Crítico (1.2.2.3)";
  if (actividadActual.value.idTipoDocumento === 130)
    return "Comisión Ambientes Virtuales (1.2.2.5)";
  if (actividadActual.value.idTipoDocumento === 131)
    return "Comisión Inclusiva (1.2.2.6)";
  if (actividadActual.value.idTipoDocumento === 132)
    return "Comisión Estratégicos (1.2.2.7)";
  if (actividadActual.value.idTipoDocumento === 140)
    return "Constancia Recursos Humanos (01)";
  if (actividadActual.value.idTipoDocumento === 150)
    return "Carta Exclusividad Laboral (04)";
  if (actividadActual.value.idTipoDocumento === 155)
    return "Constancia Proyecto Investigación (05)";
  if (actividadActual.value.idTipoDocumento === 160)
    return "Constancia CVU (06)";
  if (actividadActual.value.idTipoDocumento === 170)
    return "Constancia Alumnos Atendidos (07)";
  if (actividadActual.value.idTipoDocumento === 180)
    return "Horario de Actividades (1.1.1)";
  if (actividadActual.value.idTipoDocumento === 181)
    return "Asignaturas Adicionales (1.1.2)";
  if (actividadActual.value.idTipoDocumento === 182)
    return "Horario Posgrado (1.1.3)";
  if (actividadActual.value.idTipoDocumento === 183)
    return "Estudiantes Atendidos (1.1.4)";
  if (actividadActual.value.idTipoDocumento === 190)
    return "Talón de Pago (02)";
  if (actividadActual.value.idTipoDocumento === 195)
    return "Cédula Doctorado (1.4.9.1)";
  if (actividadActual.value.idTipoDocumento === 196)
    return "Cédula Maestría (1.4.9.2)";
  if (actividadActual.value.idTipoDocumento === 200)
    return "Propuesta Programa (1.4.8.3)";
  if (actividadActual.value.idTipoDocumento === 210)
    return "Oficio Sabático/Beca (08)";
  if (actividadActual.value.idTipoDocumento === 215)
    return "Licencia por Gravidez (09)";
  if (actividadActual.value.idTipoDocumento === 216)
    return "Cédula Profesional (10)";
  if (actividadActual.value.idTipoDocumento === 220)
    return "Liberación de Actividades Docentes (11)";
  if (actividadActual.value.idTipoDocumento === 230)
    return "Liberación de Actividades Académicas (12)";
  if (actividadActual.value.idTipoDocumento === 240)
    return "Reporte de Investigación (13)";
  if (actividadActual.value.idTipoDocumento === 250)
    return "Evaluación Docente (14)";
  if (actividadActual.value.idTipoDocumento === 312)
    return "Exención Especialización (1.3.1.2)";
  if (actividadActual.value.idTipoDocumento === 313)
    return "Exención Maestría (1.3.1.3)";
  if (actividadActual.value.idTipoDocumento === 315)
    return "Exención Doctorado (1.3.1.5)";
  if (actividadActual.value.idTipoDocumento === 314)
    return "Codirección Maestría (1.3.1.4)";
  if (actividadActual.value.idTipoDocumento === 316)
    return "Codirección Doctorado (1.3.1.6)";
  if (actividadActual.value.idTipoDocumento === 410)
    return "Asesoría en Ciencias Básicas (1.4.1)";
  if (actividadActual.value.idTipoDocumento === 421)
    return "Proyectos Locales (1.4.2.1)";
  if (actividadActual.value.idTipoDocumento === 422)
    return "Proyectos Nacionales (1.4.2.2)";
  if (actividadActual.value.idTipoDocumento === 423)
    return "Proyectos Internacionales (1.4.2.3)";
  if (actividadActual.value.idTipoDocumento === 431)
    return "Asesoría Concurso 3er Lugar Nacional (1.4.3.1)";
  if (actividadActual.value.idTipoDocumento === 432)
    return "Asesoría Concurso 2do Lugar Nacional (1.4.3.2)";
  if (actividadActual.value.idTipoDocumento === 433)
    return "Asesoría Concurso 1er Lugar Nacional (1.4.3.3)";
  if (actividadActual.value.idTipoDocumento === 434)
    return "Asesoría Concurso 3er Lugar Internacional (1.4.3.4)";
  if (actividadActual.value.idTipoDocumento === 435)
    return "Asesoría Concurso 2do Lugar Internacional (1.4.3.5)";
  if (actividadActual.value.idTipoDocumento === 436)
    return "Asesoría Concurso 1er Lugar Internacional (1.4.3.6)";
  if (actividadActual.value.idTipoDocumento === 441)
    return "Coordinador Concurso General Local (1.4.4.1)";
  if (actividadActual.value.idTipoDocumento === 442)
    return "Coordinador Concurso General Regional(1.4.4.2)";
  if (actividadActual.value.idTipoDocumento === 443)
    return "Coordinador Concurso General Nacional o Internacional (1.4.4.3)";
  if (actividadActual.value.idTipoDocumento === 444)
    return "Colaborador Concurso Local (1.4.4.4)";
  if (actividadActual.value.idTipoDocumento === 445)
    return "Colaborador Concurso Regional (1.4.4.5)";
  if (actividadActual.value.idTipoDocumento === 446)
    return "Colaborador Concurso Nacional o Internacional (1.4.4.6)";
  if (actividadActual.value.idTipoDocumento === 451)
    return "Jurado Local (1.4.5.1)";
  if (actividadActual.value.idTipoDocumento === 452)
    return "Jurado Regional (1.4.5.2)";
  if (actividadActual.value.idTipoDocumento === 453)
    return "Jurado Nacional (1.4.5.3)";
  if (actividadActual.value.idTipoDocumento === 454)
    return "Jurado Internacional (1.4.5.4)";
  if (actividadActual.value.idTipoDocumento === 461)
    return "Comité Local o Regional(1.4.6.1)";
  if (actividadActual.value.idTipoDocumento === 462)
    return "Comité Nacional (1.4.6.2)";
  if (actividadActual.value.idTipoDocumento === 463)
    return "Comité Internacional (1.4.6.3)";
  if (actividadActual.value.idTipoDocumento === 471)
    return "Constancia Auditor Interno en la Institución (1.4.7.1)";
  if (actividadActual.value.idTipoDocumento === 472)
    return "Constancia Auditor Interno Fuera de la Institución (1.4.7.2)";
  if (actividadActual.value.idTipoDocumento === 473)
    return "Constancia Auditor Líder en la Institución (1.4.7.3)";
  if (actividadActual.value.idTipoDocumento === 474)
    return "Constancia Auditor Líder Fuera de la Institución (1.4.7.4)";
  if (actividadActual.value.idTipoDocumento === 482)
    return "Constancia Módulo de Especialidad (1.4.8.2)";
  if (actividadActual.value.idTipoDocumento === 481)
    return "Constancia de Desarrollo Curricular Local (1.4.8.1.1)";
  if (actividadActual.value.idTipoDocumento === 483)
    return "Constancia de Desarrollo Curricular Nacional (1.4.8.1.2)";
  if (actividadActual.value.idTipoDocumento === 321)
    return "Constancia de Sinodal Técnico Superior (1.3.2.1)";
  if (actividadActual.value.idTipoDocumento === 322)
    return "Constancia de Sinodal Licenciatura (1.3.2.2)";
  if (actividadActual.value.idTipoDocumento === 323)
    return "Constancia de Sinodal Especialización (1.3.2.3)";
  if (actividadActual.value.idTipoDocumento === 324)
    return "Constancia de Sinodal Maestría (1.3.2.4)";
  if (actividadActual.value.idTipoDocumento === 325)
    return "Constancia de Sinodal Técnico Doctorado (1.3.2.5)";

  return "Documento Genérico";
});

// CICLO DE VIDA
onMounted(async () => {
  await cargarListaActividades();
});

// MÉTODOS

// 1. Cargar la lista general (Carrusel)
const cargarListaActividades = async () => {
  try {
    // Obtener usuario logueado
    const usuario = getUsuarioFromStorage();
    if (!usuario) {
      console.error("No se encontró usuario logueado");
      return;
    }

    console.log("Usuario logueado:", usuario);
    console.log("idUsuario:", usuario.idUsuario);

    // Llamar endpoint que filtra por idUsuario
    const res = await axios.get(
      `http://localhost:3001/api/docenteactividad/usuario/${usuario.idUsuario}`
    );

    console.log("Actividades recibidas:", res.data);

    // Mapeamos los datos que vienen del backend
    listaActividades.value = res.data.map((item) => ({
      idDocenteActividad: item.idDocenteActividad,
      // Usamos el nombre que viene del JOIN
      nombre: item.nombreActividad || "Actividad sin nombre",
      // Usamos el tipo que viene del JOIN
      idTipoDocumento: item.idTipoDocumento,
    }));

    // Si hay datos, cargamos el primero automáticamente
    if (listaActividades.value.length > 0) {
      await cargarDetalleDocumento();
    }
  } catch (error) {
    console.error("Error cargando lista:", error);
  }
};

// 2. Cargar el detalle (El relleno del documento)
const cargarDetalleDocumento = async () => {
  const actual = actividadActual.value;
  if (!actual) return;

  cargando.value = true;
  datosDocumento.value = {}; // Limpiar anterior

  try {
    // Si es PIT 1.1.5 (Tipo 10)
    if (actual.idTipoDocumento === 10) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/pit`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    }
    // Caso Acreditación 1.1.6 (ID 20)
    else if (actual.idTipoDocumento === 20) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/acreditacion`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    }
    // Caso Complementaria 1.1.7 (ID 30)
    else if (actual.idTipoDocumento === 30) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/complementaria`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 40) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/red`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 50) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/manual`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 60) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/estrategia`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 80) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/productos`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 70) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/diplomado`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([90, 312, 313, 315].includes(actual.idTipoDocumento)) {
      // Todos llaman a la misma ruta, el servicio decide el título
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/exencion`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 100) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comision`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 110) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comision-tecnm`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 120) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comision-pensamiento`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 130) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comision-ambientes`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 131) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comision-inclusiva`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 132) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comision-estrategicos`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 140) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/constancia-rh`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 150) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/exclusividad`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 155) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/investigacion-05`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 160) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/cvu`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 170) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/alumnos-atendidos`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 180) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/horario`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 181) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/horario-adicional`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 182) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/horario-posgrado`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 183) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/estudiantes-114`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 190) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/talon`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (
      actual.idTipoDocumento === 195 ||
      actual.idTipoDocumento === 196
    ) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/cedula`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 200) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/propuesta`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 210) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/sabatico`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 215) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/licencia-gravidez`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([195, 196, 216].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/cedula`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 220) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/liberacion`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 230) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/liberacion-academica`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 240) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/reporte-investigacion`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 250) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/evaluacion-docente`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([314, 316].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/codireccion`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 410) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/asesoria-cb`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([421, 422, 423].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/constancia-proyectos`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (
      [431, 432, 433, 434, 435, 436].includes(actual.idTipoDocumento)
    ) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/asesoria-generic`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (
      [441, 442, 443, 444, 445, 446].includes(actual.idTipoDocumento)
    ) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/concurso-generic`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([451, 452, 453, 454].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/jurado-generic`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([461, 462, 463].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/comite-generic`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([471, 472, 473, 474].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/auditoria-generic`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if (actual.idTipoDocumento === 482) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/modulo-especialidad`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([481, 483].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/desarrollo-curricular`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    } else if ([321, 322, 323, 324, 325].includes(actual.idTipoDocumento)) {
      const url = `http://localhost:3001/api/docenteactividad/${actual.idDocenteActividad}/sinodal-generic`;
      const res = await axios.get(url);
      datosDocumento.value = res.data;
    }

    // Aquí puedes agregar más "else if" para otros tipos (20, 30, etc.)
  } catch (error) {
    console.error("Error cargando detalle documento:", error);
  } finally {
    cargando.value = false;
  }
};

// 3. Navegación
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
  // Buscamos el elemento por el ID que le pusimos
  const element = document.getElementById("documento-para-imprimir");

  if (!element) {
    alert("No se encuentra el documento para generar.");
    return;
  }

  // Configuración del PDF
  const opt = {
    margin: 0, // Sin márgenes adicionales (la hoja ya los tiene)
    filename: `Constancia_${
      datosDocumento.value.nombreDocente || "Documento"
    }.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: {
      scale: 2, // Mayor escala mejora la calidad del texto
      useCORS: true, // Permite cargar imágenes externas si fuera necesario
      scrollY: 0, // Evita problemas de desplazamiento
    },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" }, // Tamaño Carta
  };
  html2pdf().set(opt).from(element).save();
};
</script>

<style scoped>
:root {
  --color-sigedd-bg: #e0f2ff;
  --color-sigedd-osc: #1e3a6c;
  --color-text-osc: #0d2a52;
  --color-border: #b0c4d4;
}

.docentes-elegir {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  background-color: var(--color-sigedd-bg);
  font-family: Arial, sans-serif;
  color: var(--color-text-osc);
}

/* HEADER */
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

/* MAIN */
.main-contenido {
  flex: 1;
  text-align: center;
  padding-top: 20px;
  display: flex; /* Flex para centrar verticalmente si hace falta */
  flex-direction: column;
  align-items: center;
}

.titulo-actividad {
  font-size: 1.8em;
}
.nito {
  font-weight: bold;
}

.visor-formato {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 25px;
}

.flecha {
  background: none;
  border: none;
  cursor: pointer;
}
.flecha img {
  width: 30px;
}
.flecha:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

/* CONTENEDOR DEL DOCUMENTO */

.contenedor-documento {
  width: 450px;
  height: 580px;
  background-color: #525659;
  margin: 0 25px;
  border-radius: 4px;
  overflow: hidden;
  position: relative;

  /* Flexbox para centrar la hoja vertical y horizontalmente */
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
}

.documento-escalado {
  transform: scale(0.9);

  transform-origin: center center;

  margin: 0;

  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
}

.mensaje-estado {
  color: white;
  font-size: 1.2em;
}

.texto-formato {
  margin-top: 15px;
  font-size: 1.3em;
}

/* BOTÓN DESCARGA */
.btn-descargar {
  padding: 10px 20px;
  background-color: var(--color-sigedd-osc);
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
}
.btn-descargar:hover {
  background-color: #2c5294;
}

/* FOOTER */
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
