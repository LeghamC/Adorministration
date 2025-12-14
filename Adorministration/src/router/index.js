import { createRouter, createWebHistory } from "vue-router";

import Login from "../components/Login.vue";
import StudentHome from "../components/StudentHome.vue";
import AdminHome from "../components/AdminHome.vue";
import SPHome from "../components/SPHome.vue";
import ReceptionistHome from "../components/ReceptionistHome.vue";

const routes = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/student",
    component: StudentHome,
    meta: { role: "student" }
  },
  {
    path: "/admin",
    component: AdminHome,
    meta: { role: "admin" }
  },
  {
    path: "/service",
    component: SPHome,
    meta: { role: "service" }
  },
  {
    path: "/receptionist",
    component: ReceptionistHome,
    meta: { role: "ReceptionistHome" }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});



router.beforeEach((to, from, next) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (to.path !== "/login" && !token) {
    return next("/login");
  }

  if (to.meta.role && to.meta.role !== role) {
    return next("/login");
  }

  next();
});

export default router;
