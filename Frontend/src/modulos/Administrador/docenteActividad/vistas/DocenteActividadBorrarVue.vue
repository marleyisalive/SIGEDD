<template>
  <div class="container mt-5" v-if="docenteActividad[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Actividad de Docente</h4>
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
          <label>Id Actividad de Docente</label>
          <input
            type="text"
            class="form-control"
            v-model="docenteActividad[0].idDocenteActividad"
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Actividad Institucional</label>
          <input
            type="text"
            class="form-control"
            :value="
              obtenerNombreActividadInstitucional(
                docenteActividad[0].idActividadInstitucional
              )
            "
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Docente</label>
          <input
            type="text"
            class="form-control"
            :value="obtenerNombreDocente(docenteActividad[0].idDocente)"
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Datos Capturados</label>
          <pre class="json-display">{{ datosFormateados }}</pre>
        </div>
        <div class="mb-3">
          <label>Fecha de Registro</label>
          <input
            type="text"
            class="form-control"
            :value="formatearFecha(docenteActividad[0].fechaRegistro)"
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Validado Por</label>
          <input
            type="text"
            class="form-control"
            :value="
              obtenerNombreUsuario(docenteActividad[0].validadoPor || null)
            "
            disabled
          />
        </div>
        <div class="mb-3">
          <label>Fecha de Validación</label>
          <input
            type="text"
            class="form-control"
            :value="formatearFecha(docenteActividad[0].fechaValidacion)"
            disabled
          />
        </div>
        <div class="mb-3">
          <button
            class="btn btn-danger"
            @click="borrarDocenteActividad(docenteActividad[0])"
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

import { useDocenteActividad } from "../controladores/useDocenteActividad";
const {
  traeDocenteActividadId,
  borrarDocenteActividad,
  mensaje,
  mensajeError,
  docenteActividad,
  traeActividadesInstitucionales,
  traeDocentes,
  traeUsuarios,
  obtenerNombreActividadInstitucional,
  obtenerNombreDocente,
  obtenerNombreUsuario,
  formatearJSON,
  formatearFecha,
} = useDocenteActividad();

let idDocenteActividad = 0;
const route = useRoute();
const routeRedirect = useRouter();

// Computed para mostrar el JSON formateado
const datosFormateados = computed(() => {
  if (docenteActividad.value[0]?.datosCapturados) {
    return formatearJSON(docenteActividad.value[0].datosCapturados);
  }
  return "";
});

watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/docenteActividad");
    }
  }
);

onMounted(async () => {
  idDocenteActividad = Number(route.params.idDocenteActividad);
  await traeDocenteActividadId(Number(idDocenteActividad));
  await traeActividadesInstitucionales();
  await traeDocentes();
  await traeUsuarios();
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
