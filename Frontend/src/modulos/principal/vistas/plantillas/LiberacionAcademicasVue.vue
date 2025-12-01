<template>
  <div class="hoja-carta">
    <h2 class="titulo-doc">CARTA DE LIBERACIÓN DE ACTIVIDADES ACADÉMICAS</h2>

    <div class="datos-header">
      <div class="fila-dato">
        <span class="label">Departamento Académico de:</span>
        <div class="linea-dato">{{ datos.departamento }}</div>
      </div>
      <div class="fila-dato derecha">
        <span class="label">Lugar y fecha:</span>
        <div class="linea-dato">{{ datos.lugarFecha }}</div>
      </div>
      <div class="asunto">
        <p>Asunto: Constancia de liberación de actividades académicas.</p>
      </div>
    </div>

    <div class="destinatario">
      <p>
        <strong>C.</strong> <u>{{ datos.nombreDocente }}</u>
      </p>
      <p><strong>Nombre del (de la) profesor(a)</strong></p>
      <p><strong>PRESENTE</strong></p>
    </div>

    <div class="cuerpo-texto">
      <p>
        Por medio de la presente, se hace de su conocimiento que durante el
        semestre <u>{{ datos.semestre }}</u
        >, se evaluó el cumplimiento de las siguientes actividades académicas:
      </p>
    </div>

    <table class="tabla-evaluacion">
      <thead>
        <tr>
          <th class="col-actividad">Actividades</th>
          <th class="col-check">Si</th>
          <th class="col-check">No</th>
          <th class="col-check">NA</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>Asistencia a reuniones convocadas</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            Participación en programas de formación y actualización docente
          </td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Asesorías en procesos de titulación integral encomendadas</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            Propuestas de mejoras en la operación de programas y proyectos
            académicos
          </td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Sinodales en protocolos de titulación</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Participación en eventos de la academia</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            Contribución con propuestas de mejora en los planes y programas de
            estudio
          </td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Desarrollo de materiales de apoyo didáctico</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Propuestas para bancos de proyectos</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Asesorías académicas</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>Tutoría</td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>
        <tr>
          <td>
            Participación en comisiones académicas (equivalencias, Salida
            Lateral, traslado, proyecto integrador, acreditaciones,
            certificaciones, diseño especialidades, proyectos integradores,
            etc.)
          </td>
          <td class="center">X</td>
          <td></td>
          <td></td>
        </tr>

        <tr>
          <td>
            Otros (especificar): <u>{{ datos.otrosActividad }}</u>
          </td>
          <td class="center">{{ datos.otrosActividad ? "X" : "" }}</td>
          <td></td>
          <td>{{ datos.otrosActividad ? "" : "X" }}</td>
        </tr>

        <tr class="fila-final">
          <td>
            <strong
              >¿Cumplió con las actividades académicas encomendadas al
              100%?</strong
            >
          </td>
          <td class="center"><strong>X</strong></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </table>

    <div class="seccion-firmas">
      <div class="firma-box">
        <div class="titulo-caja">Presidente(a) de la Academia</div>
        <div class="espacio-firma"></div>
        <div class="pie-caja">
          <p class="nombre">{{ datos.firmaPresidente }}</p>
          <p class="label-firma">Nombre y firma</p>
        </div>
      </div>

      <div class="firma-box">
        <div class="titulo-caja">
          Vo. Bo. Jefe(a) del Departamento<br />Académico
        </div>
        <div class="espacio-firma"></div>
        <div class="pie-caja">
          <p class="nombre">{{ datos.firmaJefe }}</p>
          <p class="label-firma">Nombre y firma</p>
        </div>
      </div>
    </div>

    <div class="sello-texto">SELLO</div>
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

.titulo-doc {
  text-align: center;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 11pt;
}

/* Header Datos */
.datos-header {
  margin-bottom: 20px;
}
.fila-dato {
  display: flex;
  margin-bottom: 5px;
  align-items: flex-end;
}
.fila-dato.derecha {
  justify-content: flex-end;
  margin-top: 5px;
}

.label {
  margin-right: 5px;
  white-space: nowrap;
}
.linea-dato {
  border-bottom: 1px solid black;
  flex-grow: 1;
  padding-left: 5px;
  font-weight: bold;
}
.fila-dato.derecha .linea-dato {
  flex-grow: 0;
  width: 250px;
}

.asunto {
  text-align: right;
  margin-top: 10px;
}

/* Destinatario */
.destinatario {
  margin-bottom: 15px;
  font-weight: bold;
}
.cuerpo-texto {
  margin-bottom: 15px;
  text-align: justify;
}

/* Tabla */
.tabla-evaluacion {
  width: 100% !important;
  border-collapse: collapse;
  font-size: 8pt;
  margin-bottom: 20px;
  margin-left: 0 !important;
  margin-right: 0 !important;
}
.tabla-evaluacion th,
.tabla-evaluacion td {
  border: 1px solid black;
  padding: 2px 4px;
  vertical-align: middle;
}
.tabla-evaluacion th {
  background-color: #fff;
  font-weight: bold;
  text-align: center;
}

.col-actividad {
  width: 85%;
  text-align: center;
}
.col-check {
  width: 5%;
}
.center {
  text-align: center;
}
.fila-final {
  font-weight: bold;
}

/* Firmas (Estilo Caja Punteada) */
.seccion-firmas {
  display: flex;
  justify-content: space-between;
  margin-top: auto;
  margin-bottom: 10px;
}

.firma-box {
  width: 48%;
  border: 1px dashed #999; /* Borde punteado como en la imagen */
  display: flex;
  flex-direction: column;
  padding: 5px;
}
.titulo-caja {
  text-align: center;
  font-weight: bold;
  margin-bottom: 5px;
}
.espacio-firma {
  height: 40px;
}
.pie-caja {
  border-top: 1px solid black;
  text-align: center;
  padding-top: 2px;
}
.nombre {
  font-weight: bold;
  font-size: 8pt;
  margin-bottom: 2px;
}
.label-firma {
  font-weight: bold;
  font-size: 8pt;
}

.sello-texto {
  text-align: right;
  font-weight: bold;
  font-size: 8pt;
  margin-right: 10px;
}
</style>
