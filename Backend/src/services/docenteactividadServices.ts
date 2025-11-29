// Importaciones necesarias
import {
  docenteactividad
} from "../types/typesDocenteActividad"; // Asegúrate de que la ruta sea correcta
import { createPool } from "mysql2/promise";

// Reutiliza la configuración de la conexión (idealmente esto debería estar en un archivo de configuración compartido)
const conexion = createPool({
  host: "localhost",
  user: "administrador",
  password: "admin123456",
  database: "SIGEDD",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

/**
 * Obtiene todas las relaciones docente-actividad de la base de datos.
 * @returns Un array de objetos DocenteActividad o un objeto de error.
 */

export const obtenerTodasDocenteActividad = async () => {
  try {
    const query = `
      SELECT 
        da.idDocenteActividad,
        da.idActividadInstitucional,
        da.idDocente,
        da.fechaRegistro,
        ai.nombre AS nombreActividad,  -- NECESARIO para que salga el nombre en la tabla
        ai.idTipoDocumento,
        td.nombre as nombreTipo        -- NECESARIO para que salga el badge gris
      FROM docenteactividad da
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      JOIN tipodocumento td ON ai.idTipoDocumento = td.idTipoDocumento
      ORDER BY da.fechaRegistro DESC
    `;
    
    const [results] = await conexion.query(query);
    return results;
  } catch (err) {
    console.error("Error al obtener las relaciones:", err);
    return [];
  }
};
/**
 * Encuentra una relación docente-actividad por su clave primaria compuesta.
 * @param idDocente El ID del docente.
 * @param idActividadInstitucional El ID de la actividad institucional.
 * @returns El objeto DocenteActividad encontrado o null si no existe.
 */
export const encontrarDocenteActividadPorPK = async (
  idDocente: number,
  idActividadInstitucional: number
) => {
  try {
    const [results] = await conexion.query(
      "SELECT * FROM docenteActividad WHERE idDocente = ? AND idActividadInstitucional = ?",
      [idDocente, idActividadInstitucional]
    );
    // query devuelve un array, si encuentra algo, el objeto estará en la primera posición
    return results; // Retorna el objeto o null si no lo encuentra
  } catch (err) {
    console.error(
      `Error al obtener la relación docente-actividad con DocenteID ${idDocente} y ActividadID ${idActividadInstitucional}:`,
      err
    );
    return { error: "No se pudo obtener la relación docente-actividad." };
  }
};

/**
 * Agrega una nueva relación docente-actividad a la base de datos.
 * @param nuevaDocenteActividad Los datos de la nueva relación.
 * @returns El resultado de la inserción o un objeto de error.
 */
export const agregarDocenteActividad = async (
  nuevaDocenteActividad: docenteactividad
) => {
  try {
    const [results] = await conexion.query(
      "INSERT INTO docenteActividad (idDocenteActividad,idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion) VALUES (?, ?, ?, ?, ?, ?)",
      [
        nuevaDocenteActividad.idDocenteActividad,
        nuevaDocenteActividad.idActividadInstitucional,
        nuevaDocenteActividad.idDocente,
        nuevaDocenteActividad.datosCapturados,
        nuevaDocenteActividad.fechaRegistro,
        nuevaDocenteActividad.validadoPor,
        nuevaDocenteActividad.fechaValidacion
      ]
    );
    return results;
  } catch (err: any) {
    // Usamos 'any' para acceder a 'err.code' de forma segura
    console.error("Error al agregar la relación docente-actividad:", err);
    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return {
        error:
          "No se pudo agregar la relación. Verifique los IDs de Docente o Actividad Institucional.",
      };
    }
    if (err.code === "ER_DUP_ENTRY") {
      return {
        error:
          "Ya existe una entrada para este docente y actividad. (Violación de clave primaria)",
      };
    }
    return { error: "No se pudo agregar la relación docente-actividad." };
  }
};

export const actualizarDocenteActividad = async (modificado:docenteactividad) => {
  try {
    const [results] = await conexion.query(
      "UPDATE documento SET idDocenteActividad = ?, datosCapturados = ?, fechaRegistro = ?, validadoPor = ?, fechaValidacion = ? WHERE idActividadInstitucional = ?, idDocente = ? ",
      [
        modificado.idDocenteActividad,
        modificado.datosCapturados,
        modificado.fechaRegistro,
        modificado.validadoPor,
        modificado.fechaValidacion,
        modificado.idActividadInstitucional,
        modificado.idDocente
      ]
    );
    return results;
  } catch (err) {
    console.error("error al actualizar el documento: ", err);
    return { error: "No se pudo actualizar el documento" };
  }
};

export const eliminarDocenteActividad = async (
  idDocente: number,
  idActividadInstitucional: number
) => {
  try {
    const [results] = await conexion.query(
      "DELETE FROM docenteActividad WHERE idDocente = ? AND idActividadInstitucional = ?",
      [idDocente, idActividadInstitucional]
    );
    return results;
  } catch (err: any) {
    console.error(
      `Error al eliminar la relación docente-actividad con DocenteID ${idDocente} y ActividadID ${idActividadInstitucional}:`,
      err
    );
    return { error: "No se pudo eliminar la relación docente-actividad." };
  }
};




/**
 * Función auxiliar (privada) para obtener nombres de firmantes
 */
const obtenerNombreFuncionario = async (idUsuario: number) => {
  if (!idUsuario) return "-----";
  try {
    const [rows]: any = await conexion.query(
      "SELECT nombreUsuario, apePatUsuario, apeMatUsuario FROM usuario WHERE idUsuario = ?",
      [idUsuario]
    );
    if (rows.length > 0) {
      const u = rows[0];
      return `${u.nombreUsuario} ${u.apePatUsuario} ${u.apeMatUsuario}`.toUpperCase();
    }
    return "USUARIO NO ENCONTRADO";
  } catch (error) {
    console.error("Error buscando funcionario:", error);
    return "-----";
  }
};


// 01

export const obtenerDatosConstanciaRH = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fecha actual para el pie de página
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const f = new Date(); // O usa base.fechaRegistro si prefieres la fecha de creación
    
    // Convertimos a texto (ej: "nueve", "Junio", "dos mil veinticinco")
    // Nota: Para "nueve" y "dos mil" exactos necesitarías una librería 'numero-a-letras', 
    // aquí usaré números para simplificar o el dato directo.
    const diaTexto = f.getDate().toString(); 
    const mesTexto = meses[f.getMonth()];
    const anioTexto = f.getFullYear().toString();

    // Resolver nombre del Jefe de RH
    const nombreJefeRH = await obtenerNombreFuncionario(json.idJefeRH);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      
      // Datos variables del texto
      oficio: json.numOficio || "S/N",
      filiacion: json.filiacion || "---",
      fechaContratacion: json.fechaContratacion || "---",
      clavePresupuestal: json.clavePresupuestal || "---",
      fechaEfectos: json.fechaEfectos || "---",
      periodoInicio: json.periodoInicio || "---",
      periodoFin: json.periodoFin || "---",
      
      // Datos para el pie
      diaTexto, 
      mesTexto, 
      anioTexto,
      
      // Firma
      nombreJefeRH
    };

  } catch (err) {
    console.error("Error servicio RH:", err);
    throw err;
  }
};

