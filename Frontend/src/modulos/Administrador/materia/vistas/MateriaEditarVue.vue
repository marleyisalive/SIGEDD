<template>
  <div class="container mt-5" v-if="materia[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Materia</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="MateriaSchema"
          @submit="onTodoBien"
          :initial-values="{
            idMateria: materia[0].idMateria,
            nombre: materia[0].nombre,
            idDepartamento: materia[0].idDepartamento,
            creditos: materia[0].creditos,
          }"
        >
          <div class="mb-3">
            <label>Id Materia</label>
            <Field
              name="idMateria"
              type="number"
              class="form-control"
              disabled
            />
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
import { useMateria } from "../controladores/useMateria";
const {
  traeMateriaId,
  actualizarMateria,
  traeDepartamentos,
  departamentos,
  mensaje,
  mensajeError,
  materia,
} = useMateria();
import { Field, Form, ErrorMessage } from "vee-validate";
import { MateriaSchema } from "../schemas/MateriaSchema";

let idMateria = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarMateria(values);
};

onMounted(async () => {
  await traeDepartamentos();
  idMateria = Number(route.params.idMateria);
  await traeMateriaId(Number(idMateria));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
