import express from "express";

//creamos la aplicacion de express y llamamos a su constructor
const app = express();
//Todo lo que regresa al usuario es tipo json
app.use(express.json());

//configurar rutas para el acceso a personal
import nivelEstudioRutas from "./routes/nivelEstudioRutas"
import rol from "./routes/rolRutas"
import AulaRutas from "./routes/AulaRutas"
import CarreraRutas from "./routes/CarreraRutas"
import plaza from "./routes/plazaRutas"
import tipoDocumentoRutas from "./routes/tipoDocumentoRutas"
import documentoRutas from "./routes/documentoRutas"

//puerto para escuchar la peticion del front
const Puerto = 3001;

//activamos la ruta base
app.use("/api/nivelEstudio", nivelEstudioRutas);
app.use("/api/rol", rol);
app.use("/api/Aula", AulaRutas);
app.use("/api/Carrera", CarreraRutas);
app.use("/api/plaza", plaza);
app.use("/api/tipoDocumento", tipoDocumentoRutas);
app.use("/api/documento", documentoRutas);

//prueba
// app.get("/hola", (_req, res) => {
//   let fecha = new Date().toLocaleDateString();
//   res.send("mundo con la fecha " + fecha + " con typescript");
// });
//Encendemos el servidor
app.listen(Puerto, () => {
  console.log(`Servidor encendido en el puerto ${Puerto}`);
});
