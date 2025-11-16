import InicioVue from "@/modulos/principal/vistas/InicioVue.vue";
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
  ],
});

export default router;