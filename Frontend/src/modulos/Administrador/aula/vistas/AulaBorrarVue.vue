<template>
  <div class="container mt-5" v-if="aula[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Aula</h4>
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
          Id Aula
          <input
            type="text"
            class="form-control"
            v-model="aula[0].idAula"
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre del aula
          <input
            type="text"
            class="form-control"
            v-model="aula[0].nombre"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarAula(aula[0])">
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

import { useAula } from "../controladores/useAula";
const { traeAulaId, borrarAula, mensaje, mensajeError, aula } = useAula();

let idAula = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/aula");
    }
  }
);

onMounted(async () => {
  idAula = Number(route.params.idAula);
  await traeAulaId(Number(idAula));
});
</script>

<style lang="scss" scoped></style>
