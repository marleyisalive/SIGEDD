-- Script para agregar restricciones de llaves foráneas a la base de datos SIGEDD
-- Ejecutar este script DESPUÉS de importar el archivo bd
-- Esto prevendrá la eliminación de registros que tengan relaciones con otras tablas

USE `sigedd`;

-- Primero eliminar restricciones existentes para evitar duplicados
ALTER TABLE `actividadInstitucional` DROP FOREIGN KEY IF EXISTS `fk_actividadinst_tipodoc`;
ALTER TABLE `departamento` DROP FOREIGN KEY IF EXISTS `fk_departamento_encargado`;
ALTER TABLE `docente` DROP FOREIGN KEY IF EXISTS `fk_docente_usuario`;
ALTER TABLE `docente` DROP FOREIGN KEY IF EXISTS `fk_docente_nivel`;
ALTER TABLE `docente` DROP FOREIGN KEY IF EXISTS `fk_docente_departamento`;
ALTER TABLE `docente` DROP FOREIGN KEY IF EXISTS `fk_docente_plaza`;
ALTER TABLE `docenteActividad` DROP FOREIGN KEY IF EXISTS `fk_docenteact_actividad`;
ALTER TABLE `docenteActividad` DROP FOREIGN KEY IF EXISTS `fk_docenteact_docente`;
ALTER TABLE `docenteActividad` DROP FOREIGN KEY IF EXISTS `fk_docenteact_validador`;
ALTER TABLE `documento` DROP FOREIGN KEY IF EXISTS `fk_documento_docenteact`;
ALTER TABLE `materia` DROP FOREIGN KEY IF EXISTS `fk_materia_departamento`;
ALTER TABLE `grupo` DROP FOREIGN KEY IF EXISTS `fk_grupo_docente`;
ALTER TABLE `grupo` DROP FOREIGN KEY IF EXISTS `fk_grupo_materia`;
ALTER TABLE `grupo` DROP FOREIGN KEY IF EXISTS `fk_grupo_aula`;
ALTER TABLE `usuario` DROP FOREIGN KEY IF EXISTS `fk_usuario_rol`;

-- Agregar restricciones para la tabla actividadInstitucional
ALTER TABLE `actividadInstitucional`
  ADD CONSTRAINT `fk_actividadinst_tipodoc` 
  FOREIGN KEY (`idTipoDocumento`) 
  REFERENCES `tipoDocumento` (`idTipoDocumento`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla departamento
ALTER TABLE `departamento`
  ADD CONSTRAINT `fk_departamento_encargado` 
  FOREIGN KEY (`encargadoDepartamento`) 
  REFERENCES `docente` (`idDocente`) 
  ON DELETE SET NULL 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla docente
ALTER TABLE `docente`
  ADD CONSTRAINT `fk_docente_usuario` 
  FOREIGN KEY (`idUsuario`) 
  REFERENCES `usuario` (`idUsuario`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_docente_nivel` 
  FOREIGN KEY (`idNivelEstudio`) 
  REFERENCES `nivelEstudio` (`idNivelEstudio`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_docente_departamento` 
  FOREIGN KEY (`idDepartamento`) 
  REFERENCES `departamento` (`idDepartamento`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_docente_plaza` 
  FOREIGN KEY (`idPlaza`) 
  REFERENCES `plaza` (`idPlaza`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla docenteActividad
ALTER TABLE `docenteActividad`
  ADD CONSTRAINT `fk_docenteact_actividad` 
  FOREIGN KEY (`idActividadInstitucional`) 
  REFERENCES `actividadInstitucional` (`idActividadInstitucional`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_docenteact_docente` 
  FOREIGN KEY (`idDocente`) 
  REFERENCES `docente` (`idDocente`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_docenteact_validador` 
  FOREIGN KEY (`validadoPor`) 
  REFERENCES `docente` (`idDocente`) 
  ON DELETE SET NULL 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla documento
ALTER TABLE `documento`
  ADD CONSTRAINT `fk_documento_docenteact` 
  FOREIGN KEY (`idDocenteActividad`) 
  REFERENCES `docenteActividad` (`idDocenteActividad`) 
  ON DELETE CASCADE 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla grupo
ALTER TABLE `grupo`
  ADD CONSTRAINT `fk_grupo_docente` 
  FOREIGN KEY (`idDocente`) 
  REFERENCES `docente` (`idDocente`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_grupo_materia` 
  FOREIGN KEY (`idMateria`) 
  REFERENCES `materia` (`idMateria`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_grupo_aula` 
  FOREIGN KEY (`idAula`) 
  REFERENCES `aula` (`idAula`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla materia
ALTER TABLE `materia`
  ADD CONSTRAINT `fk_materia_departamento` 
  FOREIGN KEY (`idDepartamento`) 
  REFERENCES `departamento` (`idDepartamento`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE;

-- Agregar restricciones para la tabla usuario
ALTER TABLE `usuario`
  ADD CONSTRAINT `fk_usuario_rol` 
  FOREIGN KEY (`idRol`) 
  REFERENCES `rol` (`idRol`) 
  ON DELETE RESTRICT 
  ON UPDATE CASCADE;
