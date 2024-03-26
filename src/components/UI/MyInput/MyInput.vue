<script setup lang="ts">
import './MyInput.scss';

interface Props {
  modelValue?: string;
  type: string;
  name: string;
  placeholder: string;
  minlength?: number;
  maxlength?: number;
  handleInput: (event: Event) => void;
  error: string | null;
  confirm?: boolean;
  isAuth?: boolean;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: string): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  minlength: 0,
  maxlength: Infinity,
  error: '',
  confirm: false,
  isAuth: false,
});

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: string) => emit('update:modelValue', newValue),
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
      :minlength="minlength"
      :maxlength="maxlength"
      autocomplete="off"
      required
      :class="[
        'input__field',
        {
          input__field_type_error: error,
          input__field_type_confirm: confirm,
          input__field_type_auth: isAuth,
        },
      ]"
    />
    <p class="input__error">{{ error }}</p>
  </div>
</template>
