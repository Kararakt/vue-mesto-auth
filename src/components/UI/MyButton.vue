<script setup>
const emit = defineEmits(['click']);

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  textButton: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  ariaLabel: {
    type: String,
    default: '',
  },
});

const handleClickButton = () => emit('click');
</script>

<template>
  <button
    :type="type"
    :disabled="disabled"
    :aria-label="ariaLabel"
    @click="handleClickButton"
    class="button"
  >
    {{ textButton }}
  </button>
</template>
