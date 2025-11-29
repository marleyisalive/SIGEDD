import axios from "axios";
const tipoDocumentoApi = axios.create({
  baseURL: "http://localhost:3001/api/tipoDocumento",
});
export default tipoDocumentoApi;
