<template>
  <ul v-if="transactions.length > 0" class="transactions-list card">
    <li v-for="(transaction, i) in transactions">
      <p>{{ formatDate(transaction.date) }}</p>
      <p v-if="isUserTransactions">To {{ transaction.to }}</p>
      <p v-else>From {{ transaction.from }}</p>
      <p>BTC {{ transaction.amount }}</p>
    </li>
  </ul>
</template>

<script>
import { utilService } from "../services/utilService";

export default {
  props: {
    transactions: {
      type: Array,
      default: [],
    },
    isUserTransactions: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    formatDate(date) {
      console.log("transactions", this.transactions);
      // console.log("i", i);
      // console.log("transactions", this.transactions);
      // console.log("transactions[i]", this.transactions[i]);
      return utilService.formatDate(date);
    },
  },
};
</script>
