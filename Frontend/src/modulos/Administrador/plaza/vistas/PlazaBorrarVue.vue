<template>
  <div class="container mt-5" v-if="plaza[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Plaza</h4>
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
          Id Plaza
          <input
            type="text"
            class="form-control"
            v-model="plaza[0].idPlaza"
            disabled
          />
        </div>
        <div class="mb-3">
          Descripción de la plaza
          <input
            type="text"
            class="form-control"
            v-model="plaza[0].descripcion"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarPlaza(plaza[0])">
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

import { usePlaza } from "../controladores/usePlaza";
const { traePlazaId, borrarPlaza, mensaje, mensajeError, plaza } = usePlaza();

let idPlaza = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/plaza");
    }
  }
);

onMounted(async () => {
  idPlaza = Number(route.params.idPlaza);
  await traePlazaId(Number(idPlaza));
});
</script>

<style lang="scss" scoped></style>
