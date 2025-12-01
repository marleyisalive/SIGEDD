<template>
  <div class="hoja-carta">
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
      <div class="bloque-encabezado">
        <p class="inst">Instituto Tecnológico de Culiacán</p>
        <br />
        <p class="depto">Depto. de Servicios Escolares</p>
        <p class="asunto"><strong>Asunto:</strong> Constancia.</p>
      </div>

      <div class="destinatario">
        <p>
          <strong
            >COMISIÓN DE EVALUACIÓN DEL TECNM<br />
            PROGRAMA DE ESTÍMULOS AL DESEMPEÑO DEL PERSONAL DOCENTE<br />
            DE LOS INSTITUTOS TECNOLÓGICOS FEDERALES Y CENTROS<br />
            P R E S E N T E.-</strong
          >
        </p>
      </div>

      <div class="cuerpo-texto">
        <p>
          La que suscribe, hace constar que según registros que existen en el
          archivo escolar, la <strong>C. {{ datos.nombreDocente }}</strong
          >, expediente <strong>{{ datos.expediente }}</strong> impartió las
          siguientes materias durante los Periodos Enero-Junio y
          Agosto-Diciembre del año 2024:
        </p>
      </div>

      <table class="tabla-alumnos">
        <thead>
          <tr>
            <th>PERIODO</th>
            <th>NIVEL</th>
            <th>CLAVE DE LA MATERIA</th>
            <th>NOMBRE DE LA MATERIA</th>
            <th>ALUMNOS ATENDIDOS</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(materia, index) in datos.materias" :key="index">
            <td>{{ materia.periodo }}</td>
            <td>{{ materia.nivel }}</td>
            <td>{{ materia.clave }}</td>
            <td class="col-nombre">{{ materia.nombre }}</td>
            <td>{{ materia.alumnos }}</td>
          </tr>
          <tr class="fila-total">
            <td colspan="4" class="texto-total">Total</td>
            <td>
              <strong>{{ datos.totalAlumnos }}</strong>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="cierre">
        <p>
          Se extiende la presente, en la ciudad de Culiacán, Sinaloa, a los
          {{ datos.fechaTexto }}, para los fines que más convengan al
          interesado.
        </p>
      </div>

      <div class="seccion-firma">
        <p class="atentamente">
          <strong>A T E N T A M E N T E</strong><br />
          <i>Excelencia en Educación Tecnológica®</i>
        </p>

        <div class="firma-bloque">
          <div class="espacio-firma"></div>
          <p class="nombre">{{ datos.nombreJefeEscolares }}</p>
          <p class="cargo">JEFA DEL DEPTO. DE SERVICIOS ESCOLARES</p>
        </div>
      </div>
      <br />
      <br />
      <br />
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
    default: () => ({
      materias: [],
      totalAlumnos: 0,
    }),
  },
});
</script>

<style scoped>
/* CONTENEDOR PRINCIPAL */
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000;
  padding: 0; /* Sin padding general */
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  font-size: 9pt;
  overflow: hidden;
  position: relative;
  display: block;
}

/* BANNER SUPERIOR */
.banner-superior {
  width: 100%;
  line-height: 0;
  margin-bottom: 10px;
}
.banner-superior img {
  width: 100%;
  height: auto;
}

/* CONTENIDO INTERNO (Con padding) */
.contenido-interno {
  padding: 0 40px 40px 40px;
  padding-bottom: 80px; /* Espacio para footer */
}

/* ENCABEZADO TEXTO */
.bloque-encabezado {
  text-align: right;
  margin-bottom: 20px;
  font-size: 9pt;
}
.inst {
  font-weight: bold;
  font-size: 10pt;
  margin-bottom: 5px;
}
.depto {
  font-weight: bold;
  margin-bottom: 2px;
}
.asunto {
  margin-top: 5px;
}

/* DESTINATARIO */
.destinatario {
  margin-bottom: 20px;
  font-weight: bold;
  font-size: 10pt;
}

.cuerpo-texto {
  text-align: justify;
  margin-bottom: 15px;
}

/* TABLA */
.tabla-alumnos {
  width: 100% !important;
  border-collapse: collapse;
  margin-bottom: 20px;
  font-size: 8pt;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.tabla-alumnos th,
.tabla-alumnos td {
  border: 1px solid #000;
  padding: 4px 6px;
  text-align: center;
  vertical-align: middle;
}
.tabla-alumnos th {
  font-weight: bold;
  background-color: #f0f0f0;
}
.col-nombre {
  text-align: left !important;
}

.fila-total td {
  border-top: 2px solid #000;
}
.texto-total {
  text-align: right !important;
  font-weight: bold;
  padding-right: 10px;
}

/* CIERRE */
.cierre {
  margin-bottom: 30px;
  text-align: justify;
}

/* FIRMA */
.seccion-firma {
  margin-top: 20px;
  text-align: left;
}
.atentamente {
  margin-bottom: 40px;
  font-size: 8pt;
}

.firma-bloque {
  width: 300px;
}
.espacio-firma {
  height: 40px;
}
.nombre {
  font-weight: bold;
  font-size: 9pt;
  text-transform: uppercase;
  margin-bottom: 2px;
}
.cargo {
  font-size: 8pt;
  font-weight: bold;
}

/* FOOTER ABSOLUTO */
.footer-logos {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  line-height: 0;
  z-index: 10;
}
.footer-logos img {
  width: 100%;
}
</style>
