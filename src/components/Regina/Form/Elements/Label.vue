<script setup>
    defineProps({
        id: String,
        title: String,
        required: Boolean
    });
</script>

<template>
    <label 
        v-if="title"
        :for="id"   
        class="block mb-2 text-sm font-medium text-primary dark:text-primary-dark-on"
    >
        {{ $t(title) }}
        <span 
            v-if="required"
            class="text-danger"
        >
            *
        </span>
    </label>
</template>
