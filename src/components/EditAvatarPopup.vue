<script setup>
import { computed, watch } from 'vue';

import { useFormAndValidation } from '../composables/useFormAndValidation.js';

import MyPopup from './UI/MyPopup.vue';
import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  onUpdateAvatar: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const { values, handleChange, errors, isFieldValid, isValid, resetForm } =
  useFormAndValidation();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});

const handleSubmit = () => {
  props.onUpdateAvatar({
    avatar: values.avatar,
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
      <h2 class="popup__title">Обновить аватар</h2>
      <form name="update-avatar" @submit.prevent="handleSubmit" class="form">
        <MyInput
          v-model="values.avatar"
          :handleInput="handleChange"
          type="url"
          name="avatar"
          placeholder="Введите ссылку на картинку"
          :error="errors.avatar"
          :confirm="isFieldValid.avatar"
        />
        <MyButton
          type="submit"
          textButton="Сохранить"
          :disabled="!isValid"
          class="form__submit-button"
        />
      </form>
    </template>
  </MyPopup>
</template>
