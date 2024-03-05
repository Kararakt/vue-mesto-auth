<script setup>
import logo from '/logo.svg';

import { computed, ref, onMounted, onUnmounted, watch } from 'vue';
import { useStore } from 'vuex';
import router from '../router/router';

import MyButton from './UI/MyButton.vue';

const store = useStore();

const loggedIn = computed(() => store.state.user.loggedIn);
const email = computed(() => store.state.user.user.email);

const active = ref(false);

const menu = ref(null);
const btn = ref(null);
const emailD = ref(null);

const handleActiveMenu = () => {
  active.value = !active.value;
};

const handleClickOutside = (event) => {
  const elements = [menu.value, btn.value, emailD.value];
  if (!elements.some((el) => event.target === el) && active.value) {
    active.value = false;
  }
};

const handleLogout = () => {
  store.dispatch('user/logout');
  router.push('/authorization');
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});

watch(active, () => {
  document.body.style.overflowY = active.value ? 'hidden' : 'auto';
});
</script>

<template>
  <header class="header">
    <img :src="logo" alt="Лого" class="header__logo" />

    <p class="header__authorization" v-if="!loggedIn">Авторизация</p>
    <template v-if="loggedIn">
      <div
        :class="['header__menu', { header__menu_active: active }]"
        ref="menu"
      >
        <span class="header__email" ref="emailD">{{ email }}</span>
        <MyButton
          type="button"
          textButton="Выйти"
          class="header__sign-out"
          @click="handleLogout"
        />
      </div>
      <div
        :class="['header__icon', { header__icon_active: active }]"
        ref="btn"
        @click="handleActiveMenu"
      ></div>
    </template>
  </header>
</template>
