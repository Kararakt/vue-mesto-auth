<script setup>
import { computed, watch } from 'vue';
import { useStore } from 'vuex';

import { useFormAndValidation } from '../composables/useFormAndValidation.js';

import MyPopup from './UI/MyPopup.vue';
import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    required: true,
  },
  onUpdateUser: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const store = useStore();

const { values, handleChange, errors, isFieldValid, isValid, resetForm } =
  useFormAndValidation();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});

const user = computed(() => store.state.user.user);

const handleSubmit = () => {
  props.onUpdateUser({
    name: values.name,
    about: values.about,
  });
};

watch(modelUpdate, () => {
  if (modelUpdate.value) {
    resetForm();
    values.name = user.value.name;
    values.about = user.value.about;
  }
});
</script>

<template>
  <MyPopup v-model="modelUpdate" @closePopup="onClose">
    <template #children>
      <h2 class="popup__title">Редактировать профиль</h2>
      <form name="profile-edit" @submit.prevent="handleSubmit" class="form">
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
