<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <div class="institucion-bloque">
                <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
                <p class="depto">DIRECCIÓN DEL INSTITUTO</p>
                <p class="depto">SUBDIRECCIÓN ACADÉMICA</p>
            </div>
            
            <div class="datos-bloque">
                <p class="dato-linea">Oficio No. <u>{{ datos.oficio }}</u></p>
                <p class="dato-linea"><strong>ASUNTO:</strong> Constancia de Participación en Comités de Evaluación.</p>
                <p class="dato-linea fecha">Culiacán, Sinaloa, a {{ datos.fechaTexto }}.</p>
            </div>
        </div>

        <div class="destinatario">
            <p><strong>A QUIEN CORRESPONDA:</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                El/la que suscribe, <strong>{{ datos.firmaDirector }}</strong>, Director/a del Instituto Tecnológico de Culiacán, por medio de la presente,
            </p>
            <p class="hace-constar">H A C E   C O N S T A R</p>
            <p>
                Que el (la) docente, <strong>{{ datos.nombreDocente }}</strong>,  adscrito(a) al Departamento de {{ datos.departamento }}, participó activamente como integrante de diversos <strong>COMITÉS DE EVALUACIÓN Y/O ACREDITACIÓN</strong> durante el periodo <strong>{{ datos.periodo }}</strong>, desempeñando funciones de arbitraje y dictaminación técnica en los niveles que se detallan a continuación:
            </p>
        </div>

        <table class="tabla-evaluaciones">
            <thead>
                <tr>
                    <th style="width: 15%">NIVEL</th>
                    <th style="width: 25%">ORGANISMO / EVENTO</th>
                    <th style="width: 45%">ACTIVIDAD REALIZADA</th>
                    <th style="width: 15%">FECHAS</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in datos.evaluaciones" :key="index">
                    <td class="negrita">{{ item.nivel }}</td>
                    <td class="negrita">{{ item.organismo }}</td>
                    <td class="texto-peque">{{ item.actividad }}</td>
                    <td class="center negrita">{{ item.fechas }}</td>
                </tr>
                <tr v-if="datos.evaluaciones.length === 0">
                    <td colspan="4" class="center">No hay registros.</td>
                </tr>
            </tbody>
        </table>

        <div class="cuerpo-texto">
            <p class="parrafo-cierre">
                El (la) profesor(a) cumplió cabalmente con los criterios de objetividad, confidencialidad y rigor académico exigidos por dichos organismos, contribuyendo al prestigio y reconocimiento de nuestra institución en los ámbitos mencionados.
            </p>
            <p>
                Se extiende la presente constancia para los fines de acreditación en el Programa de Estímulos al Desempeño del Personal Docente.
            </p>
        </div>

        <div class="seccion-firma">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firma-centro">
                 <div class="linea"></div>
                 <p class="nombre">{{ datos.firmaDirector }}</p>
                 <p class="cargo">DIRECTOR/A DEL INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
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
  datos: { type: Object, required: true, default: () => ({ evaluaciones: [] }) }
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

.banner-superior { width: 100%; line-height: 0; margin-bottom: 10px; }
.banner-superior img { width: 100%; height: auto; }

.contenido-interno { 
    padding: 0 50px; 
    padding-bottom: 160px; /* Espacio seguro para el footer */
}

/* ENCABEZADO COMPACTO */
.bloque-encabezado {
    text-align: right;
    margin-bottom: 20px;
}

.institucion-bloque {
    margin-bottom: 8px;
}
.inst { font-weight: bold; font-size: 9pt; margin: 0; }
.depto { font-weight: bold; font-size: 8pt; margin: 0; }

.datos-bloque {
    margin-top: 5px;
}
.dato-linea { 
    margin: 2px 0; /* Muy poco espacio entre líneas */
    font-size: 9pt;
}
.fecha { margin-top: 5px; }

/* CUERPO */
.destinatario { margin-bottom: 15px; font-weight: bold; font-size: 10pt; }

.hace-constar { 
    font-weight: bold; 
    letter-spacing: 3px; 
    margin: 10px 0; 
    text-align: center; 
    font-size: 11pt;
}
.cuerpo-texto { text-align: justify; line-height: 1.3; margin-bottom: 15px; }
.parrafo-cierre { margin-bottom: 5px; }

/* TABLA COMPACTA */
.tabla-evaluaciones { width: 100%; border-collapse: collapse; font-size: 8pt; margin-bottom: 15px; }
.tabla-evaluaciones th, .tabla-evaluaciones td { border: 1px solid black; padding: 4px; vertical-align: middle; }
.tabla-evaluaciones th { background-color: #eee; text-align: left; font-weight: bold; }
.negrita { font-weight: bold; }
.center { text-align: center; }
.texto-peque { font-size: 7.5pt; } /* Texto un poco más chico para que quepa más info */

/* FIRMA */
.seccion-firma { margin-top: 20px; text-align: center; }
.atentamente { margin-bottom: 40px; font-size: 9pt; text-align: left; } /* Menos espacio antes de la firma */
.firma-centro { width: 70%; margin: 0 auto; }
.linea { border-top: 1px solid black; margin-bottom: 3px; width: 100%; }
.nombre { font-weight: bold; font-size: 10pt; margin-bottom: 1px; }
.cargo { font-size: 8pt; font-weight: bold; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>