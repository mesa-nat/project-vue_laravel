import { createRouter, createWebHistory} from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Product from '../views/Product.vue';
import Order from '../views/Order.vue';
import Register from '../views/Register.vue';  // Changed from components to views
import Login from '../views/Login.vue';        // Changed from components to views

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/home',
        name: 'HomeAlias',
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
    },
    {
        path: '/register',  // Changed from '/' to '/register'
        name: 'Register',
        component: Register
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
