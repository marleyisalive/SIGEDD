import { Departamento } from "../typesDepartamentos";
import { createPool } from "mysql2/promise";

const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
});

export const obtieneDepartamento = async () => {
  try {
    const [results] = await conexion.query("SELECT * FROM Departamento");
    return results;
  } catch (err) {
    console.error("error al obtener los departamentos: ", err);
    return { error: "No se puede obtener los departamentos" };
  }
};

export const encuentraDepartamentoPorId = async (id: number) => {
  try {
    // el segundo parámetro debe ser un array con los valores para la consulta
    const [results] = await conexion.query(
      "SELECT * FROM departamento WHERE idDepartamento = ?",
      id
    );
    return results;
  } catch (err) {
    console.error("error al obtener el departamento por id: ", err);
    return { error: "No se puede obtener el departamento por id" };
  }
};


export const agregarDepartamento = async (nuevo: Departamento) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO departamento (idDepartamento, nombreDepartamento, encargadoDepartamento) VALUES (?, ?, ?)",
      [nuevo.idDepartamento, nuevo.nombreDepartamento, nuevo.encargadoDepartamento]
    );
    return results;
  } catch (err) {
    console.error("error al agregar el departamento: ", err);
    return { error: "No se pudo agregar el departamento" };
  }
};

export const actualizarDepartamento = async (modificado: Departamento) => {
  try {
    const [results] = await conexion.query(
      "UPDATE departamento SET nombreDepartamento = ?, encargadoDepartamento = ? WHERE IdDepartamento = ?",
      [modificado.nombreDepartamento,modificado.encargadoDepartamento, modificado.idDepartamento]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el departamento: ", err);
    return { error: "No se pudo actualizar el departamento" };
  }
};

export const eliminarDepartamento = async (idDepartamento: number) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM departamento WHERE idDepartamento= ?",
      [idDepartamento]
    );
    return results;
  } catch (err) {
    console.error("error al eliminar el departamento: ", err);
    return { error: "No se pudo eliminar el departamento" };

  }
};
