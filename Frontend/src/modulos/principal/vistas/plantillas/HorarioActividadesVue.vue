<template>
  <div class="hoja-carta">
    
    <div class="header-grid">
        <div class="logo-box">
            <img src="@/assets/tecnm-byn.png" alt="Logo" />
        </div>
        <div class="titulo-box">
            <h2>Formato para el Horario de Actividades</h2>
        </div>
        <div class="meta-box">
            <table class="tabla-meta">
                <tr><td>Código: SIG-CA-FE-06-01</td><td>Página: 1 de 1</td></tr>
                <tr><td colspan="2">Revisión: 2</td></tr>
                <tr><td colspan="2">Emisión: Junio de 2022</td></tr>
            </table>
        </div>
    </div>

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

    <div class="seccion-titulo">I. CARGA ACADÉMICA</div>
    <table class="tabla-carga">
        <thead>
            <tr>
                <th rowspan="2" class="col-materia">ASIGNATURAS</th>
                <th rowspan="2">GRUPO</th>
                <th rowspan="2">EST.</th>
                <th rowspan="2">AULA</th>
                <th rowspan="2">CARRERA</th>
                <th colspan="6">HORARIO</th>
                <th rowspan="2">TOTAL HRS</th>
            </tr>
            <tr class="sub-header">
                <th>L</th><th>M</th><th>M</th><th>J</th><th>V</th><th>S</th>
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
            
            <tr>
                <td colspan="11" class="text-left">PREPARACIÓN, CONTROL Y EVALUACIÓN DE MATERIAS QUE IMPARTE</td>
                <td>{{ datos.horasPreparacion }}</td>
            </tr>
            <tr class="fila-subtotal">
                <td colspan="11" class="text-right">SUBTOTAL:</td>
                <td>{{ datos.subtotalDocencia }}</td>
            </tr>
        </tbody>
    </table>

    <div class="seccion-titulo">II. ACTIVIDADES DE APOYO A LA DOCENCIA</div>
    <table class="tabla-apoyo">
        <thead>
            <tr>
                <th class="col-actividad">NOMBRE DE LA ACTIVIDAD</th>
                <th>METAS A ATENDER</th>
                <th>HORARIO</th>
                <th>TOTAL HRS</th>
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
                <td colspan="3" class="text-right">SUBTOTAL:</td>
                <td>{{ datos.subtotalApoyo }}</td>
            </tr>
        </tbody>
    </table>

    <div class="seccion-titulo">III. ACTIVIDADES EN LA ADMINISTRACIÓN</div>
    <table class="tabla-admin">
        <thead>
            <tr>
                <th>PUESTO</th>
                <th>UNIDAD ORGÁNICA</th>
                <th>HORARIO</th>
                <th>TOTAL HRS</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="(adm, k) in datos.actividadesAdmin" :key="k">
                <td>{{ adm.puesto }}</td>
                <td>{{ adm.unidad }}</td>
                <td>{{ adm.viernes || "Variable" }}</td>
                <td>{{ adm.total }}</td>
            </tr>
            <tr v-if="!datos.actividadesAdmin?.length">
                <td colspan="4" class="vacio">&nbsp;</td>
            </tr>
            <tr class="fila-subtotal">
                <td colspan="3" class="text-right">SUBTOTAL:</td>
                <td>{{ datos.subtotalAdmin }}</td>
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
    default: () => ({})
  }
});
</script>

<style scoped>
.hoja-carta {
  width: 100%;
  max-height: 278mm; /* Altura Carta */
  background: white;
  color: #000;
  padding: 20px 30px; /* Márgenes ajustados */
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 8pt; /* Letra muy pequeña para que quepa todo */
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header Grid */
.header-grid { display: flex; align-items: center; margin-bottom: 10px; border-bottom: 2px solid #000; padding-bottom: 5px; }
.logo-box img { height: 50px; }
.titulo-box { flex-grow: 1; text-align: center; }
.titulo-box h2 { font-size: 12pt; margin: 0; }
.tabla-meta { font-size: 7pt; border-collapse: collapse; }
.tabla-meta td { border: 1px solid #000; padding: 2px; }

/* Tablas Generales */
table { width: 100%; border-collapse: collapse; margin-bottom: 5px; }
td, th { border: 1px solid #000; padding: 2px 4px; text-align: center; vertical-align: middle; }
th { background-color: #f0f0f0; font-weight: bold; font-size: 7pt; }

/* Tabla Datos Personales */
.tabla-datos-personales td { border: none; border-bottom: 1px solid #ccc; text-align: left; }
.tabla-datos-personales .label { font-weight: bold; width: 10%; }
.tabla-datos-personales .dato { width: 23%; }

/* Secciones */
.seccion-titulo { background-color: #ddd; font-weight: bold; padding: 2px; border: 1px solid #000; margin-top: 10px; font-size: 9pt; }

.text-left { text-align: left !important; }
.text-right { text-align: right !important; font-weight: bold; }
.text-small { font-size: 6pt; }
.col-materia { width: 30%; }
.vacio { height: 15px; }

/* Total General */
.total-general { text-align: right; margin: 10px 0; font-size: 10pt; }
.label-total { font-weight: bold; margin-right: 10px; }
.valor-total { border: 1px solid #000; padding: 2px 10px; font-weight: bold; }

/* Firmas */
.firmas-container { display: flex; justify-content: space-between; margin-top: auto; margin-bottom: 10px; }
.firma-box { width: 30%; text-align: center; }
.linea { border-top: 1px solid #000; margin-bottom: 2px; margin-top: 30px; }
.cargo { font-size: 7pt; font-weight: bold; }

.footer-logos img { width: 100%; height: 30px; object-fit: contain; }
</style>