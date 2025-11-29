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
            <p><strong>ASUNTO:</strong> Constancia de Participación en Auditoría.</p>
            <br>
            <p>Culiacán, Sinaloa, a {{ datos.fechaTexto }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>A QUIEN CORRESPONDA:</strong></p>
            <p>P R E S E N T E.</p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, docente adscrito(a) al Departamento de {{ datos.departamento }}, participó activamente en el proceso de auditoría del <strong>{{ datos.tipoAuditoria }}</strong>.
            </p>
            <br>
            <p>
                Desempeñando la función de:
            </p>
            
            <div class="funcion-resaltada">
                {{ datos.funcion }}
            </div>

            <div class="datos-evento">
                <p>
                    Llevada a cabo en las instalaciones de: <strong>{{ datos.lugar }}</strong>.
                </p>
                <p>
                    Durante el periodo: <strong>{{ datos.periodo }}</strong>.
                </p>
            </div>
            
            <br>
            <p>
                Se extiende la presente constancia para los fines que al interesado convengan.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firmas-grid">
                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaJefeDepto }}</p>
                    <p class="cargo">JEFE(A) DEL DEPARTAMENTO</p>
                </div>

                <div class="firma-box">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">SUBDIRECTOR(A) ACADÉMICO(A)</p>
                </div>
            </div>
        </div>

        <br>
        <br>
        <br>
        
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

.contenido-interno { 
    padding: 0 50px 50px 50px; 
    padding-bottom: 150px; 
}

.bloque-encabezado { text-align: right; font-size: 9pt; margin-bottom: 30px; }
.inst { font-weight: bold; font-size: 10pt; }

.destinatario { margin-bottom: 20px; font-weight: bold; font-size: 10pt; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }

.funcion-resaltada {
    text-align: center;
    font-weight: bold;
    font-size: 12pt;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 15px 0;
}

.datos-evento p { margin: 5px 0; }

/* FIRMAS */
.seccion-firmas { margin-top: 40px; }
.atentamente { text-align: center; margin-bottom: 50px; font-size: 9pt; }

.firmas-grid {
    display: flex;
    justify-content: space-between;
    gap: 20px;
}

.firma-box { width: 45%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>