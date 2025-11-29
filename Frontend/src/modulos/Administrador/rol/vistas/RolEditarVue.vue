<template>
  <div class="container mt-5" v-if="rol[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Rol</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="RolSchema"
          @submit="onTodoBien"
          :initial-values="{
            idRol: rol[0].idRol,
            descripcion: rol[0].descripcion,
          }"
        >
          <div class="mb-3">
            <label>Id Rol</label>
            <Field name="idRol" type="number" class="form-control" disabled />
            <ErrorMessage name="idRol" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Descripción del rol</label>
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
import { useRol } from "../controladores/useRol";
const { traeRolId, actualizarRol, mensaje, mensajeError, rol } = useRol();
import { Field, Form, ErrorMessage } from "vee-validate";
import { RolSchema } from "../schemas/RolSchema";

let idRol = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarRol(values);
};

onMounted(async () => {
  idRol = Number(route.params.idRol);
  await traeRolId(Number(idRol));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
