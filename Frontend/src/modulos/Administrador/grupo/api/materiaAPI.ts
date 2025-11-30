import axios from "axios";
const materiaApi = axios.create({
  baseURL: "http://localhost:3001/api/materia",
});
export default materiaApi;
