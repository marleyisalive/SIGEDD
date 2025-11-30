<template>
  <section>
    <h3></h3>
    <h3>Grupo</h3>
    <div>
      <RouterLink :to="{ path: 'grupo/agregar' }">
        <button class="btn-sm btn-outline-primary">
          Agregar <i class="fa fa-plus"></i>
        </button>
      </RouterLink>
    </div>
  </section>
  <table class="table table-striped">
    <thead>
      <tr>
        <th class="col-id">Id Grupo</th>
        <th class="col-docente">Docente</th>
        <th class="col-materia">Materia</th>
        <th class="col-aula">Aula</th>
        <th class="col-periodo">Periodo</th>
        <th class="col-horario">Horario</th>
        <th class="col-alumnos">Alumnos</th>
        <th class="col-acciones">Acciones</th>
      </tr>
    </thead>
    <tbody>
      <tr v-if="listaGrupos.length == 0">
        <td class="centrado" colspan="8">Sin Grupos Registrados</td>
      </tr>
      <tr v-else v-for="Grupo in listaGrupos" :key="Grupo.idGrupo">
        <td class="col-id">{{ Grupo.idGrupo }}</td>
        <td class="col-docente">{{ Grupo.nombreDocente }}</td>
        <td class="col-materia">{{ Grupo.nombreMateria }}</td>
        <td class="col-aula">{{ Grupo.nombreAula }}</td>
        <td class="col-periodo">{{ Grupo.periodo }}</td>
        <td class="col-horario">{{ Grupo.horario }}</td>
        <td class="col-alumnos">{{ Grupo.numeroAlumnos }}</td>
        <td class="col-acciones">
          <div
            class="btn-group"
            role="group"
            aria-label="Basic outlined example"
          >
            <RouterLink
              class="nav-link item"
              :to="{ path: '/grupo/' + Grupo.idGrupo + '/editar' }"
            >
              <button type="button" class="btn btn-sm btn-outline-primary">
                <i class="fa fa-pencil"></i>
              </button>
            </RouterLink>

            <RouterLink
              class="nav-link item"
              :to="{ path: '/grupo/' + Grupo.idGrupo + '/borrar' }"
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
import { onMounted, ref } from "vue";
import { useGrupo } from "../controladores/useGrupo";

const {
  traeGrupo,
  obtenerNombreDocente,
  obtenerNombreMateria,
  obtenerNombreAula,
} = useGrupo();
const listaGrupos = ref([]);

onMounted(async () => {
  const grupos = await traeGrupo();

  // Obtener nombres para cada grupo
  listaGrupos.value = await Promise.all(
    grupos.map(async (grupo) => ({
      ...grupo,
      nombreDocente: await obtenerNombreDocente(grupo.idDocente),
      nombreMateria: await obtenerNombreMateria(grupo.idMateria),
      nombreAula: await obtenerNombreAula(grupo.idAula),
    }))
  );
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

.col-docente {
  width: 15%;
  text-align: center;
}

.col-materia {
  width: 18%;
  text-align: center;
}

.col-aula {
  width: 8%;
  text-align: center;
}

.col-periodo {
  width: 12%;
  text-align: center;
}

.col-horario {
  width: 12%;
  text-align: center;
}

.col-alumnos {
  width: 8%;
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
