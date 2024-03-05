<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

import MyButton from './UI/MyButton.vue';

const props = defineProps({
  card: {
    type: Object,
    required: true,
  },
  onCardClick: {
    type: Function,
    required: true,
  },
  onCardLike: {
    type: Function,
    required: true,
  },
  onCardDelete: {
    type: Function,
    required: true,
  },
});

const store = useStore();
const currentUser = computed(() => store.state.user.user);

const isOwn = computed(() => props.card.owner._id === currentUser.value._id);
const isLiked = computed(() =>
  props.card.likes.some((i) => i._id === currentUser.value._id)
);

const handleCardClick = () => {
  props.onCardClick(props.card);
};

const handleCardLike = () => {
  props.onCardLike(props.card);
};

const handleCardDelete = () => {
  props.onCardDelete(props.card);
};
</script>

<template>
  <MyButton
    type="button"
    aria-label="Удалить"
    class="element__delete"
    @click="handleCardDelete"
    v-if="isOwn"
  />
  <img
    :src="card.link"
    :alt="`Фото ${card.name}`"
    @click="handleCardClick"
    class="element__image"
  />
  <div class="element__description">
    <h2 class="element__title">{{ card.name }}</h2>
    <div class="element__like-info">
      <MyButton
        type="button"
        aria-label="Сердце"
        :class="`element__heart ${isLiked ? 'element__heart_active' : ''}`"
        @click="handleCardLike"
      />
      <span class="element__count">{{ card.likes.length }}</span>
    </div>
  </div>
</template>
