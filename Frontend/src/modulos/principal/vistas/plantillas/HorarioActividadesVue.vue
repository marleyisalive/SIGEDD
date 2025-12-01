<template>
  <div class="hoja-carta">
    <!-- HEADER -->
    <div class="header-grid">
      <div class="logo-box">
        <img src="@/assets/tecnm-byn.png" alt="Logo" />
      </div>
      <div class="titulo-box">
        <h2>Formato para el Horario de Actividades</h2>
      </div>
      <div class="meta-box">
        <table class="tabla-meta">
          <tr>
            <td>Código: SIG-CA-FE-06-01</td>
            <td>Página: 1 de 1</td>
          </tr>
          <tr>
            <td colspan="2">Revisión: 2</td>
          </tr>
          <tr>
            <td colspan="2">Emisión: Junio de 2022</td>
          </tr>
        </table>
      </div>
    </div>

    <!-- DATOS PERSONALES -->
    <table class="tabla-datos-personales">
      <tr>
        <td class="label">NOMBRE COMPLETO:</td>
        <td colspan="3" class="dato">{{ datos.encabezado?.nombreDocente }}</td>
        <td class="label">PERIODO:</td>
        <td class="dato">{{ datos.encabezado?.periodo }}</td>
      </tr>
      <tr>
        <td class="label">RFC:</td>
        <td class="dato">{{ datos.encabezado?.rfc }}</td>
        <td class="label">PLAZA:</td>
        <td colspan="3" class="dato">{{ datos.encabezado?.plaza }}</td>
      </tr>
      <tr>
        <td class="label">DEPTO:</td>
        <td colspan="3" class="dato">{{ datos.encabezado?.departamento }}</td>
        <td class="label">INGRESO SEP:</td>
        <td class="dato">{{ datos.encabezado?.ingresoSEP }}</td>
      </tr>
    </table>

    <!-- SECCION I: CARGA ACADÉMICA -->
    <div class="seccion-titulo">I. CARGA ACADÉMICA</div>
    <table class="tabla-carga">
      <thead>
        <tr>
          <th rowspan="2" class="col-asignatura">ASIGNATURAS</th>
          <th rowspan="2" class="col-grupo">GRUPO</th>
          <th rowspan="2" class="col-est">EST.</th>
          <th rowspan="2" class="col-aula">AULA</th>
          <th rowspan="2" class="col-carrera">CARRERA</th>
          <th colspan="6" class="horario-header">HORARIO</th>
          <th rowspan="2" class="col-hrs">TOTAL HRS</th>
        </tr>
        <tr class="sub-header">
          <th class="col-dia">L</th>
          <th class="col-dia">M</th>
          <th class="col-dia">M</th>
          <th class="col-dia">J</th>
          <th class="col-dia">V</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(mat, i) in datos.cargaAcademica" :key="i">
          <td class="text-left">{{ mat.asignatura }}</td>
          <td>{{ mat.grupo }}</td>
          <td>{{ mat.estudiantes }}</td>
          <td>{{ mat.aula }}</td>
          <td class="text-small">{{ mat.carrera }}</td>
          <td colspan="6" class="text-center">{{ mat.horario }}</td>
          <td>{{ mat.horasSemana }}</td>
        </tr>

        <tr class="fila-preparacion">
          <td colspan="11" class="text-left prep-label">
            PREPARACIÓN, CONTROL Y EVALUACIÓN DE MATERIAS QUE IMPARTE
          </td>
          <td class="prep-valor">{{ datos.horasPreparacion }}</td>
        </tr>
        <tr class="fila-subtotal">
          <td colspan="11" class="text-right subtotal-label">SUBTOTAL:</td>
          <td class="subtotal-valor">{{ datos.subtotalDocencia }}</td>
        </tr>
      </tbody>
    </table>

    <!-- SECCION II: APOYO -->
    <div class="seccion-titulo">II. ACTIVIDADES DE APOYO A LA DOCENCIA</div>
    <table class="tabla-apoyo">
      <thead>
        <tr>
          <th class="col-actividad-apoyo">NOMBRE DE LA ACTIVIDAD</th>
          <th class="col-metas">METAS A ATENDER</th>
          <th class="col-horario-apoyo">HORARIO</th>
          <th class="col-hrs-apoyo">TOTAL HRS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(act, j) in datos.actividadesApoyo" :key="j">
          <td class="text-left">{{ act.nombre }}</td>
          <td class="text-left">{{ act.metas }}</td>
          <td>{{ act.lunes || act.martes || "Variable" }}</td>
          <td>{{ act.total }}</td>
        </tr>
        <tr v-if="!datos.actividadesApoyo?.length">
          <td colspan="4" class="vacio">&nbsp;</td>
        </tr>
        <tr class="fila-subtotal">
          <td colspan="3" class="text-right subtotal-label">SUBTOTAL:</td>
          <td class="subtotal-valor">{{ datos.subtotalApoyo }}</td>
        </tr>
      </tbody>
    </table>

    <!-- SECCION III: ADMINISTRACIÓN -->
    <div class="seccion-titulo">III. ACTIVIDADES EN LA ADMINISTRACIÓN</div>
    <table class="tabla-admin">
      <thead>
        <tr>
          <th class="col-puesto">PUESTO</th>
          <th class="col-unidad">UNIDAD ORGÁNICA</th>
          <th class="col-horario-admin">HORARIO</th>
          <th class="col-hrs-admin">TOTAL HRS</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(adm, k) in datos.actividadesAdmin" :key="k">
          <td class="text-left">{{ adm.puesto }}</td>
          <td class="text-left">{{ adm.unidad }}</td>
          <td>{{ adm.viernes || "Variable" }}</td>
          <td>{{ adm.total }}</td>
        </tr>
        <tr v-if="!datos.actividadesAdmin?.length">
          <td colspan="4" class="vacio">&nbsp;</td>
        </tr>
        <tr class="fila-subtotal">
          <td colspan="3" class="text-right subtotal-label">SUBTOTAL:</td>
          <td class="subtotal-valor">{{ datos.subtotalAdmin }}</td>
        </tr>
      </tbody>
    </table>

    <div class="total-general">
      <span class="label-total">TOTAL DE HORAS SEMANALES:</span>
      <span class="valor-total">{{ datos.granTotal }}</span>
    </div>

    <div class="firmas-container">
      <div class="firma-box">
        <div class="linea"></div>
        <p>{{ datos.encabezado?.nombreDocente }}</p>
        <p class="cargo">FIRMA DEL TRABAJADOR</p>
      </div>
      <div class="firma-box">
        <div class="linea"></div>
        <p>{{ datos.firmas?.jefeDDA }}</p>
        <p class="cargo">JEFE DEPTO. DESARROLLO ACADÉMICO</p>
      </div>
      <div class="firma-box">
        <div class="linea"></div>
        <p>{{ datos.firmas?.subdirector }}</p>
        <p class="cargo">SUBDIRECTOR ACADÉMICO</p>
      </div>
    </div>

    <footer class="footer-logos">
      <!---<img src="@/assets/footer-logos.png" alt="Logos" />--->
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
  padding: 30px 40px;
  box-sizing: border-box;
  font-family: "Arial", sans-serif;
  font-size: 9pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.header-grid {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  border-bottom: 2px solid #000;
  padding-bottom: 5px;
  width: 100%;
  box-sizing: border-box;
  gap: 10px;
}
.logo-box {
  flex-shrink: 0;
}
.logo-box img {
  height: 55px;
  width: auto;
}
.titulo-box {
  flex-grow: 1;
  text-align: center;
}
.titulo-box h2 {
  font-size: 11pt;
  margin: 0;
  font-weight: bold;
}
.meta-box {
  flex-shrink: 0;
  width: 135px;
  max-width: 135px;
  box-sizing: border-box;
}
.tabla-meta {
  font-size: 6pt;
  border-collapse: collapse;
  width: 100%;
  box-sizing: border-box;
}
.tabla-meta td {
  border: 1px solid #000;
  padding: 1px 2px;
  box-sizing: border-box;
  font-size: 6pt;
  word-break: break-word;
}

