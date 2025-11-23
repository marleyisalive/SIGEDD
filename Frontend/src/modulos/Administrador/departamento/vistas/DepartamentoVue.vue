<template>
  <section>
    <h3></h3>
    <h3>Departamento</h3>
    <div>
      <RouterLink :to="{ path: 'departamento/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Departamento</th>
        <th class="col-nombre">Nombre del departamento</th>
        <th class="col-encargado">Encargado</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="departamento.length == 0">
        <td class="centrado" colspan="4">Sin Departamentos Registrados</td>
      </tr>
      <tr
        v-else
        v-for="Departamento in departamento"
        :key="Departamento.idDepartamento"
      >
        <td class="col-id">{{ Departamento.idDepartamento }}</td>
        <td class="col-nombre">{{ Departamento.nombreDepartamento }}</td>
        <td class="col-encargado">
          {{ obtenerNombreUsuario(Departamento.encargadoDepartamento) }}
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
                  '/departamento/' + Departamento.idDepartamento + '/editar',
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
                  '/departamento/' + Departamento.idDepartamento + '/borrar',
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
import { useDepartamento } from "../controladores/useDepartamento";
const { traeDepartamento, traeUsuarios, obtenerNombreUsuario, departamento } =
  useDepartamento();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traeUsuarios();
  await traeDepartamento();
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

.col-encargado {
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
