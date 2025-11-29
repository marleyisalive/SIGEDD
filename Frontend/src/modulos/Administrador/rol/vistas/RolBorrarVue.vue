<template>
  <div class="container mt-5" v-if="rol[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Rol</h4>
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
          Id Rol
          <input
            type="text"
            class="form-control"
            v-model="rol[0].idRol"
            disabled
          />
        </div>
        <div class="mb-3">
          Descripción del rol
          <input
            type="text"
            class="form-control"
            v-model="rol[0].descripcion"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarRol(rol[0])">
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

import { useRol } from "../controladores/useRol";
const { traeRolId, borrarRol, mensaje, mensajeError, rol } = useRol();

let idRol = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/rol");
    }
  }
);

onMounted(async () => {
  idRol = Number(route.params.idRol);
  await traeRolId(Number(idRol));
});
</script>

<style lang="scss" scoped></style>
