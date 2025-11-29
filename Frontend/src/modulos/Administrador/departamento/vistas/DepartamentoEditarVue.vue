<template>
  <div class="container mt-5" v-if="departamento[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Departamento</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="DepartamentoSchema"
          @submit="onTodoBien"
          :initial-values="{
            idDepartamento: departamento[0].idDepartamento,
            nombreDepartamento: departamento[0].nombreDepartamento,
            encargadoDepartamento: departamento[0].encargadoDepartamento,
          }"
        >
          <div class="mb-3">
            <label>Id Departamento</label>
            <Field
              name="idDepartamento"
              type="number"
              class="form-control"
              disabled
            />
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
import { Field, Form, ErrorMessage } from "vee-validate";
import { useDepartamento } from "../controladores/useDepartamento";
import { DepartamentoSchema } from "../schemas/DepartamentoSchema";

const {
  traeDepartamentoId,
  actualizarDepartamento,
  traeUsuarios,
  usuarios,
  mensaje,
  mensajeError,
  departamento,
} = useDepartamento();

let idDepartamento = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarDepartamento(values);
};

onMounted(async () => {
  await traeUsuarios();
  idDepartamento = Number(route.params.idDepartamento);
  await traeDepartamentoId(Number(idDepartamento));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