// 04

export const obtenerDatosOficioGenerico = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helper fechas
    const formatearFecha = (fechaStr: string) => {
        if(!fechaStr) return "---";
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const f = new Date(fechaStr);
        const fCorrecta = new Date(f.getTime() + f.getTimezoneOffset() * 60000);
        return `${fCorrecta.getDate()} de ${meses[fCorrecta.getMonth()]} de ${fCorrecta.getFullYear()}`;
    };

    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento, 
      oficio: json.oficio || "S/N",
      nombreCurso: json.nombreCurso || "Curso de Actualización",
      fechaInicio: formatearFecha(json.fechaInicio),
      fechaFin: formatearFecha(json.fechaFin),
      nombreJefeDDA
    };

  } catch (err) {
    console.error("Error servicio Oficio Genérico:", err);
    throw err;
  }
};


export const obtenerDatosCartaExclusividad = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fecha larga (Ej: 9 de Junio de 2025)
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const f = new Date(); // Fecha actual para la firma
    const fechaEscrita = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      // Datos específicos
      filiacion: json.filiacion || "---",
      clavePresupuestal: json.clavePresupuestal || "---",
      fechaEscrita
    };

  } catch (err) {
    console.error("Error servicio Exclusividad:", err);
    throw err;
  }
};

// 06

export const obtenerDatosConstanciaCVU = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    
    // Header: 11/JUNIO/2025
    const fechaHeader = `${f.getDate()}/${(meses[f.getMonth()] || "").toUpperCase()}/${f.getFullYear()}`;
    
    // Texto: diez días del mes de junio del año dos mil veinticinco
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()] || ""} del año ${f.getFullYear()}`;

    // Firmante
    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      fechaHeader,
      fechaTexto,
      // Datos específicos
      oficio: json.numOficio || "S/N",
      registro: json.registroCVU || "---",
      anio: json.anioCVU || new Date().getFullYear(),
      // Firma
      nombreJefeDDA
    };

  } catch (err) {
    console.error("Error servicio CVU:", err);
    throw err;
  }
};

// 07

export const obtenerDatosConstanciaAlumnos = async (idDocenteActividad: number) => {
  try {
    // 1. Obtener datos generales de la actividad y el docente
    const queryDocente = `
      SELECT 
        da.idDocente,
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(queryDocente, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    const anioReporte = json.anio || new Date().getFullYear().toString();

    // 2. ¡AQUÍ ESTÁ LA MAGIA! Consultamos la tabla GRUPO y MATERIA
    // Buscamos grupos de este docente cuyo periodo coincida con el año (ej: "%2024")
    const queryGrupos = `
      SELECT 
        g.periodo,
        m.idMateria as clave, -- Usamos el ID como clave, o el campo 'clave' si lo agregaste
        m.nombre,
        g.numeroAlumnos
      FROM grupo g
      JOIN materia m ON g.idMateria = m.idMateria
      WHERE g.idDocente = ? 
      AND g.periodo LIKE ?
      ORDER BY g.periodo, m.nombre
    `;

    const [grupos]: any = await conexion.query(queryGrupos, [base.idDocente, `%${anioReporte}%`]);

    // 3. Mapeamos los resultados al formato que espera el Frontend
    const listaMaterias = grupos.map((g: any) => ({
        periodo: g.periodo,
        nivel: "LICENCIATURA", // Valor por defecto o podrías traerlo de la tabla 'carrera' si haces más joins
        clave: g.clave,
        nombre: g.nombre,
        alumnos: g.numeroAlumnos
    }));

    // Calcular total
    const totalAlumnos = listaMaterias.reduce((acc: number, m: any) => acc + m.alumnos, 0);

    // Fechas y Firmas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;
    
    const nombreJefeEscolares = await obtenerNombreFuncionario(json.idJefeEscolares);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      fechaTexto,
      expediente: json.expediente || "---",
      materias: listaMaterias, // Ahora viene directo de la BD
      totalAlumnos,
      nombreJefeEscolares
    };

  } catch (err) {
    console.error("Error servicio Alumnos (BD):", err);
    throw err;
  }
};

// 1.1.1

