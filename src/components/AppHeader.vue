<script lang="ts" setup>
defineProps<{show: boolean}>();
</script>
<template>
  <header class="header"><Transition><h1 v-show="show">Make QR</h1></Transition></header>
</template>
<style scoped>

.header {
  padding: 2rem 0 1rem 0 ;
  width: 100vw;
  min-height: 3rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
}
.v-enter-active,
.v-leave-active {
  transition: font-size 0.5s ease;
}
.v-enter-from,
.v-leave-to {
  font-size: 0;
}
</style>
