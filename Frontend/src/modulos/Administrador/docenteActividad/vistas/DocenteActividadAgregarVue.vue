<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Actividad de Docente</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="DocenteActividadSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Actividad de Docente</label>
            <Field
              name="idDocenteActividad"
              type="number"
              class="form-control"
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
              <label>{{ formatearNombreCampo(campo) }}</label>

              <!-- Campo numérico -->
              <input
                v-if="esNumerico(campo)"
                type="number"
                class="form-control"
                v-model.number="valoresCampos[campo]"
                :placeholder="`Ingrese ${formatearNombreCampo(campo)}`"
              />

              <!-- Campo de fecha -->
              <input
                v-else-if="esFecha(campo)"
                type="date"
                class="form-control"
                v-model="valoresCampos[campo]"
              />

              <!-- Select para usuarios/docentes -->
              <select
                v-else-if="esReferencia(campo)"
                class="form-control"
                v-model.number="valoresCampos[campo]"
              >
                <option value="">Seleccione...</option>
                <option
                  v-for="doc in obtenerOpcionesReferencia(campo)"
                  :key="doc.id"
                  :value="doc.id"
                >
                  {{ doc.nombre }}
                </option>
              </select>

              <!-- Campo de texto normal -->
              <input
                v-else
                type="text"
                class="form-control"
                v-model="valoresCampos[campo]"
                :placeholder="`Ingrese ${formatearNombreCampo(campo)}`"
              />
            </div>

            <!-- Sección especial para arrays (actividadesApoyo, actividadesAdmin, etc.) -->
            <div v-if="tieneArrays()" class="mt-4">
              <div v-if="requiereActividadesApoyo()" class="mb-4">
                <h6>Actividades de Apoyo</h6>
                <button
                  type="button"
                  class="btn btn-sm btn-success mb-2"
                  @click="agregarActividadApoyo"
                >
                  + Agregar Actividad
                </button>
                <div
                  v-for="(act, idx) in actividadesApoyo"
                  :key="idx"
                  class="card mb-2 p-3"
                >
                  <div class="row">
                    <div class="col-md-4">
                      <label>Nombre</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="act.nombre"
                      />
                    </div>
                    <div class="col-md-4">
                      <label>Metas</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="act.metas"
                      />
                    </div>
                    <div class="col-md-2">
                      <label>Horario</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="act.horario"
                        placeholder="ej: 10-11"
                      />
                    </div>
                    <div class="col-md-1">
                      <label>Horas</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="act.total"
                      />
                    </div>
                    <div class="col-md-1 d-flex align-items-end">
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        @click="eliminarActividadApoyo(idx)"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div v-if="requiereActividadesAdmin()" class="mb-4">
                <h6>Actividades Administrativas</h6>
                <button
                  type="button"
                  class="btn btn-sm btn-success mb-2"
                  @click="agregarActividadAdmin"
                >
                  + Agregar Actividad
                </button>
                <div
                  v-for="(act, idx) in actividadesAdmin"
                  :key="idx"
                  class="card mb-2 p-3"
                >
                  <div class="row">
                    <div class="col-md-4">
                      <label>Puesto</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="act.puesto"
                      />
                    </div>
                    <div class="col-md-3">
                      <label>Unidad</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="act.unidad"
                      />
                    </div>
                    <div class="col-md-2">
                      <label>Horario</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="act.horario"
                        placeholder="ej: 10-12"
                      />
                    </div>
                    <div class="col-md-2">
                      <label>Horas</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model.number="act.total"
                      />
                    </div>
                    <div class="col-md-1 d-flex align-items-end">
                      <button
                        type="button"
                        class="btn btn-sm btn-danger"
                        @click="eliminarActividadAdmin(idx)"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
              Agregar Actividad de Docente
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed, watch } from "vue";
import { useDocenteActividad } from "../controladores/useDocenteActividad";
const {
  agregarDocenteActividad,
  mensaje,
  mensajeError,
  traeActividadesInstitucionales,
  traeDocentes,
  traeUsuarios,
  traeTiposDocumento,
  actividadesInstitucionales,
  docentes,
  usuarios,
  obtenerCamposPlantilla,
} = useDocenteActividad();
import { Field, Form, ErrorMessage } from "vee-validate";
import { DocenteActividadSchema } from "../schemas/DocenteActividadSchema";

const actividadSeleccionada = ref<number | null>(null);
const camposDinamicos = ref<string[]>([]);
const valoresCampos = ref<Record<string, any>>({});
const actividadesApoyo = ref<any[]>([]);
const actividadesAdmin = ref<any[]>([]);

