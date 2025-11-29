<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-izquierda">
         <img src="@/assets/header-documento.png" class="logo-sep-tecnm" />
      </div>
      <div class="columna-derecha">
        <div class="top-inst">
            <p class="inst-nombre">Instituto Tecnológico de Culiacán</p>
        </div>
        <div class="bottom-datos">
            <p>Culiacán, Sinaloa, <span class="fecha-box">{{ datos.fechaHeader }}</span></p>
            <p>OFICIO No.: {{ datos.numOficio }}</p>
            <p><strong>ASUNTO:</strong> Constancia.</p>
        </div>
      </div>
    </header>

    <div class="destinatario">
        <p><strong>COMISIÓN DE EVALUACIÓN DEL<br>
        PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE<br>
        PARA LOS INSTITUTOS TECNOLÓGICOS FEDERALES Y CENTROS.<br>
        PRESENTE.</strong></p>
    </div>

    <div class="cuerpo-texto">
        <p>
            Por medio de este presente se hace constar que el C. <strong>{{ datos.nombreDocente }}</strong> implementó estrategias didácticas innovadoras en el aula por asignatura:
        </p>

        <table class="tabla-estrategia">
            <thead>
                <tr>
                    <th>Asignatura</th>
                    <th>Estrategia</th>
                    <th>Programa educativo</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{{ datos.asignatura }}</td>
                    <td>{{ datos.estrategia }}</td>
                    <td>{{ datos.programaEducativo }}</td>
                </tr>
            </tbody>
        </table>

        <p>
            El producto obtenido es un <strong>{{ datos.producto }}</strong>. Con la implementación de la misma, permitió a los estudiantes participar de manera activa en su aprendizaje al analizar, diseñar, planificar y evaluar sus capacidades en un contexto real, impactando positivamente en su conocimiento y desarrollo de sus habilidades <strong>{{ datos.habilidades }}</strong>.
        </p>
        <p>Las estrategias mencionadas cuentan con la rúbrica de evaluación correspondiente.</p>
        <br>
        <p>
            Se extiende la presente en la ciudad de Culiacán, Sinaloa, a los {{ datos.fechaTexto }}.
        </p>
    </div>

    <div class="seccion-firmas">
        <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
        <i>Excelencia en Educación Tecnológica ®</i></p>

        <div class="firma-centro">
             <div class="linea"></div>
             <p class="nombre">{{ datos.firmaJefeDepto }}</p>
             <p class="cargo">JEFA DEL DEPTO. SISTEMAS Y COMPUTACIÓN</p>
        </div>

        <div class="firmas-inferiores">
            <div class="firma-bloque">
                <div class="linea"></div>
                <p class="nombre">{{ datos.firmaPdteAcademia }}</p>
                <p class="cargo">PRESIDENTA DE ACADEMIA DE ING. EN SISTEMAS<br>COMPUTACIONALES</p>
            </div>
            <div class="firma-bloque">
                <div class="linea"></div>
                <p class="nombre">{{ datos.firmaSubdirector }}</p>
                <p class="cargo">RESPONSABLE DEL DESPACHO DE LA<br>SUBDIRECCIÓN ACADÉMICA</p>
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
  padding: 30px 40px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header (Igual que el anterior) */
.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 20px; }
.logos-izquierda img { height: 120px; object-fit: contain; }
.columna-derecha { display: flex; flex-direction: column; justify-content: space-between; text-align: right; height: 120px; font-size: 9pt; }
.inst-nombre { font-weight: bold; font-size: 10pt; }
.bottom-datos p { margin: 2px 0; }
.fecha-box { background-color: black; color: white; padding: 0 4px; font-weight: bold; }

/* Cuerpo */
.destinatario { font-weight: bold; margin-bottom: 15px; font-size: 10pt; }
.cuerpo-texto { text-align: justify; line-height: 1.4; margin-bottom: 15px; }

/* Tabla */
.tabla-estrategia {
    width: 100%;
    border-collapse: collapse;
    margin: 15px 0;
    font-size: 9pt;
}
.tabla-estrategia th, .tabla-estrategia td {
    border: 1px solid black;
    padding: 5px;
    text-align: left;
    vertical-align: top;
}
.tabla-estrategia th {
    font-weight: bold;
    background-color: #f0f0f0; /* Opcional: fondo gris claro en encabezado */
}

/* Firmas */
.seccion-firmas { margin-top: auto; flex-grow: 1; display: flex; flex-direction: column; justify-content: center; }
.atentamente { text-align: center; margin-bottom: 30px; font-size: 9pt; }
.firma-centro { width: 60%; margin: 0 auto 50px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; gap: 20px; }
.firma-bloque { width: 48%; text-align: center; }
.linea { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

.footer-logos img { width: 100%; margin-top: 10px; }
</style>