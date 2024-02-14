<script setup>
import { v4 as uuidv4 } from 'uuid';
import { computed, onMounted, ref } from 'vue';

import Error from './Elements/Error.vue';
import Label from './Elements/Label.vue';

defineOptions({
  inheritAttrs: false
})

const emit = defineEmits([
    'update:modelValue'
]);

defineExpose({
    focus: () => input.value.focus()
});

const props = defineProps({
    class: String,
    id: String,
    modelValue: Number | String,
    onError: String,
    placeholder: String,
    required: Boolean,
    title: String,
    type: {
        default: 'text',
        type: String
    }
});

const input = ref(null);

/**
 * Propiedades calculadas
 */
const autoId = computed(() => {
    return (props.id)
        ? props.id
        : uuidv4()
})

const autoTitle = computed(() => {
    if(props.title) {
        return props.title;
    }

    return props.id;
});

onMounted(() => {
    if (input.value.hasAttribute('autofocus')) {
        input.value.focus();
    }
});
</script>

<template>
    <div class="w-full">
        <Label
            :id="autoId"
            :required="required"
            :title="autoTitle"
        />
        <input
            :id="autoId"
            class="input-primary"
            :placeholder="placeholder"
            ref="input"
            :required="required"
            :type="type"
            :value="modelValue"
            v-bind="$attrs"
            @input="$emit('update:modelValue', $event.target.value)"
        >
        <Error
            :onError="onError"
        />
    </div>
</template>