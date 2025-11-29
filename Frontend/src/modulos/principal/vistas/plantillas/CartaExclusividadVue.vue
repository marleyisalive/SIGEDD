<template>
  <div class="hoja-carta">
    
    <div class="fecha-header">
        <p>(Culiacán Sinaloa a {{ datos.fechaEscrita }})</p>
    </div>

    <div class="titulo-doc">
        <p>CARTA DE EXCLUSIVIDAD LABORAL</p>
        <p>DOCENTES CON PLAZA DE TIEMPO COMPLETO</p>
    </div>

    <div class="cuerpo-texto">
        <p>
            El (La) que suscribe <strong>{{ datos.nombreDocente }}</strong>, con filiación: <strong>{{ datos.filiacion }}</strong>, <strong>Docente de tiempo completo</strong>, con clave presupuestal: <strong>{{ datos.clavePresupuestal }}</strong>, por medio de este documento manifiesto <strong>MI COMPROMISO</strong> con el Tecnológico Nacional de México, campus <strong>INSTITUTO TECNOLÓGICO DE CULIACÁN</strong> declaro que en caso de haber laborado en otra(s) institución(es) pública(s) o federal(es), la jornada no excedió las 12 horas-semana-mes durante el periodo a evaluar del estímulo, y en caso de estar laborando actualmente en otra(s) institución(es), la jornada no excederá las 12 horas-semana-mes y los horarios establecidos para el desempeño de las mismas, por lo que autorizo que se revise con el departamento de recursos humanos, la compatibilidad de horarios de mi institución de adscripción.
        </p>
        <br>
        <p>
            Asimismo, manifiesto mi disposición para realizar las actividades propias de la Educación Superior Tecnológica enfocadas a satisfacer las necesidades de la dedicación, la calidad en el desempeño y permanencia en las actividades de la docencia, que la autoridad correspondiente de mi institución me encomiende y podré realizar estudios de posgrado siempre y cuando estas actividades sean compatibles con la carga horaria reglamentaria asignada, en el entendido de que en todos los productos derivados de mis actividades como profesor de tiempo completo de la institución, tales como: patentes, modelos de utilidad, derechos de autor, publicaciones en revistas, congresos y libros, mencionaré mi adscripción al Tecnológico Nacional de México, excepto con autorización por escrito por el TecNM.
        </p>
        <p>
            Adicionalmente me comprometo a no incurrir en conflicto de intereses.
        </p>
        <br>
        <p>
            En caso de que se me compruebe la <strong>NO EXCLUSIVIDAD LABORAL</strong>, me haré acreedor a la aplicación de las sanciones correspondientes de la normatividad vigente y perderé de manera permanente el derecho a participar en el Programa de Estímulos al Desempeño del Personal Docente.
        </p>
    </div>

    <div class="seccion-firma">
        <p class="atentamente"><strong>ATENTAMENTE</strong></p>

        <div class="firma-bloque">
             <div class="espacio-firma"></div> 
             <div class="linea"></div>
             <p class="nombre">{{ datos.nombreDocente }}</p>
             <p class="cargo">Nombre y firma del docente</p>
        </div>
    </div>

    <footer class="nota-pie">
        <p>1.- Artículo 05 de los Lineamientos para la Operación del Programa de Estímulos al Desempeño del Personal Docente para los Institutos Tecnológicos Federales y Centros 2025</p>
    </footer>

  </div>
</template>

<script setup>
defineProps({
  datos: {
    type: Object,
    required: true,
    default: () => ({})
  }
});
</script>

<style scoped>
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000;
  padding: 50px 60px; /* Márgenes amplios */
  box-sizing: border-box;
  font-family: 'Times New Roman', serif; /* Tipografía formal */
  font-size: 11pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.fecha-header {
    text-align: right;
    margin-bottom: 40px;
}

.titulo-doc {
    text-align: center;
    font-weight: bold;
    margin-bottom: 40px;
    line-height: 1.3;
}

.cuerpo-texto {
    text-align: justify;
    line-height: 1.4;
    margin-bottom: 40px;
}

.seccion-firma {
    margin-top: auto;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.atentamente { margin-bottom: 50px; }

.firma-bloque { width: 300px; text-align: center; }
.espacio-firma { height: 40px; }
.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; }

.nota-pie {
    font-size: 8pt;
    border-top: 1px solid #ccc;
    padding-top: 5px;
    margin-top: 20px;
}
</style>