<template>
  <div class="container mt-5" v-if="departamento[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Departamento</h4>
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
          Id Departamento
          <input
            type="text"
            class="form-control"
            v-model="departamento[0].idDepartamento"
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre del departamento
          <input
            type="text"
            class="form-control"
            v-model="departamento[0].nombreDepartamento"
            disabled
          />
        </div>
        <div class="mb-3">
          Encargado del departamento
          <input
            type="text"
            class="form-control"
            :value="obtenerNombreUsuario(departamento[0].encargadoDepartamento)"
            disabled
          />
        </div>
        <div class="mb-3">
          <button
            class="btn btn-danger"
            @click="borrarDepartamento(departamento[0])"
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

import { useDepartamento } from "../controladores/useDepartamento";
const {
  traeDepartamentoId,
  traeUsuarios,
  obtenerNombreUsuario,
  borrarDepartamento,
  mensaje,
  mensajeError,
  departamento,
} = useDepartamento();

let idDepartamento = 0;
const route = useRoute();
const routeRedirect = useRouter();

//observador - watch
watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/departamento");
    }
  }
);

onMounted(async () => {
  await traeUsuarios();
  idDepartamento = Number(route.params.idDepartamento);
  await traeDepartamentoId(Number(idDepartamento));
});
</script>

<style lang="scss" scoped></style>
