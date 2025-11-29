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
import ConstanciaTutoriaVue from "@/modulos/principal/vistas/plantillas/ConstanciaTutoriaVue.vue";



const router = createRouter({
  history: createWebHistory((import.meta as any).env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    {
       path: '/inicio',
       name: 'inicio',
       component: InicioVue,
     },
     {
       path: '/docentesgenerar',
       name: 'docentesgenerar',
       component: DocentesGenerarVue,
     },
     {
       path: '/docenteselegir',
       name: 'docenteselegir',
       component: DocentesElegirVue,
     },
     {
       path: '/administrativovalidar',
       name: 'administrativovalidar',
       component: AdministrativoValidarVue,
     },
     {
       path: '/administrativovalidardocente',
       name: 'administrativovalidardocente',
       component: AdministrativoValidarDocenteVue,
     },
     {
       path: '/administrativovalidardocentedocumento',
       name: 'administrativovalidardocentedocumento',
       component: AdministrativoValidarDocenteDocumentoVue,
     },
      {
       path: '/Login',
       name: 'Login',
       component: LoginVue,
     },
     {
       path: '/OlvidarContraseña',
       name: 'OlvidarContraseña',
       component: OlvidarContraseñaVue,
     },
     {
       path: '/RestablecerContraseña',
       name: 'Restablecer Contraseña',
       component: RestablecerContraseñaVue,
      },
      {
      path: '/DocentesP',
      name: 'Docentes Principal',
      component: DocentesPVue,
    },
    {
      path: '/DocumentosL',
      name: 'Documentos Listos',
      component: DocumentosLVue,
    },
    {
      path: '/AdministrativoP',
      name: 'Administrativo Principal',
      component: AdministrativoPVue,
    },


    
    // PRUEBA DE PLANTILLAS
    {
      path: '/ConstanciaTutoria',
      name: 'Constancia Tutoria',
      component: ConstanciaTutoriaVue,
    },
    
  ],
});

export default router;