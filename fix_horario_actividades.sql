-- Script para crear registros de Horario de Actividades (1.1.1) 
-- para todos los docentes que tienen grupos asignados pero no tienen el registro

-- Primero verificamos qué docentes tienen grupos pero NO tienen la actividad 188 registrada
SELECT 
    d.idDocente,
    u.nombreUsuario,
    u.apePatUsuario,
    u.apeMatUsuario,
    COUNT(DISTINCT g.idGrupo) as total_grupos
FROM docente d
JOIN usuario u ON d.idUsuario = u.idUsuario
JOIN grupo g ON d.idDocente = g.idDocente
LEFT JOIN docenteActividad da ON d.idDocente = da.idDocente AND da.idActividadInstitucional = 188
WHERE da.idDocenteActividad IS NULL
GROUP BY d.idDocente, u.nombreUsuario, u.apePatUsuario, u.apeMatUsuario
ORDER BY d.idDocente;

-- Insertar registros en docenteActividad para los docentes que tienen grupos pero no tienen la actividad 188
-- NOTA: Ajusta los IDs según sea necesario para que no haya conflictos

-- Martha Valenzuela (idDocente: 4) - NO tiene grupos pero se prueba
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1804,
    188,
    4,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Martín Félix (idDocente: 5) - tiene 3 grupos
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1805,
    188,
    5,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Mirna Quevedo (idDocente: 7) - tiene 2 grupos
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1807,
    188,
    7,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Noel García (idDocente: 12) - tiene 1 grupo
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1812,
    188,
    12,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Nora Cancela (idDocente: 13) - tiene 6 grupos
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1813,
    188,
    13,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Norma Godoy (idDocente: 14) - tiene 4 grupos
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1814,
    188,
    14,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Pedro Villa (idDocente: 16) - tiene 3 grupos
INSERT INTO docenteActividad (idDocenteActividad, idActividadInstitucional, idDocente, datosCapturados, fechaRegistro, validadoPor, fechaValidacion)
VALUES (
    1816,
    188,
    16,
    '{
        "horasPreparacion": 5,
        "actividadesApoyo": [],
        "actividadesAdmin": [],
        "idJefeDDA": 2,
        "idSubdirector": 3
    }',
    NOW(),
    2,
    NOW(),
    NULL
);

-- Verificar que se insertaron correctamente
SELECT 
    da.idDocenteActividad,
    da.idDocente,
    u.nombreUsuario,
    u.apePatUsuario,
    u.apeMatUsuario,
    ai.nombre as actividad,
    da.fechaRegistro,
    da.validadoPor
FROM docenteActividad da
JOIN docente d ON da.idDocente = d.idDocente
JOIN usuario u ON d.idUsuario = u.idUsuario
JOIN actividadInstitucional ai ON da.idActividadInstitucional = ai.idActividadInstitucional
WHERE da.idActividadInstitucional = 188
ORDER BY da.idDocente;
