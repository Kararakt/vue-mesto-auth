<script setup lang="ts">
import './HomePage.scss';

import {
  CardData,
  UserProfile,
  UserAvatar,
  CardAdd,
} from '../../models/models';

import CardList from '../../components/CardList/CardList.vue';
import Profile from '../../components/Profile/Profile.vue';
import ImagePopup from '../../components/ImagePopup/ImagePopup.vue';
import PopupWithConfirm from '../../components/PopupWithConfirm/PopupWithConfirm.vue';
import AddPlacePopup from '../../components/AddPlacePopup/AddPlacePopup.vue';
import EditAvatarPopup from '../../components/EditAvatarPopup/EditAvatarPopup.vue';
import EditProfilePopup from '../../components/EditProfilePopup/EditProfilePopup.vue';

const store = useStore();

const user = computed(() => store.state.user.user);
const cards = computed(() => store.state.cards.cards);

const selectedCard = ref<Partial<CardData>>({});
const selectedCardDelete = ref<CardData | null>(null);

const isImagePopup = ref<boolean>(false);
const isConfirmPopup = ref<boolean>(false);
const isAddPopup = ref<boolean>(false);
const isEditAvatarPopup = ref<boolean>(false);
const IsEditProfilePopup = ref<boolean>(false);

const handleCardDeleteClick = (card: CardData) => {
  isConfirmPopup.value = true;
  selectedCardDelete.value = card;
};

const handleSelectedCardClick = (card: CardData) => {
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

const handleCardDelete = (card: CardData) => {
  store.dispatch('cards/deleteCard', {
    cardId: card._id,
    callback: closeAllPopups,
  });
};

const handleCardLike = (card: CardData) => {
  store.dispatch('cards/likeCard', card);
};

const handleAddPlace = (card: CardAdd) => {
  store.dispatch('cards/addCard', { card, callback: closeAllPopups });
};

const handleUpdateAvatar = (user: UserAvatar) => {
  store.dispatch('user/updateAvatar', { user, callback: closeAllPopups });
};

const handleUpdateUser = (user: UserProfile) => {
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
  <Profile
    :user="user"
    :onAvatarClick="handleEditAvatarClick"
    :onEditProfileClick="handleEditProfileClick"
    :onAddPlaceClick="handleAddPlaceClick"
  />

  <CardList
    :cards="cards"
    :onCardDelete="handleCardDeleteClick"
    :onCardClick="handleSelectedCardClick"
    :onCardLike="handleCardLike"
  />

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
