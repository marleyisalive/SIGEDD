<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
            <p class="depto">DEPARTAMENTO DE {{ datos.departamento }}</p>
            <br>
            <p>Oficio No. <u>{{ datos.oficio }}</u></p>
            <p><strong>ASUNTO:</strong> Constancia de Diseño de Especialidad.</p>
            <br>
            <p>Culiacán, Sinaloa, a {{ datos.fechaTexto }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>A QUIEN CORRESPONDA:</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, docente adscrito(a) al Departamento de {{ datos.departamento }}, participó activamente en el diseño y elaboración del módulo de especialidad denominado:
            </p>
            
            <div class="modulo-resaltado">
                “{{ datos.nombreModulo }}”
            </div>

            <p>
                Para el programa educativo de <strong>{{ datos.carrera }}</strong>, trabajos realizados durante el periodo <strong>{{ datos.periodo }}</strong>.
            </p>
            <br>
            <p>
                Dicho módulo cuenta con el registro oficial emitido por la Dirección de Docencia e Innovación Educativa del TecNM y se encuentra vigente en la retícula escolar.
            </p>
            <br>
            <p>
                Se extiende la presente constancia para los fines de acreditación en el Programa de Estímulos al Desempeño del Personal Docente.
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
            
            <div class="vobo-container">
                <p>Vo. Bo.</p>
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

.bloque-encabezado { text-align: right; font-size: 9pt; margin-bottom: 30px; }
.inst { font-weight: bold; font-size: 10pt; }
.depto { font-weight: bold; text-transform: uppercase; }

.destinatario { margin-bottom: 20px; font-weight: bold; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }

.modulo-resaltado {
    text-align: center;
    font-weight: bold;
    font-size: 11pt;
    margin: 20px 0;
    padding: 10px;
    background-color: #f9f9f9;
    border: 1px dashed #ccc;
}

.seccion-firmas { margin-top: 30px; }
.atentamente { text-align: center; margin-bottom: 50px; font-size: 9pt; }

.firmas-grid { display: flex; justify-content: space-between; gap: 20px; }
.firma-box { width: 45%; text-align: center; }

.vobo-container { text-align: center; margin-top: 10px; font-weight: bold; font-size: 9pt; }

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; font-weight: bold; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>