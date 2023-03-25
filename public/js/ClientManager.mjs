export function getClient(clientId) {
  const client = JSON.parse(localStorage.getItem(clientId));
  return client;
}

export function renderClientList() {
  // Ideally this function should take a "outputSelector, list" to be dynamic. I will work on it. 

  const outputSelector = document.querySelector("#client-list tbody");
  const list = getClients();

  outputSelector.innerHTML = "";
  const clientRows = list.map(loadClientRow);
  clientRows.forEach(row => outputSelector.appendChild(row));
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
  const clientName = document.querySelector("#clientName").value;
  const clientCompany = document.querySelector("#clientCompany").value;
  const clientEmail = document.querySelector("#clientEmail").value;
  const clientPhone = document.querySelector("#clientPhone").value;
  const clientProject = document.querySelector("#clientProject").value;
  const clientStatus = document.querySelector("#clientStatus").value;

  const info = {
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

function loadClientRow(client) {
  // Create row
  const tr = document.createElement("tr")
  // For each information of the client, append it to the row
  for (const info in client) {
    const td = document.createElement("td")
    // Skips the id information. It is a hidden property.
    if (info !== "id") {
      td.textContent = client[`${info}`]
      tr.appendChild(td);
    }
  }

  // Add edit and delete buttons
  const actionBtns = generateActionBtns(client["id"]);
  tr.appendChild(actionBtns);

  return tr;
}

function generateActionBtns(clientId) {
  const actionBtns = document.createElement("td");

  const editBtn = document.createElement("span");
  editBtn.classList.add("material-symbols-outlined")
  editBtn.setAttribute("data-edit", `${clientId}`);
  editBtn.textContent = "edit";
  
  const deleteBtn = document.createElement("span");
  deleteBtn.classList.add("material-symbols-outlined")
  deleteBtn.setAttribute("data-delete", `${clientId}`);
  deleteBtn.textContent = "delete";
  deleteBtn.addEventListener("click", () => {
    deleteClient(clientId);
    console.log("Client deleted:" + clientId)
  })

  // Append buttons to row
  actionBtns.appendChild(editBtn)
  actionBtns.appendChild(deleteBtn)

  return actionBtns;
}