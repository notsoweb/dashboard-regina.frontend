import './assets/main.css'

import axios from 'axios';
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from '@/App.vue'
import router from '@/router'
import Notify from '@/plugins/notify.js'
import { i18n, lang } from '@/lang/i18n.js';
import { bootTheme } from '@/plugins/dark-mode.js';
import { bootSidebar } from '@/plugins/sidebar.js'
import { pagePlugin } from '@/services/page';
import { defineApiServer } from '@/services/api';

// Crear instancias globales
window.axios    = axios;
window.lang     = lang;
window.Notify   = new Notify();

// Iniciar plugins
bootTheme();
bootSidebar();
defineApiServer(import.meta.env.VITE_APP_API);

// Realizar configuraciones
window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

// Crear aplicación
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(pagePlugin)
app.mount('#app')
