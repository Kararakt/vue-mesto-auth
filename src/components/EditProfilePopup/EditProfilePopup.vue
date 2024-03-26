<script setup lang="ts">
import './EditProfilePopup.scss';

import { UserProfile } from '../../models/models';
import { useFormAndValidation } from '../../composables/useFormAndValidation.js';

import PopupWithForm from '../PopupWithForm/PopupWithForm.vue';
import MyInput from '../UI/MyInput/MyInput.vue';

interface Props {
  modelValue: boolean;
  onUpdateUser: (data: UserProfile) => void;
  onClose: () => void;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<Props>();

const store = useStore();

const { values, handleChange, errors, isFieldValid, isValid, resetForm } =
  useFormAndValidation();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});

const user = computed(() => store.state.user.user);

const handleSubmit = () => {
  props.onUpdateUser({
    name: values.name,
    about: values.about,
  });
};

watch(modelUpdate, (newValue: boolean) => {
  if (newValue) {
    resetForm();
    values.name = user.value.name;
    values.about = user.value.about;
  }
});
</script>

<template>
  <PopupWithForm
    v-model="modelUpdate"
    name="profile-edit"
    title="Редактировать профиль"
    textButton="Сохранить"
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
        placeholder="Введите имя"
        :minLength="2"
        :maxLength="40"
        :error="errors.name"
        :confirm="isFieldValid.name"
      />
      <MyInput
        v-model="values.about"
        :handleInput="handleChange"
        type="text"
        name="about"
        placeholder="Введите работу"
        :minLength="2"
        :maxLength="200"
        :error="errors.about"
        :confirm="isFieldValid.about"
      />
    </template>
  </PopupWithForm>
</template>
