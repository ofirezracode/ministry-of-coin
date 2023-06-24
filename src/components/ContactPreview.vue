<template>
  <article class="contact-preview card">
    <h3>{{ contact.name }}</h3>
    <p class="contact-email">{{ contact.email }}</p>
    <p class="contact-phone">{{ contact.phone }}</p>
    <div class="button-container flex">
      <RouterLink :to="`/contact/${contact._id}`">
        <button>Details</button>
      </RouterLink>
      <button @click="deleteContact(contact._id)">Delete</button>
    </div>
  </article>
</template>

<script>
export default {
  props: {
    contact: {
      type: Object,
      required: true,
    },
  },
  emits: ["deleteContact"],
  methods: {
    deleteContact(contactId) {
      this.$emit("deleteContact", contactId);
    },
  },
};
</script>
