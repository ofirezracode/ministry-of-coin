<template>
  <header class="app-header flex justify-between glass">
    <h2>Ministry of Coin</h2>
    <nav class="flex">
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
      <RouterLink to="/stats">Statistics</RouterLink>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
export default {};
</script>
