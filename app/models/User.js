class User {
  constructor(user) {
    this.id = user.id;
    this.username = user.username;
    this.full_name = user.full_name;
    this.email = user.email;
  }

  toJson() {
    return this;
  }
}

module.exports = User;
