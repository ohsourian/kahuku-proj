import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "@/views/Home.vue";
import GroupIndex from "@/views/GroupIndex.vue";
import PresentView from "@/views/PresentView.vue";
import MobileView from "@/views/MobileView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/groups",
    name: "groupIndex",
    component: GroupIndex,
  },
  {
    path: "/present",
    name: "presentView",
    component: PresentView,
  },
  {
    path: "/mobile",
    name: "MobileView",
    component: MobileView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
