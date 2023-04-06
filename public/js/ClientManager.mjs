// The client manager is responsible for all client functionalities, it is the bridge of communication to access and manipulate the localStorage

import { checkStatusLabel } from "./utilities.js";
import { openClientModal } from "./utilities.js";

export function getClient(clientId) {
  const client = JSON.parse(localStorage.getItem(clientId));
  return client;
}

export function renderClient(client) {
  // This function renders a client's info to be displayed in the client.html page
  return loadClientTemplate(client);
}

export function renderClientList() {
  // This function renders the client list in the outputElement

  // Get the no clients message element
  const noClientsMessage = document.querySelector("#no-clients-message")

  // If there are clients in the local storage, no message is displayed
  if (localStorage.length !== 0) {
    noClientsMessage.textContent = ""; 
    // If there are no clients, a message is displayed  
  } else {
    noClientsMessage.textContent = "No clients to display.";
  }

  const outputElement = document.querySelector("#client-list tbody");
  const list = getClients();

  outputElement.innerHTML = "";
  // Generate the client rows
  const clientRows = list.map(loadClientRow);
  // Append the rows to the outputElement
  clientRows.forEach(row => outputElement.appendChild(row));

  checkStatusLabel();
}

export function getClients() {
  // This function gets the clients from localStorage
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
  // This function gets the values from the client modal inputs and return an "info" object
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
  localStorage.setItem(client.id, JSON.stringify(client));
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
  openClientModal();
}

export function updateClient(client) {
  localStorage.setItem(client.id, JSON.stringify(client));
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

  // Add view, edit and delete buttons
  const actionBtns = generateActionBtns(client["id"]);
  tr.appendChild(actionBtns);

  return tr;
}

function generateActionBtns(clientId) {
  const actionBtns = document.createElement("td");
  actionBtns.classList.add("action-btns")

  // Create a link element and append the view button to it
  const link = document.createElement("a");
  link.setAttribute("href", `/client.html?id=${clientId}`);
  const viewBtn = document.createElement("span");
  viewBtn.classList.add("material-symbols-outlined")
  viewBtn.setAttribute("data-view", `${clientId}`);
  viewBtn.textContent = "visibility";
  link.appendChild(viewBtn);

  // Create the edit button and add click event to the editClient function
  const editBtn = document.createElement("span");
  editBtn.classList.add("material-symbols-outlined")
  editBtn.setAttribute("data-edit", `${clientId}`);
  editBtn.textContent = "edit";
  editBtn.addEventListener("click", () => {
    editClient(clientId)
  })

  // Create the delete button and add click event to the deleteClient function
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("material-symbols-outlined")
  deleteBtn.setAttribute("data-delete", `${clientId}`);
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    deleteClient(clientId);
  })

  // Append buttons
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
      <div id="company"><b>${client.company}</b></div>
      <div id="email">${client.email}</div>
      <div id="phone">${client.phone}</div>
      <a href="https://wa.me/1${client.phone}"><button id="send-message">Send message</button></a>
    </div>
    <div id="project-info">
      <h1 id="project-name">${client.project}</h1>
      <div class="project-detail">
        <div>Payment</div>
        <div id="payment-price">$100.00</div>
      </div>
      <div class="project-detail">
        <div>Delivery Date</div>
        <div id="date">04/18/2023</div>
      </div>
      <div class="project-detail">
        <div>Status</div>
        <div class="status-label">${client.status}</div>
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