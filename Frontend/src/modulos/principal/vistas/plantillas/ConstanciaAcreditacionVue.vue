<template>
  <div class="hoja-acreditacion">
    
    <header class="header-logos">
      <img src="@/assets/conaic-logo.png" alt="CONAIC" class="logo-izq" />
      <img src="@/assets/copaes-logo.png" alt="COPAES" class="logo-der" />
    </header>

    <div class="contenido-centro">
      <p class="texto-intro">
        El Consejo Nacional de Acreditación en Informática y Computación, A.C. con reconocimiento formal vigente, como organización acreditadora de programas del tipo superior, por el COPAES A.C.
      </p>

      <h1 class="titulo-acredita">ACREDITA</h1>
      <h2 class="subtitulo">al PROGRAMA:</h2>

      <div class="bloque-programa">
        {{ datos.programaEducativo }}
      </div>

      <div class="institucion">
        Del Instituto Tecnológico de Culiacán<br>
        <span class="sub-inst">Dependencia Tecnológico Nacional de México</span>
      </div>

      <p class="vigencia">
        Del {{ datos.vigenciaInicio }} al {{ datos.vigenciaFin }}
      </p>

      <p class="requisitos">
        Por cumplir con los requisitos de calidad educativa<br>
        Establecidos por el CONAIC
      </p>
    </div>

    <div class="footer-bottom">
      
      <div class="qr-box">
        <img src="@/assets/qr-logo.png" alt="QR" />
      </div>

      <div class="datos-firma">
        <p class="fecha-ciudad">Ciudad de México., a {{ datos.fechaExpedicion }}.</p>
        
        <div class="firma-presidente">
            <div class="firma-imagen">
                </div>
            <p class="nombre-pdte">Dr. Francisco Javier Álvarez Rodríguez</p>
            <p class="cargo-pdte">Presidente</p>
        </div>
      </div>

    </div>

    <div class="barra-lateral">
        CONACYT - RENIECYT Nº {{ datos.numRegistro }}
    </div>

  </div>
</template>

<script setup>
defineProps({
  datos: {
    type: Object,
    required: true,
    default: () => ({
      programaEducativo: "PROGRAMA...",
      vigenciaInicio: "---",
      vigenciaFin: "---",
      fechaExpedicion: "---",
      numRegistro: "000000"
    })
  }
});
</script>

<style scoped>
.hoja-acreditacion {
  width: 100%;
  /* IMPORTANTE: Este diseño se ve mejor apaisado (landscape), 
     pero aquí lo adaptamos al contenedor vertical. */
  height: 100%; 
  background: white;
  padding: 30px 40px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  color: #000;
  position: relative;
  display: flex;
  flex-direction: column;
  text-align: center;
  overflow: hidden;
}

/* Logos */
.header-logos {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-logos img { height: 80px; } /* Ajusta según tus logos */

/* Textos */
.texto-intro { font-size: 9px; margin-bottom: 15px; padding: 0 20px; }

.titulo-acredita { 
    font-size: 24px; 
    font-weight: 900; 
    margin: 0; 
    text-transform: uppercase;
    letter-spacing: 2px;
}

.subtitulo {
    font-size: 14px;
    font-weight: bold;
    margin: 5px 0 10px 0;
}

.bloque-programa {
    font-size: 16px;
    font-weight: bold;
    font-style: italic;
    margin-bottom: 15px;
}

.institucion { font-size: 14px; font-weight: bold; margin-bottom: 15px; }
.sub-inst { font-weight: normal; }

.vigencia { font-size: 10px; font-weight: bold; margin-bottom: 10px; }
.requisitos { font-size: 9px; margin-bottom: 20px; }

/* Footer */
.footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: auto;
    padding-right: 20px; /* Espacio para la barra lateral */
}

.qr-box img { width: 60px; height: 60px; }

.datos-firma { text-align: right; }
.fecha-ciudad { font-size: 9px; margin-bottom: 20px; }
.nombre-pdte { font-weight: bold; font-size: 10px; margin: 0; }
.cargo-pdte { font-size: 10px; font-style: italic; margin: 0; }

/* Barra Lateral Vertical */
.barra-lateral {
    position: absolute;
    right: 10px;
    bottom: 30px;
    width: 20px;
    font-size: 8px;
    font-weight: bold;
    /* Truco para texto vertical */
    writing-mode: vertical-rl;
    text-orientation: mixed;
    white-space: nowrap;
}
</style>