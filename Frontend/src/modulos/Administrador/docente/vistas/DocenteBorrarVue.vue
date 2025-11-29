<template>
  <div class="container mt-5" v-if="docente[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Docente</h4>
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
          Id Docente
          <input
            type="text"
            class="form-control"
            v-model="docente[0].idDocente"
            disabled
          />
        </div>
        <div class="mb-3">
          Usuario
          <input
            type="text"
            class="form-control"
            :value="obtenerNombreUsuario(docente[0].idUsuario)"
            disabled
          />
        </div>
        <div class="mb-3">
          Filiación
          <input
            type="text"
            class="form-control"
            v-model="docente[0].filiacion"
            disabled
          />
        </div>
        <div class="mb-3">
          Nivel de Estudio
          <input
            type="text"
            class="form-control"
            :value="obtenerNombreNivel(docente[0].idNivelEstudio)"
            disabled
          />
        </div>
        <div class="mb-3">
          Departamento
          <input
            type="text"
            class="form-control"
            :value="obtenerNombreDepartamento(docente[0].idDepartamento)"
            disabled
          />
        </div>
        <div class="mb-3">
          Plaza
          <input
            type="text"
            class="form-control"
            :value="obtenerNombrePlaza(docente[0].idPlaza)"
            disabled
          />
        </div>
        <div class="mb-3">
          Estatus de Exclusividad
          <input
            type="text"
            class="form-control"
            :value="docente[0].estatusExclusividad === 1 ? 'Sí' : 'No'"
            disabled
          />
        </div>
        <div class="mb-3">
          Folio EDD
          <input
            type="text"
            class="form-control"
            :value="docente[0].folioEdd || 'N/A'"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarDocente(docente[0])">
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

import { useDocente } from "../controladores/useDocente";
const {
  traeDocenteId,
  traeUsuarios,
  traeNiveles,
  traeDepartamentos,
  traePlazas,
  obtenerNombreUsuario,
  obtenerNombreNivel,
  obtenerNombreDepartamento,
  obtenerNombrePlaza,
  borrarDocente,
  mensaje,
  mensajeError,
  docente,
} = useDocente();

let idDocente = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/docente");
    }
  }
);

onMounted(async () => {
  await traeUsuarios();
  await traeNiveles();
  await traeDepartamentos();
  await traePlazas();
  idDocente = Number(route.params.idDocente);
  await traeDocenteId(Number(idDocente));
});
</script>

<style lang="scss" scoped></style>
