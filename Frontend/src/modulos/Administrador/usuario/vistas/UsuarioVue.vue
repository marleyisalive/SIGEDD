<template>
  <section>
    <h3></h3>
    <h3>Usuario</h3>
    <div>
      <RouterLink :to="{ path: 'usuario/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Usuario</th>
        <th class="col-nombre">Nombre</th>
        <th class="col-correo">Correo</th>
        <th class="col-rol">Rol</th>
        <th class="col-estatus">Estatus</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="usuario.length == 0">
        <td class="centrado" colspan="6">Sin Usuarios Registrados</td>
      </tr>
      <tr v-else v-for="Usuario in usuario" :key="Usuario.idUsuario">
        <td class="col-id">{{ Usuario.idUsuario }}</td>
        <td class="col-nombre">
          {{ Usuario.nombreUsuario }} {{ Usuario.apePatUsuario }}
          {{ Usuario.apeMatUsuario }}
        </td>
        <td class="col-correo">{{ Usuario.correoUsuario }}</td>
        <td class="col-rol">{{ obtenerDescripcionRol(Usuario.idRol) }}</td>
        <td class="col-estatus">
          {{ Usuario.estatus === 1 ? "Activo" : "Inactivo" }}
        </td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{ path: '/usuario/' + Usuario.idUsuario + '/editar' }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{ path: '/usuario/' + Usuario.idUsuario + '/borrar' }"
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
import { useUsuario } from "../controladores/useUsuario";
const { traeUsuario, traeRoles, usuario, obtenerDescripcionRol } = useUsuario();

//cuando la pagina es visible y ya cargada
onMounted(async () => {
  await traeRoles();
  await traeUsuario();
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
  width: 10%;
  text-align: center;
}

.col-nombre {
  width: 25%;
  text-align: center;
}

.col-correo {
  width: 20%;
  text-align: center;
}

.col-rol {
  width: 15%;
  text-align: center;
}

.col-estatus {
  width: 10%;
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
