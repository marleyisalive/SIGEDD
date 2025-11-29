import express, { Request, Response } from "express";
import * as docenteActividadServices from "../services/docenteactividadServices"; // Importa tu servicio
import {
  //docenteactividad,
  NuevaDocenteActividad,
} from "../types/typesDocenteActividad"; // Importa tus tipos

// Activamos las rutas
const router = express.Router();



// Obtener actividades
router.get("/grupos/resumen", async (_req, res) => {
  const grupos = await docenteActividadServices.obtenerGruposActividades();
  res.send(grupos);
});

// RUTA: 1.2.2.7 - Estratégicos (Tipo 132)
router.get("/:idDocenteActividad/comision-estrategicos", async (req: Request, res: Response) => {
  const id = Number(req.params.idDocenteActividad);
  const datos = await docenteActividadServices.obtenerDatosOficioGenerico(id);
  
  if (!datos) {
      return res.status(404).send({ error: "No encontrado" });
  }
  return res.send(datos);
});

// RUTA: Constancia RH 01 (Tipo 140) 
router.get("/:idDocenteActividad/constancia-rh", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaRH(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Talón de Pago 02 (Tipo 190) 
router.get("/:idDocenteActividad/talon", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosTalonPago(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Carta Exclusividad 04 (Tipo 150)
router.get("/:idDocenteActividad/exclusividad", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosCartaExclusividad(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Constancia CVU 06(Tipo 160) 
router.get("/:idDocenteActividad/cvu", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaCVU(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Alumnos Atendidos 07 (Tipo 170)
router.get("/:idDocenteActividad/alumnos-atendidos", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaAlumnos(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Codirección (314, 316)
router.get("/:idDocenteActividad/codireccion", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosCodireccion(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Horario de Actividades 1.1.1 (Tipo 180)
router.get("/:idDocenteActividad/horario", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosHorarioActividades(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// --- OBTENER DATOS PARA CONSTANCIA PIT 1.1.5 (TIPO 10) ---
// GET http://localhost:3001/api/docente-actividad/:idDocenteActividad/pit
router.get("/:idDocenteActividad/pit", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    
    // Llamamos a la nueva función que creamos en el servicio
    const datos = await docenteActividadServices.obtenerDatosConstanciaPIT(id);

    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos para generar la constancia." });
      return; // Importante para detener la ejecución
    }

    res.send(datos);
  } catch (err) {
    console.error("Error al obtener datos para constancia PIT: ", err);
    res.status(500).send({ error: "Error interno al procesar el documento." });
  }
});

// RUTA: Constancia de Acreditación 1.1.6(Tipo 20)
router.get("/:idDocenteActividad/acreditacion", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaAcreditacion(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Complementaria 1.1.7 (Tipo 30)
router.get("/:idDocenteActividad/complementaria", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaComplementaria(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Recurso Educativo Digital 1.2.1.1 (Tipo 40)
router.get("/:idDocenteActividad/red", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaRED(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// NUEVA RUTA: Manual de Prácticas 1.2.1.2 (Tipo 50)
router.get("/:idDocenteActividad/manual", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaManual(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Estrategia Innovadora 1.2.1.3 (Tipo 60)
router.get("/:idDocenteActividad/estrategia", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaEstrategia(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Instructor Diplomado 1.2.2.4 (Tipo 70)
router.get("/:idDocenteActividad/diplomado", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaDiplomado(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Oficio Comisión (Tipo 100) - 1.2.2.1
router.get("/:idDocenteActividad/comision", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosOficioComision(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Oficio Comisión TecNM (Tipo 110) - 1.2.2.2
router.get("/:idDocenteActividad/comision-tecnm", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosOficioComisionTecNM(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Oficio Pensamiento Crítico (Tipo 120) - 1.2.2.3
router.get("/:idDocenteActividad/comision-pensamiento", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosOficioPensamientoCritico(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Oficio Ambientes Virtuales (Tipo 130) - 1.2.2.5
router.get("/:idDocenteActividad/comision-ambientes", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosOficioAmbientesVirtuales(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Constancia de Productos (Tipo 80) - 1.2.1.4
router.get("/:idDocenteActividad/productos", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaProductos(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Exención Examen 1.3.1.x (Tipo 90)
router.get("/:idDocenteActividad/exencion", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaExencion(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Cédula Profesional 1.4.9 (Sirve para 195, 196 y 216)
router.get("/:idDocenteActividad/cedula", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosCedula(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Propuesta Programa (Tipo 200) - 1.4.8.3
router.get("/:idDocenteActividad/propuesta", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosPropuestaPrograma(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Oficio Sabático (Tipo 210) - 08
router.get("/:idDocenteActividad/sabatico", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosOficioSabatico(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Liberación Actividades (Tipo 220) - 11
router.get("/:idDocenteActividad/liberacion", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosLiberacionActividades(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Liberación Académica (Tipo 230) - 12
router.get("/:idDocenteActividad/liberacion-academica", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosLiberacionAcademica(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Reporte Investigación (Tipo 240) - 13
router.get("/:idDocenteActividad/reporte-investigacion", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosReporteInvestigacion(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Evaluación Docente (Tipo 250) - 14
router.get("/:idDocenteActividad/evaluacion-docente", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosEvaluacionDocente(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Horario Adicional (Tipo 181) - 1.1.2
router.get("/:idDocenteActividad/horario-adicional", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    // REUTILIZAMOS el servicio del horario normal (03)
    const datos = await docenteActividadServices.obtenerDatosHorarioActividades(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Horario Posgrado (Tipo 182) - 1.1.3
router.get("/:idDocenteActividad/horario-posgrado", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    // REUTILIZAMOS el servicio del horario estándar
    const datos = await docenteActividadServices.obtenerDatosHorarioActividades(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Estudiantes Atendidos (Tipo 183) - 1.1.4
router.get("/:idDocenteActividad/estudiantes-114", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    // REUTILIZAMOS el servicio de Constancia Alumnos (07)
    const datos = await docenteActividadServices.obtenerDatosConstanciaAlumnos(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Constancia Proyectos Genérica (421, 422, 423)
router.get("/:idDocenteActividad/constancia-proyectos", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaProyectos(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Asesoría Ciencias Básicas (Tipo 410) - 1.4.1
router.get("/:idDocenteActividad/asesoria-cb", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosAsesoriaCienciasBasicas(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Asesorías Genéricas (Familia 1.4.3.x -> IDs 431 a 436)
router.get("/:idDocenteActividad/asesoria-generic", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosAsesoriaGeneric(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Concursos y Eventos (1.4.4.x -> IDs 441-446)
router.get("/:idDocenteActividad/concurso-generic", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaConcurso(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Jurado Generic 1.4.5.x (451-454)
router.get("/:idDocenteActividad/jurado-generic", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaJurado(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Comités de Evaluación (461-463)
router.get("/:idDocenteActividad/comite-generic", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaComite(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Auditorías (471-474)
router.get("/:idDocenteActividad/auditoria-generic", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaAuditoria(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Desarrollo Curricular (481 y 483)
router.get("/:idDocenteActividad/desarrollo-curricular", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosDesarrolloCurricular(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: 1.4.8.2 Módulos Especialidad (Tipo 482)
router.get("/:idDocenteActividad/modulo-especialidad", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaModuloEspecialidad(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// 1.2.2.6 - Inclusiva (Tipo 131)
router.get("/:idDocenteActividad/comision-inclusiva", async (req: Request, res: Response) => {
  const id = Number(req.params.idDocenteActividad);
  const datos = await docenteActividadServices.obtenerDatosOficioGenerico(id);
  
  if (!datos) {
      return res.status(404).send({ error: "No encontrado" });
  }

  return res.send(datos);
});

// RUTA: Sinodal Genérico (321-325)
router.get("/:idDocenteActividad/sinodal-generic", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaSinodal(id);
    if (!datos) {
      res.status(404).send({ error: "No encontrado" });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Constancia Investigación (Tipo 155) - 05
router.get("/:idDocenteActividad/investigacion-05", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosConstanciaInvestigacion(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});

// RUTA: Licencia Gravidez (Tipo 215) - 09
router.get("/:idDocenteActividad/licencia-gravidez", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.idDocenteActividad);
    const datos = await docenteActividadServices.obtenerDatosLicenciaGravidez(id);
    if (!datos) {
      res.status(404).send({ error: "No se encontraron datos." });
      return;
    }
    res.send(datos);
  } catch (err) {
    res.status(500).send({ error: "Error interno." });
  }
});


// --- OBTENER TODAS LAS RELACIONES ---
// GET http://localhost:3001/api/docente-actividad
router.get("/", async (_req: Request, res: Response) => {
  let relaciones =
    await docenteActividadServices.obtenerTodasDocenteActividad();
  res.send(relaciones);
});

// --- OBTENER UNA RELACIÓN POR PK COMPUESTA ---
// GET http://localhost:3001/api/docente-actividad/:idDocente/:idActividadInstitucional
// (Esta ruta es la única que difiere porque la PK es compuesta)
router.get(
  "/:idDocente/:idActividadInstitucional",
  async (req: Request, res: Response) => {
    let relacion =
      await docenteActividadServices.encontrarDocenteActividadPorPK(
        Number(req.params.idDocente),
        Number(req.params.idActividadInstitucional)
      );
    res.send(relacion);
  }
);

// --- CREAR UNA NUEVA RELACIÓN ---
// POST http://localhost:3001/api/docente-actividad
router.post("/", async (req: Request, res: Response) => {
  try {
    const nuevaRelacion: NuevaDocenteActividad = req.body;

    const nuevo = await docenteActividadServices.agregarDocenteActividad(
      nuevaRelacion
    );
    res.send(nuevo);
  } catch (err) {
    console.error("Error al agregar la relación docente-actividad: ", err);
    res
      .status(400)
      .send({ error: "No se pudo agregar la relación docente-actividad" });
  }
});

// --- ACTUALIZAR UNA RELACIÓN ---
// PUT http://localhost:3001/api/docente-actividad
router.put("/", async (req: Request, res: Response) => {
  try {
    // La PK compuesta (idDocente, idActividadInstitucional) debe venir en el body
    const {idDocenteActividad, idActividadInstitucional,idDocente,datosCapturados,fechaRegistro,validadoPor,fechaValidacion}= req.body;
    const modificado = await docenteActividadServices.actualizarDocenteActividad({
      idDocenteActividad,
      idActividadInstitucional,
      idDocente,
      datosCapturados,
      fechaRegistro,
      validadoPor,
      fechaValidacion,
    });
    res.send(modificado);
  } catch (err) {
    console.error("Error al actualizar la relación docente-actividad", err);
    res
      .status(400)
      .send({ error: "No se pudo actualizar la relación docente-actividad" });
  }
});

// --- ELIMINAR UNA RELACIÓN ---
// DELETE http://localhost:3001/api/docente-actividad
router.delete("/", async (req: Request, res: Response) => {
  try {
    // La PK compuesta (idDocente, idActividadInstitucional) debe venir en el body
    const { idDocente, idActividadInstitucional } = req.body;

    const eliminado = await docenteActividadServices.eliminarDocenteActividad(
      idDocente,
      idActividadInstitucional
    );
    res.send(eliminado);
  } catch (err) {
    console.error("Error al eliminar la relación docente-actividad", err);
    res
      .status(400)
      .send({ error: "No se pudo eliminar la relación docente-actividad" });
  }
});





// Exportamos las rutas
export default router;
