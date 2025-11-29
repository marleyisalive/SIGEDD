<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Actividad Institucional</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="ActividadInstitucionalSchema"
          @submit="onTodoBien"
        >
          <div class="mb-3">
            <label>Id Actividad Institucional</label>
            <Field
              name="idActividadInstitucional"
              type="number"
              class="form-control"
            />
            <ErrorMessage
              name="idActividadInstitucional"
              class="errorValidacion"
            />
          </div>
          <div class="mb-3">
            <label>Tipo de Documento</label>
            <Field name="idTipoDocumento" as="select" class="form-control">
              <option value="">Seleccione un tipo de documento</option>
              <option
                v-for="tipoDoc in tiposDocumento"
                :key="tipoDoc.idTipoDocumento"
                :value="tipoDoc.idTipoDocumento"
              >
                {{ tipoDoc.nombre }} - {{ tipoDoc.idTipoDocumento }}
              </option>
            </Field>
            <ErrorMessage name="idTipoDocumento" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre de la Actividad</label>
            <Field name="nombre" type="text" class="form-control" />
            <ErrorMessage name="nombre" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Descripción (opcional)</label>
            <Field
              name="descripcion"
              as="textarea"
              rows="3"
              class="form-control"
            />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Periodo (opcional)</label>
            <Field
              name="periodo"
              type="text"
              class="form-control"
              placeholder="Ej: ENE-JUN 2024"
            />
            <ErrorMessage name="periodo" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Fecha de Inicio (opcional)</label>
            <Field name="fechaInicio" type="date" class="form-control" />
            <ErrorMessage name="fechaInicio" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Fecha de Fin (opcional)</label>
            <Field name="fechaFin" type="date" class="form-control" />
            <ErrorMessage name="fechaFin" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Actividad Institucional
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useActividadInstitucional } from "../controladores/useActividadInstitucional";
const {
  agregarActividadInstitucional,
  mensaje,
  mensajeError,
  traeTiposDocumento,
  tiposDocumento,
} = useActividadInstitucional();
import { Field, Form, ErrorMessage } from "vee-validate";
import { ActividadInstitucionalSchema } from "../schemas/ActividadInstitucionalSchema";

const onTodoBien = async (values: any) => {
  await agregarActividadInstitucional(values);
};

onMounted(async () => {
  await traeTiposDocumento();
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
