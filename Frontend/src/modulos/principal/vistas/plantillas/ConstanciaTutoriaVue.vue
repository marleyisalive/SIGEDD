<template>
  <div class="hoja-carta">
    
    <header class="header-logos">
        <img src="@/assets/header-documento.png" alt="">    
    </header>

    <div class="cuerpo">
      
      <div class="datos-oficio">
        <p class="negrita">Instituto Tecnológico de Culiacán</p>
        <p><strong>ASUNTO:</strong> CONSTANCIA DE TUTORÍA</p>
      </div>

      <div class="destinatario">
        <p class="negrita">H. COMISIÓN DICTAMINADORA DEL EDD</p>
        <p>PRESENTE</p>
      </div>

      <div class="parrafo-principal">
        <p>
          Por medio de la presente se hace constar que al/a la 
          <span class="variable">{{ datos.nombreDocente }}</span>, 
          profesor/a del <span class="variable">{{ datos.departamento }}</span> 
          se le asignaron labores de tutoría durante los siguientes semestres y cantidades:
        </p>
      </div>

      <table class="tabla-tutorias">
        <tbody>
          <tr>
            <td>Enero-junio {{ anioReferencia }}</td>
            <td>{{ mitadTutorados1 }} tutorados</td> <td>{{ datos.carrera || '---' }}</td>
          </tr>
          <tr>
            <td>Agosto-diciembre {{ anioReferencia }}</td>
            <td>{{ mitadTutorados2 }} tutorados</td> <td>{{ datos.carrera || '---' }}</td>
          </tr>
          <tr class="fila-total">
            <td><strong>TOTAL</strong></td>
            <td><strong>{{ datos.totalTutorados || 0 }} tutorados</strong></td>
            <td></td>
          </tr>
        </tbody>
      </table>

      <div class="parrafo-cierre">
        <p>
          Además de que entregó en tiempo y forma el informe con el número de estudiantes atendidos por semestre y la evaluación del impacto en indicadores de eficiencia académica de la acción tutorial.
        </p>
        <br>
        <p>
          Se extiende la presente para los fines legales que convengan, en la ciudad de Culiacán, Sinaloa, el día {{ fechaFormateada }}.
        </p>
      </div>

      <div class="seccion-firmas">
  
  <div class="firma-box">
    <p v-if="datos.validadoPor" class="firma-digital">
      {{ datos.firmaJefeDDA }}
    </p>
    
    <div v-else style="height: 40px;"></div>

    <div class="linea"></div>
    <p class="nombre"><strong>{{ datos.firmaJefeDDA }}</strong></p>
    <p class="cargo">JEFE DEL DEPARTAMENTO DE DESARROLLO ACADÉMICO</p>
  </div>

  <div class="firma-box">
    <p v-if="datos.validadoPor" class="firma-digital">
      {{ datos.firmaSubdirector }}
    </p>
    <div v-else style="height: 40px;"></div>

    <div class="linea"></div>
    <p class="nombre"><strong>{{ datos.firmaSubdirector }}</strong></p>
    <p class="cargo">SUBDIRECTOR ACADÉMICO</p>
  </div>

</div>

      <!-----<div class="sello-flotante">
        <img src="@/assets/sello-approved.png" alt="Sello" />
      </div> -->

    <footer class="footer-doc">
        <img src="@/assets/footer-documento-consulta.png" alt="Pie de página" />
    </footer>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  datos: {
    type: Object,
    required: true,
    default: () => ({})
  }
});

// Utilidades para fechas
const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];

