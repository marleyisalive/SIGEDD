<template>
  <div class="container mt-5">
    <div class="card">
      <div class="card-header">
        <h4>Agregar Usuario</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Agregados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form :validation-schema="UsuarioSchema" @submit="onTodoBien">
          <div class="mb-3">
            <label>Id Usuario</label>
            <Field name="idUsuario" type="number" class="form-control" />
            <ErrorMessage name="idUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Nombre del usuario</label>
            <Field name="nombreUsuario" type="text" class="form-control" />
            <ErrorMessage name="nombreUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Apellido Paterno</label>
            <Field name="apePatUsuario" type="text" class="form-control" />
            <ErrorMessage name="apePatUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Apellido Materno</label>
            <Field name="apeMatUsuario" type="text" class="form-control" />
            <ErrorMessage name="apeMatUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Teléfono</label>
            <Field name="telefono" type="text" class="form-control" />
            <ErrorMessage name="telefono" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Correo</label>
            <Field name="correoUsuario" type="text" class="form-control" />
            <ErrorMessage name="correoUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Contraseña</label>
            <Field
              name="contrasenaUsuario"
              type="password"
              class="form-control"
            />
            <ErrorMessage name="contrasenaUsuario" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Estatus</label>
            <Field name="estatus" as="select" class="form-control">
              <option value="">Seleccione un estatus</option>
              <option :value="1">Activo</option>
              <option :value="0">Inactivo</option>
            </Field>
            <ErrorMessage name="estatus" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Rol</label>
            <Field name="idRol" as="select" class="form-control">
              <option value="">Seleccione un rol</option>
              <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">
                {{ rol.descripcion }}
              </option>
            </Field>
            <ErrorMessage name="idRol" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <button class="btn btn-primary" type="submit">
              Agregar Usuario
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useUsuario } from "../controladores/useUsuario";
const { agregarUsuario, traeRoles, roles, mensaje, mensajeError } =
  useUsuario();
import { Field, Form, ErrorMessage } from "vee-validate";
import { UsuarioSchema } from "../schemas/UsuarioSchema";

const onTodoBien = async (values: any) => {
  await agregarUsuario(values);
};

onMounted(async () => {
  await traeRoles();
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