export const obtenerDatosHorarioActividades = async (idDocenteActividad: number) => {
  try {
    // 1. Datos Docente y JSON
    const queryBase = `
      SELECT 
        da.idDocente, da.datosCapturados, da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        doc.filiacion as rfc, doc.idPlaza
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;
    const [rowsBase]: any = await conexion.query(queryBase, [idDocenteActividad]);
    if (rowsBase.length === 0) return null;
    
    const base = rowsBase[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;

    // 2. Datos de Grupos (Carga Académica)
    // NOTA: Aquí estoy simulando el periodo "ENE-JUN 2024". En prod, deberías sacarlo de la actividad.
    const queryGrupos = `
      SELECT 
        m.nombre as materia, 
        g.periodo, 
        g.horario, 
        g.numeroAlumnos,
        'ING. SISTEMAS COMPUTACIONALES' as nombreCarrera, 
        a.nombre as aula
      FROM grupo g
      JOIN materia m ON g.idMateria = m.idMateria
      JOIN aula a ON g.idAula = a.idAula
      WHERE g.idDocente = ?
    `;
    const [grupos]: any = await conexion.query(queryGrupos, [base.idDocente]);

    // 3. Procesamiento de Totales
    let totalHorasClase = 0;
    const cargaAcademica = grupos.map((g: any) => {
        // Cálculo simple de horas basado en el string (ej: "10:00 - 11:00" = 1 hr)
        // Esto es una estimación. Lo ideal es tener un campo 'horasSemana' en la BD.
        const horas = 5; // Valor dummy por defecto si no puedes calcularlo del string
        totalHorasClase += horas;
        return {
            asignatura: g.materia,
            grupo: "A", // Si tienes grupo en la BD, úsalo
            estudiantes: g.numeroAlumnos,
            aula: g.aula,
            carrera: g.nombreCarrera || "Sistemas",
            horario: g.horario, // "10:00 - 11:00"
            horasSemana: horas
        };
    });

    const horasPrep = json.horasPreparacion || 0;
    const subtotalDocencia = totalHorasClase + horasPrep;

    // Totales Apoyo y Admin
    const apoyo = json.actividadesApoyo || [];
    const admin = json.actividadesAdmin || [];
    
    const totalApoyo = apoyo.reduce((acc: number, i: any) => acc + (parseInt(i.total) || 0), 0);
    const totalAdmin = admin.reduce((acc: number, i: any) => acc + (parseInt(i.total) || 0), 0);
    const granTotal = subtotalDocencia + totalApoyo + totalAdmin;

    // Firmas
    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      encabezado: {
          nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
          departamento: base.nombreDepartamento,
          rfc: base.rfc || "XAXX010101000",
          plaza: "E3815 - TITULAR B", // Puedes sacarlo de la tabla plaza
          ingresoSEP: "01/09/2010",   // Datos simulados o agregar al JSON
          periodo: "ENE-JUN 2024"
      },
      cargaAcademica,
      horasPreparacion: horasPrep,
      subtotalDocencia,
      actividadesApoyo: apoyo,
      subtotalApoyo: totalApoyo,
      actividadesAdmin: admin,
      subtotalAdmin: totalAdmin,
      granTotal,
      firmas: {
          jefeDDA: nombreJefeDDA,
          subdirector: nombreSubdirector
      }
    };

  } catch (err) {
    console.error("Error servicio Horario:", err);
    throw err;
  }
};


/**
 * Obtiene los datos procesados específicamente para la Constancia PIT (Tipo 10)
 */
export const obtenerDatosConstanciaPIT = async (idDocenteActividad: number) => {
  try {
    // 1. Consulta SQL uniendo tablas para sacar nombres reales
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.periodo
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);

    if (rows.length === 0) return null;

    const base = rows[0];
    
    // Parsear el JSON guardado en la BD
    const jsonDatos = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Resolver nombres de los jefes (firmantes) usando la función auxiliar
    const nombreJefeDDA = await obtenerNombreFuncionario(jsonDatos.idJefeDDA);
    const nombreSubdirector = await obtenerNombreFuncionario(jsonDatos.idSubdirectorAcademico);

    // Retornar objeto limpio para el Frontend
    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fecha: base.fechaRegistro || new Date(),
      periodo: base.periodo, 
      carrera: jsonDatos.carrera || "INGENIERÍA EN SISTEMAS COMPUTACIONALES",
      totalTutorados: jsonDatos.totalTutorados || 0,
      detalleTutorias: jsonDatos.detalleTutorias || [], 
      firmaJefeDDA: nombreJefeDDA,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error en servicio PIT:", err);
    throw err;
  }
  
};

// 1.1.6 Acreditación (Tipo 20)
export const obtenerDatosConstanciaAcreditacion = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT da.datosCapturados
      FROM docenteactividad da
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helper simple para fechas en español
    const fmt = (fechaStr: string) => {
        if(!fechaStr) return "---";
        const f = new Date(fechaStr);
        // Ajuste de zona horaria simple para evitar desfases de día
        const userTimezoneOffset = f.getTimezoneOffset() * 60000;
        const fechaCorregida = new Date(f.getTime() + userTimezoneOffset);
        
        return fechaCorregida.toLocaleDateString('es-MX', { 
            year: 'numeric', month: 'long', day: 'numeric' 
        });
    };

    return {
      organismo: json.organismoAcreditador || "CONAIC",
      programaEducativo: json.programaEducativo || "PROGRAMA DESCONOCIDO",
      vigenciaInicio: fmt(json.fechaInicioVigencia),
      vigenciaFin: fmt(json.fechaFinVigencia),
      numRegistro: json.numRegistro || "S/N",
      fechaExpedicion: fmt(json.fechaExpedicion)
    };

  } catch (err) {
    console.error("Error servicio Acreditación:", err);
    throw err;
  }
};

// 1.1.7 Complementaria (Tipo 30)
export const obtenerDatosConstanciaComplementaria = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        ai.periodo
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helper de fechas (puedes reutilizar el que ya tengas o este)
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const fechaObj = new Date(base.fechaRegistro);
    const fechaTexto = `${fechaObj.getDate()} de ${meses[fechaObj.getMonth()]} del año ${fechaObj.getFullYear()}`;
    // Formato corto para el header (ej. 18/junio/2025)
    const fechaHeader = `${fechaObj.getDate()}/${meses[fechaObj.getMonth()]}/${fechaObj.getFullYear()}`;

    // Resolver nombres de firmantes
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepartamento);
    const nombreJefeCentro = await obtenerNombreFuncionario(json.idJefeCentroInformacion);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      periodo: base.periodo,
      fechaTexto: fechaTexto,
      fechaHeader: fechaHeader,
      // Datos específicos del JSON
      numOficio: json.numOficio || "S/N",
      dictamen: json.dictamen || "---",
      totalAlumnos: json.totalAlumnosAtendidos || 0,
      alumnosCredito: json.alumnosObtuvieronCredito || 0,
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaJefeCentro: nombreJefeCentro,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Complementaria:", err);
    throw err;
  }
};

// 1.2.1.1
export const obtenerDatosConstanciaRED = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        ai.periodo
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helpers de fecha
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    
    // Formato Header: 13/junio/2025
    const fechaHeader = `${f.getDate()}/${meses[f.getMonth()]}/${f.getFullYear()}`;
    
    // Formato Texto: a los trece días del mes de junio del año dos mil veinticinco
    // (Simplificado para el ejemplo, pero puedes usar una librería de números a letras si es estricto)
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Resolver Nombres de Firmantes
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombrePdteAcademia = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      periodo: base.periodo, // Ej: AGO-DIC 2024
      fechaHeader,
      fechaTexto,
      // Datos JSON
      numOficio: json.numOficio || "S/N",
      asignatura: json.asignatura || "---",
      programaEducativo: json.programaEducativo || "---",
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaPdteAcademia: nombrePdteAcademia,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio RED:", err);
    throw err;
  }
};

// 1.2.1.3

export const obtenerDatosConstanciaEstrategia = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()}/${meses[f.getMonth()]}/${f.getFullYear()}`;
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Nombres Firmantes
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombrePdteAcademia = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      fechaHeader,
      fechaTexto,
      // Datos JSON
      numOficio: json.numOficio || "S/N",
      asignatura: json.asignatura || "---",
      estrategia: json.estrategia || "---",
      programaEducativo: json.programaEducativo || "---",
      producto: json.productoObtenido || "Reporte",
      habilidades: json.habilidades || "habilidades generales",
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaPdteAcademia: nombrePdteAcademia,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Estrategia:", err);
    throw err;
  }
};

// 1.3.1.x


