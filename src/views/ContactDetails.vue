<template>
  <main class="contact-details">
    <h1>Contact Details</h1>
    <BackBtn url="contact" />
    <section class="card">
      <div class="contact-info flex column">
        <h3>{{ contact.name }}</h3>
        <p class="contact-email">{{ contact.email }}</p>
        <p class="contact-phone">{{ contact.phone }}</p>
        <div class="button-container flex column">
          <RouterLink :to="`/contact/edit/${contact._id}`">
            <button>Edit</button>
          </RouterLink>
        </div>
      </div>
      <img :src="`https://robohash.org/${contact.name}`" />
      <TransactionsList :transactions="contact.transactions" />
    </section>
  </main>
</template>

<script>
import { contactService } from "../services/contact.service.js";
import BackBtn from "../components/base/BackBtn.vue";
import TransactionsList from "../components/TransactionsList.vue";

export default {
  data() {
    return {
      contact: { name: "" },
    };
  },

  components: {
    BackBtn,
    TransactionsList,
  },

  async created() {
    const contactId = this.$route.params.id;
    this.contact = await contactService.getContactById(contactId);
  },
};
</script>
