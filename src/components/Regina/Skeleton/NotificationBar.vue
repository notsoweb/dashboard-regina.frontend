<script setup>
import GoogleIcon from '@Components/Shared/GoogleIcon.vue'

defineProps({
    show: Boolean
})
</script>

<template>
    <div
        class="fixed right-0 w-56 h-[calc(100vh-3.5rem)] bg-slate-500/80 dark:bg-slate-700/80 text-white global-transition"
        :class="{'translate-x-56':!show,'translate-x-0':show}"
    >
        <h4 class="font-semibold text-center">Notifications</h4>
        <ul class="px-2">
          <li class="bg-slate-600/80 dark:bg-slate-800/80 p-1 rounded-md space-y-1 text-xs">
            <h5 class="font-semibold">New notification</h5>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium molestiae, voluptate nihil fuga eius nesciunt voluptatem incidunt iste eaque autem ullam maxime sed, quidem consectetur officia laudantium labore cumque ratione!</p>
            <div class="flex w-full justify-between">
              <div>
                <span class="font-thin">2024-03-01 15:30</span>
              </div>
              <div class="space-x-1">
                <GoogleIcon
                title="Show"
                  name="visibility"
                />
                <GoogleIcon
                  title="Close"
                  name="close"
                />
              </div>
            </div>
          </li>
        </ul>
      </div>
</template>