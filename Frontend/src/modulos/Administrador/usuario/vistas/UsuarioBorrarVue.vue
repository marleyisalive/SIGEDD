<template>
  <div class="container mt-5" v-if="usuario[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Usuario</h4>
      </div>
      <div class="alert alert-warning" role="alert">
        ¿Seguro de borrar la informacion?
        <i class="fa fa-warning"></i>
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <div class="mb-3">
          Id Usuario
          <input
            type="text"
            class="form-control"
            v-model="usuario[0].idUsuario"
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre del usuario
          <input
            type="text"
            class="form-control"
            :value="`${usuario[0].nombreUsuario} ${usuario[0].apePatUsuario} ${usuario[0].apeMatUsuario}`"
            disabled
          />
        </div>
        <div class="mb-3">
          Correo
          <input
            type="text"
            class="form-control"
            v-model="usuario[0].correoUsuario"
            disabled
          />
        </div>
        <div class="mb-3">
          Rol
          <input
            type="text"
            class="form-control"
            :value="obtenerDescripcionRol(usuario[0].idRol)"
            disabled
          />
        </div>
        <div class="mb-3">
          Estatus
          <input
            type="text"
            class="form-control"
            :value="usuario[0].estatus === 1 ? 'Activo' : 'Inactivo'"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarUsuario(usuario[0])">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useUsuario } from "../controladores/useUsuario";
const {
  traeUsuarioId,
  borrarUsuario,
  traeRoles,
  obtenerDescripcionRol,
  mensaje,
  mensajeError,
  usuario,
} = useUsuario();

let idUsuario = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/usuario");
    }
  }
);

onMounted(async () => {
  await traeRoles();
  idUsuario = Number(route.params.idUsuario);
  await traeUsuarioId(Number(idUsuario));
});
</script>

<style lang="scss" scoped></style>
