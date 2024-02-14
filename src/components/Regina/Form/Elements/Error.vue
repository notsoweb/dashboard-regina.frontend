<script setup>
    defineProps({
        onError: String
    });
</script>

<template>
    <p
        v-if="onError"
        class="mt-1 pl-2 text-xs text-red-500 dark:text-red-300"
    >
        {{onError}}
    </p>
</template>
