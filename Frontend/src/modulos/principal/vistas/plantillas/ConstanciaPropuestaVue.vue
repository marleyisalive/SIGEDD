<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="bloque-oficio">
          <p class="inst">Instituto Tecnológico de Culiacán</p>
          <br>
          <p>DEPARTAMENTO DE RECURSOS HUMANOS</p>
          <p>OFICINA DE PERSONAL</p>
          <p>Oficio No. {{ datos.oficio }}</p>
          <p><strong>ASUNTO:</strong> Comisión Académica.</p>
        </div>

        <div class="fecha-linea">
            <p>Culiacán, Sinaloa, a {{ datos.fechaHeader }}.</p>
        </div>

        <div class="destinatario">
            <p><strong>{{ datos.nombreDocente }}</strong></p>
            <p class="cargo-docente">DOCENTE DEL {{ datos.departamento }}</p>
            <p><strong>P R E S E N T E.</strong></p>
        </div>

        <div class="cuerpo-texto">
            <p>
                Por medio del presente, y con fundamento en la normatividad vigente del Tecnológico Nacional de México, me permito informarle que ha sido usted comisionado(a) para participar en el proyecto académico institucional denominado:
            </p>
            
            <div class="proyecto-resaltado">
                “{{ datos.nombreProyecto }}”
            </div>

            <p>
                Dicha comisión tendrá vigencia durante el periodo comprendido del <strong>{{ datos.fechaInicio }}</strong> al <strong>{{ datos.fechaFin }}</strong>. Durante este tiempo, deberá colaborar en {{ datos.actividades }}, bajo la coordinación de la Subdirección Académica.
            </p>
            <br>
            <p>
                Agradeciendo de antemano su valiosa colaboración para el fortalecimiento de nuestra oferta educativa, quedo de usted.
            </p>
        </div>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

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
/* CONTENEDOR PRINCIPAL */
.hoja-carta {
  width: 100%;
  max-height: 278mm; /* Altura fija carta */
  background: white;
  color: #000;
  
  /* IMPORTANTE: Quitamos el padding general */
  padding: 0; 
  
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative; /* Necesario para posicionar el footer absoluto */
  display: block; /* Cambiamos flex por block para mejor control manual */
}

/* BANNER SUPERIOR */
.banner-superior {
    width: 100%;
    line-height: 0; /* Elimina espacios fantasma */
}
.banner-superior img {
    width: 100%;
    height: auto;
}

/* CONTENIDO INTERNO (Aquí aplicamos los márgenes del texto) */
.contenido-interno {
    padding: 20px 40px; /* Margen lateral para el texto */
    /* Esto asegura que el contenido no se encime al footer */
    padding-bottom: 80px; 
}

/* DATOS OFICIO */
.bloque-oficio {
    text-align: right;
    font-size: 9pt;
    font-weight: bold;
    margin-bottom: 20px;
    margin-left: auto;
    width: 60%;
}
.inst { font-size: 10pt; margin-bottom: 10px; }

/* RESTO DEL TEXTO */
.fecha-linea { font-weight: bold; margin-bottom: 20px; }
.destinatario { margin-bottom: 20px; }
.cargo-docente { font-weight: bold; margin-bottom: 5px; }

.cuerpo-texto { 
    text-align: justify; 
    line-height: 1.5; 
    margin-bottom: 10px; 
}

.proyecto-resaltado {
    text-align: center;
    font-weight: bold;
    margin: 15px 0;
    padding: 0 20px;
    font-size: 11pt;
}

/* FIRMAS */
.seccion-firmas { 
    margin-top: 30px; 
}
.atentamente { text-align: left; margin-bottom: 40px; font-size: 9pt; }

.firma-centro { width: 60%; margin: 0 auto 40px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; gap: 20px; }
.firma-bloque { width: 48%; text-align: center; }

.linea { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

/* FOOTER ABSOLUTO */
.footer-logos {
    position: absolute; /* Clavado al fondo */
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 0;
    z-index: 10;
}
.footer-logos img { width: 100%; }
</style>