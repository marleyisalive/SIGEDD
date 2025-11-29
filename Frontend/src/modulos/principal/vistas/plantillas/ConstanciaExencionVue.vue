<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logo-izq">
         <img src="@/assets/tecnm-logo.png" /> </div>
      <div class="texto-der">
         <p class="inst">INSTITUTO TECNOLÓGICO<br>DE CULIACÁN</p>
         <p class="folio">002</p> </div>
    </header>

    <h2 class="titulo-doc">{{ datos.tituloDocumento || "CONSTANCIA DE EXAMEN PROFESIONAL" }}</h2>

    <div class="cuerpo-texto">
        <p class="justificado">
            De acuerdo con el instructivo vigente de Titulación, que no tiene como requisito la sustentación del Examen Profesional para efectos de obtención de Título, en las opciones VIII, IX y Titulación Integral, el jurado HACE CONSTAR que el (la) C. 
            <span class="campo-linea ancho-nombre">{{ datos.nombreEstudiante }}</span> número de control 
            <span class="campo-linea ancho-control">{{ datos.numControl }}</span> egresado (a) del Instituto Tecnológico de 
            <span class="campo-linea ancho-inst">Culiacán</span>, clave 
            <span class="campo-linea ancho-clave">25DIT00021</span>, que cursó la carrera de 
            <span class="campo-linea ancho-carrera">{{ datos.carrera }}</span>
        </p>

        <div class="bloque-opcion">
            <p>Cumplió satisfactoriamente con lo estipulado en la opción:</p>
            <div class="campo-linea-bloque">
                {{ datos.opcionTitulacion }}
            </div>
            <div class="linea-extra"></div>
            <div class="linea-extra"></div>
        </div>

        <p class="justificado">
            El (la) Presidente (a) del Jurado le hizo saber al sustentante el código de Ética Profesional y le tomó la Protesta de Ley, una vez escrita y leída la firmaron las personas que en el acto protocolario intervinieron, para los efectos legales a que haya lugar, se asienta la presente en la ciudad de Culiacán, Sinaloa, el día 
            <span class="campo-linea ancho-dia">{{ datos.dia }}</span> del mes de 
            <span class="campo-linea ancho-mes">{{ datos.mes }}</span> del año 
            <span class="campo-linea ancho-anio">{{ datos.anio }}</span>.
        </p>
    </div>

    <div class="seccion-firmas">
        
        <div class="firma-centro">
             <p class="cargo">PRESIDENTE (A)</p>
             <div class="espacio-firma"></div>
             <div class="linea-firma"></div>
             <p class="nombre">{{ datos.presidente }}</p>
             <p class="cedula">Cedula Prof. <span class="num-cedula">{{ datos.cedulaPresidente }}</span></p>
        </div>

        <div class="firmas-inferiores">
            <div class="firma-bloque">
                <p class="cargo">SECRETARIO (A)</p>
                <div class="espacio-firma"></div>
                <div class="linea-firma"></div>
                <p class="nombre">{{ datos.secretario }}</p>
                <p class="cedula">Cedula Prof. <span class="num-cedula">{{ datos.cedulaSecretario }}</span></p>
            </div>
            <div class="firma-bloque">
                <p class="cargo">VOCAL</p>
                <div class="espacio-firma"></div>
                <div class="linea-firma"></div>
                <p class="nombre">{{ datos.vocal }}</p>
                <p class="cedula">Cedula Prof. <span class="num-cedula">{{ datos.cedulaVocal }}</span></p>
            </div>
        </div>
    </div>

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
.header-top { display: flex; justify-content: space-between; margin-bottom: 40px; }
.logo-izq img { height: 80px; }
.texto-der { text-align: right; font-weight: bold; font-size: 12pt; }
.folio { font-size: 14pt; margin-top: 5px; }

.titulo-doc { text-align: center; font-weight: bold; font-size: 12pt; margin-bottom: 30px; }

/* Cuerpo y Líneas */
.justificado { text-align: justify; line-height: 1.8; margin-bottom: 20px; }

/* Clase mágica para las líneas subrayadas */
.campo-linea {
    display: inline-block;
    border-bottom: 1px solid black;
    text-align: center;
    padding: 0 5px;
    font-weight: bold; /* O manuscrita si quisieras */
}

/* Anchos específicos para que se vea ordenado */
.ancho-nombre { width: 350px; }
.ancho-control { width: 100px; }
.ancho-inst { width: 150px; }
.ancho-clave { width: 120px; }
.ancho-carrera { width: 100%; display: block; margin-top: 5px; }

.ancho-dia { width: 50px; }
.ancho-mes { width: 100px; }
.ancho-anio { width: 60px; }

/* Bloque de Opción de Titulación */
.bloque-opcion { margin: 20px 0; }
.campo-linea-bloque {
    width: 100%;
    border-bottom: 1px solid black;
    min-height: 25px;
    font-weight: bold;
    padding-top: 5px;
}
.linea-extra {
    width: 100%;
    border-bottom: 1px solid black;
    height: 25px; /* Altura de renglón vacío */
}

/* Firmas */
.seccion-firmas { margin-top: auto; padding-bottom: 20px; }
.firma-centro { width: 300px; margin: 0 auto 50px auto; text-align: center; }
.firmas-inferiores { display: flex; justify-content: space-between; }
.firma-bloque { width: 300px; text-align: center; }

.cargo { font-weight: bold; font-size: 10pt; margin-bottom: 40px; } /* Espacio para firmar */
.espacio-firma { height: 10px; }
.linea-firma { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-size: 10pt; }
.cedula { font-size: 9pt; }
.num-cedula { text-decoration: underline; margin-left: 5px; }

</style>