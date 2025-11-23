<template>
  <div class="container mt-5" v-if="carrera[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Carrera</h4>
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
          Id Carrera
          <input
            type="text"
            class="form-control"
            v-model="carrera[0].idCarrera"
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre de la carrera
          <input
            type="text"
            class="form-control"
            v-model="carrera[0].nombre"
            disabled
          />
        </div>
        <div class="mb-3">
          Acreditado
          <input
            type="text"
            class="form-control"
            :value="carrera[0].acreditado ? 'Sí' : 'No'"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarCarrera(carrera[0])">
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

import { useCarrera } from "../controladores/useCarrera";
const { traeCarreraId, borrarCarrera, mensaje, mensajeError, carrera } =
  useCarrera();

let idCarrera = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/carrera");
    }
  }
);

onMounted(async () => {
  idCarrera = Number(route.params.idCarrera);
  await traeCarreraId(Number(idCarrera));
});
</script>

<style lang="scss" scoped></style>
