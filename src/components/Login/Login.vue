<script setup lang="ts">
import './Login.scss';

import { UserData } from '../../models/models.ts';
import { useFormAndValidation } from '../../composables/useFormAndValidation.ts';

import MyForm from '../UI/MyForm/MyForm.vue';
import MyInput from '../UI/MyInput/MyInput.vue';

const props = defineProps<{ onLogin: (userData: UserData) => void }>();

const isAuth = ref<boolean>(true);

const { values, handleChange, errors, isFieldValid, isValid } =
  useFormAndValidation();

const handleSubmit = async () => {
  props.onLogin({ password: values.password, email: values.email });
};
</script>

<template>
  <MyForm
    name="login"
    :handleSubmit="handleSubmit"
    textButton="Войти"
    :disabled="isValid"
    :isAuth="isAuth"
  >
    <template #form>
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
        :isAuth="isAuth"
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
        :isAuth="isAuth"
      />
    </template>
  </MyForm>
</template>
