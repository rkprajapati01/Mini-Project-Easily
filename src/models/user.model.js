export default class UserModel {
  constructor(id, name, email, password) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.password = password;
    this.postedJobs = [];
  }

  static add(name, email, password) {
    const newUser = new UserModel(usersList.length + 1, name, email, password);
    usersList.push(newUser);
  }

  static isValid(email, password) {
    return usersList.find((u) => u.email == email && u.password == password);
  }
}

let usersList = [
  new UserModel(1, "Rajat Prajapati", "rk22836@gmail.com", "123"),
];
