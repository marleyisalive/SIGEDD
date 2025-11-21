import InicioVue from "@/modulos/principal/vistas/InicioVue.vue";
import LoginVue from "@/modulos/principal/vistas/LoginVue.vue";
import OlvidarContraseñaVue from "@/modulos/principal/vistas/OlvidarContraseñaVue.vue";
import RestablecerContraseñaVue from "@/modulos/principal/vistas/RestablecerContraseñaVue.vue";
import DocumentosLVue from "@/modulos/principal/vistas/DocumentosLVue.vue";
import DocentesPVue from "@/modulos/principal/vistas/DocentesPVue.vue";
import AdministrativoPVue from "@/modulos/principal/vistas/AdministrativoPVue.vue";
import { createRouter, createWebHistory } from "vue-router";

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
    
      
  ],
});

export default router;