import express from "express";

//creamos la aplicacion de express y llamamos a su constructor
const app = express();
//Todo lo que regresa al usuario es tipo json
app.use(express.json());

//configurar rutas para el acceso
import nivelEstudioRutas from "./routes/nivelEstudioRutas";
import rol from "./routes/rolRutas";
import aulaRutas from "./routes/aulaRutas";
import carreraRutas from "./routes/carreraRutas";
import plaza from "./routes/plazaRutas";
import documento from "./routes/documentoRutas"
import tipoDocumento from "./routes/tipoDocumentoRutas"


// =========== TUS RUTAS A INTEGRAR ===========
import docenteRutas from "./routes/docenteRutas"; // Asegúrate que el path sea correcto
import docenteActividadRutas from "./routes/docenteactividadRutas"; // Asegúrate que el path sea correcto
// ============================================

//puerto para escuchar la peticion del front
const Puerto = 3001;

//activamos la ruta base
app.use("/api/nivelEstudio", nivelEstudioRutas);
app.use("/api/rol", rol);
app.use("/api/aula", aulaRutas);
app.use("/api/carrera", carreraRutas);
app.use("/api/plaza", plaza);
app.use("/api/docente", docenteRutas);
app.use("/api/docenteactividad", docenteActividadRutas);
app.use("/api/tipoDocumento", tipoDocumento)
app.use("/api/documento", documento);


//prueba
// app.get("/hola", (_req, res) => {
//   let fecha = new Date().toLocaleDateString();
//   res.send("mundo con la fecha " + fecha + " con typescript");
// });
//Encendemos el servidor
app.listen(Puerto, () => {
  console.log(`Servidor encendido en el puerto ${Puerto}`);
});