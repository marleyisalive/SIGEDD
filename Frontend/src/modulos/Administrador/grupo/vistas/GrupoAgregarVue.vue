<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Grupo</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="GrupoSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Grupo</label>
            <Field name="idGrupo" type="number" class="form-control" />
            <ErrorMessage name="idGrupo" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Docente</label>
            <Field name="idDocente" as="select" class="form-control">
              <option value="">Seleccione un docente</option>
              <option
                v-for="docente in docentes"
                :key="docente.idDocente"
                :value="docente.idDocente"
              >
                {{ docente.usuario?.nombreUsuario }}
                {{ docente.usuario?.apePatUsuario }}
                {{ docente.usuario?.apeMatUsuario }} - {{ docente.idDocente }}
              </option>
            </Field>
            <ErrorMessage name="idDocente" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Materia</label>
            <Field name="idMateria" as="select" class="form-control">
              <option value="">Seleccione una materia</option>
              <option
                v-for="materia in materias"
                :key="materia.idMateria"
                :value="materia.idMateria"
              >
                {{ materia.nombre }} - {{ materia.idMateria }}
              </option>
            </Field>
            <ErrorMessage name="idMateria" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Aula</label>
            <Field name="idAula" as="select" class="form-control">
              <option value="">Seleccione un aula</option>
              <option
                v-for="aula in aulas"
                :key="aula.idAula"
                :value="aula.idAula"
              >
                {{ aula.nombre }} - {{ aula.idAula }}
              </option>
            </Field>
            <ErrorMessage name="idAula" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Periodo</label>
            <Field name="periodo" type="text" class="form-control" />
            <ErrorMessage name="periodo" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Horario</label>
            <Field name="horario" type="text" class="form-control" />
            <ErrorMessage name="horario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Número de alumnos</label>
            <Field name="numeroAlumnos" type="number" class="form-control" />
            <ErrorMessage name="numeroAlumnos" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">Agregar Grupo</button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { Field, Form, ErrorMessage } from "vee-validate";
import { useGrupo } from "../controladores/useGrupo";
import { GrupoSchema } from "../schemas/GrupoSchema";

const {
  agregarGrupo,
  traeDocentes,
  traeMaterias,
  traeAulas,
  traeUsuarios,
  docentes,
  materias,
  aulas,
  usuarios,
  mensaje,
  mensajeError,
} = useGrupo();

onMounted(async () => {
  await traeUsuarios();
  await traeDocentes();
  await traeMaterias();
  await traeAulas();
});

const onTodoBien = async (values: any) => {
  await agregarGrupo(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
