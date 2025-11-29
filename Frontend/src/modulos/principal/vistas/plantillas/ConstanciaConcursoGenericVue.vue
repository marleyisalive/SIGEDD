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
            <p><strong>ASUNTO:</strong> Constancia.</p>
        </div>

        <div class="destinatario">
            <p><strong>COMISIÓN DE EVALUACIÓN DEL PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE</strong></p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de este presente se hace constar que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, cumplió satisfactoriamente en la participación como <strong>{{ datos.funcion }}</strong> en el evento/concurso denominado <strong>"{{ datos.nombreConcurso }}"</strong>.
            </p>
            <br>
            <p>
                Dicha actividad se llevó a cabo durante el periodo <strong>{{ datos.periodo }}</strong>, realizando las siguientes actividades: <strong>{{ datos.actividades }}</strong>.
            </p>
            <br>
            <p>
                Se extiende la presente para los fines que al interesado convengan.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

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
  datos: { type: Object, required: true, default: () => ({}) }
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
.oficio-linea { margin-top: 10px; }

.destinatario { margin-bottom: 20px; font-weight: bold; font-size: 10pt; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }

.seccion-firmas { margin-top: 40px; }
.atentamente { text-align: center; margin-bottom: 40px; font-size: 9pt; }

.firma-centro { width: 60%; margin: 0 auto 40px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; gap: 20px; }
.firma-bloque { width: 48%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>