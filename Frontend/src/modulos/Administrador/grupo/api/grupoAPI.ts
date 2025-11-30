import axios from "axios";

const baseURL = "http://localhost:3001/api/grupo";

export const obtenerGrupos = async () => {
  const response = await axios.get(baseURL);
  return response.data;
};

export const obtenerGrupoPorId = async (idGrupo: number) => {
  const response = await axios.get(`${baseURL}/${idGrupo}`);
  return response.data;
};

export const crearGrupo = async (grupo: any) => {
  const response = await axios.post(baseURL, grupo);
  return response;
};

export const actualizarGrupo = async (idGrupo: number, grupo: any) => {
  const grupoConId = { ...grupo, idGrupo };
  const response = await axios.put(baseURL, grupoConId);
  return response;
};

export const eliminarGrupo = async (idGrupo: number) => {
  const response = await axios.delete(baseURL, { data: { idGrupo } });
  return response;
};