export const obtenerDatosConstanciaExencion = async (idDocenteActividad: number) => {
  try {
    // 1. Modificamos la consulta para traer también el idTipoDocumento
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        ai.idTipoDocumento -- NECESARIO PARA SABER EL TÍTULO
      FROM docenteactividad da
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const json = typeof rows[0].datosCapturados === 'string' 
      ? JSON.parse(rows[0].datosCapturados) 
      : rows[0].datosCapturados;

    const tipo = rows[0].idTipoDocumento;

    // 2. Determinar el Título del Documento según el ID
    let tituloDocumento = "CONSTANCIA DE EXENCIÓN DE EXAMEN PROFESIONAL"; // Default (90)
    
    if (tipo === 312) tituloDocumento = "CONSTANCIA DE EXAMEN DE ESPECIALIZACIÓN";
    else if (tipo === 313) tituloDocumento = "CONSTANCIA DE EXAMEN DE MAESTRÍA";
    else if (tipo === 315) tituloDocumento = "CONSTANCIA DE EXAMEN DE DOCTORADO";
    
    // Helpers fecha... (igual que antes)
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    
    let dia = "---", mes = "---", anio = "---";
    if (json.fechaActa) {
        const f = new Date(json.fechaActa);
        const userTimezoneOffset = f.getTimezoneOffset() * 60000;
        const fechaCorrecta = new Date(f.getTime() + userTimezoneOffset);
        dia = fechaCorrecta.getDate().toString();
        mes = meses[fechaCorrecta.getMonth()] || "";
        anio = fechaCorrecta.getFullYear().toString();
    }

    // Firmas
    const presidente = await obtenerNombreFuncionario(json.idPresidente);
    const secretario = await obtenerNombreFuncionario(json.idSecretario);
    const vocal = await obtenerNombreFuncionario(json.idVocal);
    // Si hubiera vocales extra, los puedes agregar aquí

    return {
      tituloDocumento, // <--- ENVIAMOS EL TÍTULO DINÁMICO
      nombreEstudiante: json.nombreEstudiante || "---",
      numControl: json.numControl || "---",
      carrera: json.carrera || "---",
      opcionTitulacion: json.opcionTitulacion || "---",
      dia, mes, anio,
      presidente,
      cedulaPresidente: "402002",
      secretario,
      cedulaSecretario: "5168880",
      vocal,
      cedulaVocal: "4982828"
    };

  } catch (err) {
    console.error("Error servicio Exención:", err);
    throw err;
  }
};

// 1.3.1.4 y 1.3.1.6

export const obtenerDatosCodireccion = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        ai.idTipoDocumento
      FROM docenteactividad da
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const json = typeof rows[0].datosCapturados === 'string' 
      ? JSON.parse(rows[0].datosCapturados) 
      : rows[0].datosCapturados;

    const tipo = rows[0].idTipoDocumento;

    // Título dinámico
    let tituloDocumento = "CONSTANCIA DE CODIRECCIÓN DE TESIS DE MAESTRÍA";
    if (tipo === 316) tituloDocumento = "CONSTANCIA DE CODIRECCIÓN DE TESIS DE DOCTORADO";

    // Fecha
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    let dia = "---", mes = "---", anio = "---";
    if (json.fechaExamen) {
        const f = new Date(json.fechaExamen);
        const userTimezoneOffset = f.getTimezoneOffset() * 60000;
        const fechaCorrecta = new Date(f.getTime() + userTimezoneOffset);
        dia = fechaCorrecta.getDate().toString();
        mes = meses[fechaCorrecta.getMonth()] || "";
        anio = fechaCorrecta.getFullYear().toString();
    }

    // Firmas
    const director = await obtenerNombreFuncionario(json.idDirector);
    const codirector = await obtenerNombreFuncionario(json.idCodirector);

    // RETORNO ADAPTADO A ConstanciaExencionVue
    return {
      tituloDocumento,
      
      // Mapeamos 'nombreTesista' a 'nombreEstudiante'
      nombreEstudiante: json.nombreTesista || "---",
      
      numControl: json.numControl || "---",
      carrera: tipo === 316 ? "DOCTORADO EN CIENCIAS" : "MAESTRÍA EN CIENCIAS",
      
      // Mapeamos el título de la tesis a 'opcionTitulacion' para que salga en el bloque central
      opcionTitulacion: `Tesis titulada: "${json.tituloTesis || '---'}"`,
      
      dia, mes, anio,
      
      // Mapeamos las firmas a los espacios de Presidente/Secretario
      presidente: director,      // Director -> Espacio Presidente
      cedulaPresidente: "Director", // Etiqueta
      
      secretario: codirector,    // Codirector -> Espacio Secretario
      cedulaSecretario: "Codirector",
      
      vocal: "",                 // Sin tercer firma
      cedulaVocal: ""
    };

  } catch (err) {
    console.error("Error servicio Codirección:", err);
    throw err;
  }
};

// 1.2.1.4

export const obtenerDatosConstanciaProductos = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    
    const fechaHeader = `${f.getDate()}/${meses[f.getMonth()]}/${f.getFullYear()}`;
    const dia = f.getDate().toString();
    const mes = meses[f.getMonth()];
    const anio = f.getFullYear().toString();

    // Firmas
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombrePdteAcademia = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      fechaHeader,
      dia, mes, anio,
      // Datos Específicos del Formato 1.2.1.4
      numOficio: json.numOficio || "S/N",
      asignatura: json.asignatura || "---",
      estrategia: json.estrategia || "---",
      carrera: json.carrera || "---", // En tu imagen dice VAR_NOMB_CARRERA
      producto: json.producto || "---",
      impacto: json.impacto || "---",
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaPdteAcademia: nombrePdteAcademia,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Productos:", err);
    throw err;
  }
};

// 1.2.2.1

export const obtenerDatosOficioComision = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helpers de fecha
    const formatearFecha = (fechaStr: string) => {
        if(!fechaStr) return "---";
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const f = new Date(fechaStr);
        const fCorrecta = new Date(f.getTime() + f.getTimezoneOffset() * 60000);
        return `${fCorrecta.getDate()} de ${meses[fCorrecta.getMonth()]} de ${fCorrecta.getFullYear()}`;
    };

    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento, 
      // Datos JSON
      oficio: json.oficio || "S/N",
      nombreCurso: json.nombreCurso || "---",
      institucionCurso: json.institucionCurso || "---",
      fechaInicio: formatearFecha(json.fechaInicio),
      fechaFin: formatearFecha(json.fechaFin),
      // Firma
      nombreJefeDDA
    };

  } catch (err) {
    console.error("Error servicio Comisión:", err);
    throw err;
  }
};

// 1.2.2.2

