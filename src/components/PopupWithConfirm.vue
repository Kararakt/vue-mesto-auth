<script setup lang="ts">
import { CardData } from '../models/models';

import MyPopup from './UI/MyPopup.vue';
import MyButton from './UI/MyButton.vue';

interface Props {
  card: CardData | null;
  modelValue: boolean;
  onCardDelete: (card: CardData) => void;
  onClose: () => void;
}

const emit = defineEmits<{
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = defineProps<Props>();

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emit('update:modelValue', newValue),
});

const handleSubmit = () => {
  if (props.card) {
    props.onCardDelete(props.card);
  }
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
