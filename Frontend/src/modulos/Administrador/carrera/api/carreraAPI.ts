import axios from "axios";
const carreraApi = axios.create({
  baseURL: "http://localhost:3001/api/carrera",
});
export default carreraApi;
