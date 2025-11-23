<template>
  <div class="container mt-5" v-if="aula[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Aula</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="AulaSchema"
          @submit="onTodoBien"
          :initial-values="{ idAula: aula[0].idAula, nombre: aula[0].nombre }"
        >
          <div class="mb-3">
            <label>Id Aula</label>
            <Field name="idAula" type="number" class="form-control" disabled />
            <ErrorMessage name="idAula" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre del aula</label>
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
import { useAula } from "../controladores/useAula";
const { traeAulaId, actualizarAula, mensaje, mensajeError, aula } = useAula();
import { Field, Form, ErrorMessage } from "vee-validate";
import { AulaSchema } from "../schemas/AulaSchema";

let idAula = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarAula(values);
};

onMounted(async () => {
  idAula = Number(route.params.idAula);
  await traeAulaId(Number(idAula));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
