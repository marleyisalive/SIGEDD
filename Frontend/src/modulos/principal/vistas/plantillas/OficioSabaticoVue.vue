<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-oficio">
          <p class="inst">Instituto Tecnológico de Culiacán</p>
          <br>
          <p>DEPARTAMENTO DE RECURSOS HUMANOS</p>
          <p>OFICINA DE PERSONAL</p>
          <p>Oficio No. {{ datos.oficio }}</p>
          <p><strong>ASUNTO:</strong> Comisión Académica – Punto 08</p>
        </div>

        <div class="fecha-linea">
            <p>Culiacán, Sinaloa, a {{ datos.fechaHeader }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>{{ datos.nombreDocente }}</strong></p>
            <p>P R E S E N T E.</p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio del presente, se expone la información correspondiente al <strong>Punto 08</strong> de los requisitos establecidos para la integración del Formato SPD, conforme a los lineamientos vigentes del Tecnológico Nacional de México.
            </p>
            
            <p class="titulo-seccion">
                <strong>Oficio de autorización de Período Sabático o de Licencia por Beca Comisión</strong>
            </p>

            <p>
                Oficio de autorización de <strong>Período Sabático</strong> o de <strong>Licencia por Beca Comisión</strong>, según sea el caso, emitido por la instancia competente.
            </p>
            
            <p class="subtitulo-lista">Este documento deberá especificar:</p>

            <ul class="lista-requisitos">
                <li>El nombre del personal docente beneficiado,</li>
                <li>El tipo de licencia o beneficio académico otorgado,</li>
                <li>El periodo autorizado,</li>
                <li>Y la firma o sello correspondiente de la autoridad responsable.</li>
            </ul>

            <p>
                Dicho oficio deberá presentarse en copia simple y mantenerse vigente dentro del periodo que abarque la evaluación del Formato SPD.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica ®</i></p>

            <div class="firma-centro">
                 <div class="linea"></div>
                 <p class="nombre">{{ datos.firmaJefeDepto }}</p>
                 <p class="cargo">JEFA DEL DEPTO. DE SISTEMAS Y COMPUTACIÓN</p>
            </div>

            <div class="firmas-inferiores">
                <div class="firma-bloque">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaPdteAcademia }}</p>
                    <p class="cargo">PRESIDENTA DE ACADEMIA DE ING. EN<br>SISTEMAS COMPUTACIONALES</p>
                </div>
                <div class="firma-bloque">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">RESPONSABLE DEL DESPACHO DE LA<br>SUBDIRECCIÓN ACADÉMICA</p>
                </div>
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
  color: #000;
  padding: 0; 
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: block; 
}

.banner-superior { width: 100%; line-height: 0; }
.banner-superior img { width: 100%; height: auto; }

.contenido-interno {
    padding: 20px 40px; 
    padding-bottom: 80px; 
}

/* Oficio */
.bloque-oficio {
    text-align: right;
    font-size: 9pt;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left: auto;
    width: 60%;
}
.inst { font-size: 10pt; margin-bottom: 10px; }

.fecha-linea { margin-bottom: 20px; }
.destinatario { margin-bottom: 20px; font-weight: bold; }

/* Cuerpo */
.cuerpo-texto { 
    text-align: justify; 
    line-height: 1.5; 
    margin-bottom: 20px; 
}

.titulo-seccion { margin: 20px 0 10px 0; }
.subtitulo-lista { margin-top: 15px; margin-bottom: 5px; }

.lista-requisitos {
    list-style-type: disc;
    margin-left: 40px;
    margin-bottom: 20px;
}
.lista-requisitos li { margin-bottom: 5px; }

/* Firmas */
.seccion-firmas { margin-top: 20px; }
.atentamente { text-align: left; margin-bottom: 30px; font-size: 9pt; }

.firma-centro { width: 60%; margin: 0 auto 40px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; gap: 20px; }
.firma-bloque { width: 48%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

/* Footer */
.footer-logos {
    position: absolute; 
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 0;
    z-index: 10;
}
.footer-logos img { width: 100%; }
</style>