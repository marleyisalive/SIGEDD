<template>
  <div class="container mt-5" v-if="nivelEstudio[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Nivel de Estudio</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="NivelEstudioSchema"
          @submit="onTodoBien"
          :initial-values="{
            idNivelEstudio: nivelEstudio[0].idNivelEstudio,
            nombre: nivelEstudio[0].nombre,
          }"
        >
          <div class="mb-3">
            <label>Id Nivel de Estudio</label>
            <Field
              name="idNivelEstudio"
              type="number"
              class="form-control"
              disabled
            />
            <ErrorMessage name="idNivelEstudio" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre del nivel de estudio</label>
            <Field name="nombre" type="text" class="form-control" />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">Actualizar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNivelEstudio } from "../controladores/useNivelEstudio";
const {
  traeNivelEstudioId,
  actualizarNivelEstudio,
  mensaje,
  mensajeError,
  nivelEstudio,
} = useNivelEstudio();
import { Field, Form, ErrorMessage } from "vee-validate";
import { NivelEstudioSchema } from "../schemas/NivelEstudioSchema";

let idNivelEstudio = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarNivelEstudio(values);
};

onMounted(async () => {
  idNivelEstudio = Number(route.params.idNivelEstudio);
  await traeNivelEstudioId(Number(idNivelEstudio));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
