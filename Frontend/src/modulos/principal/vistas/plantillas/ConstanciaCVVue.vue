<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-izq">
         <img src="@/assets/header-documento.png" class="img-header" />
      </div>
      
      <div class="texto-derecha">
         <div class="bloque-fecha">
            <span class="ciudad">Culiacán, Sinaloa, </span>
            <span class="fecha-negra">{{ datos.fechaHeader }}</span>
         </div>
         
         <div class="bloque-datos-oficio">
             <p class="depto">DEPTO. DE DESARROLLO ACADÉMICO</p>
             <p class="oficio">Núm. de Oficio: <strong>{{ datos.oficio }}</strong></p>
         </div>
      </div>
    </header>

    <div class="destinatario">
        <p><strong>H. COMISION DICTAMINADORA DEL EDD</strong></p>
        <p><strong>PRESENTE</strong></p>
    </div>

    <div class="intro-texto">
        <p>
            La que suscribe <strong>{{ datos.nombreJefeDDA }}</strong>, jefa del Departamento de Desarrollo Académico del Instituto Tecnológico de Culiacán.
        </p>
    </div>

    <div class="hace-constar">
        <p><strong>HACE CONSTAR</strong></p>
    </div>

    <div class="cuerpo-texto">
        <p>
            Que el (la) <strong>C. {{ datos.nombreDocente }}</strong> cuenta con el registro <strong>{{ datos.registro }}</strong>, así como la actualización de su Currículum Vitae (CVU-TecNM) en el portal <u>https://cvu.dpii.tecnm.mx</u> correspondiente al año <strong>{{ datos.anio }}</strong>, entregando en formato electrónico su CVU en extenso al Departamento de Desarrollo Académico.
        </p>
        <br>
        <p>
            A solicitud del interesado y para los fines que al mismo convenga se extiende la presente a los {{ datos.fechaTexto }}.
        </p>
    </div>

    <div class="seccion-firma">
        <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
        <i>Excelencia en Educación Tecnológica®</i></p>

        <div class="firma-bloque">
             <div class="linea"></div> <p class="nombre">{{ datos.nombreJefeDDA }}</p>
             <p class="cargo">JEFA DEL DEPTO. DE DESARROLLO ACADÉMICO</p>
        </div>
    </div>

    <div class="ccp">
        <p>C.c.p.- Archivo</p>
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
  color: #000; /* Texto negro forzado */
  padding: 40px 50px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* HEADER ARREGLADO */
.header-top { 
    display: flex; 
    justify-content: space-between; 
    align-items: flex-start; 
    margin-bottom: 40px; 
}
.logos-izq .img-header { height: 100px; }

.texto-derecha { 
    text-align: right; 
    font-size: 9pt; 
    /* Aseguramos que tenga espacio suficiente */
    width: 55%; 
    display: flex;
    flex-direction: column;
    align-items: flex-end; /* Alinea todo a la derecha */
}

.bloque-fecha {
    margin-bottom: 10px;
    /* Esto asegura que "Culiacán..." y la fecha estén en la misma línea */
    white-space: nowrap; 
}

.fecha-negra { 
    background-color: black; 
    color: white; 
    padding: 2px 5px; 
    font-weight: bold; 
    margin-left: 5px;
    display: inline-block;
}

.depto { margin-bottom: 2px; font-weight: bold; }
.oficio { font-weight: bold; }

/* CUERPO */
.destinatario { margin-bottom: 30px; font-size: 10pt; }
.intro-texto { margin-bottom: 20px; text-align: justify; }

.hace-constar { 
    text-align: center; 
    margin: 30px 0; 
    letter-spacing: 1px; 
    font-size: 11pt;
}

.cuerpo-texto { 
    text-align: justify; 
    line-height: 1.5; 
    margin-bottom: 20px; 
}

/* FIRMA */
.seccion-firma { margin-top: auto; flex-grow: 1; text-align: left; }
.atentamente { margin-bottom: 50px; font-size: 9pt; }

.firma-bloque { margin-bottom: 30px; width: 300px; }
.linea { border-top: 1px solid black; margin-bottom: 5px; } /* Línea visual de firma */
.nombre { font-weight: bold; font-size: 10pt; text-transform: uppercase; }
.cargo { font-size: 9pt; }

.ccp { font-size: 7pt; margin-bottom: 10px; }

.footer-logos img { width: 100%; margin-top: 5px; }
</style>