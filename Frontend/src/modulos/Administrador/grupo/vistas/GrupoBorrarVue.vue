<template>
  <div class="container mt-5" v-if="grupo[0]">
    <div class="card">
      <div class="card-header">
        <h4>Eliminar Grupo</h4>
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
          ID Grupo
          <input
            type="text"
            class="form-control"
            v-model="grupo[0].idGrupo"
            disabled
          />
        </div>
        <div class="mb-3">
          Docente
          <input
            type="text"
            class="form-control"
            :value="nombreDocente"
            disabled
          />
        </div>
        <div class="mb-3">
          Materia
          <input
            type="text"
            class="form-control"
            :value="nombreMateria"
            disabled
          />
        </div>
        <div class="mb-3">
          Aula
          <input
            type="text"
            class="form-control"
            :value="nombreAula"
            disabled
          />
        </div>
        <div class="mb-3">
          Período
          <input
            type="text"
            class="form-control"
            v-model="grupo[0].periodo"
            disabled
          />
        </div>
        <div class="mb-3">
          Horario
          <input
            type="text"
            class="form-control"
            v-model="grupo[0].horario"
            disabled
          />
        </div>
        <div class="mb-3">
          Número de Alumnos
          <input
            type="number"
            class="form-control"
            v-model="grupo[0].numeroAlumnos"
            disabled
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-danger" @click="borrarGrupo(grupo[0])">
            Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, watch, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGrupo } from "../controladores/useGrupo";

const {
  traeGrupoId,
  borrarGrupo,
  mensaje,
  mensajeError,
  grupo,
  obtenerNombreDocente,
  obtenerNombreMateria,
  obtenerNombreAula,
} = useGrupo();

const nombreDocente = ref("");
const nombreMateria = ref("");
const nombreAula = ref("");

let idGrupo = 0;
const route = useRoute();
const routeRedirect = useRouter();

watch(
  () => mensaje.value,
  (newValue) => {
    if (newValue === 1) {
      routeRedirect.push("/grupo");
    }
  }
);

onMounted(async () => {
  idGrupo = Number(route.params.idGrupo);
  await traeGrupoId(idGrupo);
  if (grupo.value[0]) {
    nombreDocente.value = await obtenerNombreDocente(grupo.value[0].idDocente);
    nombreMateria.value = await obtenerNombreMateria(grupo.value[0].idMateria);
    nombreAula.value = await obtenerNombreAula(grupo.value[0].idAula);
  }
});
</script>

<style lang="scss" scoped></style>
