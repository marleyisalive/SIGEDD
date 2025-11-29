<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
            <p>DEPARTAMENTO DE {{ datos.departamento }}</p>
            <br>
            <p>Culiacán, Sinaloa, a {{ datos.fechaTexto }}</p>
            <p class="oficio-linea">OFICIO No.: {{ datos.oficio }}</p>
            <p><strong>ASUNTO:</strong> Constancia de Asesoría.</p>
        </div>

        <div class="destinatario">
            <p><strong>COMISIÓN DE EVALUACIÓN DEL PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE</strong></p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, profesor(a) adscrito(a) al Departamento de {{ datos.departamento }}, asesoró el proyecto {{ datos.nombreProyecto }} en la actividad de <strong>{{ datos.actividadTexto }}</strong>, a los estudiantes C. <strong>{{ datos.listaEstudiantes }}</strong>, de la carrera de Ingeniería en Sistemas Computacionales.
            </p>
            <br>
            <p>
                Actividad realizada durante el periodo <strong>{{ datos.periodo }}</strong>.
            </p>
            <br>
            <p>
                Se extiende la presente para los fines que al interesado convengan.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firmas-grid">
                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaJefeDepto }}</p>
                    <p class="cargo">JEFE(A) DEL DEPARTAMENTO ACADÉMICO</p>
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

/* --- CORRECCIÓN DEL FOOTER AQUÍ --- */
/* Aumentamos el padding inferior para empujar el contenido hacia arriba y dar espacio al footer absoluto */
.contenido-interno { 
    padding: 0 40px 150px 40px; /* 150px de espacio abajo */
}

.bloque-encabezado { text-align: right; margin-bottom: 30px; font-size: 9pt; }
.inst { font-weight: bold; font-size: 10pt; }
.oficio-linea { margin-top: 10px; }

.destinatario { margin-bottom: 20px; font-weight: bold; font-size: 10pt; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }

/* FIRMAS LADO A LADO */
.seccion-firmas { margin-top: 40px; }
.atentamente { text-align: center; margin-bottom: 50px; font-size: 9pt; }

.firmas-grid {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 20px;
    margin-bottom: 20px;
}
.firma-box { 
    width: 45%;
    text-align: center; 
}
.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>