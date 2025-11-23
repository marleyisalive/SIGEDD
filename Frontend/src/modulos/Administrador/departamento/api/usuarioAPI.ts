import axios from "axios";
const usuarioApi = axios.create({
  baseURL: "http://localhost:3001/api/usuario",
});
export default usuarioApi;
