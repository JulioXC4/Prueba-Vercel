import { createRouter, createWebHistory } from 'vue-router'
import axios from "axios";
import {UserService} from "../app/restock/iam/services/user.service.js";
/**
 * @description Lazy-loaded component imports for route configuration
 * Using dynamic imports to enable code splitting and improve performance
 */
const Inventory = () => import('../restaurant-admin/components/inventory.component.vue')
const RestaurantSummaryOverview = () => import('../app/restock/Analytics/pages/restaurant-summary-overview.component.vue')
const SupplierReviewComponent = () => import('../app/restock/resource/orders-to-suppliers/pages/supplier-review.component.vue')
const RoleRedirect = () => import('../app/public/pages/role-redirect.component.vue');
/**
 * @type {import('vue-router').RouteRecordRaw[]}
 * @description Application route definitions.
 */
const routes = [
    {
        path: '/dashboard/supplier/inventory',
        name: 'supplier-inventory',
        component: Inventory,
        meta: { title: 'sidebar.inventory' }
    },
    {
        path: '/dashboard/restaurant/inventory',
        name: 'restaurant-inventory',
        component: Inventory,
        meta: { title: 'sidebar.inventory' }
    },
    {
        path: '/dashboard/restaurant/summary',
        name: 'restaurant-summary',
        component: RestaurantSummaryOverview,
        meta: { title: 'sidebar.restaurant-summary-overview' }
    },
    {
        path: '/dashboard/supplier/reviews',
        name: 'supplier-reviews',
        component: SupplierReviewComponent,
        meta: { title: 'sidebar.ratings' }
    },
    {
        path: '/',
        name: 'root-redirect',
        component: RoleRedirect
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    const baseTitle = 'Restock';
    document.title = `${baseTitle} - ${to.meta?.title || 'Page'}`;
    next();
});



export default router

