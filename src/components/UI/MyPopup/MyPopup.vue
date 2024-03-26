<script setup lang="ts">
import './MyPopup.scss';

import MyButton from '../MyButton/MyButton.vue';

interface Props {
  modelValue: boolean;
  customClass?: string;
}

const emits = defineEmits<{
  (event: 'closePopup'): void;
  (event: 'update:modelValue', value: boolean): void;
}>();

const props = withDefaults(defineProps<Props>(), {
  customClass: '',
});

const popup = ref<HTMLElement | null>(null);

const closePopup = () => emits('closePopup');

const handleCloseByEsc = (event: KeyboardEvent) => {
  if (event.key === 'Escape' && modelUpdate.value) {
    closePopup();
  }
};

const handleCloseByOverlay = (event: MouseEvent) => {
  if (event.target === popup.value) {
    closePopup();
  }
};

const modelUpdate = computed({
  get: () => props.modelValue,
  set: (newValue: boolean) => emits('update:modelValue', newValue),
});

const addEventListener = () => {
  document.addEventListener('keydown', handleCloseByEsc);

  document.addEventListener('click', handleCloseByOverlay);
};

const removeEventListener = () => {
  document.removeEventListener('keydown', handleCloseByEsc);

  document.removeEventListener('click', handleCloseByOverlay);
};

onMounted(addEventListener);

onUnmounted(removeEventListener);

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
