<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Docente</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="DocenteSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Docente</label>
            <Field name="idDocente" type="number" class="form-control" />
            <ErrorMessage name="idDocente" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Usuario</label>
            <Field name="idUsuario" as="select" class="form-control">
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
            <ErrorMessage name="idUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Filiación (18 caracteres)</label>
            <Field name="filiacion" type="text" class="form-control" />
            <ErrorMessage name="filiacion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nivel de Estudio</label>
            <Field name="idNivelEstudio" as="select" class="form-control">
              <option value="">Seleccione un nivel de estudio</option>
              <option
                v-for="nivel in niveles"
                :key="nivel.idNivelEstudio"
                :value="nivel.idNivelEstudio"
              >
                {{ nivel.nombre }} - {{ nivel.idNivelEstudio }}
              </option>
            </Field>
            <ErrorMessage name="idNivelEstudio" class="errorValidacion" />
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
                {{ departamento.nombreDepartamento }} -
                {{ departamento.idDepartamento }}
              </option>
            </Field>
            <ErrorMessage name="idDepartamento" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Plaza</label>
            <Field name="idPlaza" as="select" class="form-control">
              <option value="">Seleccione una plaza</option>
              <option
                v-for="plaza in plazas"
                :key="plaza.idPlaza"
                :value="plaza.idPlaza"
              >
                {{ plaza.descripcion }} - {{ plaza.idPlaza }}
              </option>
            </Field>
            <ErrorMessage name="idPlaza" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Estatus de Exclusividad</label>
            <Field name="estatusExclusividad" as="select" class="form-control">
              <option value="">Seleccione un estatus</option>
              <option :value="0">No - 0</option>
              <option :value="1">Sí - 1</option>
            </Field>
            <ErrorMessage name="estatusExclusividad" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Folio EDD (opcional, exactamente 9 caracteres)</label>
            <Field name="folioEdd" type="text" class="form-control" />
            <ErrorMessage name="folioEdd" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">Guardar</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useDocente } from "../controladores/useDocente";
import { DocenteSchema } from "../schemas/DocenteSchema";

const {
  agregarDocente,
  traeUsuarios,
  traeNiveles,
  traeDepartamentos,
  traePlazas,
  usuarios,
  niveles,
  departamentos,
  plazas,
  mensaje,
  mensajeError,
} = useDocente();

const onTodoBien = async (values: any) => {
  await agregarDocente(values);
};

onMounted(async () => {
  await traeUsuarios();
  await traeNiveles();
  await traeDepartamentos();
  await traePlazas();
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
