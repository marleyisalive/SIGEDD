<template>
  <div class="hoja-carta">
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
      <div class="bloque-fecha">
        <div class="fila-dato derecha">
          <span class="label">Lugar y Fecha:</span>
          <div class="linea-dato">{{ datos.lugarFecha }}</div>
        </div>
      </div>

      <h2 class="titulo-doc">REPORTE DE PROYECTOS DE INVESTIGACIÓN</h2>
      <p class="subtitulo-doc">
        (En proceso o terminados, debidamente autorizados y registrados)
      </p>

      <div class="datos-generales">
        <div class="fila-info">
          <span class="label">Docente:</span>
          <span class="valor">{{ datos.nombreDocente }}</span>
        </div>
        <div class="fila-info">
          <span class="label">Departamento:</span>
          <span class="valor">{{ datos.departamento }}</span>
        </div>
        <div class="fila-info">
          <span class="label">Periodo/Semestre:</span>
          <span class="valor">{{ datos.semestre }}</span>
        </div>
      </div>

      <div class="contenedor-tabla">
        <table class="tabla-proyectos">
          <thead>
            <tr>
              <th class="col-titulo">Título del Proyecto de Investigación</th>
              <th class="col-estatus">Estatus</th>
              <th class="col-registro">Clave de Registro / Autorización</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(proj, index) in datos.proyectos" :key="index">
              <td class="text-left">{{ proj.titulo }}</td>
              <td class="center">{{ proj.estatus }}</td>
              <td class="center">{{ proj.claveRegistro }}</td>
            </tr>
            <tr v-if="!datos.proyectos || datos.proyectos.length === 0">
              <td colspan="3" class="sin-datos">
                Sin proyectos registrados en este periodo.
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <p class="nota-pie">
        * Nota: Se anexan las carátulas de autorización o constancias de
        registro correspondientes a los proyectos listados.
      </p>

      <div class="seccion-firmas">
        <div class="firma-box">
          <div class="espacio-firma"></div>
          <div class="pie-caja">
            <p class="nombre">{{ datos.nombreDocente }}</p>
            <p class="cargo">Firma del(a) Docente</p>
          </div>
        </div>

        <div class="firma-box">
          <div class="espacio-firma"></div>
          <div class="pie-caja">
            <p class="nombre">{{ datos.firmaCoordinador }}</p>
            <p class="cargo">Coordinador(a) de Investigación y Posgrado</p>
          </div>
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
    default: () => ({}),
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

  /* CLAVE 1: Sin padding general para que el banner toque los bordes */
  padding: 0;

  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: block; /* Cambiamos a block para mejor control del flujo */
}

/* BANNER SUPERIOR */
.banner-superior {
  width: 100%;
  line-height: 0;
  margin-bottom: 20px;
}
.banner-superior img {
  width: 100%;
  height: auto;
}

/* CONTENIDO INTERNO (Aquí aplicamos el padding para el texto) */
.contenido-interno {
  padding: 0 40px 40px 40px;
  /* Espacio inferior extra para asegurar que el footer no tape el contenido */
  padding-bottom: 80px;
}

/* Fecha (Alineado derecha) */
.bloque-fecha {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}
.fila-dato.derecha {
  text-align: right;
}
.linea-dato {
  font-weight: bold;
  margin-top: 5px;
}

/* Títulos */
.titulo-doc {
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 12pt;
}
.subtitulo-doc {
  text-align: center;
  font-style: italic;
  margin-bottom: 25px;
  font-size: 9pt;
}

/* Datos Generales */
.datos-generales {
  margin-bottom: 20px;
  border: 1px solid #ccc;
  padding: 15px;
  background-color: #f9f9f9;
}
.fila-info {
  margin-bottom: 8px;
  display: flex;
}
.label {
  font-weight: bold;
  width: 150px;
}
.valor {
  flex: 1;
  border-bottom: 1px dotted #999;
}

/* Tabla */
.contenedor-tabla {
  margin-bottom: 20px;
}
.tabla-proyectos {
  width: 100% !important;
  border-collapse: collapse;
  font-size: 9pt;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.tabla-proyectos th,
.tabla-proyectos td {
  border: 1px solid black;
  padding: 8px;
  vertical-align: middle;
}
.tabla-proyectos th {
  background-color: #e0e0e0;
  font-weight: bold;
  text-align: center;
}

.col-titulo {
  width: 50%;
}
.col-estatus {
  width: 20%;
}
.col-registro {
  width: 30%;
}
.text-left {
  text-align: left;
}
.center {
  text-align: center;
}
.sin-datos {
  text-align: center;
  font-style: italic;
  padding: 20px;
  color: #666;
}

.nota-pie {
  font-size: 8pt;
  font-style: italic;
  margin-bottom: 30px;
}

/* Firmas */
.seccion-firmas {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.firma-box {
  width: 40%;
  text-align: center;
}
.espacio-firma {
  height: 50px;
}
.pie-caja {
  border-top: 1px solid black;
  padding-top: 5px;
}
.nombre {
  font-weight: bold;
  font-size: 9pt;
  margin-bottom: 2px;
}
.cargo {
  font-size: 9pt;
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
