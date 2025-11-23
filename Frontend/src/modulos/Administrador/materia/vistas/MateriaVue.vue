<template>
  <section>
    <h3></h3>
    <h3>Materia</h3>
    <div>
      <RouterLink :to="{ path: 'materia/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Materia</th>
        <th class="col-nombre">Nombre de la materia</th>
        <th class="col-departamento">Departamento</th>
        <th class="col-creditos">Créditos</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="materia.length == 0">
        <td class="centrado" colspan="5">Sin Materias Registradas</td>
      </tr>
      <tr v-else v-for="Materia in materia" :key="Materia.idMateria">
        <td class="col-id">{{ Materia.idMateria }}</td>
        <td class="col-nombre">{{ Materia.nombre }}</td>
        <td class="col-departamento">
          {{ obtenerNombreDepartamento(Materia.idDepartamento) }}
        </td>
        <td class="col-creditos">{{ Materia.creditos }}</td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{ path: '/materia/' + Materia.idMateria + '/editar' }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{ path: '/materia/' + Materia.idMateria + '/borrar' }"
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
import { useMateria } from "../controladores/useMateria";
const { traeMateria, traeDepartamentos, materia, obtenerNombreDepartamento } =
  useMateria();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traeDepartamentos();
  await traeMateria();
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
  text-align: center;
  width: 10%;
}
.col-nombre {
  text-align: center;
  width: 30%;
}
.col-departamento {
  text-align: center;
  width: 25%;
}
.col-creditos {
  text-align: center;
  width: 10%;
}
.col-acciones {
  width: 25%;
  text-align: center;
}
.centrado {
  text-align: center;
  font-style: italic;
}
</style>
