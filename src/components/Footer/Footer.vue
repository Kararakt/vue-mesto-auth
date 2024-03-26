<script setup lang="ts">
import './Footer.scss';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="footer">
    <p class="footer__copyright">&#169; {{ currentYear }} Mesto</p>
  </footer>
</template>