/* TABLA DATOS PERSONALES */
.tabla-datos-personales {
  width: 100% !important;
  border-collapse: collapse;
  margin-bottom: 8px;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.tabla-datos-personales td {
  border: none;
  border-bottom: 1px solid #999;
  padding: 3px 5px;
  font-size: 8pt;
}
.tabla-datos-personales .label {
  font-weight: bold;
  width: 15%;
  text-align: left;
}
.tabla-datos-personales .dato {
  width: 35%;
  text-align: left;
}

/* SECCIONES */
.seccion-titulo {
  background-color: #e0e0e0;
  font-weight: bold;
  padding: 3px 5px;
  border: 1px solid #000;
  margin-top: 8px;
  margin-bottom: 2px;
  font-size: 9pt;
  text-align: left;
}

/* TABLAS GENERALES */
table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 8px;
  margin-left: 0;
  margin-right: 0;
}

.tabla-carga,
.tabla-apoyo,
.tabla-admin {
  width: 100% !important;
  margin-left: 0 !important;
  margin-right: 0 !important;
}

td,
th {
  border: 1px solid #000;
  padding: 3px 4px;
  text-align: center;
  vertical-align: middle;
  font-size: 8pt;
}

th {
  background-color: #f5f5f5;
  font-weight: bold;
  font-size: 8pt;
}

