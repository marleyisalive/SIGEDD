import axios from "axios";
const nivelEstudioApi = axios.create({
  baseURL: "http://localhost:3001/api/nivelEstudio",
});
export default nivelEstudioApi;
