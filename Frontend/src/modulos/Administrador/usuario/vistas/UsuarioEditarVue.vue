<template>
  <div class="container mt-5" v-if="usuario[0]">
    <div class="card">
      <div class="card-header">
        <h4>Editar Usuario</h4>
      </div>
      <div v-if="mensaje == 1" class="alert alert-success" role="alert">
        Datos Actualizados con éxito
      </div>
      <div v-if="mensajeError" class="alert alert-danger" role="alert">
        <i class="fa fa-exclamation-circle"></i> {{ mensajeError }}
      </div>
      <div class="card-body">
        <Form
          :validation-schema="UsuarioSchema"
          @submit="onTodoBien"
          :initial-values="{
            idUsuario: usuario[0].idUsuario,
            nombreUsuario: usuario[0].nombreUsuario,
            apePatUsuario: usuario[0].apePatUsuario,
            apeMatUsuario: usuario[0].apeMatUsuario,
            telefono: usuario[0].telefono,
            correoUsuario: usuario[0].correoUsuario,
            contrasenaUsuario: usuario[0].contrasenaUsuario,
            estatus: usuario[0].estatus,
            idRol: usuario[0].idRol,
          }"
        >
          <div class="mb-3">
            <label>Id Usuario</label>
            <Field
              name="idUsuario"
              type="number"
              class="form-control"
              disabled
            />
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
              <option :value="1">Activo - 1</option>
              <option :value="0">Inactivo - 0</option>
            </Field>
            <ErrorMessage name="estatus" class="errorValidacion" />
          </div>
          <div class="mb-3">
            <label>Rol</label>
            <Field name="idRol" as="select" class="form-control">
              <option value="">Seleccione un rol</option>
              <option v-for="rol in roles" :key="rol.idRol" :value="rol.idRol">
                {{ rol.descripcion }} - {{ rol.idRol }}
              </option>
            </Field>
            <ErrorMessage name="idRol" class="errorValidacion" />
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
import { useUsuario } from "../controladores/useUsuario";
const {
  traeUsuarioId,
  actualizarUsuario,
  traeRoles,
  roles,
  mensaje,
  mensajeError,
  usuario,
} = useUsuario();
import { Field, Form, ErrorMessage } from "vee-validate";
import { UsuarioSchema } from "../schemas/UsuarioSchema";

let idUsuario = 0;
const route = useRoute();

const onTodoBien = async (values: any) => {
  await actualizarUsuario(values);
};

onMounted(async () => {
  await traeRoles();
  idUsuario = Number(route.params.idUsuario);
  await traeUsuarioId(Number(idUsuario));
});
</script>

<style lang="scss" scoped>
.errorValidacion {
  color: red;
  font-weight: bold;
}
</style>
