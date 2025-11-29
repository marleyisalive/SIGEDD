import axios from "axios";
const docenteApi = axios.create({
  baseURL: "http://localhost:3001/api/docente",
});
export default docenteApi;