export const obtenerDatosOficioComisionTecNM = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helper fechas
    const formatearFecha = (fechaStr: string) => {
        if(!fechaStr) return "---";
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const f = new Date(fechaStr);
        const fCorrecta = new Date(f.getTime() + f.getTimezoneOffset() * 60000);
        return `${fCorrecta.getDate()} de ${meses[fCorrecta.getMonth()]} de ${fCorrecta.getFullYear()}`;
    };

    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento, 
      // Datos JSON
      oficio: json.oficio || "S/N",
      nombreCurso: json.nombreCurso || "---",
      fechaInicio: formatearFecha(json.fechaInicio),
      fechaFin: formatearFecha(json.fechaFin),
      // Firma
      nombreJefeDDA
    };

  } catch (err) {
    console.error("Error servicio Comisión TecNM:", err);
    throw err;
  }
};

// 1.2.2.3

export const obtenerDatosOficioPensamientoCritico = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helper fechas
    const formatearFecha = (fechaStr: string) => {
        if(!fechaStr) return "---";
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const f = new Date(fechaStr);
        const fCorrecta = new Date(f.getTime() + f.getTimezoneOffset() * 60000);
        return `${fCorrecta.getDate()} de ${meses[fCorrecta.getMonth()]} de ${fCorrecta.getFullYear()}`;
    };

    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento, 
      // Datos JSON
      oficio: json.oficio || "S/N",
      // Si no viene nombreCurso en el JSON, usamos el texto fijo de la imagen por defecto
      nombreCurso: json.nombreCurso || "Diplomado en Pensamiento Crítico para la Educación Tecnológica del TecNM",
      fechaInicio: formatearFecha(json.fechaInicio),
      fechaFin: formatearFecha(json.fechaFin),
      // Firma
      nombreJefeDDA
    };

  } catch (err) {
    console.error("Error servicio Pensamiento Crítico:", err);
    throw err;
  }
};

// 1.2.2.4

export const obtenerDatosConstanciaManual = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        ai.periodo
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()}/${meses[f.getMonth()]}/${f.getFullYear()}`;
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Firmas
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombrePdteAcademia = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      periodo: base.periodo,
      fechaHeader,
      fechaTexto,
      // Datos específicos
      numOficio: json.numOficio || "S/N",
      asignatura: json.asignatura || "---",
      carrera: json.carrera || "---",
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaPdteAcademia: nombrePdteAcademia,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Manual:", err);
    throw err;
  }
};

// 1.2.2.5

export const obtenerDatosOficioAmbientesVirtuales = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helper fechas
    const formatearFecha = (fechaStr: string) => {
        if(!fechaStr) return "---";
        const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
        const f = new Date(fechaStr);
        const fCorrecta = new Date(f.getTime() + f.getTimezoneOffset() * 60000);
        return `${fCorrecta.getDate()} de ${meses[fCorrecta.getMonth()]} de ${fCorrecta.getFullYear()}`;
    };

    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento, 
      // Datos JSON
      oficio: json.oficio || "S/N",
      // Texto por defecto si no viene en el JSON
      nombreCurso: json.nombreCurso || "Diplomado Recursos Educativos en Ambientes Virtuales para Profesores(as) del TecNM",
      fechaInicio: formatearFecha(json.fechaInicio),
      fechaFin: formatearFecha(json.fechaFin),
      // Firma
      nombreJefeDDA
    };

  } catch (err) {
    console.error("Error servicio Ambientes Virtuales:", err);
    throw err;
  }
};

// En services/docenteactividadServices.ts

export const obtenerDatosConstanciaDiplomado = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Desglose de fecha para "Ciudad de México"
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    
    // Usamos fechaExpedicion del JSON o la fecha actual si no existe
    const fechaStr = json.fechaExpedicion || new Date().toISOString();
    const f = new Date(fechaStr);
    // Ajuste zona horaria
    const fCorrecta = new Date(f.getTime() + f.getTimezoneOffset() * 60000);

    const dia = fCorrecta.getDate();
    const mes = meses[fCorrecta.getMonth()];
    const anio = fCorrecta.getFullYear();

    // Resolver nombre del Director Nacional
    const nombreDirector = await obtenerNombreFuncionario(json.idDirectorDDIE);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      // Datos específicos
      folio: json.folioConstancia || "S/N",
      diplomado: json.nombreDiplomado || "---",
      duracion: json.duracion || "0",
      periodoImparticion: json.periodoImparticion || "---",
      // Fecha desglosada
      dia, mes, anio,
      // Firma
      nombreDirector
    };

  } catch (err) {
    console.error("Error servicio Diplomado:", err);
    throw err;
  }
};

export const obtenerGruposActividades = async () => {
  try {
    // Esta consulta agrupa por el campo 'grupo' que creamos en la BD
    const query = `
      SELECT 
        td.grupo as nombreGrupo,
        COUNT(da.idDocenteActividad) as cantidadDocumentos
      FROM docenteactividad da
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      JOIN tipodocumento td ON ai.idTipoDocumento = td.idTipoDocumento
      WHERE td.grupo IS NOT NULL
      GROUP BY td.grupo
      ORDER BY td.grupo ASC
    `;
    
    const [results] = await conexion.query(query);
    return results;
  } catch (err) {
    console.error("Error obteniendo grupos:", err);
    return [];
  }
};

// 02 - Talón de Pago
export const obtenerDatosTalonPago = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
      da.datosCapturados,
      u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
      doc.filiacion as rfc, doc.idPlaza, p.descripcion as nombrePlaza, doc.filiacion as curp
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      LEFT JOIN plaza p ON doc.idPlaza = p.idPlaza
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Helpers para formato de moneda
    const formatMoney = (amount: number) => {
        return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN', minimumFractionDigits: 2 });
    };

    // Procesar Listas y Totales
    const percepciones = Array.isArray(json.percepciones) ? json.percepciones : [];
    const deducciones = Array.isArray(json.deducciones) ? json.deducciones : [];

    const totalPercepciones = percepciones.reduce((acc: number, item: any) => acc + (Number(item.importe) || 0), 0);
    const totalDeducciones = deducciones.reduce((acc: number, item: any) => acc + (Number(item.importe) || 0), 0);
    const netoPagar = totalPercepciones - totalDeducciones;

    // Formatear importes individuales para visualización
    const percepcionesFmt = percepciones.map((p: any) => ({...p, importe: formatMoney(p.importe)}));
    const deduccionesFmt = deducciones.map((d: any) => ({...d, importe: formatMoney(d.importe)}));

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      rfc: base.rfc || "XAXX010101000",
      curp: base.curp || "XAXX010101HDF...",
      plaza: base.nombrePlaza || "E3817", // Usamos la descripción o un código por defecto
      
      // Datos variables
      periodoPago: json.periodoPago || "--/--/----",
      numEmpleado: json.numEmpleado || "000000",
      fechaEmision: json.fechaEmision || "--/--/----",
      
      // Tablas
      percepciones: percepcionesFmt,
      deducciones: deduccionesFmt,
      
      // Totales calculados
      totalPercepciones: formatMoney(totalPercepciones),
      totalDeducciones: formatMoney(totalDeducciones),
      netoPagar: formatMoney(netoPagar)
    };

  } catch (err) {
    console.error("Error servicio Talón:", err);
    throw err;
  }
};

// 1.4.8.3

export const obtenerDatosPropuestaPrograma = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fecha Header (Ej: Culiacán, Sinaloa, a 15 de enero de 2024)
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    // Firmas
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombrePdteAcademia = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaHeader,
      
      // Datos específicos
      oficio: json.oficio || "S/N",
      nombreProyecto: json.nombreProyecto || "---",
      fechaInicio: json.fechaInicio || "---",
      fechaFin: json.fechaFin || "---",
      actividades: json.actividades || "---",
      
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaPdteAcademia: nombrePdteAcademia,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Propuesta:", err);
    throw err;
  }
};

// 1.4.9, 09 - Cédula Profesional

export const obtenerDatosCedula = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        doc.filiacion as curp,
        ai.idTipoDocumento 
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Lógica de Nivel: 
    // Si es 195 -> Doctorado, 196 -> Maestría.
    // Si es 216 (Req 10) -> Leemos del JSON o default a "GRADO ACADÉMICO".
    let nivel = "GRADO ACADÉMICO";
    if (base.idTipoDocumento === 195) nivel = "DOCTORADO";
    else if (base.idTipoDocumento === 196) nivel = "MAESTRÍA";
    else if (base.idTipoDocumento === 216) nivel = json.nivel || "MAESTRÍA"; // Default o lo que diga el JSON

    return {
      nombre: base.nombreUsuario.toUpperCase(),
      primerApellido: base.apePatUsuario.toUpperCase(),
      segundoApellido: base.apeMatUsuario ? base.apeMatUsuario.toUpperCase() : "",
      curp: base.curp || "XXXX000000XXXXXX00",
      nivel, 
      
      // Datos del JSON
      numeroCedula: json.numeroCedula || "00000000",
      nombrePrograma: json.nombrePrograma || "---",
      clavePrograma: json.clavePrograma || "---",
      institucion: json.institucion || "---",
      claveInstitucion: json.claveInstitucion || "---",
      fechaExpedicion: json.fechaExpedicion || "---",
      horaExpedicion: json.horaExpedicion || "---",
      cadenaOriginal: json.cadenaOriginal || "||...||",
      selloDigital: json.selloDigital || "...",
      firmaElectronica: json.firmaElectronica || "..."
    };

  } catch (err) {
    console.error("Error servicio Cédula:", err);
    throw err;
  }
};

// 05 - Constancia de Investigación

export const obtenerDatosConstanciaInvestigacion = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()}/${meses[f.getMonth()]}/${f.getFullYear()}`;
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Firmas
    const nombreDirector = await obtenerNombreFuncionario(json.idDirector);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaHeader,
      fechaTexto,
      
      // Datos JSON
      oficio: json.numOficio || "S/N",
      tituloProyecto: json.tituloProyecto || "---",
      claveRegistro: json.claveRegistro || "---",
      vigenciaInicio: json.vigenciaInicio || "---",
      vigenciaFin: json.vigenciaFin || "---",
      
      // Firmas
      firmaDirector: nombreDirector,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Investigación:", err);
    throw err;
  }
};

