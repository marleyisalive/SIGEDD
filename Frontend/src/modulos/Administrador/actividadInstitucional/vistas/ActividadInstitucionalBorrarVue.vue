<template>
  <div class="container mt-5" v-if="actividadInstitucional[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Actividad Institucional</h4>
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
          Id Actividad Institucional
          <input
            type="text"
            class="form-control"
            v-model="actividadInstitucional[0].idActividadInstitucional"
            disabled
          />
        </div>
        <div class="mb-3">
          Tipo de Documento
          <input
            type="text"
            class="form-control"
            :value="
              obtenerNombreTipoDocumento(
                actividadInstitucional[0].idTipoDocumento
              )
            "
            disabled
          />
        </div>
        <div class="mb-3">
          Nombre de la Actividad
          <input
            type="text"
            class="form-control"
            v-model="actividadInstitucional[0].nombre"
            disabled
          />
        </div>
        <div class="mb-3">
          Descripción
          <textarea
            class="form-control"
            rows="3"
            v-model="actividadInstitucional[0].descripcion"
            disabled
          ></textarea>
        </div>
        <div class="mb-3">
          Periodo
          <input
            type="text"
            class="form-control"
            v-model="actividadInstitucional[0].periodo"
            disabled
          />
        </div>
        <div class="mb-3">
          Fecha de Inicio
          <input
            type="text"
            class="form-control"
            v-model="actividadInstitucional[0].fechaInicio"
            disabled
          />
        </div>
        <div class="mb-3">
          Fecha de Fin
          <input
            type="text"
            class="form-control"
            v-model="actividadInstitucional[0].fechaFin"
            disabled
          />
        </div>
        <div class="mb-3">
          <button
            class="btn btn-danger"
            @click="borrarActividadInstitucional(actividadInstitucional[0])"
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

import { useActividadInstitucional } from "../controladores/useActividadInstitucional";
const {
  traeActividadInstitucionalId,
  borrarActividadInstitucional,
  mensaje,
  mensajeError,
  actividadInstitucional,
  traeTiposDocumento,
  obtenerNombreTipoDocumento,
} = useActividadInstitucional();

let idActividadInstitucional = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/actividadInstitucional");
    }
  }
);

onMounted(async () => {
  await traeTiposDocumento();
  idActividadInstitucional = Number(route.params.idActividadInstitucional);
  await traeActividadInstitucionalId(Number(idActividadInstitucional));
});
</script>

<style lang="scss" scoped></style>
