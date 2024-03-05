<script setup>
import { useFormAndValidation } from '../composables/useFormAndValidation.js';

import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';

const props = defineProps({
  onRegister: Function,
});

const { values, handleChange, errors, isFieldValid, isValid } =
  useFormAndValidation();

const handleSubmit = async () => {
  props.onRegister({
    password: values.password,
    email: values.email,
  });
};
</script>

<template>
  <form @submit.prevent="handleSubmit" novalidate name="register" class="form">
    <MyInput
      v-model="values.email"
      :handleInput="handleChange"
      type="email"
      name="email"
      placeholder="Email"
      :minLength="10"
      :maxLength="50"
      :error="errors.email"
      :confirm="isFieldValid.email"
      customClass="input__field_type_auth"
    />
    <MyInput
      v-model="values.password"
      :handleInput="handleChange"
      type="password"
      name="password"
      placeholder="Пароль"
      :minLength="6"
      :maxLength="40"
      :error="errors.password"
      :confirm="isFieldValid.password"
      customClass="input__field_type_auth"
    />
    <MyButton
      :disabled="!isValid"
      type="submit"
      textButton="Регистрация"
      class="form__submit-button form__submit-button_type_auth"
    />
  </form>
</template>
