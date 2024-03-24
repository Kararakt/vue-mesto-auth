<script setup lang="ts">
import Header from './Header.vue';
import Footer from './Footer.vue';

const store = useStore();

onMounted(() => {
  const jwt = localStorage.getItem('jwt');

  if (jwt) {
    store.dispatch('user/login');
  }
});
</script>

<template>
  <div class="page">
    <Header />
    <main class="page__container">
      <RouterView />
    </main>
    <Footer v-if="$route.path !== '/authorization'" />
  </div>
</template>
