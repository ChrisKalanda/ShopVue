import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { i18nPlugin } from './i18n/index.js';

createApp(App).use(router).use(i18nPlugin).mount('#app');
