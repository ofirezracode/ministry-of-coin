import { utilService } from "./utilService";

export const userService = {
  login,
  logout,
  getEmptyUser,
  getLoggedInUser,
  chargeAmount,
};

function getEmptyUser() {
  return {
    name: "",
    balance: 100,
    transactions: [],
  };
}

function login(name) {
  let user = getLoggedInUser();
  if (user && user.name === name) {
    return;
  } else {
    user = getEmptyUser();
    user.name = name;
    utilService.saveToStorage("user", user);
    return user;
  }
}

function logout() {
  utilService.clearStorage("user");
}

function getLoggedInUser() {
  return utilService.loadFromStorage("user");
}

function chargeAmount(amount, toId, to, date) {
  const transaction = {
    toId,
    to,
    date,
    amount,
  };
  const user = getLoggedInUser();
  user.balance -= amount;
  if (user.transactions) {
    user.transactions.unshift(transaction);
  } else {
    user.transactions = [transaction];
  }
  utilService.saveToStorage("user", user);
  return user.transactions;
}
