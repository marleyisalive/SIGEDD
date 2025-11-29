<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
            <p>DEPARTAMENTO DE DESARROLLO ACADÉMICO</p>
            <p>Oficio No. {{ datos.oficio }}</p>
        </div>

        <div class="asunto">
            <p><strong>ASUNTO:</strong> Comisión para participación como Instructor/Facilitador en curso de la DDIE.</p>
        </div>

        <div class="destinatario">
            <p><strong>C. {{ datos.nombreDocente }}</strong></p>
            <p>Profesor(a) de Tiempo Completo adscrito(a) al {{ datos.departamento }}.</p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio del presente, comunico a usted que, con base en el acuerdo de colaboración con la Dirección de Docencia e Innovación Educativa (DDIE) del Tecnológico Nacional de México, se le ha comisionado para participar como Instructor(a)/Facilitador(a) en el:
            </p>
            
            <div class="curso-resaltado">
                “{{ datos.nombreCurso }}”
            </div>

            <p>
                Dicha comisión se llevará a cabo a distancia/en línea durante el periodo comprendido del <strong>{{ datos.fechaInicio }}</strong> al <strong>{{ datos.fechaFin }}</strong>.
            </p>
            <br>
            <p>
                Su participación es invaluable y contribuye al cumplimiento de los objetivos institucionales y al Programa de Estímulos al Desempeño del Personal Docente (SPD) en la actividad <strong>1.2.2.7</strong>.
            </p>
        </div>

        <div class="seccion-firma">
            <p class="atentamente">Atentamente, Excelencia en Educación Tecnológica®</p>

            <div class="firma-bloque">
                 <div class="linea"></div>
                 <p class="nombre">{{ datos.nombreJefeDDA }}</p>
                 <p class="cargo">Jefe(a) del Departamento de Desarrollo Académico</p>
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
  padding: 0; /* Sin padding general para que el banner toque bordes */
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 11pt;
  overflow: hidden;
  position: relative;
  display: block;
}

.banner-superior {
    width: 100%;
    line-height: 0;
    margin-bottom: 20px;
}
.banner-superior img {
    width: 100%;
    height: auto;
}

.contenido-interno {
    padding: 0 40px 40px 40px;
    padding-bottom: 80px; /* Espacio para footer */
}

.bloque-encabezado {
    text-align: right;
    font-size: 10pt;
    font-weight: bold;
    margin-bottom: 20px;
}
.inst { font-size: 11pt; margin-bottom: 5px; }

.asunto { text-align: right; margin-bottom: 30px; font-size: 10pt; }

.destinatario { margin-bottom: 20px; font-size: 11pt; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 30px; }
.curso-resaltado { 
    text-align: center; 
    font-weight: bold; 
    margin: 15px 0; 
    font-size: 11pt; 
    padding: 0 20px;
}

.seccion-firma { margin-top: 40px; }
.atentamente { margin-bottom: 60px; font-size: 10pt; }

.firma-bloque { width: 350px; text-align: left; }
.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 10pt; }
.cargo { font-size: 10pt; }

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