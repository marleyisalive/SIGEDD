<template>
  <div class="container mt-5" v-if="plaza[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Plaza</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="PlazaSchema"
          @submit="onTodoBien"
          :initial-values="{
            idPlaza: plaza[0].idPlaza,
            descripcion: plaza[0].descripcion,
          }"
        >
          <div class="mb-3">
            <label>Id Plaza</label>
            <Field name="idPlaza" type="number" class="form-control" disabled />
            <ErrorMessage name="idPlaza" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Descripción de la plaza</label>
            <Field name="descripcion" type="text" class="form-control" />
            <ErrorMessage name="descripcion" class="errorValidacion" />
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
import { usePlaza } from "../controladores/usePlaza";
const { traePlazaId, actualizarPlaza, mensaje, mensajeError, plaza } =
  usePlaza();
import { Field, Form, ErrorMessage } from "vee-validate";
import { PlazaSchema } from "../schemas/PlazaSchema";

let idPlaza = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarPlaza(values);
};

onMounted(async () => {
  idPlaza = Number(route.params.idPlaza);
  await traePlazaId(Number(idPlaza));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
