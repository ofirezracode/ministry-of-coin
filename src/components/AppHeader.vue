<template>
  <header v-if="isLoggedIn" class="app-header flex justify-between glass">
    <h2>Ministry of Coin</h2>
    <nav class="flex">
      <RouterLink to="/home">Home</RouterLink>
      <RouterLink to="/contact">Contacts</RouterLink>
      <RouterLink to="/stats">Statistics</RouterLink>
      <a @click="logout" class="logout-btn">Logout</a>
    </nav>
  </header>
</template>

<script>
import { RouterLink } from "vue-router";
import { userService } from "../services/user.service";
export default {
  computed: {
    isLoggedIn() {
      console.log("this.$store.getters.user", this.$store.getters.user);
      return this.$store.getters.user?.name;
    },
  },
  created() {
    if (!this.$store.getters.user?.name) {
      userService.getLoggedInUser();
      this.$store.dispatch({ type: "loadUser" });
    }
  },
  methods: {
    logout() {
      this.$store.dispatch({ type: "userLogout" });
      this.$router.push("/");
    },
  },
};
</script>
