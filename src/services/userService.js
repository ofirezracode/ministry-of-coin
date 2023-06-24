export const userService = {
  getUser,
};

function getUser() {
  return {
    name: "Mega user",
    balance: 5000,
    transactions: [],
  };
}
