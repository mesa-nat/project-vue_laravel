import { createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Product from '../views/Product.vue';
import Order from '../views/Order.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/about',
        name: 'About',
        component: About
    },
    {
        path: '/product',
        name: 'Product',
        component: Product
    },
    {
        path: '/order',
        name: 'Order',
        component: Order
    }
];
const router = createRouter({
    history: createWebHistory(),
    routes,
});
export default router;