<template :key="contact._id">
  <ul class="contact-list">
    <li v-for="contact in contacts">
      <ContactPreview @deleteContact="deleteContact" :contact="contact" />
    </li>
  </ul>
</template>

<script>
import ContactPreview from "@/components/ContactPreview.vue";
export default {
  props: {
    contacts: {
      type: Array,
      default: [],
    },
  },
  emits: ["deleteContact"],
  components: {
    ContactPreview,
  },
  methods: {
    deleteContact(contactId) {
      this.$emit("deleteContact", contactId);
    },
  },
};
</script>
