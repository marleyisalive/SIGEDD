import axios from "axios";
const plazaApi = axios.create({
  baseURL: "http://localhost:3001/api/plaza",
});
export default plazaApi;
