<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-oficio">
            <p class="inst">Instituto Tecnológico de Culiacán</p>
            <p class="depto">DEPARTAMENTO DE RECURSOS HUMANOS</p>
            <br>
            <p>Oficio No. <u>{{ datos.oficio }}</u></p>
            <p><strong>ASUNTO:</strong> Licencia por Gravidez.</p>
            <br>
            <p>Culiacán, Sinaloa, a {{ datos.fechaHeader }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>C. {{ datos.nombreDocente }}</strong></p>
            <p class="cargo-docente">DOCENTE DEL {{ datos.departamento }}</p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio del presente se hace de su conocimiento que, de acuerdo con la constancia de incapacidad expedida por el ISSSTE y conforme a lo establecido en la Ley Federal de los Trabajadores al Servicio del Estado, se le concede <strong>LICENCIA POR GRAVIDEZ</strong> con goce de sueldo íntegro.
            </p>
            <br>
            <p>
                Dicha licencia comprende un periodo de 90 días naturales, iniciando el <strong>{{ datos.fechaInicio }}</strong> y concluyendo el <strong>{{ datos.fechaFin }}</strong>.
            </p>
            <br>
            <p>
                Al término de este periodo, deberá reincorporarse a sus labores académicas y administrativas habituales en esta institución.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firmas-grid">
                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaJefeRH }}</p>
                    <p class="cargo">JEFE(A) DEL DEPTO. DE RECURSOS HUMANOS</p>
                </div>

                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaDirector }}</p>
                    <p class="cargo">DIRECTOR(A) DEL INSTITUTO TECNOLÓGICO</p>
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

.banner-superior { width: 100%; line-height: 0; margin-bottom: 20px; }
.banner-superior img { width: 100%; height: auto; }

.contenido-interno { padding: 0 50px 50px 50px; padding-bottom: 150px; }

.bloque-oficio {
    text-align: right;
    font-size: 9pt;
    margin-bottom: 30px;
}
.inst { font-weight: bold; font-size: 10pt; }
.depto { font-weight: bold; }

.destinatario { margin-bottom: 20px; font-weight: bold; font-size: 10pt; }
.cargo-docente { font-weight: bold; margin-bottom: 5px; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 40px; }

.seccion-firmas { margin-top: 40px; }
.atentamente { text-align: left; margin-bottom: 50px; font-size: 9pt; }

.firmas-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}
.firma-box { width: 45%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; font-weight: bold; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>