<template>
  <div class="container mt-5" v-if="docenteActividad[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Actividad de Docente</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="DocenteActividadSchema"
          :initial-values="initialValues"
          @submit="onTodoBien"
        >
          <div class="mb-3">
            <label>Id Actividad de Docente</label>
            <Field
              name="idDocenteActividad"
              type="number"
              class="form-control"
              disabled
            />
            <ErrorMessage name="idDocenteActividad" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Actividad Institucional</label>
            <Field
              name="idActividadInstitucional"
              as="select"
              class="form-control"
              @change="onActividadChange"
              v-model="actividadSeleccionada"
            >
              <option value="">Seleccione una actividad institucional</option>
              <option
                v-for="actividad in actividadesInstitucionales"
                :key="actividad.idActividadInstitucional"
                :value="actividad.idActividadInstitucional"
              >
                {{ actividad.nombre }} -
                {{ actividad.idActividadInstitucional }}
              </option>
            </Field>
            <ErrorMessage
              name="idActividadInstitucional"
              class="errorValidacion"
            />
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
                {{ obtenerNombreDocenteDropdown(docente) }}
              </option>
            </Field>
            <ErrorMessage name="idDocente" class="errorValidacion" />
          </div>

          <!-- Campos dinámicos según la plantilla del tipo de documento -->
          <div v-if="camposDinamicos.length > 0" class="mb-3">
            <h5 class="mb-3">Datos Capturados</h5>
            <div
              v-for="(campo, index) in camposDinamicos"
              :key="index"
              class="mb-3"
            >
              <label>{{ campo }}</label>
              <input
                type="text"
                class="form-control"
                v-model="valoresCampos[campo]"
                :placeholder="`Ingrese ${campo}`"
              />
            </div>
          </div>

          <!-- Campo oculto para datosCapturados -->
          <Field
            name="datosCapturados"
            type="hidden"
            v-model="datosCapturadosJSON"
          />
          <ErrorMessage name="datosCapturados" class="errorValidacion" />

          <div class="mb-3">
            <label>Validado Por (opcional)</label>
            <Field name="validadoPor" as="select" class="form-control">
              <option value="">Sin validar</option>
              <option
                v-for="usuario in usuarios"
                :key="usuario.idUsuario"
                :value="usuario.idUsuario"
              >
                {{ usuario.nombreUsuario }} {{ usuario.apePatUsuario }}
                {{ usuario.apeMatUsuario }} - {{ usuario.idUsuario }}
              </option>
            </Field>
            <ErrorMessage name="validadoPor" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Fecha de Validación (opcional)</label>
            <Field
              name="fechaValidacion"
              type="datetime-local"
              class="form-control"
            />
            <ErrorMessage name="fechaValidacion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Actualizar Actividad de Docente
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useDocenteActividad } from "../controladores/useDocenteActividad";
const {
  traeDocenteActividadId,
  actualizarDocenteActividad,
  mensaje,
  mensajeError,
  docenteActividad,
  traeActividadesInstitucionales,
  traeDocentes,
  traeUsuarios,
  traeTiposDocumento,
  actividadesInstitucionales,
  docentes,
  usuarios,
  formatearJSON,
  obtenerCamposPlantilla,
} = useDocenteActividad();
import { Field, Form, ErrorMessage } from "vee-validate";
import { DocenteActividadSchema } from "../schemas/DocenteActividadSchema";

const actividadSeleccionada = ref<number | null>(null);
const camposDinamicos = ref<string[]>([]);
const valoresCampos = ref<Record<string, string>>({});

const datosCapturadosJSON = computed(() => {
  return JSON.stringify(valoresCampos.value);
});

const onActividadChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const idActividad = target.value ? Number(target.value) : null;
  actividadSeleccionada.value = idActividad;

  if (idActividad) {
    camposDinamicos.value = obtenerCamposPlantilla(idActividad);
    // Mantener valores existentes si ya existen
    const nuevosValores: Record<string, string> = {};
    camposDinamicos.value.forEach((campo) => {
      nuevosValores[campo] = valoresCampos.value[campo] || "";
    });
    valoresCampos.value = nuevosValores;
  } else {
    camposDinamicos.value = [];
    valoresCampos.value = {};
  }
};

const obtenerNombreDocenteDropdown = (docente: any) => {
  const usuario = usuarios.value.find(
    (u: any) => u.idUsuario === docente.idUsuario
  );
  if (!usuario) return `Docente ID: ${docente.idDocente}`;
  return `${usuario.nombreUsuario} ${usuario.apePatUsuario || ""} ${
    usuario.apeMatUsuario || ""
  } - ${docente.idDocente}`.trim();
};

let idDocenteActividad = 0;
const route = useRoute();

const initialValues = computed(() => {
  if (!docenteActividad.value[0]) return {};

  const data = { ...docenteActividad.value[0] };

  // Formatear fechaValidacion si existe (de datetime a datetime-local format)
  if (data.fechaValidacion) {
    try {
      const date = new Date(data.fechaValidacion);
      // Formato: YYYY-MM-DDTHH:mm
      data.fechaValidacion = date.toISOString().slice(0, 16);
    } catch (error) {
      console.error("Error al formatear fechaValidacion:", error);
    }
  }

  // Formatear JSON para el textarea
  if (data.datosCapturados) {
    data.datosCapturados = formatearJSON(data.datosCapturados);
  }

  return data;
});

// Cargar valores existentes cuando se carga el registro
watch(
  () => docenteActividad.value[0],
  (newVal) => {
    if (newVal && newVal.idActividadInstitucional) {
      actividadSeleccionada.value = newVal.idActividadInstitucional;
      camposDinamicos.value = obtenerCamposPlantilla(
        newVal.idActividadInstitucional
      );

      // Cargar valores existentes
      try {
        const datosExistentes =
          typeof newVal.datosCapturados === "string"
            ? JSON.parse(newVal.datosCapturados)
            : newVal.datosCapturados;
        valoresCampos.value = { ...datosExistentes };
      } catch (error) {
        console.error("Error al parsear datosCapturados:", error);
        valoresCampos.value = {};
      }
    }
  }
);

onMounted(async () => {
  idDocenteActividad = Number(route.params.idDocenteActividad);
  await traeDocenteActividadId(Number(idDocenteActividad));
  await traeActividadesInstitucionales();
  await traeDocentes();
  await traeUsuarios();
  await traeTiposDocumento();
});

const onTodoBien = async (values: any) => {
  await actualizarDocenteActividad(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}

.font-monospace {
  font-family: "Courier New", Courier, monospace;
}

h5 {
  color: #007bff;
  border-bottom: 2px solid #007bff;
  padding-bottom: 5px;
}
</style>
