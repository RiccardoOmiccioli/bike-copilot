import { createRouter, createWebHistory } from "vue-router";
import HomePage from '../pages/HomePage.vue';
import MapPage from "../pages/MapPage.vue";
import CookbookPage from "../pages/CookbookPage.vue";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes:[
        {
            path: "/",
            name: "home",
            component: HomePage,
        },
        {
            path: "/map",
            name: "map",
            component: MapPage,
        },
        {
            path: "/cookbook",
            name: "cookbook",
            component: CookbookPage,
        },
    ],
});

export default router;