<template>
  <div class="hoja-carta">
    
    <header class="header-top">
        
        <div class="datos-superiores">
            <div class="fila-dato">
                <span class="label">DEPARTAMENTO DE:</span>
                <span class="valor-subrayado">{{ datos.departamento }}</span>
            </div>
            <div class="fila-dato derecha">
                <span class="valor-subrayado">{{ datos.lugarFecha }}</span>
                <div class="label-mini">(Lugar y Fecha)</div>
            </div>
        </div>
    </header>

    <div class="asunto">
        <p><strong>ASUNTO:</strong> CONSTANCIA DE LIBERACIÓN DE<br>ACTIVIDADES FRENTE A GRUPO</p>
    </div>

    <div class="destinatario">
        <p><strong>C. {{ datos.nombreDocente }}</strong></p>
        <p><strong>DOCENTE ADSCRITO AL DEPARTAMENTO DE <span class="subrayado">{{ datos.departamento }}</span></strong></p>
        <p><strong>P R E S E N T E</strong></p>
    </div>

    <div class="cuerpo-texto">
        <p>
            Por medio de la presente, se hace de su conocimiento que durante el Semestre <strong>{{ datos.semestre }}</strong>, se evaluó el cumplimiento de las siguientes actividades docentes:
        </p>
    </div>

    <table class="tabla-evaluacion">
        <thead>
            <tr>
                <th class="col-no">No.</th>
                <th class="col-actividad">ACTIVIDADES</th>
                <th class="col-check">SI</th>
                <th class="col-check">NO</th>
                <th class="col-check">N/A</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td class="center">1</td>
                <td>La elaboración y entrega de la dosificación de la planeación del curso y avance programático de las materias impartidas</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr>
                <td class="center">2</td>
                <td>La elaboración y entrega de la instrumentación didáctica</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr>
                <td class="center">3</td>
                <td>El 100% del contenido de los programas de estudio</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr>
                <td class="center">4</td>
                <td>La entrega en tiempo y forma de calificaciones parciales y finales</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr>
                <td class="center">5</td>
                <td>La entrega en tiempo y forma del reporte final</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr>
                <td class="center">6</td>
                <td>La entrega del informe de los proyectos individuales / Horas de apoyo a la docencia del programa de trabajo académico realizados en horas de apoyo a la docencia. (Cumplimiento de las actividades declaradas como apoyo a la docencia en el formato)</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr>
                <td class="center">7</td>
                <td>Entrega de índices de reprobación y deserción mensuales y finales.</td>
                <td class="center">X</td><td></td><td></td>
            </tr>
            <tr class="fila-final">
                <td colspan="2" class="text-right"><strong>Se otorga la liberación de actividades</strong></td>
                <td class="center"><strong>X</strong></td><td></td><td></td>
            </tr>
        </tbody>
    </table>

    <div class="conclusion">
        <p>
            En consecuencia, el (la) docente citada está <span class="estado-liberacion">{{ datos.estado }}</span> de sus actividades frente a grupo en este semestre.
        </p>
    </div>

    <div class="notas">
        <p><strong>Notas:</strong></p>
        <p>El punto 6 no aplicará en el caso de docentes con nombramiento por horas, indicar N/A.</p>
        <p>Si el docente cumplió con el 100% de los puntos 1 al 7 aplicables en su caso, se otorga la liberación de actividades.</p>
        <p>Lo anterior, según lo establecido en el Reglamento Interior de Trabajo del Personal Docente de los Institutos Tecnológicos vigente.</p>
    </div>

    <div class="seccion-firmas">
        <div class="firma-box">
            <div class="titulo-caja">JEFE DEL DEPARTAMENTO ACADÉMICO</div>
            <div class="espacio-firma"></div>
            <div class="pie-caja">{{ datos.firmaJefeDepto }}</div>
        </div>
        <div class="firma-box">
            <div class="titulo-caja">SUBDIRECCIÓN ACADÉMICA</div>
            <div class="espacio-firma"></div>
            <div class="pie-caja">{{ datos.firmaSubdirector }}</div>
        </div>
    </div>
    
    <div class="sello-texto">SELLO</div>

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
  font-size: 9pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header */
.header-top { display: flex; flex-direction: column; margin-bottom: 10px; }
.logo-izq img { height: 60px; margin-bottom: 10px; }

.datos-superiores { width: 100%; display: flex; flex-direction: column; align-items: flex-end; }
.fila-dato { margin-bottom: 5px; width: 60%; display: flex; align-items: flex-end; }
.fila-dato.derecha { justify-content: flex-end; flex-direction: column; align-items: flex-end; margin-top: 10px; }

.label { font-weight: bold; margin-right: 5px; white-space: nowrap; }
.valor-subrayado { border-bottom: 1px solid black; flex-grow: 1; text-align: center; width: 100%; }
.label-mini { font-size: 7pt; text-align: center; width: 100%; }

.asunto { text-align: right; margin-bottom: 20px; font-weight: bold; }

/* Destinatario */
.destinatario { margin-bottom: 15px; }
.subrayado { text-decoration: underline; }

.cuerpo-texto { margin-bottom: 10px; text-align: justify; }

/* Tabla */
.tabla-evaluacion { 
    width: 100%; border-collapse: collapse; font-size: 8pt; margin-bottom: 15px; 
}
.tabla-evaluacion th, .tabla-evaluacion td { border: 1px solid black; padding: 3px 5px; }
.tabla-evaluacion th { background-color: #f0f0f0; font-weight: bold; text-align: center; }

.col-no { width: 5%; }
.col-actividad { width: 65%; }
.col-check { width: 10%; }
.center { text-align: center; }
.text-right { text-align: right; padding-right: 10px; }

.fila-final td { background-color: #f9f9f9; }

/* Conclusión y Notas */
.conclusion { margin-bottom: 15px; }
.estado-liberacion { font-weight: bold; text-decoration: underline; margin: 0 5px; }

.notas { font-size: 7pt; text-align: justify; margin-bottom: 20px; }
.notas p { margin-bottom: 2px; }

/* Firmas (Estilo Caja como en la imagen) */
.seccion-firmas { display: flex; justify-content: space-between; margin-bottom: 20px; }
.firma-box { 
    width: 45%; 
    border: 1px solid #999; /* Borde punteado o gris */
    display: flex;
    flex-direction: column;
}
.titulo-caja { 
    background-color: #f0f0f0; 
    border-bottom: 1px solid #999; 
    text-align: center; 
    font-weight: bold; 
    padding: 3px;
    font-size: 7pt;
}
.espacio-firma { height: 40px; }
.pie-caja { 
    border-top: 1px dashed #999; 
    text-align: center; 
    padding: 3px; 
    font-size: 8pt;
    font-weight: bold;
}

.sello-texto { text-align: right; font-weight: bold; font-size: 8pt; margin-right: 20px; }

.footer-logos img { width: 100%; margin-top: 5px; }
</style>