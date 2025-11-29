<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Departamento</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="DepartamentoSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Departamento</label>
            <Field name="idDepartamento" type="number" class="form-control" />
            <ErrorMessage name="idDepartamento" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre del departamento</label>
            <Field name="nombreDepartamento" type="text" class="form-control" />
            <ErrorMessage name="nombreDepartamento" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Encargado del departamento</label>
            <Field
              name="encargadoDepartamento"
              as="select"
              class="form-control"
            >
              <option value="">Seleccione un usuario</option>
              <option
                v-for="usuario in usuarios"
                :key="usuario.idUsuario"
                :value="usuario.idUsuario"
              >
                {{ usuario.nombreUsuario }} {{ usuario.apePatUsuario }}
                {{ usuario.apeMatUsuario }} - {{ usuario.idUsuario }}
              </option>
            </Field>
            <ErrorMessage
              name="encargadoDepartamento"
              class="errorValidacion"
            />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Departamento
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useDepartamento } from "../controladores/useDepartamento";
import { DepartamentoSchema } from "../schemas/DepartamentoSchema";

const { agregarDepartamento, traeUsuarios, usuarios, mensaje, mensajeError } =
  useDepartamento();

onMounted(async () => {
  await traeUsuarios();
});

const onTodoBien = async (values: any) => {
  await agregarDepartamento(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