// 08 Oficio Sabático

export const obtenerDatosOficioSabatico = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    // Firmas
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombrePdteAcademia = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirectorAcademico);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      fechaHeader,
      // Datos
      oficio: json.numOficio || "S/N",
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaPdteAcademia: nombrePdteAcademia,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Sabático:", err);
    throw err;
  }
};

// 09 - Licencia por Gravidez

export const obtenerDatosLicenciaGravidez = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    // Firmas
    const nombreJefeRH = await obtenerNombreFuncionario(json.idJefeRH);
    const nombreDirector = await obtenerNombreFuncionario(json.idDirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaHeader,
      
      // Datos JSON
      oficio: json.numOficio || "S/N",
      fechaInicio: json.fechaInicio || "---",
      fechaFin: json.fechaFin || "---",
      
      // Firmas
      firmaJefeRH: nombreJefeRH,
      firmaDirector: nombreDirector
    };

  } catch (err) {
    console.error("Error servicio Gravidez:", err);
    throw err;
  }
};

// 11 - Liberación de Actividades

export const obtenerDatosLiberacionActividades = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Firmas
    const nombreJefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      
      // Datos del JSON
      semestre: json.semestre || "---",
      estado: json.estadoLiberacion || "LIBERADO", // "LIBERADO" o "NO LIBERADO"
      lugarFecha: json.lugarFecha || "---",
      
      // Firmas
      firmaJefeDepto: nombreJefeDepto,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Liberación:", err);
    throw err;
  }
};

// 12 - Liberación Académica

export const obtenerDatosLiberacionAcademica = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Firmas
    const nombrePresidente = await obtenerNombreFuncionario(json.idPresidenteAcademia);
    const nombreJefe = await obtenerNombreFuncionario(json.idJefeDepto);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      
      // Datos JSON
      semestre: json.semestre || "---",
      lugarFecha: json.lugarFecha || "---",
      otrosActividad: json.otrosActividad || "", // Opcional
      
      // Firmas
      firmaPresidente: nombrePresidente,
      firmaJefe: nombreJefe
    };

  } catch (err) {
    console.error("Error servicio Liberación Académica:", err);
    throw err;
  }
};

// 13 - Reporte de Investigación

export const obtenerDatosReporteInvestigacion = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Firma del coordinador
    const nombreCoordinador = await obtenerNombreFuncionario(json.idCoordinadorInvestigacion);

    // Procesar lista de proyectos (asegurar que sea un array)
    const listaProyectos = Array.isArray(json.proyectos) ? json.proyectos : [];

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      
      // Datos JSON
      semestre: json.semestre || "---",
      lugarFecha: json.lugarFecha || "---",
      proyectos: listaProyectos, // Array de objetos {titulo, estatus, claveRegistro}
      
      // Firmas
      firmaCoordinador: nombreCoordinador
    };

  } catch (err) {
    console.error("Error servicio Reporte Investigación:", err);
    throw err;
  }
};

// 14 - Evaluación Docente

export const obtenerDatosEvaluacionDocente = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        doc.idPlaza, p.descripcion as plaza
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      LEFT JOIN plaza p ON doc.idPlaza = p.idPlaza
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Firmas
    const nombreJefeDDA = await obtenerNombreFuncionario(json.idJefeDDA);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      plaza: base.plaza || "TIEMPO COMPLETO",
      
      // Datos JSON
      periodo: json.periodoEvaluado || "---",
      calificacion: json.calificacionFinal || "0.0",
      desempeno: json.desempeno || "---",
      resultados: json.resultados || [], // Array de {rubro, puntaje}
      
      // Firmas
      firmaJefeDDA: nombreJefeDDA,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Evaluación:", err);
    throw err;
  }
};


