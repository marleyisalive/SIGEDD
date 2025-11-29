<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <div class="inst-block">
                <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
                <p class="depto">DIRECCIÓN DEL INSTITUTO</p>
            </div>
            <div class="datos-block">
                <p class="dato-linea">Oficio No. <u>{{ datos.oficio }}</u></p>
                <p class="dato-linea"><strong>ASUNTO:</strong> Constancia de Proyecto de Investigación.</p>
                <p class="dato-linea fecha">Culiacán, Sinaloa, a {{ datos.fechaTexto }}.</p>
            </div>
        </div>

        <div class="destinatario">
            <p><strong>COMISIÓN DE EVALUACIÓN DEL PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE</strong></p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                La que suscribe, Directora del Instituto Tecnológico de Culiacán, hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, docente adscrito(a) al Departamento de {{ datos.departamento }}, cuenta con el registro de un proyecto de investigación vigente ante la Dirección de Posgrado, Investigación e Innovación (DPII) del TecNM o la Dirección de Docencia e Innovación Educativa (DDIE).
            </p>
            
            <p class="subtitulo-datos">Datos del Proyecto:</p>
            
            <div class="datos-proyecto">
                <p><strong>Título:</strong> {{ datos.tituloProyecto }}</p>
                <p><strong>Clave de Registro:</strong> {{ datos.claveRegistro }}</p>
                <p><strong>Vigencia:</strong> Del {{ datos.vigenciaInicio }} al {{ datos.vigenciaFin }}</p>
            </div>

            <p class="parrafo-cierre">
                Se extiende la presente para los fines que al interesado convengan.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <br>
            <br>
            
            <div class="firmas-grid">
                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaDirector }}</p>
                    <p class="cargo">DIRECTORA DEL INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
                </div>

                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">SUBDIRECTOR(A) ACADÉMICO(A)</p>
                </div>
            </div>
        </div>

    </div> <footer class="footer-logos">
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
/* ESTRUCTURA BASE */
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

.banner-superior { width: 100%; line-height: 0; margin-bottom: 10px; /* Margen reducido */ }
.banner-superior img { width: 100%; height: auto; }

/* PADDING INFERIOR SEGURO */
.contenido-interno { 
    padding: 0 50px; 
    padding-bottom: 180px; /* Espacio grande para el footer */
}

/* ENCABEZADO COMPACTO */
.bloque-encabezado { text-align: right; font-size: 9pt; margin-bottom: 20px; }
.inst-block { margin-bottom: 8px; }
.inst { font-weight: bold; font-size: 10pt; margin: 0; }
.depto { font-weight: bold; font-size: 9pt; margin: 0; }

.datos-block { margin-top: 5px; }
.dato-linea { margin: 2px 0; }
.fecha { margin-top: 5px; }

/* DESTINATARIO */
.destinatario { margin-bottom: 15px; font-weight: bold; font-size: 10pt; }

/* CUERPO */
.cuerpo-texto { text-align: justify; line-height: 1.4; margin-bottom: 20px; }
.subtitulo-datos { margin: 10px 0 5px 0; font-weight: bold; }

.datos-proyecto {
    margin: 10px 0 15px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px dashed #ccc;
    font-size: 9.5pt;
}
.datos-proyecto p { margin: 4px 0; }

.parrafo-cierre { margin-top: 10px; }

/* FIRMAS */
.seccion-firmas { margin-top: 25px; text-align: center; }
.atentamente { margin-bottom: 40px; font-size: 9pt; text-align: left; }

.firmas-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.firma-box { width: 45%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 4px; width: 100%; }
.nombre { font-weight: bold; font-size: 10pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; font-weight: bold; }

/* FOOTER ABSOLUTO */
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