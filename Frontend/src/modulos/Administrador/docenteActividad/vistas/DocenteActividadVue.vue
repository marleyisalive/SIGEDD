<template>
  <section>
    <h3></h3>
    <h3>Actividad de Docente</h3>
    <div>
      <RouterLink :to="{ path: '/docenteActividad/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id</th>
        <th class="col-actividad">Actividad Institucional</th>
        <th class="col-docente">Docente</th>
        <th class="col-campos">Datos Capturados</th>
        <th class="col-fecha">Fecha Registro</th>
        <th class="col-validador">Validado Por</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="docenteActividad.length == 0">
        <td class="centrado" colspan="7">
          Sin Actividades de Docente Registradas
        </td>
      </tr>
      <tr
        v-else
        v-for="docenteAct in docenteActividad"
        :key="docenteAct.idDocenteActividad"
      >
        <td class="col-id">{{ docenteAct.idDocenteActividad }}</td>
        <td class="col-actividad">
          {{
            obtenerNombreActividadInstitucional(
              docenteAct.idActividadInstitucional
            )
          }}
        </td>
        <td class="col-docente">
          {{ obtenerNombreDocente(docenteAct.idDocente) }}
        </td>
        <td class="col-campos">
          {{ obtenerCantidadCampos(docenteAct.datosCapturados) }} campos
        </td>
        <td class="col-fecha">
          {{ formatearFecha(docenteAct.fechaRegistro) }}
        </td>
        <td class="col-validador">
          {{ obtenerNombreUsuario(docenteAct.validadoPor) }}
        </td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{
                path:
                  '/docenteActividad/' +
                  docenteAct.idDocenteActividad +
                  '/editar',
              }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{
                path:
                  '/docenteActividad/' +
                  docenteAct.idDocenteActividad +
                  '/borrar',
              }"
            >
              <button type="button" class="btn btn-sm btn-outline-danger">
                <i class="fa fa-trash"></i>
              </button>
            </RouterLink>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted } from "vue";
import { useDocenteActividad } from "../controladores/useDocenteActividad";
const {
  traeDocenteActividad,
  traeActividadesInstitucionales,
  traeDocentes,
  traeUsuarios,
  docenteActividad,
  obtenerNombreActividadInstitucional,
  obtenerNombreDocente,
  obtenerNombreUsuario,
  obtenerCantidadCampos,
  formatearFecha,
} = useDocenteActividad();

onMounted(async () => {
  await traeDocenteActividad();
  await traeActividadesInstitucionales();
  await traeDocentes();
  await traeUsuarios();
});
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 40px;
}
.table {
  width: 100%;
  table-layout: fixed;
}

.col-id {
  width: 8%;
  text-align: center;
}

.col-actividad {
  width: 20%;
  text-align: center;
}

.col-docente {
  width: 18%;
  text-align: center;
}

.col-campos {
  width: 12%;
  text-align: center;
}

.col-fecha {
  width: 14%;
  text-align: center;
}

.col-validador {
  width: 14%;
  text-align: center;
}

.col-acciones {
  width: 14%;
  text-align: center;
}

.centrado {
  text-align: center;
  color: red;
}
</style>