// Función genérica para Constancias de Proyectos (1.4.2.x)
export const obtenerDatosConstanciaProyectos = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.idTipoDocumento -- Necesario para el título
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;
    
    const tipo = base.idTipoDocumento;

    // 1. Determinar Título dinámicamente
    let tituloSufijo = "(ESTATAL O REGIONAL)";
    if (tipo === 422) tituloSufijo = "(NACIONAL)";
    if (tipo === 423) tituloSufijo = "(INTERNACIONAL)";

    // 2. Fechas
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    // 3. Firmas (Son 3 específicas)
    const jefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const subdirector = await obtenerNombreFuncionario(json.idSubdirector);
    const jefeInvestigacion = await obtenerNombreFuncionario(json.idJefeInvestigacion);

    // 4. Asegurar que 'proyectos' sea un array
    const listaProyectos = Array.isArray(json.proyectos) ? json.proyectos : [];

    return {
      tituloDocumento: `CONSTANCIA DE PARTICIPACIÓN EN PROYECTO ${tituloSufijo}`,
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento,
      periodo: json.periodo || "---",
      fechaTexto,
      // La lista de proyectos para la tabla
      proyectos: listaProyectos, 
      // Firmas
      firmaJefeDepto: jefeDepto,
      firmaSubdirector: subdirector,
      firmaJefeInvestigacion: jefeInvestigacion
    };

  } catch (err) {
    console.error("Error servicio Constancia Proyectos:", err);
    throw err;
  }
};

// 1.4.1

export const obtenerDatosAsesoriaCienciasBasicas = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados,
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' 
      ? JSON.parse(base.datosCapturados) 
      : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaHeader = `${f.getDate()}/${meses[f.getMonth()]}/${f.getFullYear()}`;
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Firmas
    const nombreJefeCB = await obtenerNombreFuncionario(json.idJefeCienciasBasicas);
    const nombreSubdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaHeader,
      fechaTexto,
      
      // Datos JSON
      oficio: json.numOficio || "S/N",
      asignatura: json.asignatura || "---",
      totalAlumnos: json.totalAlumnos || "0",
      periodo: json.periodo || "---",
      
      // Firmas
      firmaJefeCB: nombreJefeCB,
      firmaSubdirector: nombreSubdirector
    };

  } catch (err) {
    console.error("Error servicio Asesoría CB:", err);
    throw err;
  }
};


// Función genérica para la familia 1.4.3.x (Asesorías)
export const obtenerDatosAsesoriaGeneric = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.idTipoDocumento -- Necesario para saber el tipo exacto
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;
    const tipo = base.idTipoDocumento;

    // 1. Lógica para determinar el Texto de la Actividad y el Rubro
    let actividadTexto = "proyectos diversos";
    let rubroTexto = "1.4.3.X";

    switch (tipo) {
        case 431:
            actividadTexto = "proyectos de creatividad, emprendedurismo e innovación";
            rubroTexto = "1.4.3.1";
            break;
        case 432:
            actividadTexto = "diseño de prototipos, modelos físicos o software";
            rubroTexto = "1.4.3.2";
            break;
        case 433:
            actividadTexto = "desarrollo de prototipos, modelos físicos o software";
            rubroTexto = "1.4.3.3";
            break;
        case 434:
            actividadTexto = "diseño y desarrollo de equipo";
            rubroTexto = "1.4.3.4";
            break;
        case 435:
            actividadTexto = "Servicio Social";
            rubroTexto = "1.4.3.5";
            break;
        case 436:
            actividadTexto = "Residencia Profesional";
            rubroTexto = "1.4.3.6";
            break;
    }

    // 2. Formatear lista de estudiantes
    let listaEstudiantes = "---";
    if (Array.isArray(json.estudiantes) && json.estudiantes.length > 0) {
        // Une los nombres con comas, y usa "y" para el último.
        listaEstudiantes = json.estudiantes.join(", ").replace(/, ([^,]*)$/, ' y $1');
    }

    // 3. Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} días del mes de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // 4. Firmas
    const jefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const subdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      // Datos calculados en el backend
      actividadTexto, 
      rubroTexto,
      listaEstudiantes,
      
      // Datos generales
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaTexto,
      
      // Datos del JSON
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      nombreProyecto: json.nombreProyecto ? `"${json.nombreProyecto}"` : "", // Agrega comillas si existe
      
      // Firmas
      firmaJefeDepto: jefeDepto,
      firmaSubdirector: subdirector
    };

  } catch (err) {
    console.error("Error servicio Asesoría Genérica:", err);
    throw err;
  }
};


// Función para Concursos (1.4.4.x)
export const obtenerDatosConstanciaConcurso = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.idTipoDocumento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;
    const tipo = base.idTipoDocumento;

    // Determinar Función y Alcance por ID (si no viene en JSON)
    let funcionDefault = "PARTICIPANTE";
    if ([441, 442, 443].includes(tipo)) funcionDefault = "COORDINADOR(A) GENERAL";
    else if ([444, 445, 446].includes(tipo)) funcionDefault = "COLABORADOR(A)";

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Firmas
    const jefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const subdirector = await obtenerNombreFuncionario(json.idSubdirector);
    const jefeCentro = await obtenerNombreFuncionario(json.idJefeCentroInfo); // Puede ser Jefe de Depto Académico o Centro Info

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaTexto,
      
      // Datos específicos
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      nombreConcurso: json.nombreConcurso || "---",
      funcion: json.funcion || funcionDefault,
      actividades: json.actividades || "---",
      
      // Firmas (1 arriba, 2 abajo según la imagen 1.4.3.1 que es similar)
      firmaJefeDepto: jefeDepto,
      firmaSubdirector: subdirector,
      firmaJefeCentro: jefeCentro
    };

  } catch (err) {
    console.error("Error servicio Concursos:", err);
    throw err;
  }
};

// Función para Jurado (1.4.5.x)

export const obtenerDatosConstanciaJurado = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.idTipoDocumento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;
    const tipo = base.idTipoDocumento;

    // Lógica de Nivel
    let nivelTexto = "JURADO";
    let rubroTexto = "1.4.5.X";

    if (tipo === 451) { nivelTexto = "Jurado Local"; rubroTexto = "1.4.5.1"; }
    else if (tipo === 452) { nivelTexto = "Jurado Estatal/Regional"; rubroTexto = "1.4.5.2"; }
    else if (tipo === 453) { nivelTexto = "Jurado Nacional"; rubroTexto = "1.4.5.3"; }
    else if (tipo === 454) { nivelTexto = "Jurado Internacional"; rubroTexto = "1.4.5.4"; }

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const dia = f.getDate();
    const mes = meses[f.getMonth()];
    const anio = f.getFullYear();

    // Firmas
    const jefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const subdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      
      // Textos dinámicos
      nivelTexto,
      rubroTexto, // Para el asunto
      
      // Datos JSON
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      evento: json.evento || "---",
      
      // Fechas para el header
      dia, mes, anio,
      
      // Firmas
      firmaJefeDepto: jefeDepto,
      firmaSubdirector: subdirector
    };

  } catch (err) {
    console.error("Error servicio Jurado:", err);
    throw err;
  }
};

