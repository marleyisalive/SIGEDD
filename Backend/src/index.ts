import express from "express";

//creamos la aplicacion de express y llamamos a su constructor
const app = express();
//Todo lo que regresa al usuario es tipo json
app.use(express.json());

//configurar rutas para el acceso a personal
import nivelEstudioRutas from "./routes/nivelEstudioRutas";

//puerto para escuchar la peticion del front
const Puerto = 3001;

//activamos la ruta base
app.use("/api/nivelEstudio", nivelEstudioRutas);

//prueba
// app.get("/hola", (_req, res) => {
//   let fecha = new Date().toLocaleDateString();
//   res.send("mundo con la fecha " + fecha + " con typescript");
// });
//Encendemos el servidor
app.listen(Puerto, () => {
  console.log(`Servidor encendido en el puerto ${Puerto}`);
});
