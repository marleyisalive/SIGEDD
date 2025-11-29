import axios from "axios";
const actividadInstitucionalApi = axios.create({
  baseURL: "http://localhost:3001/api/actividadInstitucional",
});
export default actividadInstitucionalApi;
