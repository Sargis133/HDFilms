import { createWebHistory, createRouter } from "vue-router";
import Index from "./pages/index.vue";
import Default from "./layouts/default.vue";
import Login from "./pages/login.vue";
import Signup from "./pages/signup.vue";
import Movie from "./pages/catalog/movie/[movie].vue";
import Type from "./pages/catalog/[type].vue"

const routes = [
  {
    path: "/",
    component: Default,
    children: [
        { path: "/", component: Index },
        { path: '/login', component: Login},
        { path: '/signup', component: Signup},
        { path: '/catalog/:type', component: Type},
        { path: '/catalog/:type/movie/:movie', component: Movie}
    ],
  },
];

const router = createRouter({
  history: createWebHistory('/HDFilms/'),
  routes,
});

export default router;
