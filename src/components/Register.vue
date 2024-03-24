<script setup lang="ts">
import { UserData } from '../models/models';
import { useFormAndValidation } from '../composables/useFormAndValidation.ts';

import MyButton from './UI/MyButton.vue';
import MyInput from './UI/MyInput.vue';

const props = defineProps<{ onRegister: (userData: UserData) => void }>();

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
      :minlength="10"
      :maxlength="50"
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
      :minlength="6"
      :maxlength="40"
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
