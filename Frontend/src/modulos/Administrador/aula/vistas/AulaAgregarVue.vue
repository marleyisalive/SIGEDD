<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Aula</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="AulaSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Aula</label>
            <Field name="idAula" type="number" class="form-control" />
            <ErrorMessage name="idAula" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre del aula</label>
            <Field name="nombre" type="text" class="form-control" />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">Agregar Aula</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAula } from "../controladores/useAula";
const { agregarAula, mensaje, mensajeError } = useAula();
import { Field, Form, ErrorMessage } from "vee-validate";
import { AulaSchema } from "../schemas/AulaSchema";

const onTodoBien = async (values: any) => {
  await agregarAula(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
