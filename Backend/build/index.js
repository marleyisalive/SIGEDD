"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
//creamos la aplicacion de express y llamamos a su constructor
const app = (0, express_1.default)();
//Todo lo que regresa al usuario es tipo json
app.use(express_1.default.json());
//puerto para escuchar la peticion del front
const Puerto = 3001;

//Encendemos el servidor
app.listen(Puerto, () => {
  console.log(`Servidor encendido en el puerto ${Puerto}`);
});
//# sourceMappingURL=index.js.map
