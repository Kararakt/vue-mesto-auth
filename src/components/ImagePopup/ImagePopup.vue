<script setup lang="ts">
import './ImagePopup.scss';

import { CardData } from '../../models/models';

import MyPopup from '../UI/MyPopup/MyPopup.vue';

interface Props {
  card: Partial<CardData>;
  modelValue: boolean;
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
</script>

<template>
  <MyPopup
    v-model="modelUpdate"
    @closePopup="onClose"
    customClass="popup__image-container"
    class="popup_type_image"
    v-if="card !== null"
  >
    <template #children>
      <img :src="card.link" :alt="`Фото ${card.name}`" class="popup__image" />
      <h2 class="popup__caption">{{ card.name }}</h2>
    </template>
  </MyPopup>
</template>
