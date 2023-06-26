<template>
  <main class="contacts">
    <h1>Contacts</h1>
    <ContactFilter v-model:filterBy="filterBy" />
    <section class="contacts-container">
      <ContactList
        @deleteContact="deleteContact"
        :contacts="filteredContacts"
      />
      <ContactsTransferFunds :contacts="filteredContacts" />
    </section>
  </main>
</template>

<script>
import { contactService } from "../services/contact.service.js";
import ContactList from "../components/ContactList.vue";
import ContactFilter from "../components/ContactFilter.vue";
import ContactsTransferFunds from "../components/ContactsTransferFunds.vue";
export default {
  data() {
    return {
      filterBy: { term: "" },
    };
  },
  components: {
    ContactList,
    ContactFilter,
    ContactsTransferFunds,
  },
  computed: {
    contacts() {
      return this.$store.getters.contacts;
    },
    filteredContacts() {
      return contactService.filterContacts(this.contacts, this.filterBy);
    },
  },
  async created() {
    await this.$store.dispatch({ type: "loadContacts" });
  },
  methods: {
    async deleteContact(contactId) {
      await this.$store.dispatch({ type: "removeContact", contactId });
      console.log("this.contacts", this.contacts);
    },
  },
};
</script>
