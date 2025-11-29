<template>
  <div class="hoja-talon">
    
    <div class="marco-principal">

        <table class="tabla-header">
            <tbody>
                <tr>
                    <td class="col-logo" rowspan="3">
                        <img src="@/assets/tecnm-logo.png" alt="Logo" class="logo-img" />
                    </td>
                    <td class="col-titulo-azul" colspan="4">
                        COMPROBANTE DE PAGO
                    </td>
                </tr>
                <tr class="fila-datos">
                    <td class="celda-dato w-40" colspan="1">
                        <div class="label">R.F.C. DEL TRABAJADOR</div>
                        <div class="valor">{{ datos.rfc }}</div>
                    </td>
                    <td class="celda-dato w-60" colspan="3">
                        <div class="label">NOMBRE DEL EMPLEADO</div>
                        <div class="valor">{{ datos.nombreDocente }}</div>
                    </td>
                </tr>
                <tr class="fila-datos">
                    <td class="celda-dato w-25">
                        <div class="label">PERIODO DE PAGO</div>
                        <div class="valor">{{ datos.periodoPago }}</div>
                    </td>
                    <td class="celda-dato w-20">
                        <div class="label">NO. EMPLEADO</div>
                        <div class="valor">{{ datos.numEmpleado }}</div>
                    </td>
                    <td class="celda-dato w-15">
                        <div class="label">PLAZA</div>
                        <div class="valor">{{ datos.plaza }}</div>
                    </td>
                    <td class="celda-dato w-40">
                        <div class="label">CURP</div>
                        <div class="valor">{{ datos.curp }}</div>
                    </td>
                </tr>
            </tbody>
        </table>

        <table class="tabla-separador">
            <tbody>
                <tr>
                    <td class="barra-azul borde-der">PERCEPCIONES</td>
                    <td class="barra-azul">DEDUCCIONES</td>
                </tr>
            </tbody>
        </table>

        <div class="contenedor-listas">
            <div class="mitad borde-der">
                <table class="tabla-items">
                    <thead>
                        <tr>
                            <th class="th-cpto">CPTO.</th>
                            <th class="th-desc">DESCRIPCION</th>
                            <th class="th-imp">IMPORTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(p, i) in datos.percepciones" :key="i">
                            <td>{{ p.clave }}</td>
                            <td class="text-left">{{ p.descripcion }}</td>
                            <td class="text-right">{{ p.importe }}</td>
                        </tr>
                        <tr v-if="!datos.percepciones || datos.percepciones.length < 8">
                            <td colspan="3" style="height: 150px;"></td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="mitad">
                <table class="tabla-items">
                    <thead>
                        <tr>
                            <th class="th-cpto">CPTO.</th>
                            <th class="th-desc">DESCRIPCION</th>
                            <th class="th-imp">IMPORTE</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(d, i) in datos.deducciones" :key="i">
                            <td>{{ d.clave }}</td>
                            <td class="text-left">{{ d.descripcion }}</td>
                            <td class="text-right">{{ d.importe }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

        <table class="tabla-footer">
            <tbody>
                <tr>
                    <td class="footer-izq">
                        <div class="nota-ajuste">05 PAGO POR AJUSTE AL CALENDARIO DE 360 A 365 DÍAS</div>
                        <div class="sello-contenedor">
                            <div class="sello-azul-fondo">
                                <p class="txt-grande">GENERADO DESDE LA OFICINA VIRTUAL TECNM</p>
                                <p class="txt-chico">Sello digital de validez oficial | Cadena Original</p>
                            </div>
                            <div class="barra-negra"></div>
                        </div>
                    </td>

                    <td class="footer-der">
                        <div class="fecha-emision">
                            <span class="label-mini">FECHA EMISIÓN</span>
                            <strong>{{ datos.fechaEmision }}</strong>
                        </div>
                        <div class="totales-grid">
                            <div class="box-total borde-r">
                                <div class="monto">{{ datos.totalPercepciones }}</div>
                                <div class="lbl">PERCEPCIONES</div>
                            </div>
                            <div class="box-total borde-r">
                                <div class="monto">{{ datos.totalDeducciones }}</div>
                                <div class="lbl">DEDUCCIONES</div>
                            </div>
                            <div class="box-neto">
                                <div class="monto">{{ datos.netoPagar }}</div>
                                <div class="lbl">NETO A PAGAR</div>
                            </div>
                        </div>
                    </td>
                </tr>
            </tbody>
        </table>

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
/* --- REGLAS GENERALES DE COLOR --- */
/* Forzamos negro en todo el documento por defecto */
.hoja-talon, .hoja-talon * {
    color: #000000 !important;
}

/* EXCEPCIONES: Textos que SÍ deben ser blancos */
.texto-tecnm, 
.col-titulo-azul, 
.barra-azul, 
.sello-azul-fondo, .sello-azul-fondo p,
.barra-negra {
    color: #ffffff !important;
}

/* --- ESTRUCTURA --- */
.hoja-carta {
  width: 100%;
  background: white;
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Arial', sans-serif;
  font-size: 8pt;
}

.marco-principal {
    border: 2px solid #000;
    width: 100%;
}

table {
    width: 100%;
    border-collapse: collapse;
    border-spacing: 0;
}

td { padding: 0; vertical-align: top; }

/* --- HEADER --- */
.tabla-header td { border: 1px solid #000; }

.col-logo {
    width: 20%;
    text-align: center;
    vertical-align: middle !important;
    padding: 10px;
    background-color: white; /* Asegura fondo blanco tras el logo */
}
.logo-img { height: 50px; margin-bottom: 5px; }
.texto-tecnm { 
    font-size: 6pt; 
    font-weight: bold; 
    /* El color blanco se aplica por la regla de excepción arriba, pero necesitamos fondo azul oscuro para que se vea el texto blanco si el logo tiene transparencia, o le ponemos color azul oscuro al texto.
       En la imagen original el texto del logo es AZUL OSCURO. Corregimos: */
    color: #003366 !important; 
    line-height: 1.1; 
}

.col-titulo-azul {
    background-color: #0070c0;
    font-weight: bold;
    text-align: center;
    padding: 4px 0;
    font-size: 11pt;
    border-bottom: 1px solid #000;
}

.celda-dato { padding: 3px 5px; }
.label { font-size: 5pt; color: #000 !important; text-transform: uppercase; margin-bottom: 1px; }
.valor { font-weight: bold; font-size: 9pt; text-transform: uppercase; color: #000 !important; }

.w-40 { width: 40%; } .w-60 { width: 60%; }
.w-25 { width: 25%; } .w-20 { width: 20%; } .w-15 { width: 15%; }

/* --- BARRAS --- */
.tabla-separador td {
    width: 50%;
    background-color: #0070c0;
    font-weight: bold;
    text-align: center;
    font-size: 9pt;
    padding: 2px 0;
    border: 1px solid #000;
}

/* --- CUERPO --- */
.contenedor-listas {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #000;
}
.mitad { width: 50%; }
.borde-der { border-right: 1px solid #000; }

.tabla-items th {
    text-align: left;
    font-size: 7pt;
    border-bottom: 1px solid #000;
    padding: 3px;
    background-color: #fff;
    font-weight: bold;
    color: #000 !important;
}
.tabla-items td { padding: 3px; font-size: 8pt; }
.text-right { text-align: right; }
.th-cpto { width: 12%; }
.th-desc { width: 63%; }
.th-imp { width: 25%; text-align: right; }

/* --- FOOTER --- */
.tabla-footer { border-top: 1px solid #000; }
.tabla-footer td { border: 1px solid #000; }

.footer-izq { width: 60%; position: relative; vertical-align: bottom !important; }
.footer-der { width: 40%; }

.nota-ajuste { font-size: 6pt; padding: 3px 5px; border-bottom: 1px solid #000; }
.sello-contenedor { display: flex; flex-direction: column; height: 80px; }
.sello-azul-fondo {
    flex-grow: 1;
    background-color: #0070c0;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.txt-grande { font-weight: bold; font-size: 8pt; margin-bottom: 4px; }
.txt-chico { font-size: 6pt; }
.barra-negra {
    background-color: #333;
    text-align: center;
    font-size: 7pt;
    padding: 2px 0;
}

/* Totales */
.fecha-emision { text-align: center; padding: 5px; border-bottom: 1px solid #000; height: 30px; }
.label-mini { font-size: 5pt; }

.totales-grid { display: flex; height: 50px; }
.box-total {
    width: 33%;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 5px;
}
.borde-r { border-right: 1px solid #000; }

.box-neto {
    width: 34%;
    background-color: #92d050;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding-bottom: 5px;
    border-left: 1px solid #000;
}

.monto { font-weight: bold; font-size: 10pt; color: #000 !important; }
.lbl { font-size: 6pt; margin-top: 2px; color: #000 !important; }

</style>