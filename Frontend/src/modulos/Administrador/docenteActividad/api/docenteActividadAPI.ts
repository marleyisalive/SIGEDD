import axios from "axios";
const docenteActividadApi = axios.create({
  baseURL: "http://localhost:3001/api/docenteActividad",
});
export default docenteActividadApi;
