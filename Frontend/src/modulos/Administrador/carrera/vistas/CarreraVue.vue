<template>
  <section>
    <h3></h3>
    <h3>Carrera</h3>
    <div>
      <RouterLink :to="{ path: 'carrera/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Carrera</th>
        <th class="col-nombre">Nombre de la carrera</th>
        <th class="col-acreditado">Acreditado</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="carrera.length == 0">
        <td class="centrado" colspan="4">Sin Carreras Registradas</td>
      </tr>
      <tr v-else v-for="Carrera in carrera" :key="Carrera.idCarrera">
        <td class="col-id">{{ Carrera.idCarrera }}</td>
        <td class="col-nombre">{{ Carrera.nombre }}</td>
        <td class="col-acreditado">{{ Carrera.acreditado ? "Sí" : "No" }}</td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{ path: '/carrera/' + Carrera.idCarrera + '/editar' }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{ path: '/carrera/' + Carrera.idCarrera + '/borrar' }"
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
import { useCarrera } from "../controladores/useCarrera";
const { traeCarrera, carrera } = useCarrera();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traeCarrera();
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
  width: 25%;
  text-align: center;
}

.col-nombre {
  width: 35%;
  text-align: center;
}

.col-acreditado {
  width: 20%;
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
