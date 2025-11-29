import axios from "axios";
const rolApi = axios.create({
  baseURL: "http://localhost:3001/api/rol",
});
export default rolApi;
