<script setup>
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router'
import { darkMode, theme, verifyDarkMode } from '@Plugins/dark-mode.js';
import { sidebar } from '@Plugins/sidebar.js'

import GoogleIcon from '@Components/Shared/GoogleIcon.vue'
import NotificationBar from '@Components/Regina/Skeleton/NotificationBar.vue'

const darkModeStatus = ref(theme);
const showNotificationBar = ref(false);
</script>

<template>
  <div class="flex flex-col w-screen h-screen">
    <header class="flex h-10 justify-between items-center w-full bg-slate-700 dark:bg-slate-900 global-transition">
      <div></div>
      <div class="px-2">
        <ul class="flex space-x-1 text-white">
          <li v-if="darkModeStatus == 'light'">
            <GoogleIcon
              name="light_mode"
              @click="darkMode(true)"
            />
          </li>
          <li v-else>
            <GoogleIcon
              name="dark_mode"
              @click="darkMode(false)"
            />
          </li>
          <li>
            <GoogleIcon
              name="notifications"
              @click="() => showNotificationBar = !showNotificationBar"
            />
          </li>
        </ul>
      </div>
    </header>
    <div class="relative flex w-full">
      <NotificationBar
        :show="showNotificationBar"
      />
      <nav
        class="flex flex-col  h-[calc(100vh-3.5rem)] p-2 space-y-2 bg-slate-600 dark:bg-slate-800 global-transition text-sm"
        :class="{'w-12':!sidebar,'w-64':sidebar}"
      >
        <button type="button" class="flex items-center space-x-2">
          <div class="h-8 w-8 rounded-full bg-red-500"></div>
          <span v-show="sidebar" class="text-white truncate">Moisés de Jesús</span>
        </button>
        <div class="flex flex-col w-full">
          <RouterLink to="/" class="flex space-x-1">
            <span>
              <GoogleIcon
                name="home"
              />
            </span>
            <span class="truncate">Home</span>
          </RouterLink>
          <RouterLink to="/about" class="flex space-x-1">
            <span>
              <GoogleIcon
              class="text-base"
                name="notifications"
              />
            </span>
            <span class="truncate">About</span>
          </RouterLink>
        </div>
      </nav>
      <main class="w-full p-2 dark:bg-gray-400 dark:text-white global-transition">
        <RouterView />
      </main>
    </div>
    <footer class="flex px-2 w-full justify-between text-sm bg-slate-700 dark:bg-slate-900 text-white global-transition">
      <span>
        &copy; 2023 Notsoweb.
      </span>
      <span>
        V0.0.1
      </span>
    </footer>
  </div>
</template>
