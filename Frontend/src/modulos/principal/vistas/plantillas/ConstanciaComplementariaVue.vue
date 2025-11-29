<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-superiores">
         <img src="@/assets/header-documento.png" class="logo-sep" />
      </div>
    </header>

    <div class="datos-oficio">
        <p>Instituto Tecnológico de Culiacán</p>
        <br>
        <p>Culiacán, Sinaloa, {{ datos.fechaHeader }}</p>
        <p><strong>OFICIO No.:</strong> {{ datos.numOficio }}</p>
        <p><strong>ASUNTO:</strong> Constancia.</p>
    </div>

    <div class="destinatario">
        <p><strong>COMISIÓN DE EVALUACIÓN DEL<br>
        PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE<br>
        PARA LOS INSTITUTOS TECNOLÓGICOS FEDERALES Y CENTROS.<br>
        PRESENTE.</strong></p>
    </div>

    <div class="cuerpo-texto">
        <p>
            Por medio de este presente se hace constar que la C. <strong>{{ datos.nombreDocente }}</strong>, 
            cumplió satisfactoriamente en la participación de las actividades realizadas como monitor de cine en el semestre 
            <strong>{{ datos.periodo }}</strong> con número de dictamen #<strong>{{ datos.dictamen }}</strong>, 
            para la obtención de créditos complementarios a cargo del centro de información, atendiendo un total de 
            <strong>{{ datos.totalAlumnos }}</strong> alumnos que a su vez, 
            <strong>{{ datos.alumnosCredito }}</strong> obtuvieron el crédito complementario los cuales entregaron sus actividades en tiempo y forma.
        </p>
        <br>
        <p>
            Se extiende la presente en la ciudad de Culiacán, Sinaloa, a los {{ datos.fechaTexto }}.
        </p>
    </div>

    <div class="seccion-firmas">
        <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
        <i>Excelencia en Educación Tecnológica ®</i></p>

        <div class="firma-centro">
             <div class="linea"></div>
             <p class="nombre">{{ datos.firmaJefeDepto }}</p>
             <p class="cargo">JEFA DEL DEPTO. SISTEMAS Y COMPUTACIÓN</p>
        </div>

        <div class="firmas-inferiores">
            <div class="firma-bloque">
                <div class="linea"></div>
                <p class="nombre">{{ datos.firmaJefeCentro }}</p>
                <p class="cargo">JEFE DEL CENTRO DE INFORMACIÓN</p>
            </div>
            <div class="firma-bloque">
                <div class="linea"></div>
                <p class="nombre">{{ datos.firmaSubdirector }}</p>
                <p class="cargo">RESPONSABLE DEL DESPACHO DE LA<br>SUBDIRECCIÓN ACADÉMICA</p>
            </div>
        </div>
    </div>

    <footer class="footer-logos">
         <img src="@/assets/footer-documento-consulta.png" alt="Logos Footer" />
    </footer>

  </div>
</template>

<script setup>
defineProps({
  datos: {
    type: Object,
    required: true,
    default: () => ({
        nombreDocente: "---",
        numOficio: "---",
        fechaHeader: "---",
        fechaTexto: "---",
        dictamen: "---",
        totalAlumnos: 0,
        alumnosCredito: 0,
        firmaJefeDepto: "",
        firmaJefeCentro: "",
        firmaSubdirector: ""
    })
  }
});
</script>

<style scoped>
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000000; 
  padding: 30px 40px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

.header-top { display: flex; justify-content: space-between; margin-bottom: 20px; }
.logos-superiores img { height: 140px; margin-right: 0px; }
.logo-derecha img { height: 50px; }

.datos-oficio { text-align: right; margin-bottom: 20px; line-height: 1.3; }
.destinatario { font-weight: bold; margin-bottom: 20px; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 20px; }

.seccion-firmas { margin-top: auto; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
.atentamente { text-align: center; margin-bottom: 30px; }

/* Estructura de firmas: 1 arriba, 2 abajo */
.firma-centro { width: 60%; margin: 0 auto 40px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; }
.firma-bloque { width: 45%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

.footer-logos img { width: 100%; margin-top: 20px; }
</style>