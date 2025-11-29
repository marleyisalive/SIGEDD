<template>
  <div class="hoja-cedula">
    
    <div class="header-cedula">
        <div class="escudo-box">
            <img src="@/assets/escudo-nacional-logo.png" alt="Escudo" />
        </div>
        <div class="titulo-sep">
            <p>Estados Unidos Mexicanos</p>
            <p>Secretaría de Educación Pública</p>
            <p>Dirección General de Profesiones</p>
            <p class="subtitulo">Cédula Profesional Electrónica</p>
        </div>
        <div class="folio-cedula">
            Número de Cédula Profesional: <strong>{{ datos.numeroCedula }}</strong>
        </div>
    </div>

    <div class="seccion-gris">
        <div class="fila-curp">CURP: <strong>{{ datos.curp }}</strong></div>
        
        <div class="barra-titulo">Datos del profesionista</div>
        
        <div class="fila-datos">
            <div class="columna">
                <span class="label">Nombre(s):</span>
                <span class="valor">{{ datos.nombre }}</span>
            </div>
            <div class="columna">
                <span class="label">Primer apellido:</span>
                <span class="valor">{{ datos.primerApellido }}</span>
            </div>
            <div class="columna">
                <span class="label">Segundo apellido:</span>
                <span class="valor">{{ datos.segundoApellido }}</span>
            </div>
        </div>
    </div>

    <div class="texto-legal">
        Quien cumplió con los requisitos establecidos en la Ley Reglamentaria del Artículo 5o. Constitucional, relativo al ejercicio de las profesiones en la Ciudad de México y su Reglamento, la cédula con efectos de patente para ejercer profesionalmente en el nivel de: <strong>{{ datos.nivel }}</strong>
    </div>

    <div class="seccion-gris">
        <div class="fila-datos">
            <div class="columna w-70">
                <span class="label">Nombre del programa:</span>
                <span class="valor">{{ datos.nombrePrograma }}</span>
            </div>
            <div class="columna w-30 text-right">
                <span class="label">Clave:</span>
                <span class="valor">{{ datos.clavePrograma }}</span>
            </div>
        </div>

        <div class="barra-titulo">Datos de la institución educativa</div>
        
        <div class="fila-datos">
            <div class="columna w-70">
                <span class="label">Nombre o denominación:</span>
                <span class="valor">{{ datos.institucion }}</span>
            </div>
            <div class="columna w-30 text-right">
                <span class="label">Clave:</span>
                <span class="valor">{{ datos.claveInstitucion }}</span>
            </div>
        </div>
    </div>

    <div class="seccion-gris">
        <div class="barra-titulo">Datos de expedición y firma electrónica</div>
        <div class="fila-datos">
            <div class="columna">
                <span class="label">Fecha:</span>
                <span class="valor">{{ datos.fechaExpedicion }}</span>
            </div>
            <div class="columna">
                <span class="label">Hora:</span>
                <span class="valor">{{ datos.horaExpedicion }}</span>
            </div>
        </div>
    </div>

    <div class="texto-legal-small">
        Quien cumplió con los requisitos establecidos en la Ley Reglamentaria del Artículo 5o. Constitucional...
    </div>

    <div class="footer-digital">
        <div class="datos-digitales">
            <p class="titulo-digital">Cadena original</p>
            <p class="hash">{{ datos.cadenaOriginal }}</p>
            
            <p class="titulo-digital">Firma electrónica avanzada del servidor público facultado</p>
            <p class="hash">{{ datos.firmaElectronica }}</p>
            
            <p class="titulo-digital">Sello digital de tiempo SEP</p>
            <p class="hash">{{ datos.selloDigital }}</p>
        </div>
        
        <div class="qr-area">
            <img src="@/assets/qr-logo.png" alt="QR" />
        </div>
    </div>

    <div class="barra-final">
        <div class="codigo-barras">|| |||| || ||||| ||| || ||||</div>
        <div class="responsable">LIC. RUBÉN NÚÑEZ MERCADO</div>
    </div>

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
.hoja-cedula {
  width: 100%;
  max-height: 278mm; /* Formato apaisado o carta */
  background: white;
  color: #333;
  padding: 30px 40px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 9pt;
  border: 1px solid #ccc;
  position: relative;
  overflow: hidden;
}

/* Header */
.header-cedula { text-align: center; margin-bottom: 10px; }
.escudo-box img { height: 50px; }
.titulo-sep p { margin: 2px 0; font-weight: bold; color: #000; font-size: 10pt; }
.subtitulo { font-size: 12pt !important; margin-top: 5px !important; }
.folio-cedula { text-align: right; font-size: 10pt; margin-top: 10px; margin-bottom: 5px; }

/* Bloques Grises */
.seccion-gris {
    background-color: #f5f5f5;
    border: 1px solid #e0e0e0;
    margin-bottom: 8px;
    padding: 5px 10px;
}

.barra-titulo {
    background-color: #e0e0e0;
    text-align: center;
    font-weight: bold;
    font-size: 8pt;
    padding: 2px;
    margin: 5px -10px; /* Expande a los bordes */
}

.fila-curp { margin-bottom: 5px; font-size: 9pt; }

.fila-datos { display: flex; justify-content: space-between; }
.columna { flex: 1; }
.w-70 { flex: 2.5; }
.w-30 { flex: 1; }
.text-right { text-align: right; }

.label { color: #666; font-size: 8pt; margin-right: 5px; }
.valor { font-weight: bold; font-size: 9pt; color: #000; }

/* Textos Legales */
.texto-legal { font-size: 8pt; text-align: justify; margin-bottom: 10px; }
.texto-legal-small { font-size: 6pt; text-align: justify; color: #666; margin-bottom: 10px; }

/* Footer */
.footer-digital { display: flex; margin-top: 10px; }
.datos-digitales { width: 85%; padding-right: 10px; }
.qr-area { width: 15%; display: flex; align-items: center; justify-content: center; }
.qr-area img { width: 80px; height: 80px; }

.titulo-digital { font-weight: bold; font-size: 6pt; margin-bottom: 1px; margin-top: 4px; }
.hash { font-family: 'Courier New', monospace; font-size: 5pt; word-break: break-all; color: #444; text-align: justify; }

.barra-final { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 10px; }
.codigo-barras { font-family: 'Courier New', monospace; font-size: 12pt; letter-spacing: 2px; }
.responsable { font-weight: bold; font-size: 7pt; }
</style>