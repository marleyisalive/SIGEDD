<template>
  <div class="container mt-5" v-if="carrera[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Carrera</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="CarreraSchema"
          @submit="onTodoBien"
          :initial-values="{
            idCarrera: carrera[0].idCarrera,
            nombre: carrera[0].nombre,
            acreditado: carrera[0].acreditado,
          }"
        >
          <div class="mb-3">
            <label>Id Carrera</label>
            <Field
              name="idCarrera"
              type="number"
              class="form-control"
              disabled
            />
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
import { useCarrera } from "../controladores/useCarrera";
const { traeCarreraId, actualizarCarrera, mensaje, mensajeError, carrera } =
  useCarrera();
import { Field, Form, ErrorMessage } from "vee-validate";
import { CarreraSchema } from "../schemas/CarreraSchema";

let idCarrera = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarCarrera(values);
};

onMounted(async () => {
  idCarrera = Number(route.params.idCarrera);
  await traeCarreraId(Number(idCarrera));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
