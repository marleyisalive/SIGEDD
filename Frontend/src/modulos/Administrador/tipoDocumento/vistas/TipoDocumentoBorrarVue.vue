<template>
  <div class="container mt-5" v-if="tipoDocumento[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Tipo de Documento</h4>
      </div>
      <div class="alert alert-warning" role="alert">
        ¿Seguro de borrar la información?
        <i class="fa fa-warning"></i>
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <div class="mb-3">
          <label>Id Tipo de Documento</label>
          <input
            type="text"
            class="form-control"
            v-model="tipoDocumento[0].idTipoDocumento"
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Nombre</label>
          <input
            type="text"
            class="form-control"
            v-model="tipoDocumento[0].nombre"
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Descripción</label>
          <textarea
            class="form-control"
            rows="3"
            v-model="tipoDocumento[0].descripcion"
            disabled
          ></textarea>
        </div>
        <div class="mb-3">
          <label>Plantilla JSON</label>
          <pre class="json-display">{{ plantillaFormateada }}</pre>
        </div>
        <div class="mb-3">
          <button
            class="btn btn-danger"
            @click="borrarTipoDocumento(tipoDocumento[0])"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import { useTipoDocumento } from "../controladores/useTipoDocumento";
const {
  traeTipoDocumentoId,
  borrarTipoDocumento,
  mensaje,
  mensajeError,
  tipoDocumento,
  formatearJSON,
} = useTipoDocumento();

let idTipoDocumento = 0;
const route = useRoute();
const routeRedirect = useRouter();

// Computed para mostrar el JSON formateado
const plantillaFormateada = computed(() => {
  if (tipoDocumento.value[0]?.plantillaJSON) {
    return formatearJSON(tipoDocumento.value[0].plantillaJSON);
  }
  return "";
});

watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/tipoDocumento");
    }
  }
);

onMounted(async () => {
  idTipoDocumento = Number(route.params.idTipoDocumento);
  await traeTipoDocumentoId(Number(idTipoDocumento));
});
</script>

<style lang="scss" scoped>
.json-display {
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 10px;
  font-family: monospace;
  font-size: 14px;
  white-space: pre-wrap;
  word-wrap: break-word;
}
</style>
