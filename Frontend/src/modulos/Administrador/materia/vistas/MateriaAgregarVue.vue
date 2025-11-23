<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Materia</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="MateriaSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Materia</label>
            <Field name="idMateria" type="number" class="form-control" />
            <ErrorMessage name="idMateria" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre de la materia</label>
            <Field name="nombre" type="text" class="form-control" />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Departamento</label>
            <Field name="idDepartamento" as="select" class="form-control">
              <option value="">Seleccione un departamento</option>
              <option
                v-for="departamento in departamentos"
                :key="departamento.idDepartamento"
                :value="departamento.idDepartamento"
              >
                {{ departamento.nombreDepartamento }}
              </option>
            </Field>
            <ErrorMessage name="idDepartamento" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Créditos</label>
            <Field name="creditos" type="number" class="form-control" />
            <ErrorMessage name="creditos" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Materia
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useMateria } from "../controladores/useMateria";
const {
  agregarMateria,
  traeDepartamentos,
  departamentos,
  mensaje,
  mensajeError,
} = useMateria();
import { Field, Form, ErrorMessage } from "vee-validate";
import { MateriaSchema } from "../schemas/MateriaSchema";

const onTodoBien = async (values: any) => {
  await agregarMateria(values);
};

onMounted(async () => {
  await traeDepartamentos();
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
