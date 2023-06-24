<template>
  <main class="contact-details">
    <h1>Contact Details</h1>
    <RouterLink to="/contact">
      <button><span class="arrow">&#8592;</span>Back</button>
    </RouterLink>
    <section class="card">
      <div class="contact-info">
        <h3>{{ contact.name }}</h3>
        <p class="contact-email">{{ contact.email }}</p>
        <p class="contact-phone">{{ contact.phone }}</p>
      </div>
      <img :src="`https://robohash.org/${contact.name}`" />
    </section>
  </main>
</template>

<script>
import { contactService } from "../services/contactService";

export default {
  data() {
    return {
      contact: { name: "" },
    };
  },

  async created() {
    const contactId = this.$route.params.id;
    this.contact = await contactService.getContactById(contactId);
  },
};
</script>
