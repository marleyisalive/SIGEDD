<template>
  <div class="hoja-carta">
    
    <header class="header-top">
      <div class="logos-izq">
         <img src="@/assets/header-documento.png" />
      </div>
      
      <div class="texto-derecha">
         <p class="inst">Instituto Tecnológico de Culiacán</p>
         <br><br>
         <p class="depto">DEPTO. DE ADMON. DE REC. HUMANOS</p>
         <p>{{ datos.oficio }}</p>
      </div>
    </header>

    <div class="destinatario">
        <p>A QUIEN CORRESPONDA:</p>
    </div>

    <div class="cuerpo-texto">
        <p>
            La que suscribe, Jefa del Departamento de Administración de Recursos Humanos del Instituto Tecnológico de Culiacán, hace CONSTAR que el (la) <strong>{{ datos.nombreDocente }}</strong>, con filiación <strong>{{ datos.filiacion }}</strong>, presta sus servicios en este Instituto desde el <strong>{{ datos.fechaContratacion }}</strong> a la fecha.
        </p>
        <br>
        <p>
            Tenía hasta el 1° de Enero de 2024, la(s) categoría(s) de <strong>PROFESOR TITULAR "B" (E.S.) TIEMPO COMPLETO.</strong>, <strong>40 hrs.</strong>, estatus <strong>(10) BASE</strong>. actualmente goza de la(s) categoría(s) de: <strong>PROFESOR TITULAR "B"(E.S.) TIEMPO COMPLETO., 40 HRS.</strong>, con la clave presupuestal <strong>{{ datos.clavePresupuestal }}</strong>, con efectos desde el <strong>{{ datos.fechaEfectos }}</strong>, con estatus <strong>(10) BASE</strong>.
        </p>
        <br>
        <p>
            No cuenta con ninguna sanción durante el periodo comprendido del <strong>{{ datos.periodoInicio }}</strong> al <strong>{{ datos.periodoFin }}</strong>. el (la) maestro (a) antes mencionado la) cumplió con más del 90% de su jornada laboral y horario de trabajo.
        </p>
        <br>
        <p>
            Se extiende la presente constancia para los fines legales que al(a) interesado(a) convengan, en la Ciudad de Culiacán, Sinaloa, a los {{ datos.diaTexto }} días del mes de {{ datos.mesTexto }} del año {{ datos.anioTexto }}.
        </p>
    </div>

    <div class="seccion-firma">
        <p class="atentamente">A T E N T A M E N T E<br>
        <i>Excelencia en Educación Tecnológica ®</i></p>

        <div class="espacio-firma-vacio"></div>

        <div class="firma-bloque">
             <p class="nombre">{{ datos.nombreJefeRH }}</p>
             <p class="cargo">JEFA DE DEPARTAMENTO DE ADMINISTRACIÓN<br>DE RECURSOS HUMANOS</p>
        </div>
    </div>

    <footer class="footer-logos">
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
.hoja-carta {
  width: 100%;
  max-height: 278mm;
  background: white;
  color: #000;
  padding: 40px 50px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 10pt;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header */
.header-top { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 40px; }
.logos-izq img { height: 100px; }

.texto-derecha { 
    text-align: right; 
    font-size: 10pt; 
    width: 50%;
}
.inst { font-size: 10pt; }
.depto { font-weight: bold; margin-bottom: 2px; }

/* Destinatario */
.destinatario { margin-bottom: 30px; font-size: 10pt; }

/* Cuerpo */
.cuerpo-texto { 
    text-align: justify; 
    line-height: 1.5; 
    margin-bottom: 20px; 
}

/* Firma */
.seccion-firma { margin-top: auto; flex-grow: 1; }
.atentamente { margin-bottom: 20px; font-size: 10pt; font-weight: bold; }

.espacio-firma-vacio { height: 60px; } /* Espacio en blanco para firmar a mano */

.firma-bloque { width: 350px; text-align: left; }
.nombre { font-weight: bold; font-size: 10pt; margin-bottom: 5px; }
.cargo { font-size: 9pt; font-weight: bold; }

.footer-logos img { width: 100%; margin-top: 10px; }
</style>