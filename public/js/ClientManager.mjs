// import { openClientModal } from "./modal.js";

import { checkStatusLabel } from "./utilities.js";

export function getClient(clientId) {
  const client = JSON.parse(localStorage.getItem(clientId));
  return client;
}

export function renderClient(client) {
  return loadClientTemplate(client);
}

export function renderClientList() {
  // Ideally this function should take a "outputSelector, list" to be dynamic. I will work on it. 

  const outputSelector = document.querySelector("#client-list tbody");
  const list = getClients();

  outputSelector.innerHTML = "";
  const clientRows = list.map(loadClientRow);
  clientRows.forEach(row => outputSelector.appendChild(row));

  checkStatusLabel();
}

export function getClients() {
  const clients = [];

  Object.keys(localStorage).forEach((key) => {
    const value = localStorage.getItem(key);
    const client = JSON.parse(value);
    clients.push(client);
  });

  // Sort clients in ascending order by id
  clients.sort((a, b) => a.id - b.id);

  return clients;
}

export function getNewClientInfo() {
  const clientId = document.querySelector("#clientId").value;
  const clientName = document.querySelector("#clientName").value;
  const clientCompany = document.querySelector("#clientCompany").value;
  const clientEmail = document.querySelector("#clientEmail").value;
  const clientPhone = document.querySelector("#clientPhone").value;
  const clientProject = document.querySelector("#clientProject").value;
  const clientStatus = document.querySelector("#clientStatus").value;

  const info = {
    id: clientId,
    name: clientName,
    company: clientCompany,
    email: clientEmail,
    phone: clientPhone,
    project: clientProject,
    status: clientStatus
  }

  return info;
}

export function addClient(client) {
  localStorage.setItem(client.getId(), JSON.stringify(client));
}

export function deleteClient(clientId) {
  localStorage.removeItem(clientId);
  renderClientList();
}

export function editClient(clientId) {
  const client = getClient(clientId);
  document.querySelector("#clientId").value = client.id;
  document.querySelector("#clientName").value = client.name;
  document.querySelector("#clientCompany").value = client.company;
  document.querySelector("#clientEmail").value = client.email;
  document.querySelector("#clientPhone").value = client.phone;
  document.querySelector("#clientProject").value = client.project;
  document.querySelector("#clientStatus").value = client.status;
  openClientModal()
}

export function updateClient(client) {
  localStorage.setItem(client.id, JSON.stringify(client));
  document.querySelector("#clientId").value = "";
  document.querySelector("#clientName").value = "";
  document.querySelector("#clientCompany").value = ""
  document.querySelector("#clientEmail").value = "";
  document.querySelector("#clientPhone").value = "";
  document.querySelector("#clientProject").value = "";
  document.querySelector("#clientStatus").value = "";
}

function loadClientRow(client) {
  // Create row
  const tr = document.createElement("tr")
  // For each information of the client, append it to the row
  for (const info in client) {
    const td = document.createElement("td")
    // Skips the id information. It is a hidden property.
    if (info === "id") {
      td.style.display = "none";
    }
    if (info == "status") {
      td.classList.add("status-label")
    }

    td.textContent = client[`${info}`]
    tr.appendChild(td);
  }

  // Add edit and delete buttons
  const actionBtns = generateActionBtns(client["id"]);
  tr.appendChild(actionBtns);

  return tr;
}

function generateActionBtns(clientId) {
  const actionBtns = document.createElement("td");

  // Create link element
  const link = document.createElement("a");
  link.setAttribute("href", `/client.html?id=${clientId}`);
  const viewBtn = document.createElement("span");
  viewBtn.classList.add("material-symbols-outlined")
  viewBtn.setAttribute("data-view", `${clientId}`);
  viewBtn.textContent = "visibility";
  link.appendChild(viewBtn);

  const editBtn = document.createElement("span");
  editBtn.classList.add("material-symbols-outlined")
  editBtn.setAttribute("data-edit", `${clientId}`);
  editBtn.textContent = "edit";
  editBtn.addEventListener("click", () => {
    editClient(clientId)
  })
  
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("material-symbols-outlined")
  deleteBtn.setAttribute("data-delete", `${clientId}`);
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    deleteClient(clientId);
    console.log("Client deleted:" + clientId)
  })

  // Append buttons to row
  actionBtns.appendChild(link)
  actionBtns.appendChild(editBtn)
  actionBtns.appendChild(deleteBtn)

  return actionBtns;
}

function loadClientTemplate(client) {
  return `
  <section id="client-and-project">
    <div id="client-info">
      <h1 id="name">${client.name}</h1>
      <p id="company"><b>${client.company}</b></p>
      <p id="email">${client.email}</p>
      <p id="phone">${client.phone}</p>
      <a href="https://wa.me/1${client.phone}"><button id="send-message">Send message</button></a>
    </div>
    <div id="project-info">
      <h1 id="project-name">${client.project}</h1>
      <div id="payment">
        <p>Payment</p>
        <p id="payment-price">$100.00</p>
      </div>
      <div id="delivery-date">
        <p>Delivery Date</p>
        <p id="date">04/18/2023</p>
      </div>
      <div id="status">
        <p>Status</p>
        <p class="status-label">${client.status}</p>
      </div>
      <button>Finish Project</button>
    </div>
    </section>
    <hr>
    <section id="notes-section">
      <div id="notes">
        <h1>Notes<span class="material-symbols-outlined">edit_square</span></h1>
        <textarea name="" id="" cols="30" rows="10"></textarea>
      </div>
    </section>
  <section>
  ` 
}