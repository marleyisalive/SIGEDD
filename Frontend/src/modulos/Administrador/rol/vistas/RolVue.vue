<template>
  <section>
    <h3></h3>
    <h3>Rol</h3>
    <div>
      <RouterLink :to="{ path: 'rol/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Rol</th>
        <th class="col-nombre">Descripción del rol</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="rol.length == 0">
        <td class="centrado" colspan="3">Sin Roles Registrados</td>
      </tr>
      <tr v-else v-for="Rol in rol" :key="Rol.idRol">
        <td class="col-id">{{ Rol.idRol }}</td>
        <td class="col-nombre">{{ Rol.descripcion }}</td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{ path: '/rol/' + Rol.idRol + '/editar' }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{ path: '/rol/' + Rol.idRol + '/borrar' }"
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
import { useRol } from "../controladores/useRol";
const { traeRol, rol } = useRol();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traeRol();
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
