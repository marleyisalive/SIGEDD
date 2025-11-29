<template>
  <section>
    <h3></h3>
    <h3>Plaza</h3>
    <div>
      <RouterLink :to="{ path: 'plaza/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Plaza</th>
        <th class="col-nombre">Descripción de la plaza</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="plaza.length == 0">
        <td class="centrado" colspan="3">Sin Plazas Registradas</td>
      </tr>
      <tr v-else v-for="Plaza in plaza" :key="Plaza.idPlaza">
        <td class="col-id">{{ Plaza.idPlaza }}</td>
        <td class="col-nombre">{{ Plaza.descripcion }}</td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{ path: '/plaza/' + Plaza.idPlaza + '/editar' }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{ path: '/plaza/' + Plaza.idPlaza + '/borrar' }"
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
import { usePlaza } from "../controladores/usePlaza";
const { traePlaza, plaza } = usePlaza();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traePlaza();
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
