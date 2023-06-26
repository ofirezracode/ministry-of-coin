import { contactService } from "@/services/contact.service.js";

export default {
  state() {
    return {
      contacts: [],
    };
  },
  mutations: {
    setContacts(state, { contacts }) {
      state.contacts = contacts;
    },
    removeContact(state, { contactId }) {
      const idx = state.contacts.findIndex(
        (contact) => contact._id === contactId
      );
      state.contacts.splice(idx, 1);
    },
    saveContact(state, { newContact }) {
      let contactIdx = state.contacts.findIndex(
        (contact) => contact._id === newContact._id
      );
      if (contactIdx >= 0) {
        state.contacts[contactIdx] = { ...newContact };
      } else {
        state.contacts.unshift(newContact);
      }
    },
  },
  actions: {
    async loadContacts({ commit }) {
      const contacts = await contactService.getContacts();
      commit({ type: "setContacts", contacts });
    },
    async removeContact({ commit }, { contactId }) {
      await contactService.deleteContact(contactId);
      commit({ type: "removeContact", contactId });
    },
    async saveContact({ commit }, { contact }) {
      await contactService.saveContact(contact);
      commit({ type: "saveContact", contact });
    },
    async contactAddAmount({ commit }, { contact, amount, from }) {
      const newBalance = contact.balance ? contact.balance + amount : amount;
      const newTransaction = {
        from,
        amount,
        date: Date.now(),
      };
      let newTransactions;
      if (contact.transactions && contact.transactions.length > 0) {
        newTransactions = [...contact.transactions];
        newTransactions.unshift(newTransaction);
      } else {
        newTransactions = [newTransaction];
      }

      const updatedContact = {
        ...contact,
        balance: newBalance,
        transactions: newTransactions,
      };

      await contactService.saveContact(updatedContact);
      commit({ type: "saveContact", newContact: updatedContact });
    },
  },
  getters: {
    contacts(state) {
      return state.contacts;
    },
    getContact: (state) => (contactId) =>
      state.contacts.find((contact) => contact._id === contactId),
  },
};
