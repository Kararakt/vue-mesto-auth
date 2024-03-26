<script setup lang="ts">
import './EditAvatarPopup.scss';

import { UserAvatar } from '../../models/models';
import { useFormAndValidation } from '../../composables/useFormAndValidation.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.vue';
import MyInput from '../UI/MyInput/MyInput.vue';

interface Props {
  modelValue: boolean;
  onUpdateAvatar: (data: UserAvatar) => void;
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
  props.onUpdateAvatar({
    avatar: values.avatar,
  });
};

watch(modelUpdate, (newValue: boolean) => {
  if (newValue) {
    resetForm();
  }
});
</script>

<template>
  <PopupWithForm
    v-model="modelUpdate"
    name="update-avatar"
    title="Обновить аватар"
    textButton="Сохранить"
    :handleSubmit="handleSubmit"
    :onClose="onClose"
    :disabled="isValid"
  >
    <template #popup-form>
      <MyInput
        v-model="values.avatar"
        :handleInput="handleChange"
        type="url"
        name="avatar"
        placeholder="Введите ссылку на картинку"
        :error="errors.avatar"
        :confirm="isFieldValid.avatar"
      />
    </template>
  </PopupWithForm>
</template>