/* ALINEACIONES */
.text-left {
  text-align: left !important;
  padding-left: 5px;
}
.text-right {
  text-align: right !important;
  padding-right: 8px;
}
.text-center {
  text-align: center !important;
}
.text-small {
  font-size: 7pt;
}

/* FILAS ESPECIALES */
.fila-preparacion td {
  background-color: #f9f9f9;
}

.fila-subtotal {
  background-color: #e8e8e8;
  font-weight: bold;
}

.prep-label,
.subtotal-label {
  font-weight: bold;
  text-align: right !important;
  padding-right: 10px;
}

.prep-valor,
.subtotal-valor {
  font-weight: bold;
  background-color: #fff;
}

.vacio {
  height: 20px;
  background-color: #fafafa;
}

/* TOTAL GENERAL */
.total-general {
  text-align: right;
  margin: 12px 0;
  font-size: 10pt;
}
.label-total {
  font-weight: bold;
  margin-right: 15px;
}
.valor-total {
  border: 2px solid #000;
  padding: 4px 15px;
  font-weight: bold;
  display: inline-block;
  min-width: 50px;
  text-align: center;
}

/* FIRMAS */
.firmas-container {
  display: flex;
  justify-content: space-around;
  margin-top: 25px;
  margin-bottom: 15px;
  gap: 20px;
}
.firma-box {
  flex: 1;
  text-align: center;
  max-width: 200px;
}
.linea {
  border-top: 1.5px solid #000;
  margin-bottom: 3px;
  margin-top: 40px;
}
.firma-box p {
  margin: 2px 0;
  font-size: 8pt;
}
.cargo {
  font-size: 7pt;
  font-weight: bold;
  text-transform: uppercase;
}

/* FOOTER */
.footer-logos {
  margin-top: auto;
  text-align: center;
}
.footer-logos img {
  max-width: 100%;
  height: 35px;
  object-fit: contain;
}

/* RESPONSIVE PARA IMPRESIÓN */
@media print {
  .hoja-carta {
    width: 100%;
    padding: 20px 30px;
  }

  table {
    page-break-inside: avoid;
  }
}
</style>