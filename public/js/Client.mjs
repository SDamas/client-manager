// This is the client class that holds all information of a client.

export default class Client {
  constructor(info) {
    this.id = localStorage.length + 1;
    this.name = info.name;
    this.company = info.company;
    this.email = info.email;
    this.phone = info.phone;
    this.project = info.project;
    this.status = info.status;
  }  
}