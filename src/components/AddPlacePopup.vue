<script setup lang="ts">
import { useFormAndValidation } from '../composables/useFormAndValidation.js';

import MyPopup from './UI/MyPopup.vue';
import MyInput from './UI/MyInput.vue';
import MyButton from './UI/MyButton.vue';

interface Props {
  modelValue: boolean;
  onPlaceAdd: (data: { name: string; link: string }) => void;
  onClose: () => void;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<Props>();

const { values, handleChange, errors, isFieldValid, isValid, resetForm } =
  useFormAndValidation();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});

const handleSubmit = () => {
  props.onPlaceAdd({
    name: values.name,
    link: values.link,
  });
};

watch(modelUpdate, () => {
  if (props.modelValue) {
    resetForm();
  }
});
</script>

<template>
  <MyPopup v-model="modelUpdate" @closePopup="onClose">
    <template #children>
      <h2 className="popup__title">Новое место</h2>
      <form name="add-element" @submit.prevent="handleSubmit" class="form">
        <MyInput
          v-model="values.name"
          :handleInput="handleChange"
          type="text"
          name="name"
          placeholder="Введите название картинки"
          :minlength="2"
          :maxlength="30"
          :error="errors.name"
          :confirm="isFieldValid.name"
        />
        <MyInput
          v-model="values.link"
          :handleInput="handleChange"
          type="url"
          name="link"
          placeholder="Введите ссылку на картинку"
          :error="errors.link"
          :confirm="isFieldValid.link"
        />
        <MyButton
          type="submit"
          textButton="Создать"
          :disabled="!isValid"
          class="form__submit-button"
        />
      </form>
    </template>
  </MyPopup>
</template>
