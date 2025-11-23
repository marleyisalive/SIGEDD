<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Nivel de Estudio</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="NivelEstudioSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Nivel de Estudio</label>
            <Field name="idNivelEstudio" type="number" class="form-control" />
            <ErrorMessage name="idNivelEstudio" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre del nivel de estudio</label>
            <Field name="nombre" type="text" class="form-control" />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Nivel de Estudio
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNivelEstudio } from "../controladores/useNivelEstudio";
const { agregarNivelEstudio, mensaje, mensajeError } = useNivelEstudio();
import { Field, Form, ErrorMessage } from "vee-validate";
import { NivelEstudioSchema } from "../schemas/NivelEstudioSchema";

const onTodoBien = async (values: any) => {
  await agregarNivelEstudio(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
