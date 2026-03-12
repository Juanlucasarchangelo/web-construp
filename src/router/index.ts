import { createRouter, createWebHistory } from "vue-router"
import HomeView from "../views/HomeView.vue"
import ProdutosView from "../views/ProdutosView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/produtos",
    name: "produtos",
    component: ProdutosView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router