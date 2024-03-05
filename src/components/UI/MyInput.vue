<script setup>
import { computed } from 'vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    required: true,
  },
  minLength: {
    type: Number,
  },
  maxLength: {
    type: Number,
  },
  handleInput: {
    type: Function,
  },
  error: {
    type: String,
    default: null,
  },
  confirm: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});
</script>

<template>
  <div class="input">
    <input
      v-model="modelUpdate"
      @input="handleInput"
      :type="type"
      :name="name"
      :placeholder="placeholder"
      :minlength="minLength"
      :maxlength="maxLength"
      autocomplete="off"
      required
      :class="[
        'input__field',
        customClass,
        { input__field_type_error: error, input__field_type_confirm: confirm },
      ]"
    />
    <p class="input__error">{{ error }}</p>
  </div>
</template>
