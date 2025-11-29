<template>
  <section>
    <h3></h3>
    <h3>Tipo de Documento</h3>
    <div>
      <RouterLink :to="{ path: 'tipoDocumento/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id</th>
        <th class="col-nombre">Nombre</th>
        <th class="col-descripcion">Descripción</th>
        <th class="col-campos">Campos</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="tipoDocumento.length == 0">
        <td class="centrado" colspan="5">Sin Tipos de Documento Registrados</td>
      </tr>
      <tr
        v-else
        v-for="tipoDoc in tipoDocumento"
        :key="tipoDoc.idTipoDocumento"
      >
        <td class="col-id">{{ tipoDoc.idTipoDocumento }}</td>
        <td class="col-nombre">{{ tipoDoc.nombre }}</td>
        <td class="col-descripcion">
          {{
            tipoDoc.descripcion
              ? tipoDoc.descripcion.substring(0, 50) + "..."
              : "N/A"
          }}
        </td>
        <td class="col-campos">
          {{ obtenerCantidadCampos(tipoDoc.plantillaJSON) }} campos
        </td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{
                path: '/tipoDocumento/' + tipoDoc.idTipoDocumento + '/editar',
              }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{
                path: '/tipoDocumento/' + tipoDoc.idTipoDocumento + '/borrar',
              }"
            >
              <button type="button" class="btn btn-sm btn-outline-danger">
                <i class="fa fa-trash"></i>
              </button>
            </RouterLink>
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script setup>
import { onMounted } from "vue";
import { useTipoDocumento } from "../controladores/useTipoDocumento";
const { traeTipoDocumento, tipoDocumento, obtenerCantidadCampos } =
  useTipoDocumento();

onMounted(async () => {
  await traeTipoDocumento();
});
</script>

<style lang="scss" scoped>
section {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
  margin-top: 40px;
}
.table {
  width: 100%;
  table-layout: fixed;
}

.col-id {
  width: 10%;
  text-align: center;
}

.col-nombre {
  width: 25%;
  text-align: center;
}

.col-descripcion {
  width: 30%;
  text-align: center;
}

.col-campos {
  width: 15%;
  text-align: center;
}

.col-acciones {
  width: 20%;
  text-align: center;
}

.centrado {
  text-align: center;
  color: red;
}
</style>
