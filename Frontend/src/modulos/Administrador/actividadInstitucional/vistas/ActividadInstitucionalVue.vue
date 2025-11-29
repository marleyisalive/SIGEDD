<template>
  <section>
    <h3></h3>
    <h3>Actividad Institucional</h3>
    <div>
      <RouterLink :to="{ path: 'actividadInstitucional/agregar' }">
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
        <th class="col-nombre">Nombre</th>
        <th class="col-tipo">Tipo de Documento</th>
        <th class="col-periodo">Periodo</th>
        <th class="col-fechas">Fecha Inicio</th>
        <th class="col-fechas">Fecha Fin</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="actividadInstitucional.length == 0">
        <td class="centrado" colspan="7">
          Sin Actividades Institucionales Registradas
        </td>
      </tr>
      <tr
        v-else
        v-for="actividad in actividadInstitucional"
        :key="actividad.idActividadInstitucional"
      >
        <td class="col-id">{{ actividad.idActividadInstitucional }}</td>
        <td class="col-nombre">{{ actividad.nombre }}</td>
        <td class="col-tipo">
          {{ obtenerNombreTipoDocumento(actividad.idTipoDocumento) }}
        </td>
        <td class="col-periodo">{{ actividad.periodo || "N/A" }}</td>
        <td class="col-fechas">{{ actividad.fechaInicio || "N/A" }}</td>
        <td class="col-fechas">{{ actividad.fechaFin || "N/A" }}</td>
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
                  '/actividadInstitucional/' +
                  actividad.idActividadInstitucional +
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
                  '/actividadInstitucional/' +
                  actividad.idActividadInstitucional +
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
import { useActividadInstitucional } from "../controladores/useActividadInstitucional";
const {
  traeActividadInstitucional,
  actividadInstitucional,
  traeTiposDocumento,
  obtenerNombreTipoDocumento,
} = useActividadInstitucional();

onMounted(async () => {
  await traeTiposDocumento();
  await traeActividadInstitucional();
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

.col-nombre {
  width: 22%;
  text-align: center;
}

.col-tipo {
  width: 20%;
  text-align: center;
}

.col-periodo {
  width: 12%;
  text-align: center;
}

.col-fechas {
  width: 12%;
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
