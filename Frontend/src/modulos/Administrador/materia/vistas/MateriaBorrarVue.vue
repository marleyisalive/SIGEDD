<template>
  <div class="container mt-5" v-if="materia[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Materia</h4>
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
          Id Materia
          <input
            type="text"
            class="form-control"
            v-model="materia[0].idMateria"
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre de la materia
          <input
            type="text"
            class="form-control"
            v-model="materia[0].nombre"
            disabled
          />
        </div>
        <div class="mb-3">
          Departamento
          <input
            type="text"
            class="form-control"
            :value="obtenerNombreDepartamento(materia[0].idDepartamento)"
            disabled
          />
        </div>
        <div class="mb-3">
          Créditos
          <input
            type="text"
            class="form-control"
            v-model="materia[0].creditos"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarMateria(materia[0])">
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

import { useMateria } from "../controladores/useMateria";
const {
  traeMateriaId,
  borrarMateria,
  traeDepartamentos,
  obtenerNombreDepartamento,
  mensaje,
  mensajeError,
  materia,
} = useMateria();

let idMateria = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/materia");
    }
  }
);

onMounted(async () => {
  await traeDepartamentos();
  idMateria = Number(route.params.idMateria);
  await traeMateriaId(Number(idMateria));
});
</script>

<style lang="scss" scoped></style>
