<template>
  <section class="contacts-transfer-funds card">
    <div class="transfer-container flex column justify-between">
      <header>
        <h3>Quick transfer</h3>
        <p
          v-if="isMsgOn"
          :class="{
            msg,
            error: msgType === 'error',
            success: msgType === 'success',
          }"
        >
          {{ msg }}
        </p>
      </header>
      <form v-if="chosenContact">
        <p>
          Transfer to <span class="dynamic">{{ chosenContact.name }}</span>
        </p>
        <p class="p-amount flex">
          An amonut of

          <input
            class="card"
            v-model="amount"
            type="number"
            :min="0"
            :max="userBalance"
          />
          <img src="https://cdn-icons-png.flaticon.com/512/5968/5968260.png" />
        </p>
        <button @click.prevent="makeTransfer">Transfer</button>
      </form>
    </div>
    <ul class="card">
      <li
        :class="{ chosen: isChosen(contact._id) }"
        @click="setChosenContact(contact)"
        v-for="contact in contacts"
      >
        <p>{{ contact.name }}</p>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      chosenContact: null,
      amount: 0,
      isMsgOn: false,
      msg: "",
      msgType: "",
    };
  },
  computed: {
    userBalance() {
      return this.$store.getters.user.balance;
    },
  },
  props: {
    contacts: {
      required: true,
      type: Array,
    },
  },
  methods: {
    setChosenContact(contact) {
      this.chosenContact = contact;
    },
    isChosen(id) {
      return this.chosenContact?._id === id;
    },
    async makeTransfer() {
      if (this.$store.getters.user.balance - this.amount < 0) {
        this.msg = "Transfer exceeds funds";
        this.isMsgOn = true;
        this.msgType = "error";
        setTimeout(() => {
          this.msg = "";
          this.isMsgOn = false;
          this.msgType = "";
        }, 2500);
        return;
      }
      //reduce from user
      this.$store.dispatch({
        type: "chargeAmount",
        amount: this.amount,
        toId: this.chosenContact._id,
        to: this.chosenContact.name,
      });

      //increase contact
      await this.$store.dispatch({
        type: "contactAddAmount",
        contact: this.chosenContact,
        amount: this.amount,
        from: this.$store.getters.user.name,
      });

      this.chosenContact = null;
      this.amount = 0;

      this.msg = "Transfer successful!";
      this.isMsgOn = true;
      this.msgType = "success";
      setTimeout(() => {
        this.msg = "";
        this.isMsgOn = false;
        this.msgType = "success";
      }, 2500);
    },
  },
};
</script>
