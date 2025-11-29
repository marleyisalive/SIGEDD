<template>
  <div class="hoja-carta">
    
    <div class="banner-superior">
      <img src="@/assets/header-documento.png" alt="Header" />
    </div>

    <div class="contenido-interno">

        <div class="bloque-encabezado">
             <p class="inst">INSTITUTO TECNOLÓGICO DE CULIACÁN</p>
             <p>DEPARTAMENTO DE DESARROLLO ACADÉMICO</p>
             <p class="titulo-principal">RESULTADO DE LA EVALUACIÓN DOCENTE</p>
        </div>

        <div class="datos-generales">
            <div class="fila">
                <span class="label">DOCENTE:</span>
                <span class="valor">{{ datos.nombreDocente }}</span>
            </div>
            <div class="fila">
                <span class="label">DEPARTAMENTO:</span>
                <span class="valor">{{ datos.departamento }}</span>
            </div>
            <div class="fila-doble">
                <div class="mitad">
                    <span class="label">PLAZA:</span>
                    <span class="valor">{{ datos.plaza }}</span>
                </div>
                <div class="mitad">
                    <span class="label">PERIODO:</span>
                    <span class="valor">{{ datos.periodo }}</span>
                </div>
            </div>
        </div>

        <div class="contenedor-tabla">
            <table class="tabla-resultados">
                <thead>
                    <tr>
                        <th>ASPECTO EVALUADO</th>
                        <th class="col-puntaje">PUNTAJE (1-5)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(res, i) in datos.resultados" :key="i">
                        <td class="text-left">{{ res.rubro }}</td>
                        <td class="text-center">{{ res.puntaje }}</td>
                    </tr>
                    <tr v-if="!datos.resultados || datos.resultados.length === 0">
                        <td colspan="2" class="vacio">Sin resultados registrados.</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr class="fila-final">
                        <td class="text-right">CALIFICACIÓN FINAL (Escala 0-100):</td>
                        <td class="text-center resultado-final">{{ datos.calificacion }}</td>
                    </tr>
                </tfoot>
            </table>
        </div>

        <div class="bloque-desempeno">
            <p>NIVEL DE DESEMPEÑO ALCANZADO:</p>
            <div class="caja-nivel">{{ datos.desempeno }}</div>
        </div>

        <p class="nota-legal">
            La presente evaluación corresponde al desempeño frente a grupo y cumple con los lineamientos establecidos por el Tecnológico Nacional de México.
        </p>

        <div class="seccion-firmas">
            <div class="firma-box">
                <div class="espacio-firma"></div>
                <div class="pie-caja">
                    <p class="nombre">{{ datos.firmaJefeDDA }}</p>
                    <p class="cargo">JEFE(A) DEL DEPTO. DE DESARROLLO ACADÉMICO</p>
                </div>
            </div>

            <div class="firma-box">
                <div class="espacio-firma"></div>
                <div class="pie-caja">
                    <p class="nombre">{{ datos.firmaSubdirector }}</p>
                    <p class="cargo">SUBDIRECTOR(A) ACADÉMICO(A)</p>
                </div>
            </div>
        </div>

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
    default: () => ({})
  }
});
</script>

<style scoped>
/* CONTENEDOR PRINCIPAL */
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000;
  padding: 0; /* Sin padding para que los banners toquen los bordes */
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: block;
}

/* BANNER SUPERIOR */
.banner-superior {
    width: 100%;
    line-height: 0;
    margin-bottom: 20px;
}
.banner-superior img {
    width: 100%;
    height: auto;
}

/* CONTENIDO INTERNO (Con padding para el texto) */
.contenido-interno {
    padding: 0 40px 40px 40px;
    /* Espacio extra abajo para que el footer no tape nada */
    padding-bottom: 80px; 
}

/* ENCABEZADO */
.bloque-encabezado {
    text-align: right;
    margin-bottom: 20px;
}
.inst { font-weight: bold; font-size: 10pt; }
.titulo-principal { font-weight: bold; font-size: 11pt; margin-top: 10px; text-decoration: underline; }

/* DATOS GENERALES */
.datos-generales { 
    border: 1px solid #000; 
    padding: 10px; 
    background-color: #f9f9f9;
    margin-bottom: 20px;
}
.fila { margin-bottom: 5px; border-bottom: 1px dotted #ccc; padding-bottom: 2px; }
.fila-doble { display: flex; justify-content: space-between; }
.mitad { width: 48%; border-bottom: 1px dotted #ccc; }

.label { font-weight: bold; margin-right: 10px; font-size: 9pt; }
.valor { font-weight: bold; font-size: 10pt; }

/* TABLA */
.contenedor-tabla { margin-bottom: 20px; }
.tabla-resultados { width: 100%; border-collapse: collapse; font-size: 9pt; }
.tabla-resultados th, .tabla-resultados td { border: 1px solid #000; padding: 5px 10px; }
.tabla-resultados th { background-color: #e0e0e0; font-weight: bold; text-align: center; }

.col-puntaje { width: 20%; }
.text-left { text-align: left; }
.text-center { text-align: center; }
.text-right { text-align: right; font-weight: bold; }
.vacio { text-align: center; font-style: italic; padding: 20px; }

.fila-final { background-color: #eee; font-weight: bold; }
.resultado-final { font-size: 12pt; }

/* DESEMPEÑO */
.bloque-desempeno { text-align: center; margin-bottom: 30px; }
.caja-nivel { 
    border: 2px solid #000; 
    padding: 10px; 
    font-weight: bold; 
    font-size: 14pt; 
    margin-top: 5px; 
    display: inline-block;
    min-width: 200px;
}

.nota-legal { font-size: 8pt; font-style: italic; text-align: justify; margin-bottom: 30px; }

/* FIRMAS */
.seccion-firmas { 
    display: flex; 
    justify-content: space-around; 
    margin-top: 20px; 
}
.firma-box { width: 40%; text-align: center; }
.espacio-firma { height: 50px; }
.pie-caja { border-top: 1px solid black; padding-top: 5px; }
.nombre { font-weight: bold; font-size: 9pt; margin-bottom: 2px; }
.cargo { font-size: 8pt; }

/* FOOTER ABSOLUTO */
.footer-logos {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    line-height: 0;
    z-index: 10;
}
.footer-logos img { width: 100%; }
</style>