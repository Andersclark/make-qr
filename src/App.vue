<script setup>
import { ref } from "vue";
import AppHeader from "./components/AppHeader.vue";
import AppFooter from "./components/AppFooter.vue";
import MakeQr from "./components/MakeQr.vue";

const showHeader = ref(true);
</script>
<template>
  <AppHeader :show="showHeader"/>
  <main>
    <MakeQr @focus="showHeader = false"/>
  </main>
  <AppFooter/>
</template>
<style scoped>


</style>
