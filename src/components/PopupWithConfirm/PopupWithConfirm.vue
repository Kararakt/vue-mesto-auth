<script setup lang="ts">
import './PopupWithConfirm.scss';

import { CardData } from '../../models/models';

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
  <PopupWithForm
    v-model="modelUpdate"
    name="confirm"
    title="Вы уверенны?"
    textButton="Да"
    :handleSubmit="handleSubmit"
    :onClose="onClose"
  />
</template>
