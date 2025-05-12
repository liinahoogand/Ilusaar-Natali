import { createRouter, createWebHistory } from "vue-router";
import Kodu from "@/views/KoduLeht.vue";
import Meist from "@/views/MeistInfo.vue";
import Broneeri from "@/views/BroneeriLeht.vue";
import Arvustused from "@/views/ArvustusteLeht.vue";
import Teenused from "@/views/TeenusedLeht.vue";
import Admin from "@/views/AdminLeht.vue";

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
  { path: '/admin',
    name: 'Admin',
    component: Admin
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const defaultTitle = 'Ilusaar';
  document.title = to.meta.title || defaultTitle;
  next();
});

export default router
