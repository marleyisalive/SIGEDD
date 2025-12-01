<template>
  <div class="container mt-5" v-if="grupo[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Grupo</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="GrupoSchema"
          @submit="onTodoBien"
          :initial-values="{
            idGrupo: grupo[0].idGrupo,
            idDocente: grupo[0].idDocente,
            idMateria: grupo[0].idMateria,
            idAula: grupo[0].idAula,
            periodo: grupo[0].periodo,
            horario: grupo[0].horario,
            numeroAlumnos: grupo[0].numeroAlumnos,
          }"
        >
          <div class="mb-3">
            <label>ID Grupo</label>
            <Field name="idGrupo" type="number" class="form-control" disabled />
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
            <Field name="periodo" as="select" class="form-control">
              <option value="">Seleccione un periodo</option>
              <option value="ENE-JUN 2024">ENE-JUN 2024</option>
              <option value="AGO-DIC 2024">AGO-DIC 2024</option>
            </Field>
            <ErrorMessage name="periodo" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Horario</label>
            <Field name="horario" as="select" class="form-control">
              <option value="">Seleccione un horario</option>
              <option value="07:00 - 08:00">07:00 - 08:00</option>
              <option value="08:00 - 09:00">08:00 - 09:00</option>
              <option value="09:00 - 10:00">09:00 - 10:00</option>
              <option value="10:00 - 11:00">10:00 - 11:00</option>
              <option value="11:00 - 12:00">11:00 - 12:00</option>
              <option value="12:00 - 13:00">12:00 - 13:00</option>
              <option value="13:00 - 14:00">13:00 - 14:00</option>
              <option value="14:00 - 15:00">14:00 - 15:00</option>
              <option value="15:00 - 16:00">15:00 - 16:00</option>
              <option value="16:00 - 17:00">16:00 - 17:00</option>
              <option value="17:00 - 18:00">17:00 - 18:00</option>
              <option value="18:00 - 19:00">18:00 - 19:00</option>
              <option value="19:00 - 20:00">19:00 - 20:00</option>
              <option value="20:00 - 21:00">20:00 - 21:00</option>
            </Field>
            <ErrorMessage name="horario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Número de alumnos</label>
            <Field name="numeroAlumnos" type="number" class="form-control" />
            <ErrorMessage name="numeroAlumnos" class="errorValidacion" />
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
import { useGrupo } from "../controladores/useGrupo";
import { GrupoSchema } from "../schemas/GrupoSchema";

const {
  traeGrupoId,
  actualizarGrupoData,
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
  grupo,
} = useGrupo();

let idGrupo = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarGrupoData(idGrupo, values);
};

onMounted(async () => {
  await traeUsuarios();
  await traeDocentes();
  await traeMaterias();
  await traeAulas();
  idGrupo = Number(route.params.idGrupo);
  await traeGrupoId(Number(idGrupo));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
