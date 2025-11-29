<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
            <br>
            <p>Oficio No. <u>{{ datos.oficio }}</u></p>
            <p><strong>ASUNTO:</strong> Constancia de Desarrollo Curricular (Nivel {{ datos.nivelTexto }}).</p>
            <br>
            <p>Culiacán, Sinaloa, a {{ datos.fechaTexto }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>A QUIEN CORRESPONDA:</strong></p>
            <p>P R E S E N T E.</p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, docente adscrito(a) al Departamento de {{ datos.departamento }}, participó en la elaboración y/o seguimiento curricular del programa educativo:
            </p>
            
            <div class="programa-resaltado">
                “{{ datos.programa }}”
            </div>

            <p>
                Realizando la actividad de: <strong>{{ datos.actividad }}</strong>.
            </p>

            <p>
                Dicha participación se llevó a cabo durante el periodo: <strong>{{ datos.periodo }}</strong>.
            </p>
            
            <br>
            
            <p>
                Se extiende la presente constancia para los fines de acreditación en el Programa de Estímulos al Desempeño del Personal Docente en el rubro <strong>1.4.8.1</strong>.
            </p>
        </div>

        <div class="seccion-firma">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firma-centro">
                 <div class="linea"></div>
                 <p class="nombre">{{ datos.firmaNombre }}</p>
                 <p class="cargo">{{ datos.firmaCargo }}</p>
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

.destinatario { margin-bottom: 20px; font-weight: bold; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }

.programa-resaltado {
    text-align: center;
    font-weight: bold;
    font-size: 11pt;
    background-color: #f0f0f0;
    padding: 10px;
    margin: 15px 0;
    border: 1px dashed #ccc;
}

.seccion-firma { margin-top: 40px; text-align: center; }
.atentamente { margin-bottom: 60px; font-size: 9pt; text-align: left; }
.firma-centro { width: 60%; margin: 0 auto; }

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 10pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; font-weight: bold; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>