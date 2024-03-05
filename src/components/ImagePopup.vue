<script setup>
import { computed } from 'vue';

import MyPopup from './UI/MyPopup.vue';

const emit = defineEmits(['update:modelValue']);

const props = defineProps({
  card: {
    type: [Object, null],
    required: true,
  },
  modelValue: {
    type: Boolean,
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
</script>

<template>
  <MyPopup
    v-model="modelUpdate"
    @closePopup="onClose"
    customClass="popup__image-container"
    class="popup_type_image"
  >
    <template #children>
      <img :src="card.link" :alt="`Фото ${card.name}`" class="popup__image" />
      <h2 class="popup__caption">{{ card.name }}</h2>
    </template>
  </MyPopup>
</template>
