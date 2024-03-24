import { createApp } from 'vue';

import './index.css';

import App from './components/App.vue';
import store from './store/index.ts';
import router from './router/router.ts';

const app = createApp(App);

app.use(store).use(router).mount('#app');
