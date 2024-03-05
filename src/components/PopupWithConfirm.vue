<script setup>
import { computed } from 'vue';

import MyPopup from './UI/MyPopup.vue';
import MyButton from './UI/MyButton.vue';

const props = defineProps({
  card: {
    type: [Object, null],
    required: true,
  },
  modelValue: {
    type: Boolean,
    required: true,
  },
  onCardDelete: {
    type: Function,
    required: true,
  },
  onClose: {
    type: Function,
    required: true,
  },
});

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emit('update:modelValue', newValue),
});

const handleSubmit = () => {
  props.onCardDelete(props.card);
};
</script>

<template>
  <MyPopup v-model="modelUpdate" @closePopup="onClose">
    <template #children>
      <h2 class="popup__title">Вы уверенны?</h2>
      <form name="confirm" @submit.prevent="handleSubmit" class="form">
        <MyButton type="submit" textButton="Да" class="form__submit-button" />
      </form>
    </template>
  </MyPopup>
</template>
