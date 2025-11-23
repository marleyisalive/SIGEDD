<template>
  <div class="container mt-5" v-if="nivelEstudio[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Nivel de Estudio</h4>
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
          Id Nivel de Estudio
          <input
            type="text"
            class="form-control"
            v-model="nivelEstudio[0].idNivelEstudio"
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre del nivel de estudio
          <input
            type="text"
            class="form-control"
            v-model="nivelEstudio[0].nombre"
            disabled
          />
        </div>
        <div class="mb-3">
          <button
            class="btn btn-danger"
            @click="borrarNivelEstudio(nivelEstudio[0])"
          >
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

import { useNivelEstudio } from "../controladores/useNivelEstudio";
const {
  traeNivelEstudioId,
  borrarNivelEstudio,
  mensaje,
  mensajeError,
  nivelEstudio,
} = useNivelEstudio();

let idNivelEstudio = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/nivelEstudio");
    }
  }
);

onMounted(async () => {
  idNivelEstudio = Number(route.params.idNivelEstudio);
  await traeNivelEstudioId(Number(idNivelEstudio));
});
</script>

<style lang="scss" scoped></style>
