<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Tipo de Documento</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="TipoDocumentoSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Tipo de Documento</label>
            <Field name="idTipoDocumento" type="number" class="form-control" />
            <ErrorMessage name="idTipoDocumento" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre</label>
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
              placeholder="Descripción del tipo de documento"
            />
            <ErrorMessage name="descripcion" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Campos de la Plantilla</label>
            <div class="campo-input-group">
              <input
                type="text"
                v-model="nuevoCampo"
                @keyup.enter="agregarCampo"
                class="form-control"
                placeholder="Escribe un campo y presiona Enter"
              />
              <button
                type="button"
                @click="agregarCampo"
                class="btn btn-secondary"
              >
                <i class="fa fa-plus"></i> Agregar
              </button>
            </div>
            <div class="chips-container mt-2">
              <span v-for="(campo, index) in campos" :key="index" class="chip">
                {{ campo }}
                <button
                  type="button"
                  @click="eliminarCampo(index)"
                  class="chip-close"
                >
                  ×
                </button>
              </span>
            </div>
            <small class="form-text text-muted">
              Agrega los campos que necesita este tipo de documento
            </small>
            <Field
              name="plantillaJSON"
              type="hidden"
              v-model="plantillaJSONString"
            />
            <ErrorMessage name="plantillaJSON" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Tipo de Documento
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useTipoDocumento } from "../controladores/useTipoDocumento";
const { agregarTipoDocumento, mensaje, mensajeError } = useTipoDocumento();
import { Field, Form, ErrorMessage } from "vee-validate";
import { TipoDocumentoSchema } from "../schemas/TipoDocumentoSchema";

const nuevoCampo = ref("");
const campos = ref<string[]>([]);

const plantillaJSONString = computed(() => {
  return JSON.stringify({ campos: campos.value });
});

const agregarCampo = () => {
  if (
    nuevoCampo.value.trim() &&
    !campos.value.includes(nuevoCampo.value.trim())
  ) {
    campos.value.push(nuevoCampo.value.trim());
    nuevoCampo.value = "";
  }
};

const eliminarCampo = (index: number) => {
  campos.value.splice(index, 1);
};

const onTodoBien = async (values: any) => {
  await agregarTipoDocumento(values);
};
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}

.campo-input-group {
  display: flex;
  gap: 10px;
}

.campo-input-group input {
  flex: 1;
}

.chips-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  min-height: 40px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #f9f9f9;
}

.chip {
  display: inline-flex;
  align-items: center;
  padding: 6px 12px;
  background-color: #007bff;
  color: white;
  border-radius: 20px;
  font-size: 14px;
  gap: 8px;
}

.chip-close {
  background: none;
  border: none;
  color: white;
  font-size: 20px;
  line-height: 1;
  cursor: pointer;
  padding: 0;
  margin-left: 4px;
}

.chip-close:hover {
  color: #ffcccc;
}
</style>
