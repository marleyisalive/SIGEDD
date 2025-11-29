import { createRouter, createWebHistory } from "vue-router";
import LoginVue from "@/modulos/principal/vistas/LoginVue.vue";
import OlvidarContraseñaVue from "@/modulos/principal/vistas/OlvidarContraseñaVue.vue";
import RestablecerContraseñaVue from "@/modulos/principal/vistas/RestablecerContraseñaVue.vue";
import AdministrativoValidarVue from "@/modulos/principal/vistas/AdministrativoValidarVue.vue";
import DocentesGenerarVue from "@/modulos/principal/vistas/DocentesGenerarVue.vue";
import InicioVue from "@/modulos/principal/vistas/InicioVue.vue";
import AdministrativoValidarDocenteVue from "@/modulos/principal/vistas/AdministrativoValidarDocenteVue.vue";
import DocentesElegirVue from "@/modulos/principal/vistas/DocentesElegirVue.vue";
import AdministrativoValidarDocenteDocumentoVue from "@/modulos/principal/vistas/AdministrativoValidarDocenteDocumentoVue.vue";
import DocentesPVue from "@/modulos/principal/vistas/DocentesPVue.vue";
import DocumentosLVue from "@/modulos/principal/vistas/DocumentosLVue.vue";
import AdministrativoPVue from "@/modulos/principal/vistas/AdministrativoPVue.vue";
import AulaVue from "@/modulos/Administrador/aula/vistas/AulaVue.vue";
import AulaAgregarVue from "@/modulos/Administrador/aula/vistas/AulaAgregarVue.vue";
import AulaEditarVue from "@/modulos/Administrador/aula/vistas/AulaEditarVue.vue";
import AulaBorrarVue from "@/modulos/Administrador/aula/vistas/AulaBorrarVue.vue";
import NivelEstudioVue from "@/modulos/Administrador/nivelEstudio/vistas/NivelEstudioVue.vue";
import NivelEstudioAgregarVue from "@/modulos/Administrador/nivelEstudio/vistas/NivelEstudioAgregarVue.vue";
import NivelEstudioEditarVue from "@/modulos/Administrador/nivelEstudio/vistas/NivelEstudioEditarVue.vue";
import NivelEstudioBorrarVue from "@/modulos/Administrador/nivelEstudio/vistas/NivelEstudioBorrarVue.vue";
import CarreraVue from "@/modulos/Administrador/carrera/vistas/CarreraVue.vue";
import CarreraAgregarVue from "@/modulos/Administrador/carrera/vistas/CarreraAgregarVue.vue";
import CarreraEditarVue from "@/modulos/Administrador/carrera/vistas/CarreraEditarVue.vue";
import CarreraBorrarVue from "@/modulos/Administrador/carrera/vistas/CarreraBorrarVue.vue";
import DepartamentoVue from "@/modulos/Administrador/departamento/vistas/DepartamentoVue.vue";
import DepartamentoAgregarVue from "@/modulos/Administrador/departamento/vistas/DepartamentoAgregarVue.vue";
import DepartamentoEditarVue from "@/modulos/Administrador/departamento/vistas/DepartamentoEditarVue.vue";
import DepartamentoBorrarVue from "@/modulos/Administrador/departamento/vistas/DepartamentoBorrarVue.vue";
import MateriaVue from "@/modulos/Administrador/materia/vistas/MateriaVue.vue";
import MateriaAgregarVue from "@/modulos/Administrador/materia/vistas/MateriaAgregarVue.vue";
import MateriaEditarVue from "@/modulos/Administrador/materia/vistas/MateriaEditarVue.vue";
import MateriaBorrarVue from "@/modulos/Administrador/materia/vistas/MateriaBorrarVue.vue";
import UsuarioVue from "@/modulos/Administrador/usuario/vistas/UsuarioVue.vue";
import UsuarioAgregarVue from "@/modulos/Administrador/usuario/vistas/UsuarioAgregarVue.vue";
import UsuarioEditarVue from "@/modulos/Administrador/usuario/vistas/UsuarioEditarVue.vue";
import UsuarioBorrarVue from "@/modulos/Administrador/usuario/vistas/UsuarioBorrarVue.vue";
import RolVue from "@/modulos/Administrador/rol/vistas/RolVue.vue";
import RolAgregarVue from "@/modulos/Administrador/rol/vistas/RolAgregarVue.vue";
import RolEditarVue from "@/modulos/Administrador/rol/vistas/RolEditarVue.vue";
import RolBorrarVue from "@/modulos/Administrador/rol/vistas/RolBorrarVue.vue";
import PlazaVue from "@/modulos/Administrador/plaza/vistas/PlazaVue.vue";
import PlazaAgregarVue from "@/modulos/Administrador/plaza/vistas/PlazaAgregarVue.vue";
import PlazaEditarVue from "@/modulos/Administrador/plaza/vistas/PlazaEditarVue.vue";
import PlazaBorrarVue from "@/modulos/Administrador/plaza/vistas/PlazaBorrarVue.vue";
import DocenteVue from "@/modulos/Administrador/docente/vistas/DocenteVue.vue";
import DocenteAgregarVue from "@/modulos/Administrador/docente/vistas/DocenteAgregarVue.vue";
import DocenteEditarVue from "@/modulos/Administrador/docente/vistas/DocenteEditarVue.vue";
import DocenteBorrarVue from "@/modulos/Administrador/docente/vistas/DocenteBorrarVue.vue";

