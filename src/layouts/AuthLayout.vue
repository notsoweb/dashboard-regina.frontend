<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { APP_NAME, APP_VERSION, APP_COPYRIGHT } from '@/config.js'
import { darkMode, theme } from '@/plugins/dark-mode'
import { hasToken } from '@/services/api.js';
import { reloadApp } from '@/services/page.js';

import GoogleIcon from '@Components/Shared/GoogleIcon.vue'

const router = useRouter();

onMounted(() => {
  if(hasToken()) {
    reloadApp();
    router.push({name:'home'});
  }
});
</script>

<template>
    <div id="page" class="flex w-screen h-screen justify-center items-center text-slate-600 bg-white dark:bg-slate-800 dark:text-slate-50 transition-all duration-global">
        <header class="fixed top-0 flex w-full h-8 p-4 items-center justify-end text-white">
            <div>
                <GoogleIcon v-if="theme == 'light'"
                    class="text-lg text-slate-900 dark:text-white transition-colors duration-global"
                    :title="$t('app.theme.light')"
                    name="light_mode"
                    @click="darkMode(true)"
                />
                <GoogleIcon v-else
                    class="text-lg text-slate-900 dark:text-white transition-colors duration-global"
                    :title="$t('app.theme.dark')"
                    name="dark_mode"
                    @click="darkMode(false)"
                />
            </div>
        </header>
        <div class="w-96">
            <div class="flex h-10 space-x-2 items-center justify-center">
                    <GoogleIcon
                        class="text-xl"
                        name="hub"
                    />
                    <h4 class="font-semibold text-2xl truncate uppercase">
                        {{ APP_NAME }}
                    </h4>
            </div>
            <div class="w-full p-4 rounded-lg border shadow-xl bg-slate-200 dark:bg-slate-500 dark:text-white transition-colors duration-global">
                <slot />
            </div>
        </div>
        <footer class="fixed bottom-0 flex w-full h-8 px-4 items-center justify-between text-slate-900 dark:text-white transition-colors duration-global">
            <div>
                <span>&copy;2023 {{ APP_COPYRIGHT }}</span>
            </div>
            <div>
                <span>Versión {{ APP_VERSION }}</span>
            </div>
        </footer>
    </div>
</template>