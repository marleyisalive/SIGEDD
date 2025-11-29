<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-encabezado">
            <div class="inst-block">
                <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
                <p class="depto">DEPARTAMENTO DE SERVICIOS ESCOLARES</p>
            </div>
            <div class="datos-block">
                <p class="dato-linea">Oficio No. <u>{{ datos.oficio }}</u></p>
                <p class="dato-linea"><strong>ASUNTO:</strong> Constancia de participación como Sinodal.</p>
                <p class="dato-linea fecha">Culiacán, Sinaloa, a {{ datos.fechaTexto }}.</p>
            </div>
        </div>

        <div class="destinatario">
            <p><strong>A QUIEN CORRESPONDA:</strong></p>
            <p>P R E S E N T E.</p>
        </div>

        <div class="cuerpo-texto">
            <p>
                La que suscribe, Jefa del Departamento de Servicios Escolares del Instituto Tecnológico de Culiacán, hace constar que el (la) C.
            </p>
            
            <div class="nombre-resaltado">
                {{ datos.nombreDocente }}
            </div>

            <p>
                Participó como <strong>{{ datos.rol }}</strong> en el examen profesional/de grado para la obtención del título/grado de:
            </p>

            <div class="datos-examen">
                <p><strong>Nivel:</strong> {{ datos.nivelTexto }}</p>
                <p><strong>Programa:</strong> {{ datos.carrera }}</p>
                <p><strong>Sustentante:</strong> {{ datos.estudiante }}</p>
                <p><strong>Fecha del Examen:</strong> {{ datos.fechaExamen }}</p>
                <p><strong>Folio del Acta:</strong> {{ datos.folioActa }}</p>
            </div>
            
            <p class="parrafo-cierre">
                Se extiende la presente constancia para los fines administrativos del Programa de Estímulos al Desempeño del Personal Docente (SPD).
            </p>
        </div>

        <div class="seccion-firma">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firma-centro">
                 <div class="linea"></div>
                 <p class="nombre">{{ datos.firmaJefeEscolares }}</p>
                 <p class="cargo">JEFA DEL DEPTO. DE SERVICIOS ESCOLARES</p>
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
/* ESTRUCTURA PRINCIPAL */
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

.banner-superior { width: 100%; line-height: 0; margin-bottom: 10px; /* Reducido de 20 a 10 */ }
.banner-superior img { width: 100%; height: auto; }

/* PADDING INFERIOR AUMENTADO PARA SEGURIDAD */
.contenido-interno { 
    padding: 0 50px; 
    padding-bottom: 180px; /* Aumentado a 180px para asegurar espacio al footer */
}

/* ENCABEZADO COMPACTO */
.bloque-encabezado { text-align: right; font-size: 9pt; margin-bottom: 20px; }
.inst-block { margin-bottom: 8px; }
.inst { font-weight: bold; font-size: 10pt; margin: 0; }
.depto { font-weight: bold; font-size: 9pt; margin: 0; }
.datos-block { margin-top: 5px; }
.dato-linea { margin: 2px 0; /* Líneas muy juntas */ }
.fecha { margin-top: 5px; }

/* DESTINATARIO */
.destinatario { margin-bottom: 15px; font-weight: bold; font-size: 10pt; }

/* CUERPO COMPACTO */
.cuerpo-texto { text-align: justify; line-height: 1.4; margin-bottom: 20px; }

.nombre-resaltado {
    text-align: center;
    font-weight: bold;
    font-size: 12pt;
    border-bottom: 1px solid black;
    margin: 15px 0; /* Reducido */
    padding-bottom: 3px;
}

.datos-examen {
    margin: 15px 0; /* Reducido */
    padding: 10px;  /* Reducido */
    background-color: #f9f9f9;
    border: 1px dashed #ccc;
    font-size: 9.5pt;
}
.datos-examen p { margin: 3px 0; /* Líneas internas más juntas */ }
.parrafo-cierre { margin-top: 15px; }

/* FIRMA COMPACTA */
.seccion-firma { margin-top: 25px; /* Reducido drásticamente de 40 a 25 */ text-align: center; }
.atentamente { margin-bottom: 40px; /* Reducido de 50 a 40 */ font-size: 9pt; text-align: left; }
.firma-centro { width: 60%; margin: 0 auto; }
.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 10pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; font-weight: bold; }

/* FOOTER ABSOLUTO */
.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>