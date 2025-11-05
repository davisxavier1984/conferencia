export class User {
  constructor(data = {}) {
    this.id = data.id || null;
    this.name = data.name || '';
    this.email = data.email || '';
    this.isAdmin = data.isAdmin || false;
  }

  static fromJSON(json) {
    return new User(json);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      isAdmin: this.isAdmin,
    };
  }
}
