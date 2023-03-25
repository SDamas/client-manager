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
  
  // Get methods
  getId() {
    return this.id;
  }

  getName() {
    return this.name;
  }

  getCompany() {
    return this.company;
  }

  getEmail() {
    return this.email;
  }

  getPhone() {
    return this.phone;
  }

  getProject() {
    return this.project;
  }

  getStatus() {
    return this.status;
  }

  // Set methods
  setName(name) {
    this.name = name
  }

  setCompany(company) {
    this.company = company
  }

  setEmail(email) {
    this.email = email
  }

  setPhone(phone) {
    this.phone = phone
  }

  setProject(project) {
    this.project = project
  }

  setStatus(status) {
    this.status = status
  }

  
}