const datosCapturadosJSON = computed(() => {
  const datos = { ...valoresCampos.value };

  // Si el tipo de documento requiere arrays, agregarlos
  if (requiereActividadesApoyo()) {
    datos.actividadesApoyo = actividadesApoyo.value;
  }
  if (requiereActividadesAdmin()) {
    datos.actividadesAdmin = actividadesAdmin.value;
  }

  return JSON.stringify(datos);
});

// Funciones para determinar el tipo de campo
const esNumerico = (campo: string): boolean => {
  const camposNumericos = [
    "total",
    "totalTutorados",
    "numeroAlumnos",
    "totalAlumnos",
    "alumnosObtuvieronCredito",
    "totalAlumnosAtendidos",
    "horasPreparacion",
    "duracion",
    "numControl",
    "creditos",
    "calificacionFinal",
  ];
  return camposNumericos.some((c) =>
    campo.toLowerCase().includes(c.toLowerCase())
  );
};

const esFecha = (campo: string): boolean => {
  const camposFecha = [
    "fecha",
    "vigencia",
    "expedicion",
    "inicio",
    "fin",
    "actualizacion",
  ];
  return camposFecha.some((c) => campo.toLowerCase().includes(c.toLowerCase()));
};

const esReferencia = (campo: string): boolean => {
  const camposReferencia = [
    "idJefeDDA",
    "idSubdirector",
    "idSubdirectorAcademico",
    "idJefeDepto",
    "idPresidenteAcademia",
    "idJefeDepartamento",
    "idJefeCentroInformacion",
    "idDirectorDDIE",
    "idJefeRH",
    "idDirector",
    "idJefeEscolares",
    "idPresidente",
    "idSecretario",
    "idVocal",
    "idCoordinadorInvestigacion",
    "idJefeCienciasBasicas",
    "idJefeInvestigacion",
    "idJefeCentroInfo",
    "idCodirector",
  ];
  return camposReferencia.includes(campo);
};

const formatearNombreCampo = (campo: string): string => {
  // Convertir camelCase a texto legible
  return campo
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
};

const obtenerOpcionesReferencia = (campo: string) => {
  // Retornar lista de docentes para campos de referencia
  return docentes.value.map((doc: any) => {
    const usuario = usuarios.value.find(
      (u: any) => u.idUsuario === doc.idUsuario
    );
    return {
      id: doc.idDocente,
      nombre: usuario
        ? `${usuario.nombreUsuario} ${usuario.apePatUsuario || ""} ${
            usuario.apeMatUsuario || ""
          }`.trim()
        : `Docente ${doc.idDocente}`,
    };
  });
};

const tieneArrays = (): boolean => {
  return requiereActividadesApoyo() || requiereActividadesAdmin();
};

const requiereActividadesApoyo = (): boolean => {
  return camposDinamicos.value.includes("actividadesApoyo");
};

const requiereActividadesAdmin = (): boolean => {
  return camposDinamicos.value.includes("actividadesAdmin");
};

const agregarActividadApoyo = () => {
  actividadesApoyo.value.push({
    nombre: "",
    metas: "",
    horario: "",
    total: 0,
  });
};

const eliminarActividadApoyo = (index: number) => {
  actividadesApoyo.value.splice(index, 1);
};

const agregarActividadAdmin = () => {
  actividadesAdmin.value.push({
    puesto: "",
    unidad: "",
    horario: "",
    total: 0,
  });
};

const eliminarActividadAdmin = (index: number) => {
  actividadesAdmin.value.splice(index, 1);
};

const onActividadChange = (event: Event) => {
  const target = event.target as HTMLSelectElement;
  const idActividad = target.value ? Number(target.value) : null;
  actividadSeleccionada.value = idActividad;

  if (idActividad) {
    camposDinamicos.value = obtenerCamposPlantilla(idActividad);
    // Reiniciar valores
    valoresCampos.value = {};
    actividadesApoyo.value = [];
    actividadesAdmin.value = [];

    camposDinamicos.value.forEach((campo) => {
      // No inicializar arrays, se manejan por separado
      if (campo !== "actividadesApoyo" && campo !== "actividadesAdmin") {
        if (esNumerico(campo)) {
          valoresCampos.value[campo] = 0;
        } else {
          valoresCampos.value[campo] = "";
        }
      }
    });
  } else {
    camposDinamicos.value = [];
    valoresCampos.value = {};
    actividadesApoyo.value = [];
    actividadesAdmin.value = [];
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

const onTodoBien = async (values: any) => {
  await agregarDocenteActividad(values);
};

onMounted(async () => {
  await traeActividadesInstitucionales();
  await traeDocentes();
  await traeUsuarios();
  await traeTiposDocumento();
});
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
