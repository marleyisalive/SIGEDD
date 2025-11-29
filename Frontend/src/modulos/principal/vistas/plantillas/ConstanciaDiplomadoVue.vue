<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-izq">
         <img src="@/assets/header-documento.png" class="logos-header" />
      </div>
      <div class="texto-der">
         <p>TECNOLÓGICO NACIONAL DE MÉXICO</p>
         <p class="sub-header">DIRECCIÓN DE DOCENCIA E INNOVACIÓN EDUCATIVA</p>
         <p class="folio">FOLIO: {{ datos.folio }}</p>
      </div>
    </header>

    <h2 class="titulo-doc">C O N S T A N C I A</h2>

    <div class="cuerpo-texto">
        <p>
            La Dirección de Docencia e Innovación Educativa del Tecnológico Nacional de México, otorga la presente constancia a:
        </p>
        
        <p class="nombre-docente">C. {{ datos.nombreDocente }}</p>

        <p class="justificado">
            Por su valiosa participación como Instructor(a)/Facilitador(a) en el <strong>{{ datos.diplomado }}</strong>, con una duración total de {{ datos.duracion }} horas, impartido en la modalidad a distancia/en línea.
        </p>

        <p class="justificado">
            El diplomado fue impartido satisfactoriamente durante el periodo comprendido de {{ datos.periodoImparticion }}.
        </p>

        <p class="justificado">
            Esta actividad contribuye al cumplimiento de los objetivos del Programa Institucional del TecNM y al desarrollo profesional docente, siendo comprobable en el Programa de Estímulos al Desempeño del Personal Docente (SPD) en el rubro 1.2.2.4.
        </p>

        <br>

        <p class="justificado">
            Se extiende la presente en la Ciudad de México, a los {{ datos.dia }} días del mes de {{ datos.mes }} del año {{ datos.anio }}.
        </p>
    </div>

    <div class="seccion-firma">
        <p class="atentamente">Atentamente,<br>
        <i>Excelencia en Educación Tecnológica®</i></p>

        <div class="firma-bloque">
             <div class="linea"></div>
             <p class="nombre">{{ datos.nombreDirector }}</p>
             <p class="cargo">Director(a) de Docencia e Innovación Educativa Tecnológico Nacional de México</p>
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
  padding: 40px 50px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 11pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header */
.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
.logos-izq img { height: 120px; } /* Ajustar altura según imagen */

.texto-der { 
    text-align: right; 
    font-size: 9pt; 
    font-weight: bold; 
    width: 60%;
}
.sub-header { margin-bottom: 10px; }
.folio { font-size: 10pt; }

/* Título */
.titulo-doc { 
    text-align: center; 
    font-size: 14pt; 
    margin-bottom: 30px; 
    letter-spacing: 5px; /* Efecto C O N S T A N C I A */
    font-weight: normal;
}

/* Cuerpo */
.cuerpo-texto { margin-bottom: 20px; }
.nombre-docente { 
    text-align: center; 
    font-weight: bold; 
    font-size: 12pt; 
    margin: 20px 0; 
}
.justificado { 
    text-align: justify; 
    line-height: 1.5; 
    margin-bottom: 15px; 
}

/* Firma */
.seccion-firma { margin-top: auto; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
.atentamente { margin-bottom: 60px; font-size: 10pt; }

.firma-bloque { width: 80%; margin: 0 auto; text-align: left; } /* Alineado a la izquierda según la línea de firma, o centrado si prefieres */
.linea { border-top: 1px solid black; margin-bottom: 5px; width: 300px; } /* Línea corta para firma */
.nombre { font-weight: bold; font-size: 10pt; }
.cargo { font-size: 9pt; }

.footer-logos img { width: 100%; margin-top: 10px; }
</style>