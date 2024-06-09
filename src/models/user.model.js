export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.postedJobs = [];
  }
  // method to get all the users present in users list
  static getAll() {
    return usersList;
  }
  // method to add user into users list
  static add(name, email, password) {
    const newUser = new UserModel(usersList.length + 1, name, email, password);
    usersList.push(newUser);
  }
  // method to check user credentials are valid or not
  static isValid(email, password) {
    return usersList.find((u) => u.email == email && u.password == password);
  }
}

// User list array to store users
let usersList = [
  new UserModel(1, "Rajat Prajapati", "rk22836@gmail.com", "123"),
];
