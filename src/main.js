import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { bootTheme, darkMode } from './plugins/dark-mode.js';
import { bootSidebar } from './plugins/sidebar.js'

window.darkMode = darkMode;

bootTheme();
bootSidebar();

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
