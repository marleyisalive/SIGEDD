<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">
        
        <div class="encabezado-texto">
            <p class="depto">Departamento de: {{ datos.departamento }}</p>
            <p class="fecha">Culiacán, Sin., a {{ datos.fechaTexto }}.</p>
        </div>

        <h2 class="titulo-doc">{{ datos.tituloDocumento }}</h2>

        <div class="cuerpo-texto">
            <p>
                Por medio de la presente se hace CONSTAR que el (la) C. <strong>{{ datos.nombreDocente }}</strong>, profesor(a) adscrito(a) al Departamento de <strong>{{ datos.departamento }}</strong>, participó en el (los) proyecto(s) que se enlistan a continuación, durante el periodo <strong>{{ datos.periodo }}</strong>.
            </p>
        </div>

        <table class="tabla-proyectos">
            <thead>
                <tr>
                    <th style="width: 5%">No.</th>
                    <th style="width: 30%">Nombre del Proyecto</th>
                    <th style="width: 15%">Tipo de Proyecto</th>
                    <th style="width: 15%">Nivel de Participación</th>
                    <th style="width: 20%">Producto Obtenido</th>
                    <th style="width: 15%">Alcance</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in datos.proyectos" :key="index">
                    <td class="center">{{ index + 1 }}</td>
                    <td>{{ item.nombre }}</td>
                    <td class="center">{{ item.tipo }}</td>
                    <td class="center">{{ item.nivel }}</td>
                    <td class="center">{{ item.producto }}</td>
                    <td class="center">{{ item.alcance }}</td>
                </tr>
                <tr v-if="datos.proyectos.length === 0">
                    <td colspan="6" class="center">No hay proyectos registrados.</td>
                </tr>
            </tbody>
        </table>

        <p class="cierre-texto">
            Se extiende la presente para los fines que al interesado(a) convengan.
        </p>

        <div class="seccion-firmas">
            <p class="atentamente"><strong>A T E N T A M E N T E</strong><br>
            <i>Excelencia en Educación Tecnológica®</i></p>

            <div class="firma-centro">
                 <div class="linea"></div>
                 <p class="nombre">{{ datos.firmaJefeDepto }}</p>
                 <p class="cargo">JEFE(A) DEL DEPARTAMENTO ACADÉMICO</p>
            </div>

            <div class="firmas-inferiores">
                <div class="firma-bloque">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">SUBDIRECTOR(A) ACADÉMICO(A)</p>
                </div>
                <div class="firma-bloque">
                    <div class="linea"></div>
                    <p class="nombre">{{ datos.firmaJefeInvestigacion }}</p>
                    <p class="cargo">JEFE(A) DEL CENTRO DE INVESTIGACIÓN</p>
                </div>
            </div>
        </div>

        <br>
        <br>
        <br>
        <br>
    </div> <footer class="footer-logos">
         <img src="@/assets/footer-documento-consulta.png" alt="Logos Footer" />
    </footer>

  </div>
</template>

<script setup>
defineProps({
  datos: {
    type: Object,
    required: true,
    default: () => ({ proyectos: [] }) // Inicializar array vacío por seguridad
  }
});
</script>

<style scoped>
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: block;
}

.banner-superior { width: 100%; line-height: 0; margin-bottom: 20px; }
.banner-superior img { width: 100%; height: auto; }

.contenido-interno { padding: 0 40px 40px 40px; padding-bottom: 80px; }

.encabezado-texto { display: flex; justify-content: space-between; margin-bottom: 20px; font-weight: bold;}
.depto { text-transform: uppercase; }

.titulo-doc { text-align: center; font-weight: bold; margin-bottom: 30px; font-size: 12pt; text-decoration: underline; }

.cuerpo-texto { text-align: justify; line-height: 1.5; margin-bottom: 20px; }

/* TABLA PROYECTOS */
.tabla-proyectos { width: 100%; border-collapse: collapse; font-size: 9pt; margin-bottom: 30px; }
.tabla-proyectos th, .tabla-proyectos td { border: 1px solid black; padding: 5px; vertical-align: middle; }
.tabla-proyectos th { background-color: #f0f0f0; text-align: center; font-weight: bold; }
.center { text-align: center; }

.cierre-texto { margin-bottom: 30px; }

/* FIRMAS */
.seccion-firmas { margin-top: 20px; text-align: center; }
.atentamente { margin-bottom: 40px; font-size: 9pt; }

.firma-centro { width: 50%; margin: 0 auto 40px auto; }
.firmas-inferiores { display: flex; justify-content: space-between; gap: 20px; }
.firma-bloque { width: 45%; }

.linea { border-top: 1px solid black; margin-bottom: 5px; width: 100%; }
.nombre { font-weight: bold; font-size: 9pt; }
.cargo { font-size: 8pt; }

.footer-logos { position: absolute; bottom: 0; left: 0; width: 100%; line-height: 0; z-index: 10; }
.footer-logos img { width: 100%; }
</style>