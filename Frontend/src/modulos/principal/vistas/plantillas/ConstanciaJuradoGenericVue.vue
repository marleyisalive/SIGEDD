<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
            <p class="depto">DEPARTAMENTO ACADÉMICO DE {{ datos.departamento }}</p>
            <br>
            <p>Oficio No. <u>{{ datos.oficio }}</u></p>
            <p><strong>Asunto:</strong> Participación como {{ datos.nivelTexto }}</p>
            <br>
            <p>Culiacán, Sinaloa, a <u>{{ datos.dia }}</u> de <u>{{ datos.mes }}</u> de {{ datos.anio }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>A QUIEN CORRESPONDA</strong></p>
            <p>P R E S E N T E.</p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se certifica que el(la) docente:
            </p>
            
            <div class="nombre-contenedor">
                <div class="nombre-resaltado">{{ datos.nombreDocente }}</div>
            </div>

            <p>
                participó como <strong>{{ datos.nivelTexto }}</strong> en evento académico, concurso de ciencias, innovación tecnológica o emprendimiento.
            </p>

            <div class="datos-evento">
                <p><strong>Periodo de participación:</strong></p>
                <p class="texto-dato">{{ datos.periodo }}</p>
                
                <p><strong>Evento o actividad:</strong></p>
                <p class="texto-dato linea-dato">{{ datos.evento }}</p>
            </div>
            
            <p class="nota-constancia">
                Constancia emitida por la institución organizadora y oficio de comisión correspondiente.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firmas-grid">
                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaJefeDepto }}</p>
                    <p class="cargo">Jefe(a) del Departamento Académico</p>
                </div>

                <div class="vobo">Vo. Bo.</div>

                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">Subdirección Académica</p>
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

.banner-superior { width: 100%; line-height: 0; margin-bottom: 20px; }
.banner-superior img { width: 100%; height: auto; }

/* --- CORRECCIÓN PRINCIPAL AQUÍ --- */
.contenido-interno { 
    padding: 0 50px; 
    /* Aumentamos mucho el padding inferior para empujar el footer hacia abajo visualmente 
       y evitar que el texto choque con él */
    padding-bottom: 180px; 
}

/* ENCABEZADO */
.bloque-encabezado {
    text-align: right;
    font-size: 10pt;
    margin-bottom: 25px;
}
.inst { font-weight: bold; margin-bottom: 2px; }
.depto { font-weight: bold; text-transform: uppercase; }

/* DESTINATARIO */
.destinatario { margin-bottom: 20px; font-weight: bold; }

/* CUERPO */
.cuerpo-texto { text-align: justify; line-height: 1.4; margin-bottom: 20px; }

.nombre-contenedor { text-align: center; margin: 10px 0 15px 0; }
.nombre-resaltado {
    display: inline-block;
    width: 80%;
    border-bottom: 1px solid black;
    font-weight: bold;
    font-size: 11pt;
    padding-bottom: 2px;
}

.datos-evento { margin-top: 15px; }
.texto-dato { margin-bottom: 8px; padding-left: 0; }
.linea-dato { border-bottom: 1px solid black; display: block; width: 100%; }
.nota-constancia { margin-top: 15px; font-size: 9pt; }

/* FIRMAS */
.seccion-firmas { margin-top: 20px; }
.atentamente { text-align: left; margin-bottom: 40px; font-size: 9pt; }

.firmas-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
}

.firma-box { width: 40%; text-align: center; }

.vobo {
    font-size: 9pt;
    font-weight: bold;
    padding-bottom: 25px;
}

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; }

/* FOOTER */
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