<script setup lang="ts">
import './PopupWithForm.scss';

import MyPopup from '../UI/MyPopup/MyPopup.vue';
import MyForm from '../UI/MyForm/MyForm.vue';

interface Props {
  modelValue: boolean;
  onClose: () => void;
  title: string;
  name: string;
  handleSubmit: (data?: any) => void;
  textButton: string;
  disabled?: boolean;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  disabled: true,
});

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});
</script>

<template>
  <MyPopup v-model="modelUpdate" @closePopup="onClose">
    <template #children>
      <h2 class="popup__title">{{ title }}</h2>
      <MyForm
        :name="name"
        :handleSubmit="handleSubmit"
        :textButton="textButton"
        :disabled="disabled"
      >
        <template #form>
          <slot name="popup-form" />
        </template>
      </MyForm>
    </template>
  </MyPopup>
</template>
