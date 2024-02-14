<script setup>
import Base from './Base.vue';

defineProps({
    type: {
        default: 'submit',
        type: String
    }
});
</script>

<template>
    <Base
        class="bg-slate-600 dark:bg-slate-900 dark:border-slate-800"
        :type="type"
    >
        <slot />
    </Base>
</template>
