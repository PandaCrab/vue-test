import { createRouter, createWebHashHistory } from 'vue-router';

import HomePage from '../views/homePage.vue';
import AddProduct from '../views/addProduct.vue';

const Products = { template: '<div>Hello in product page</div>' };

const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/products', component: Products },
    { path: '/add_product', name: 'AddProduct', component: AddProduct },
];

const router = createRouter({
    history: createWebHashHistory(),
    routes
});

export default router;
