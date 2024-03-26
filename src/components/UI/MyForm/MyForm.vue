<script setup lang="ts">
import './MyForm.scss';

import MyButton from '../MyButton/MyButton.vue';

interface Props {
  name: string;
  handleSubmit: (data?: any) => void;
  disabled?: boolean;
  textButton: string;
  isAuth?: boolean;
}

withDefaults(defineProps<Props>(), {
  disabled: true,
  isAuth: false,
});
</script>

<template>
  <form :name="name" novalidate class="form" @submit.prevent="handleSubmit">
    <slot name="form" />
    <MyButton
      type="submit"
      :disabled="!disabled"
      :textButton="textButton"
      :class="[
        'form__submit-button',
        { 'form__submit-button_type_auth': isAuth },
      ]"
    />
  </form>
</template>
