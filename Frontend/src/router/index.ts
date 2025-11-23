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
  ],
});

export default router;
