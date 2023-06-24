<template>
  <main class="contacts">
    <h1>Contacts</h1>
    <ContactFilter
      @termUpdated="getFilteredContacts"
      v-model:filterBy="filterBy"
    />
    <ContactList @deleteContact="deleteContact" :contacts="contacts" />
  </main>
</template>

<script>
import { contactService } from "../services/contactService";
import ContactList from "../components/ContactList.vue";
import ContactFilter from "../components/ContactFilter.vue";
export default {
  data() {
    return {
      contacts: [],
      filterBy: { term: "" },
    };
  },
  components: {
    ContactList,
    ContactFilter,
  },
  async created() {
    this.contacts = await contactService.getContacts();
  },
  methods: {
    async getFilteredContacts() {
      this.contacts = await contactService.getContacts(this.filterBy);
      console.log("this.contacts", this.contacts);
    },
    async deleteContact(contactId) {
      this.contacts = await contactService.deleteContact(contactId);
      console.log("this.contacts", this.contacts);
    },
  },
};
</script>
