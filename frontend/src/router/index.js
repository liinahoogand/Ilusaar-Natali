import { createRouter, createWebHistory } from "vue-router";
import Kodu from "@/views/KoduLeht.vue";
import Meist from "@/views/MeistInfo.vue";
import Broneeri from "@/views/BroneeriLeht.vue";
import Arvustused from "@/views/ArvustusteLeht.vue";
import Teenused from "@/views/TeenusedLeht.vue";
import Admin from "@/views/AdminLeht.vue";
import SisseLogimine from "@/views/SisseLogimine.vue";

const routes = [
  {
    path: '/',
    name: 'Kodu',
    component: Kodu
  },
  {
    path: '/meist',
    name: 'Meist',
    component: Meist
  },
  {
    path: '/broneeri',
    name: 'Broneeri',
    component: Broneeri
  },
  {
    path: '/arvustused',
    name: 'Arvustused',
    component: Arvustused
  },
  {
    path: '/teenused',
    name: 'Teenused',
    component: Teenused
  },
  { path: '/sisselogimine',
    name: 'SisseLogimine',
    component: SisseLogimine
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: { requiresAuth: true }
  }

]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Ilusaar';
  document.title = to.meta.title || defaultTitle;

  // Kontrolli, kas sisselogimine on vajalik
  const token = localStorage.getItem('token');
  if (to.meta.requiresAuth && !token) {
    next('/sisselogimine');
  } else {
    next();
  }
});


export default router
