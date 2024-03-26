<script setup lang="ts">
import './App.scss';

import Header from '../Header/Header.vue';
import Footer from '../Footer/Footer.vue';

const store = useStore();

onMounted(() => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    store.dispatch('user/login');
  }
});
</script>

<template>
  <div class="app">
    <Header />
    <main class="app__container">
      <RouterView />
    </main>
    <Footer v-if="$route.path !== '/authorization'" />
  </div>
</template>