const fechaFormateada = computed(() => {
  // Si no hay fecha aún, retornamos una cadena vacía para evitar errores
  if (!props.datos.fecha) return "---";
  
  const f = new Date(props.datos.fecha);
  if (isNaN(f.getTime())) return "---"; // Validación extra

  return `${f.getDate()} de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;
});

const anioReferencia = computed(() => {
    if (!props.datos.fecha) return "2024"; // Año por defecto o vacío
    const f = new Date(props.datos.fecha);
    return isNaN(f.getTime()) ? "2024" : f.getFullYear();
});

// Cálculos seguros para los tutorados (evita el NaN)
const mitadTutorados1 = computed(() => {
    const total = props.datos.totalTutorados || 0;
    return Math.floor(total / 2);
});

const mitadTutorados2 = computed(() => {
    const total = props.datos.totalTutorados || 0;
    return Math.ceil(total / 2);
});
</script>

<style scoped>
/* ESTILOS "PAPEL" */
.hoja-carta {
  width: 100%;
  height: 100%; /* Se ajusta al contenedor gris del padre */
  background: white;
  padding: 30px 50px; /* Márgenes internos similares a Word */
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 11px; /* Letra ajustada para visor pequeño */
  color: #333;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* HEADER */
.header-logos {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  
}
.header-logos img { height: auto; width: 100%;}

/* TEXTOS */
.negrita { font-weight: bold; }
.variable { font-weight: bold; text-transform: uppercase; }
.datos-oficio { text-align: right; margin-bottom: 20px; }
.destinatario { font-weight: bold; margin-bottom: 20px; }
.parrafo-principal, .parrafo-cierre { 
    text-align: justify; 
    line-height: 1.4;
    margin-bottom: 15px; 
}

/* TABLA */
.tabla-tutorias {
    width: 90%;
    margin: 10px auto 20px auto;
    border-collapse: collapse;
}
.tabla-tutorias td {
    padding: 4px 10px;
    /* Word a veces no tiene bordes visibles, pero ayuda a alinear */
}
.fila-total td { padding-top: 10px; }

/* FIRMAS */
.atentamente { text-align: center; margin-bottom: 40px; font-weight: bold; font-size: 10px; }
.contenedor-firmas { display: flex; justify-content: space-between; }
.firma-bloque { width: 45%; text-align: center; position: relative; }
.vobo { position: absolute; top: -20px; left: 0; font-size: 10px; }
.nombre-firmante { font-weight: bold; font-size: 9px; margin-bottom: 2px; }
.cargo { font-size: 8px; }
.espacio-firma img{ width: 200px;}

/* SELLO */
.sello-flotante {
    position: absolute;
    bottom: 120px; /* Ajustar según necesidad */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0.8;
    pointer-events: none;
}
.sello-flotante img { width: 120px; }

/* FOOTER */
.footer-doc {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
.footer-doc img { width: 100vw; }

/* Estilo responsivo para cuando lo veas en grande vs pequeño */
@media (min-width: 800px) {
    .hoja-carta { font-size: 12pt; } /* Tamaño real si se ve en pantalla grande */
    .nombre-firmante { font-size: 10pt; }
    .cargo { font-size: 8pt; }
}

/* Estilo para la firma "a mano" */

/* Ajustes existentes */
.firma-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
  width: 45%; /* Para que quepan las dos */
  position: relative;
}

.linea {
  border-top: 1px solid black;
  margin-bottom: 5px;
  width: 100%; /* Que la línea ocupe todo el ancho de su caja */
}
.nombre {
  font-weight: bold;
  font-size: 10px;
  margin: 0;
  text-align: center;
}
.firma-digital {
  font-family: 'MiFirmaChida', cursive; /* O la fuente que hayas elegido */
  font-size: 2.2em; 
  color: #1e3a6c; /* Azul oscuro tipo pluma */
  margin: 0;
  margin-bottom: -10px; /* Acercarlo a la línea */
  z-index: 1;
}
.seccion-firmas {
  margin-top: auto; 
  padding-bottom: 30px; 
  /* ESTO ES LO QUE FALTABA: Flex para ponerlas lado a lado */
  display: flex;
  justify-content: space-between; /* Espacio entre las dos firmas */
  align-items: flex-end; /* Alinear al fondo */
  padding: 0 40px; /* Margen lateral para que no se peguen a los bordes */
}
</style>