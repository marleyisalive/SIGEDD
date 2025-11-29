import axios from "axios";
const departamentoApi = axios.create({
  baseURL: "http://localhost:3001/api/departamento",
});
export default departamentoApi;
