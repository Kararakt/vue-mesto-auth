<script setup lang="ts">
import './InfoTooltip.scss';
import error from '/error-register.svg';
import confirm from '/confirm-register.svg';

import MyPopup from '../UI/MyPopup/MyPopup.vue';

const emits = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

interface Props {
  modelValue: boolean;
  message: boolean | null;
  onClose: () => void;
}

const props = defineProps<Props>();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emits('update:modelValue', newValue),
});
</script>

<template>
  <MyPopup v-model="modelUpdate" @closePopup="onClose">
    <template #children>
      <img
        :src="message ? confirm : error"
        alt="Фото состояния входа"
        class="popup__state-image"
      />
      <h2 class="popup__title popup__title_type_tool-tip">
        {{
          message
            ? 'Вы успешно зарегистрировались!'
            : 'Что-то пошло не так! Попробуйте ещё раз.'
        }}
      </h2>
    </template>
  </MyPopup>
</template>
