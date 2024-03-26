<script setup lang="ts">
import './AddPlacePopup.scss';

import { CardAdd } from '../../models/models';
import { useFormAndValidation } from '../../composables/useFormAndValidation.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.vue';
import MyInput from '../UI/MyInput/MyInput.vue';

interface Props {
  modelValue: boolean;
  onPlaceAdd: (user: CardAdd) => void;
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
  <PopupWithForm
    v-model="modelUpdate"
    name="add-element"
    title="Новое место"
    textButton="Создать"
    :handleSubmit="handleSubmit"
    :onClose="onClose"
    :disabled="isValid"
  >
    <template #popup-form>
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
    </template>
  </PopupWithForm>
</template>
