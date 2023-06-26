<template>
  <main class="login">
    <div class="login-container">
      <h1>Login</h1>
      <form class="card flex column">
        <label for="form-username">Username</label>
        <input
          class="card"
          id="form-username"
          type="text"
          v-model.trim="username"
        />
        <p v-if="emptyLogin">Please enter a username</p>
        <div class="button-container flex justify-between">
          <button class="dark-button" @click.prevent="login">Login</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import { userService } from "../services/user.service";

export default {
  data() {
    return {
      username: "",
      emptyLogin: false,
    };
  },
  methods: {
    login() {
      if (this.username) {
        this.$store.dispatch({ type: "userLogin", username: this.username });
        this.$router.push("/home");
      } else {
        this.emptyLogin = true;
      }
    },
  },
  mounted() {
    if (this.$store.getters.user && this.$store.getters.user.name) {
      console.log("here");
      this.$router.push("/home");
    }
  },
};
</script>
