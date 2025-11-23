<template>
  <section>
    <h3></h3>
    <h3>Nivel de Estudio</h3>
    <div>
      <RouterLink :to="{ path: 'nivelEstudio/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Nivel de Estudio</th>
        <th class="col-nombre">Nombre del nivel de estudio</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="nivelEstudio.length == 0">
        <td class="centrado" colspan="3">Sin Niveles de Estudio Registrados</td>
      </tr>
      <tr
        v-else
        v-for="NivelEstudio in nivelEstudio"
        :key="NivelEstudio.idNivelEstudio"
      >
        <td class="col-id">{{ NivelEstudio.idNivelEstudio }}</td>
        <td class="col-nombre">{{ NivelEstudio.nombre }}</td>
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
                  '/nivelEstudio/' + NivelEstudio.idNivelEstudio + '/editar',
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
                  '/nivelEstudio/' + NivelEstudio.idNivelEstudio + '/borrar',
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
import { useNivelEstudio } from "../controladores/useNivelEstudio";
const { traeNivelEstudio, nivelEstudio } = useNivelEstudio();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traeNivelEstudio();
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
  width: 40%;
  text-align: center;
}

.col-nombre {
  width: 40%;
  text-align: center;
}

.col-acciones {
  width: 20%;
  text-align: center;
}

.centrado {
  text-align: center;
  color: red;
}
</style>
