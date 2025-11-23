<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Carrera</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="CarreraSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Carrera</label>
            <Field name="idCarrera" type="number" class="form-control" />
            <ErrorMessage name="idCarrera" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre de la carrera</label>
            <Field name="nombre" type="text" class="form-control" />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Acreditado</label>
            <Field name="acreditado" as="select" class="form-control">
              <option value="">Seleccione una opción</option>
              <option :value="0">No</option>
              <option :value="1">Sí</option>
            </Field>
            <ErrorMessage name="acreditado" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Carrera
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCarrera } from "../controladores/useCarrera";
const { agregarCarrera, mensaje, mensajeError } = useCarrera();
import { Field, Form, ErrorMessage } from "vee-validate";
import { CarreraSchema } from "../schemas/CarreraSchema";

const onTodoBien = async (values: any) => {
  await agregarCarrera(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