// 1.4.6 - Comité de Evaluación

export const obtenerDatosConstanciaComite = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        doc.idPlaza -- Para el grado (Dr., M.C., etc) si lo tienes
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    // Firmas (En este caso firma el Director)
    const firmaDirector = await obtenerNombreFuncionario(json.idDirector);

    // Lista Evaluaciones
    const listaEvaluaciones = Array.isArray(json.evaluaciones) ? json.evaluaciones : [];

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento,
      
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      fechaTexto,
      
      evaluaciones: listaEvaluaciones,
      
      firmaDirector
    };

  } catch (err) {
    console.error("Error servicio Comite:", err);
    throw err;
  }
};

// 1.4.7 - Auditoría

// services/docenteactividadServices.ts

export const obtenerDatosConstanciaAuditoria = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.idTipoDocumento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;
    const tipo = base.idTipoDocumento;

    // Determinar Rol Automáticamente si no viene en JSON
    let rolTexto = "AUDITOR";
    if (tipo === 471 || tipo === 472) rolTexto = "AUDITOR INTERNO";
    if (tipo === 473 || tipo === 474) rolTexto = "AUDITOR LÍDER";

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Firmas
    const jefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const subdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaTexto,
      
      // Datos Específicos
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      tipoAuditoria: json.tipoAuditoria || "Sistema de Gestión",
      funcion: json.funcion || rolTexto,
      lugar: json.lugar || "Instituto Tecnológico de Culiacán",
      
      // Firmas
      firmaJefeDepto: jefeDepto,
      firmaSubdirector: subdirector
    };

  } catch (err) {
    console.error("Error servicio Auditoría:", err);
    throw err;
  }
};

// 1.4.8.1 - Desarrollo Curricular

export const obtenerDatosDesarrolloCurricular = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento,
        ai.idTipoDocumento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;
    const tipo = base.idTipoDocumento;

    // Configuración según nivel
    let nivelTexto = "LOCAL";
    let firmaNombre = "";
    let firmaCargo = "";

    if (tipo === 481) {
        // Local: Firma Director del Plantel
        nivelTexto = "LOCAL";
        firmaNombre = await obtenerNombreFuncionario(json.idDirector);
        firmaCargo = "DIRECTOR(A) DEL INSTITUTO TECNOLÓGICO";
    } else {
        // Nacional: Firma DDIE
        nivelTexto = "NACIONAL";
        firmaNombre = await obtenerNombreFuncionario(json.idDirectorDDIE);
        firmaCargo = "DIRECTOR(A) DE DOCENCIA E INNOVACIÓN EDUCATIVA (TecNM)";
    }

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaTexto,
      nivelTexto,
      
      // Datos
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      programa: json.nombrePrograma || "---",
      actividad: json.actividad || "---",
      
      // Firma Dinámica
      firmaNombre,
      firmaCargo
    };

  } catch (err) {
    console.error("Error servicio Desarrollo Curricular:", err);
    throw err;
  }
};

// 1.4.8.2 - Módulo de Especialidad

export const obtenerDatosConstanciaModuloEspecialidad = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        d.nombreDepartamento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN departamento d ON doc.idDepartamento = d.idDepartamento
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} de ${f.getFullYear()}`;

    // Firmas
    const jefeDepto = await obtenerNombreFuncionario(json.idJefeDepto);
    const subdirector = await obtenerNombreFuncionario(json.idSubdirector);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      departamento: base.nombreDepartamento.toUpperCase(),
      fechaTexto,
      
      // Datos JSON
      oficio: json.numOficio || "S/N",
      periodo: json.periodo || "---",
      nombreModulo: json.nombreModulo || "---",
      carrera: json.carrera || "---",
      
      // Firmas
      firmaJefeDepto: jefeDepto,
      firmaSubdirector: subdirector
    };

  } catch (err) {
    console.error("Error servicio Módulo Especialidad:", err);
    throw err;
  }
};

// 1.3.2.x - Sinodal

// services/docenteactividadServices.ts

export const obtenerDatosConstanciaSinodal = async (idDocenteActividad: number) => {
  try {
    const query = `
      SELECT 
        da.datosCapturados, 
        da.fechaRegistro,
        u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario,
        ai.idTipoDocumento
      FROM docenteactividad da
      JOIN docente doc ON da.idDocente = doc.idDocente
      JOIN usuario u ON doc.idUsuario = u.idUsuario
      JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
      WHERE da.idDocenteActividad = ?
    `;

    const [rows]: any = await conexion.query(query, [idDocenteActividad]);
    if (rows.length === 0) return null;

    const base = rows[0];
    const json = typeof base.datosCapturados === 'string' ? JSON.parse(base.datosCapturados) : base.datosCapturados;
    const tipo = base.idTipoDocumento;

    // Determinar Nivel
    let nivelTexto = "LICENCIATURA";
    if (tipo === 321) nivelTexto = "TÉCNICO SUPERIOR";
    if (tipo === 323) nivelTexto = "ESPECIALIZACIÓN";
    if (tipo === 324) nivelTexto = "MAESTRÍA";
    if (tipo === 325) nivelTexto = "DOCTORADO";

    // Fechas
    const meses = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
    const f = new Date(base.fechaRegistro);
    const fechaTexto = `${f.getDate()} de ${meses[f.getMonth()]} del año ${f.getFullYear()}`;

    // Firma Jefe Escolares
    const jefeEscolares = await obtenerNombreFuncionario(json.idJefeEscolares);

    return {
      nombreDocente: `${base.nombreUsuario} ${base.apePatUsuario} ${base.apeMatUsuario}`.toUpperCase(),
      nivelTexto,
      fechaTexto,
      
      // Datos JSON
      oficio: json.numOficio || "S/N",
      folioActa: json.folioActa || "---",
      fechaExamen: json.fechaExamen || "---",
      estudiante: json.nombreEstudiante || "---",
      carrera: json.carrera || "---",
      rol: json.rol || "VOCAL",
      
      // Firma
      firmaJefeEscolares: jefeEscolares
    };

  } catch (err) {
    console.error("Error servicio Sinodal:", err);
    throw err;
  }
};