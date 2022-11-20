import { createRouter, createWebHistory } from 'vue-router';

import HomePage from '../views/homePage.vue';
import AddProduct from '../views/addProduct.vue';
import StorageProducts from '../views/storageProducts.vue';
import ProductInfo from '../views/productInfo.vue';

const routes = [
    { path: '/', name: 'HomePage', component: HomePage },
    { path: '/products', name: 'StorageProduct', component: StorageProducts },
    { path: '/add_product', name: 'AddProduct', component: AddProduct },
    { path: '/product/:id', name: 'ProductInfo', component: ProductInfo },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

export default router;