const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    {
      path: "/",
      redirect: "/inicio",
    },
    {
      path: "/inicio",
      name: "inicio",
      component: InicioVue,
    },
    {
      path: "/docentesgenerar",
      name: "docentesgenerar",
      component: DocentesGenerarVue,
    },
    {
      path: "/docenteselegir",
      name: "docenteselegir",
      component: DocentesElegirVue,
    },
    {
      path: "/administrativovalidar",
      name: "administrativovalidar",
      component: AdministrativoValidarVue,
    },
    {
      path: "/administrativovalidardocente",
      name: "administrativovalidardocente",
      component: AdministrativoValidarDocenteVue,
    },
    {
      path: "/administrativovalidardocentedocumento",
      name: "administrativovalidardocentedocumento",
      component: AdministrativoValidarDocenteDocumentoVue,
    },
    {
      path: "/Login",
      name: "Login",
      component: LoginVue,
    },
    {
      path: "/OlvidarContraseña",
      name: "OlvidarContraseña",
      component: OlvidarContraseñaVue,
    },
    {
      path: "/RestablecerContraseña",
      name: "Restablecer Contraseña",
      component: RestablecerContraseñaVue,
    },
    {
      path: "/DocentesP",
      name: "Docentes Principal",
      component: DocentesPVue,
    },
    {
      path: "/DocumentosL",
      name: "Documentos Listos",
      component: DocumentosLVue,
    },
    {
      path: "/AdministrativoP",
      name: "Administrativo Principal",
      component: AdministrativoPVue,
    },
    {
      path: "/aula",
      name: "aula",
      component: AulaVue,
    },
    {
      path: "/aula/agregar",
      name: "aulaagregar",
      component: AulaAgregarVue,
    },
    {
      path: "/aula/:idAula/editar",
      name: "aulaeditar",
      component: AulaEditarVue,
    },
    {
      path: "/aula/:idAula/borrar",
      name: "aulaborrar",
      component: AulaBorrarVue,
    },
    {
      path: "/nivelEstudio",
      name: "nivelEstudio",
      component: NivelEstudioVue,
    },
    {
      path: "/nivelEstudio/agregar",
      name: "nivelEstudioagregar",
      component: NivelEstudioAgregarVue,
    },
    {
      path: "/nivelEstudio/:idNivelEstudio/editar",
      name: "nivelEstudioeditar",
      component: NivelEstudioEditarVue,
    },
    {
      path: "/nivelEstudio/:idNivelEstudio/borrar",
      name: "nivelEstudioborrar",
      component: NivelEstudioBorrarVue,
    },
    {
      path: "/carrera",
      name: "carrera",
      component: CarreraVue,
    },
    {
      path: "/carrera/agregar",
      name: "carreraagregar",
      component: CarreraAgregarVue,
    },
    {
      path: "/carrera/:idCarrera/editar",
      name: "carreraeditar",
      component: CarreraEditarVue,
    },
    {
      path: "/carrera/:idCarrera/borrar",
      name: "carreraborrar",
      component: CarreraBorrarVue,
    },
    {
      path: "/departamento",
      name: "departamento",
      component: DepartamentoVue,
    },
    {
      path: "/departamento/agregar",
      name: "departamentoagregar",
      component: DepartamentoAgregarVue,
    },
    {
      path: "/departamento/:idDepartamento/editar",
      name: "departamentoeditar",
      component: DepartamentoEditarVue,
    },
    {
      path: "/departamento/:idDepartamento/borrar",
      name: "departamentoborrar",
      component: DepartamentoBorrarVue,
    },
    {
      path: "/materia",
      name: "materia",
      component: MateriaVue,
    },
    {
      path: "/materia/agregar",
      name: "materiaagregar",
      component: MateriaAgregarVue,
    },
    {
      path: "/materia/:idMateria/editar",
      name: "materiaeditar",
      component: MateriaEditarVue,
    },
    {
      path: "/materia/:idMateria/borrar",
      name: "materiaborrar",
      component: MateriaBorrarVue,
    },
    {
      path: "/usuario",
      name: "usuario",
      component: UsuarioVue,
    },
    {
      path: "/usuario/agregar",
      name: "usuarioagregar",
      component: UsuarioAgregarVue,
    },
    {
      path: "/usuario/:idUsuario/editar",
      name: "usuarioeditar",
      component: UsuarioEditarVue,
    },
    {
      path: "/usuario/:idUsuario/borrar",
      name: "usuarioborrar",
      component: UsuarioBorrarVue,
    },
    {
      path: "/rol",
      name: "rol",
      component: RolVue,
    },
    {
      path: "/rol/agregar",
      name: "rolagregar",
      component: RolAgregarVue,
    },
    {
      path: "/rol/:idRol/editar",
      name: "roleditar",
      component: RolEditarVue,
    },
    {
      path: "/rol/:idRol/borrar",
      name: "rolborrar",
      component: RolBorrarVue,
    },
    {
      path: "/plaza",
      name: "plaza",
      component: PlazaVue,
    },
    {
      path: "/plaza/agregar",
      name: "plazaagregar",
      component: PlazaAgregarVue,
    },
    {
      path: "/plaza/:idPlaza/editar",
      name: "plazaeditar",
      component: PlazaEditarVue,
    },
    {
      path: "/plaza/:idPlaza/borrar",
      name: "plazaborrar",
      component: PlazaBorrarVue,
    },
    {
      path: "/docente",
      name: "docente",
      component: DocenteVue,
    },
    {
      path: "/docente/agregar",
      name: "docenteagregar",
      component: DocenteAgregarVue,
    },
    {
      path: "/docente/:idDocente/editar",
      name: "docenteeditar",
      component: DocenteEditarVue,
    },
    {
      path: "/docente/:idDocente/borrar",
      name: "docenteborrar",
      component: DocenteBorrarVue,
    },
  ],
});

export default router;
