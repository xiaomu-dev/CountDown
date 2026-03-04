import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'CountDown',
			component: () => import('../views/CountDown/index.vue'),
		},
	],
});

export default router;
