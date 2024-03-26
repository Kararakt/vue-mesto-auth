<script setup lang="ts">
import './CardList.scss';

import { CardData, CardActions } from '../../models/models';

import Card from './Card/Card.vue';

interface Props extends CardActions {
  cards: CardData[];
}

defineProps<Props>();
</script>

<template>
  <section class="card-list">
    <ul class="card-list__container">
      <Card
        v-for="card in cards"
        :key="card._id"
        :card="card"
        :onCardClick="onCardClick"
        :onCardDelete="onCardDelete"
        :onCardLike="onCardLike"
      />
    </ul>
  </section>
</template>
