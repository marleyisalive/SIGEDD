<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-izq">
         <img src="@/assets/header-documento.png" />
      </div>
      <div class="texto-derecha">
         <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
         <p>DIVISIÓN DE ESTUDIOS DE POSGRADO E INVESTIGACIÓN</p>
      </div>
    </header>

    <h2 class="titulo-doc">ACTA DE EXAMEN DE {{ datos.grado }}</h2>

    <div class="cuerpo-texto">
        <p>
            En la ciudad de Culiacán, Sinaloa, siendo las 10:00 horas del día <strong>{{ datos.fechaTexto }}</strong>, se reunieron en la Sala de Usos Múltiples del Instituto, los miembros del Jurado:
        </p>
        <ul class="lista-jurado">
            <li><strong>Presidente:</strong> {{ datos.presidente }}</li>
            <li><strong>Secretario:</strong> {{ datos.secretario }}</li>
            <li><strong>Vocal:</strong> {{ datos.vocal }}</li>
            <li v-if="datos.vocal2"><strong>Vocal Suplente:</strong> {{ datos.vocal2 }}</li>
            <li v-if="datos.vocal3"><strong>Vocal Suplente:</strong> {{ datos.vocal3 }}</li>
        </ul>
        <p>
            Bajo la presidencia del primero, para proceder a efectuar el Examen de Grado de:
        </p>
        <p class="nombre-tesista"><strong>{{ datos.tesista }}</strong></p>
        <p>
            Para obtener el Grado de <strong>{{ datos.grado }} EN CIENCIAS</strong> con la Tesis titulada:
        </p>
        <p class="titulo-tesis">"{{ datos.tituloTesis }}"</p>
        <br>
        <p>
            Interrogado el sustentante por los miembros del Jurado, se procedió a la deliberación y se le declaró: <strong>APROBADO</strong>.
        </p>
    </div>

    <div class="seccion-firmas">
        <p class="jurado-titulo">EL JURADO</p>
        
        <div class="firma-box">
            <div class="linea"></div>
            <p class="nombre">{{ datos.presidente }}</p>
            <p class="cargo">PRESIDENTE</p>
        </div>

        <div class="firmas-fila">
            <div class="firma-box">
                <div class="linea"></div>
                <p class="nombre">{{ datos.secretario }}</p>
                <p class="cargo">SECRETARIO</p>
            </div>
            <div class="firma-box">
                <div class="linea"></div>
                <p class="nombre">{{ datos.vocal }}</p>
                <p class="cargo">VOCAL</p>
            </div>
        </div>
        
        <div class="firmas-fila" v-if="datos.esDoctorado">
             <div class="firma-box">
                <div class="linea"></div>
                <p class="nombre">{{ datos.vocal2 }}</p>
                <p class="cargo">VOCAL</p>
            </div>
             <div class="firma-box">
                <div class="linea"></div>
                <p class="nombre">{{ datos.vocal3 }}</p>
                <p class="cargo">VOCAL</p>
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
  datos: { type: Object, required: true, default: () => ({}) }
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
  font-family: 'Times New Roman', serif; /* Fuente formal */
  font-size: 11pt;
  overflow: hidden;
  position: relative;
  display: block;
}

.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 30px; }
.logos-izq img { height: 70px; }
.texto-derecha { text-align: right; font-weight: bold; font-size: 10pt; width: 60%; }

.titulo-doc { text-align: center; font-weight: bold; font-size: 14pt; margin-bottom: 30px; text-decoration: underline; }

.cuerpo-texto { text-align: justify; line-height: 1.6; margin-bottom: 30px; }
.lista-jurado { list-style: none; margin: 15px 0 15px 40px; }
.nombre-tesista { text-align: center; font-size: 14pt; margin: 10px 0; text-transform: uppercase; }
.titulo-tesis { text-align: center; font-style: italic; font-weight: bold; margin: 10px 0; }

.seccion-firmas { text-align: center; margin-top: 20px; }
.jurado-titulo { font-weight: bold; margin-bottom: 30px; }

.firma-box { width: 300px; margin: 0 auto 30px auto; }
.firmas-fila { display: flex; justify-content: space-between; margin-bottom: 30px; }

.linea { border-top: 1px solid black; margin-bottom: 5px; }
.nombre { font-weight: bold; font-size: 10pt; }
.cargo { font-size: 8pt; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; }
.footer-logos img { width: 100%; }
</style>