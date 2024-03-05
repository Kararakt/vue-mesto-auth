<script setup>
import { ref, computed, onMounted, onUnmounted, watch } from 'vue';

import MyButton from './MyButton.vue';

const emits = defineEmits(['closePopup', 'update:modelValue']);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  customClass: {
    type: String,
    default: '',
  },
});

const popup = ref(null);

const closePopup = () => emits('closePopup');

const handleCloseByEsc = (event) => {
  if (event.key === 'Escape' && modelUpdate.value) {
    closePopup();
  }
};

const handleCloseByOverlay = (event) => {
  if (event.target === popup.value) {
    closePopup();
  }
};

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue) => emits('update:modelValue', newValue),
});

onMounted(() => {
  document.addEventListener('keydown', handleCloseByEsc);

  document.addEventListener('click', handleCloseByOverlay);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleCloseByEsc);

  document.removeEventListener('click', handleCloseByOverlay);
});

watch(modelUpdate, () => {
  document.body.style.overflowY = modelUpdate.value ? 'hidden' : 'auto';
});
</script>

<template>
  <Transition name="popup">
    <section ref="popup" class="popup" v-if="modelUpdate">
      <div class="popup__content" :class="customClass">
        <MyButton
          :type="'button'"
          ariaLabel="Закрытие окна"
          class="popup__close"
          @click="closePopup"
        />
        <slot name="children"></slot>
      </div>
    </section>
  </Transition>
</template>
