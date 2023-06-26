<template>
  <main class="contact-edit">
    <h1>{{ header }}</h1>
    <form class="card flex column">
      <label for="form-name">Name</label>
      <input class="card" id="form-name" type="text" v-model.trim="newName" />
      <label for="form-email">Email</label>
      <input
        class="card"
        id="form-email"
        type="email"
        v-model.trim="newEmail"
      />
      <label for="form-phone">Phone</label>
      <input
        class="card"
        id="form-phone"
        type="phone"
        v-model.trim="newPhone"
      />
      <p v-if="invalidInputs">Please fill all of the fields</p>
      <div class="button-container flex justify-between">
        <BackBtn @click.prevent :url="backUrl" />
        <button @click.prevent="saveContact">Save</button>
      </div>
    </form>
  </main>
</template>

<script>
import { contactService } from "../services/contact.service.js";
import BackBtn from "../components/base/BackBtn.vue";

export default {
  data() {
    return {
      contact: contactService.getEmptyContact(),
      newName: "",
      newEmail: "",
      newPhone: "",
      invalidInputs: false,
    };
  },
  components: {
    BackBtn,
  },
  computed: {
    contactId() {
      return this.$route.params.id;
    },
    header() {
      if (this.contactId) {
        return "Edit";
      }
      return "Signup";
    },
    backUrl() {
      if (this.contactId) {
        return `contact/${this.contact._id}`;
      }
    },
  },
  watch: {
    contactId() {
      this.loadContact();
    },
  },
  methods: {
    async saveContact() {
      try {
        let newContact;
        if (this.contact._id) {
          newContact = {
            _id: this.contact._id,
            name: this.newName,
            email: this.newEmail,
            phone: this.newPhone,
          };
        } else {
          if (
            this.newName === "" ||
            this.newEmail === "" ||
            this.newPhone === ""
          ) {
            this.invalidInputs = true;
            return;
          }
        }
        await contactService.saveContact(newContact);
        this.$router.push("/contact");
      } catch (err) {
        console.log("err", err);
        showErrorMsg("Cannot save contact");
      }
    },
    async loadContact() {
      try {
        this.contact = await contactService.getContactById(this.contactId);
      } catch (err) {
        console.log("err", err);
        showErrorMsg("Cannot load contact");
      }
    },
  },
  async created() {
    if (this.contactId) {
      await this.loadContact();
      this.newName = this.contact.name;
      this.newEmail = this.contact.email;
      this.newPhone = this.contact.phone;
    }
  },
  components: { BackBtn },
};
</script>
