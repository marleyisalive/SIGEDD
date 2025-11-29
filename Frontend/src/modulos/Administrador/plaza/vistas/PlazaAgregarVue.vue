<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Plaza</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="PlazaSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Plaza</label>
            <Field name="idPlaza" type="number" class="form-control" />
            <ErrorMessage name="idPlaza" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Descripción de la plaza</label>
            <Field name="descripcion" type="text" class="form-control" />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">Agregar Plaza</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlaza } from "../controladores/usePlaza";
const { agregarPlaza, mensaje, mensajeError } = usePlaza();
import { Field, Form, ErrorMessage } from "vee-validate";
import { PlazaSchema } from "../schemas/PlazaSchema";

const onTodoBien = async (values: any) => {
  await agregarPlaza(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
