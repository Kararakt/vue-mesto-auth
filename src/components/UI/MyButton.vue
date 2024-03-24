<script setup lang="ts">
interface Props {
  type: 'button' | 'submit' | 'reset';
  textButton?: string;
  disabled?: boolean;
  ariaLabel?: string;
}

const emit = defineEmits<{ (event: 'click'): void }>();

withDefaults(defineProps<Props>(), {
  textButton: '',
  disabled: false,
  ariaLabel: '',
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
