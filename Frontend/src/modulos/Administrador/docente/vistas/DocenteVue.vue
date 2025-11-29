<template>
  <section>
    <h3></h3>
    <h3>Docente</h3>
    <div>
      <RouterLink :to="{ path: 'docente/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Docente</th>
        <th class="col-usuario">Usuario</th>
        <th class="col-filiacion">Filiación</th>
        <th class="col-nivel">Nivel Estudio</th>
        <th class="col-departamento">Departamento</th>
        <th class="col-plaza">Plaza</th>
        <th class="col-exclusividad">Exclusividad</th>
        <th class="col-folio">Folio EDD</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="docente.length == 0">
        <td class="centrado" colspan="9">Sin Docentes Registrados</td>
      </tr>
      <tr v-else v-for="Docente in docente" :key="Docente.idDocente">
        <td class="col-id">{{ Docente.idDocente }}</td>
        <td class="col-usuario">
          {{ obtenerNombreUsuario(Docente.idUsuario) }}
        </td>
        <td class="col-filiacion">{{ Docente.filiacion }}</td>
        <td class="col-nivel">
          {{ obtenerNombreNivel(Docente.idNivelEstudio) }}
        </td>
        <td class="col-departamento">
          {{ obtenerNombreDepartamento(Docente.idDepartamento) }}
        </td>
        <td class="col-plaza">
          {{ obtenerNombrePlaza(Docente.idPlaza) }}
        </td>
        <td class="col-exclusividad">
          {{ Docente.estatusExclusividad === 1 ? "Sí" : "No" }}
        </td>
        <td class="col-folio">{{ Docente.folioEdd || "N/A" }}</td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{
                path: '/docente/' + Docente.idDocente + '/editar',
              }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{
                path: '/docente/' + Docente.idDocente + '/borrar',
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
import { useDocente } from "../controladores/useDocente";
const {
  traeDocente,
  traeUsuarios,
  traeNiveles,
  traeDepartamentos,
  traePlazas,
  obtenerNombreUsuario,
  obtenerNombreNivel,
  obtenerNombreDepartamento,
  obtenerNombrePlaza,
  docente,
} = useDocente();

onMounted(async () => {
  await traeUsuarios();
  await traeNiveles();
  await traeDepartamentos();
  await traePlazas();
  await traeDocente();
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
  width: 8%;
  text-align: center;
}

.col-usuario {
  width: 15%;
  text-align: center;
}

.col-filiacion {
  width: 12%;
  text-align: center;
}

.col-nivel {
  width: 10%;
  text-align: center;
}

.col-departamento {
  width: 12%;
  text-align: center;
}

.col-plaza {
  width: 10%;
  text-align: center;
}

.col-exclusividad {
  width: 8%;
  text-align: center;
}

.col-folio {
  width: 10%;
  text-align: center;
}

.col-acciones {
  width: 15%;
  text-align: center;
}

.centrado {
  text-align: center;
  color: red;
}
</style>
