<script setup lang="ts">
import './Profile.scss';

import { Owner } from '../../models/models';

import MyButton from '../UI/MyButton/MyButton.vue';

interface Props {
  user: Owner;
  onAvatarClick: () => void;
  onEditProfileClick: () => void;
  onAddPlaceClick: () => void;
}

defineProps<Props>();
</script>

<template>
  <section class="profile">
    <div class="profile__container">
      <div
        class="profile__image"
        :style="{ backgroundImage: 'url(' + user.avatar + ')' }"
      >
        <MyButton
          type="button"
          class="profile__avatar-edit"
          @click="onAvatarClick"
        />
      </div>
      <div class="profile__info">
        <div class="profile__editor">
          <h1 class="profile__name">{{ user.name }}</h1>
          <MyButton
            type="button"
            aria-label="Изменение профиля"
            class="profile__edit-button"
            @click="onEditProfileClick"
          />
        </div>
        <h2 class="profile__job">{{ user.about }}</h2>
      </div>
    </div>
    <MyButton
      type="button"
      aria-label="Добавление карточки"
      class="profile__add-button"
      @click="onAddPlaceClick"
    />
  </section>
</template>
