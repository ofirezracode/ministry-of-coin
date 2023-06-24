<template>
  <main class="home">
    <h1>Coins</h1>
    <div class="user-info flex justify-between card">
      <p class="user-name">{{ user.name }}</p>
      <p class="user-balance">{{ user.balance }}</p>
    </div>
    <section class="coin card">
      <header>
        <h2 class="bitcoin">Bitcoin</h2>
        <p>
          Rate: <span>{{ rate }}</span>
        </p>
      </header>
    </section>
  </main>
</template>

<script>
import { bitcoinService } from "../services/bitcoinService";
import { userService } from "../services/userService";

export default {
  data() {
    return {
      rate: "",
      user: {},
    };
  },
  async created() {
    this.rate = await bitcoinService.getRate();
    this.user = userService.getUser();
  },
};
</script>
