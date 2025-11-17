import { createRouter, createWebHistory } from "vue-router";
import AdministrativoValidarVue from "@/modulos/principal/vistas/AdministrativoValidarVue.vue";
import DocentesGenerarVue from "@/modulos/principal/vistas/DocentesGenerarVue.vue";
import InicioVue from "@/modulos/principal/vistas/InicioVue.vue";
import AdministrativoValidarDocenteVue from "@/modulos/principal/vistas/AdministrativoValidarDocenteVue.vue";
import DocentesElegirVue from "@/modulos/principal/vistas/DocentesElegirVue.vue";
import AdministrativoValidarDocenteDocumentoVue from "@/modulos/principal/vistas/AdministrativoValidarDocenteDocumentoVue.vue";


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
     
     
  ],
});

export default router;