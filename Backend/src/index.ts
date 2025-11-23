import express from "express";
import cors from "cors";

//creamos la aplicacion de express y llamamos a su constructor
const app = express();
//Todo lo que regresa al usuario es tipo json
app.use(express.json());
app.use(cors());

//configurar rutas para el acceso
import nivelEstudioRutas from "./routes/nivelEstudioRutas";
import rolRutas from "./routes/rolRutas";
import aulaRutas from "./routes/aulaRutas";
import plazaRutas from "./routes/plazaRutas";
import tipoDocumentoRutas from "./routes/tipoDocumentoRutas";
import documentoRutas from "./routes/documentoRutas";
import docenteRutas from "./routes/docenteRutas"; // Asegúrate que el path sea correcto
//import docenteActividadRutas from "./routes/docenteactividadRutas"; // Asegúrate que el path sea correcto
import departamentoRutas from "./routes/departamentoRutas";
import usuarioRutas from "./routes/usuarioRutas";
import grupoRutas from "./routes/grupoRutas";
import materiaRutas from "./routes/materiaRutas";
import actividadInstitucionalRutas from "./routes/actividadInstitucionalRutas";

//puerto para escuchar la peticion del front
const Puerto = 3001;

//activamos la ruta base
app.use("/api/nivelEstudio", nivelEstudioRutas);
app.use("/api/rol", rolRutas);
app.use("/api/aula", aulaRutas);
app.use("/api/plaza", plazaRutas);
app.use("/api/docente", docenteRutas);
//app.use("/api/docenteactividad", docenteActividadRutas);
app.use("/api/tipoDocumento", tipoDocumentoRutas);
app.use("/api/documento", documentoRutas);
app.use("/api/departamento", departamentoRutas);
app.use("/api/usuario", usuarioRutas);
app.use("/api/grupo", grupoRutas);
app.use("/api/materia", materiaRutas);
app.use("/api/actividadInstitucional", actividadInstitucionalRutas);

//prueba
// app.get("/hola", (_req, res) => {
//   let fecha = new Date().toLocaleDateString();
//   res.send("mundo con la fecha " + fecha + " con typescript");
// });
//Encendemos el servidor
app.listen(Puerto, () => {
  console.log(`Servidor encendido en el puerto ${Puerto}`);
});
