import { createApp } from 'vue';

import './index.scss';

import store from './store/index.ts';
import router from './router/router.ts';

import App from './components/App/App.vue';

const app = createApp(App);

app.use(store).use(router).mount('#app');
