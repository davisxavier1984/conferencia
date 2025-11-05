export class User {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.phone = data.phone;
    this.cpf = data.cpf;
    this.municipio = data.municipio;
    this.segmento = data.segmento;
    this.createdAt = data.createdAt || new Date();
  }

  static fromJSON(json) {
    return new User(json);
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      phone: this.phone,
      cpf: this.cpf,
      municipio: this.municipio,
      segmento: this.segmento,
      createdAt: this.createdAt
    };
  }
}
