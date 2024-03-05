<script setup>
import { computed, onMounted, ref, reactive } from 'vue';
import { useStore } from 'vuex';

import MyButton from '../components/UI/MyButton.vue';
import Card from '../components/Card.vue';
import ImagePopup from '../components/ImagePopup.vue';
import PopupWithConfirm from '../components/PopupWithConfirm.vue';
import AddPlacePopup from '../components/AddPlacePopup.vue';
import EditAvatarPopup from '../components/EditAvatarPopup.vue';
import EditProfilePopup from '../components/EditProfilePopup.vue';

const store = useStore();

const user = computed(() => store.state.user.user);
const cards = computed(() => store.state.cards.cards);
const isCards = computed(() => cards.value.length > 0);

const selectedCard = ref(null);
const selectedCardDelete = ref(null);

const isImagePopup = ref(false);
const isConfirmPopup = ref(false);
const isAddPopup = ref(false);
const isEditAvatarPopup = ref(false);
const IsEditProfilePopup = ref(false);

const handleCardDeleteClick = (card) => {
  isConfirmPopup.value = true;
  selectedCardDelete.value = card;
};

const handleSelectedCardClick = (card) => {
  selectedCard.value = card;
  isImagePopup.value = true;
};

const handleAddPlaceClick = () => {
  isAddPopup.value = true;
};

const handleEditAvatarClick = () => {
  isEditAvatarPopup.value = true;
};

const handleEditProfileClick = () => {
  IsEditProfilePopup.value = true;
};

const closeAllPopups = () => {
  isImagePopup.value = false;
  isConfirmPopup.value = false;
  isAddPopup.value = false;
  isEditAvatarPopup.value = false;
  IsEditProfilePopup.value = false;
};

const handleCardDelete = (card) => {
  store.dispatch('cards/deleteCard', {
    cardId: card._id,
    callback: closeAllPopups,
  });
};

const handleCardLike = (card) => {
  store.dispatch('cards/likeCard', card);
};

const handleAddPlace = (card) => {
  store.dispatch('cards/addCard', { card, callback: closeAllPopups });
};

const handleUpdateAvatar = (user) => {
  store.dispatch('user/updateAvatar', { user, callback: closeAllPopups });
};

const handleUpdateUser = (user) => {
  store.dispatch('user/updateUser', { user, callback: closeAllPopups });
};

onMounted(() => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    store.dispatch('user/getUser');
    store.dispatch('user/getUserContent');
    store.dispatch('cards/getCards');
  }
});
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
          @click="handleEditAvatarClick"
        />
      </div>
      <div class="profile__info">
        <div class="profile__editor">
          <h1 class="profile__name">{{ user.name }}</h1>
          <MyButton
            type="button"
            aria-label="Изменение профиля"
            class="profile__edit-button"
            @click="handleEditProfileClick"
          />
        </div>
        <h2 class="profile__job">{{ user.about }}</h2>
      </div>
    </div>
    <MyButton
      type="button"
      aria-label="Добавление карточки"
      class="profile__add-button"
      @click="handleAddPlaceClick"
    />
  </section>

  <section class="elements">
    <ul class="elements__container" v-if="isCards">
      <li class="element" v-for="card in cards">
        <Card
          :card="card"
          :onCardClick="handleSelectedCardClick"
          :onCardDelete="handleCardDeleteClick"
          :onCardLike="handleCardLike"
        />
      </li>
    </ul>
    <p class="elements__no-cards" v-else>
      Упс, кажется, карточек еще нет. Создайте первую!
    </p>
  </section>

  <ImagePopup
    v-model="isImagePopup"
    :card="selectedCard"
    :onClose="closeAllPopups"
  />

  <PopupWithConfirm
    v-model="isConfirmPopup"
    :card="selectedCardDelete"
    :onClose="closeAllPopups"
    :onCardDelete="handleCardDelete"
  />

  <AddPlacePopup
    v-model="isAddPopup"
    :onClose="closeAllPopups"
    :onPlaceAdd="handleAddPlace"
  />

  <EditAvatarPopup
    v-model="isEditAvatarPopup"
    :onClose="closeAllPopups"
    :onUpdateAvatar="handleUpdateAvatar"
  />

  <EditProfilePopup
    v-model="IsEditProfilePopup"
    :onClose="closeAllPopups"
    :onUpdateUser="handleUpdateUser"
  />
</template>
