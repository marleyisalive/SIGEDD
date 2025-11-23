import axios from "axios";
const aulaApi = axios.create({
  baseURL: "http://localhost:3001/api/aula",
});
export default aulaApi;
