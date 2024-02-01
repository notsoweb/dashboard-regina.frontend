<script setup>
import { switchSidebar } from '@Plugins/sidebar.js'

import GoogleIcon from '@/components/Shared/GoogleIcon.vue'
defineProps({
    name: String,
    routes: Object,
})
</script>

<template>
    <div class="w-full rounded-md bg-slate-700 dark:bg-slate-900 text-sm text-white global-transition">
    <ul class="flex items-start py-1 px-2 space-x-1">
      <li class="pr-2">
        <GoogleIcon
          name="menu"
          @click="switchSidebar()"
        />
      </li>
      <li>App</li>
      <li>
        <span class="font-google-icon">arrow_right</span>
      </li>
      <li>{{ name }}</li>
    </ul>
  </div>
</template>