<script setup lang="ts">
import './Card.scss';

import { CardData, CardActions } from '../../../models/models';

import MyButton from '../../UI/MyButton/MyButton.vue';

interface Props extends CardActions {
  card: CardData;
}

const props = defineProps<Props>();

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
  <li class="card">
    <MyButton
      type="button"
      aria-label="Удалить"
      class="card__delete"
      @click="handleCardDelete"
      v-if="isOwn"
    />
    <img
      :src="card.link"
      :alt="`Фото ${card.name}`"
      @click="handleCardClick"
      class="card__image"
    />
    <div class="card__description">
      <h2 class="card__title">{{ card.name }}</h2>
      <div class="card__like-info">
        <MyButton
          type="button"
          aria-label="Сердце"
          :class="`card__heart ${isLiked ? 'card__heart_active' : ''}`"
          @click="handleCardLike"
        />
        <span class="card__count">{{ card.likes.length }}</span>
      </div>
    </div>
  </li>
</template>
