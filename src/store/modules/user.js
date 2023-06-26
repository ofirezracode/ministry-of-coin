import { userService } from "@/services/user.service.js";

export default {
  state() {
    return {
      user: userService.getEmptyUser(),
    };
  },
  mutations: {
    setUser(state, { user }) {
      state.user = user;
    },
  },
  actions: {
    loadUser({ commit }) {
      commit({ type: "setUser", user: userService.getLoggedInUser() });
    },
    userLogin({ commit }, { username }) {
      const user = userService.login(username);
      commit({ type: "setUser", user });
    },
    userLogout({ commit }) {
      userService.logout();
      commit({ type: "setUser", user: userService.getEmptyUser() });
    },
    chargeAmount({ commit, state }, { amount, toId, to }) {
      const time = Date.now();
      const newTransactions = userService.chargeAmount(amount, toId, to, time);
      commit({
        type: "setUser",
        user: {
          ...state.user,
          balance: state.user.balance - amount,
          transactions: newTransactions,
        },
      });
    },
  },
  getters: {
    user(state) {
      return state.user;
    },
  },
};
