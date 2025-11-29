<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-izquierda">
         <img src="@/assets/header-documento.png" class="logo-sep-tecnm" />
      </div>
      
      <div class="columna-derecha">
        <div class="top-inst">
            <p class="inst-nombre">Instituto Tecnológico de Culiacán</p>
        </div>
        
        <div class="bottom-datos">
            <p>Culiacán, Sinaloa, <span class="fecha-box">{{ datos.fechaHeader }}</span></p>
            <p><strong>OFICIO No.:</strong> {{ datos.numOficio }}</p>
            <p><strong>ASUNTO:</strong> Constancia.</p>
        </div>
      </div>
    </header>

    <div class="destinatario">
        <p><strong>COMISIÓN DE EVALUACIÓN DEL<br>
        PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE<br>
        PARA LOS INSTITUTOS TECNOLÓGICOS FEDERALES Y CENTROS.<br>
        PRESENTE.</strong></p>
    </div>

    <div class="cuerpo-texto">
        <p>
            Por medio de este presente se hace constar que la C. <strong>{{ datos.nombreDocente }}</strong>, 
            elaboró durante el semestre {{ datos.periodo }}, un recurso educativo digital afín al contenido de la asignatura de 
            <strong>{{ datos.asignatura }}</strong> del programa educativo de 
            <strong>{{ datos.programaEducativo }}</strong>, aprobado y utilizado por la misma academia, 
            contando con la rúbrica de evaluación correspondiente.
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
                <p class="nombre">{{ datos.firmaPdteAcademia }}</p>
                <p class="cargo">PRESIDENTA DE ACADEMIA DE ING. EN SISTEMAS<br>COMPUTACIONALES</p>
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
    default: () => ({})
  }
});
</script>

<style scoped>
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000; /* Texto negro forzado */
  padding: 30px 40px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* HEADER AJUSTADO */
.header-top { 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-start; /* Alineación superior */
    margin-bottom: 30px; 
}

.logos-izquierda img { 
    height: 120px; /* Ajuste para que no empuje demasiado */
    object-fit: contain;
}

/* Columna Derecha: Ocupa la misma altura que el logo y distribuye contenido */
.columna-derecha {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    text-align: right;
    font-size: 9pt;
}

.inst-nombre { 
    font-weight: bold; 
    font-size: 10pt; 
}

.bottom-datos p {
    margin: 2px 0; /* Espaciado fino entre líneas */
}

/* Estilo para el recuadro negro de la fecha */
.fecha-box {
    background-color: black;
    color: white;
    font-weight: bold;
    padding: 0 4px; /* Un poco de aire a los lados */
}

.destinatario { font-weight: bold; margin-bottom: 25px; font-size: 10pt; }

.cuerpo-texto { 
    text-align: justify; 
    line-height: 1.5; 
    margin-bottom: 20px; 
}

.seccion-firmas { 
    margin-top: auto; 
    flex-grow: 1; 
    display: flex; 
    flex-direction: column; 
    justify-content: center; 
}
.atentamente { text-align: center; margin-bottom: 30px; font-size: 9pt; }

.firma-centro { width: 60%; margin: 0 auto 50px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; gap: 20px; }
.firma-bloque { width: 48%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

.footer-logos img { width: 100%; margin-top: 10px; }
</style>