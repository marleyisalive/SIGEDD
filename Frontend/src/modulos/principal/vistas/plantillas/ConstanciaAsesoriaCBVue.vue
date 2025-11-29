<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
            <p>DEPARTAMENTO DE CIENCIAS BÁSICAS</p>
            <br>
            <p>Culiacán, Sinaloa, <span class="fecha-box">{{ datos.fechaHeader }}</span></p>
            <p>OFICIO No.: {{ datos.oficio }}</p>
            <p><strong>ASUNTO:</strong> Constancia de Asesoría.</p>
        </div>

        <div class="destinatario">
            <p><strong>COMISIÓN DE EVALUACIÓN DEL PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE</strong></p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, adscrito(a) al Departamento de {{ datos.departamento }}, participó en el <strong>Programa de Asesoría a Estudiantes en Ciencias Básicas</strong>.
            </p>
            <br>
            <p>
                Dicha actividad se llevó a cabo durante el periodo <strong>{{ datos.periodo }}</strong>, brindando asesoría en la asignatura de <strong>{{ datos.asignatura }}</strong>, atendiendo a un total de <strong>{{ datos.totalAlumnos }}</strong> estudiantes.
            </p>
            <br>
            <p>
                Se extiende la presente para los fines que al interesado convengan, en la ciudad de Culiacán, Sinaloa, a los {{ datos.fechaTexto }}.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firmas-grid">
                
                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaJefeCB }}</p>
                    <p class="cargo">JEFE(A) DEL DEPTO. DE CIENCIAS BÁSICAS</p>
                </div>

                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">SUBDIRECTOR(A) ACADÉMICO(A)</p>
                </div>

            </div>
        </div>

    </div>

    <br>
    <br>
    <br>

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

.banner-superior { width: 100%; line-height: 0; margin-bottom: 20px; }
.banner-superior img { width: 100%; height: auto; }

.contenido-interno { padding: 0 40px 40px 40px; padding-bottom: 80px; }

.bloque-encabezado { text-align: right; margin-bottom: 30px; font-size: 9pt; }
.inst { font-weight: bold; font-size: 10pt; }
.fecha-box { background-color: black; color: white; padding: 0 4px; font-weight: bold; }

.destinatario { margin-bottom: 20px; font-weight: bold; font-size: 10pt; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }

/* SECCIÓN FIRMAS CORREGIDA */
.seccion-firmas { margin-top: 40px; }
.atentamente { text-align: center; margin-bottom: 50px; font-size: 9pt; }

.firmas-grid {
    display: flex;
    justify-content: space-between; /* Separa las firmas a los extremos */
    align-items: flex-start;
    gap: 20px;
}

.firma-box { 
    width: 45%; /* Cada firma ocupa un poco menos de la mitad */
    text-align: center; 
}

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>