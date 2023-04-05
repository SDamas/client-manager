import Client from "./Client.mjs";
import * as clientManager from "./ClientManager.mjs";

const clientForm = document.querySelector("#client-form");
const actionMessage = document.querySelector("#client-form #action-message")

// Save client action
clientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const clientInfo = clientManager.getNewClientInfo();
  const clientId = clientInfo.id;
  if (localStorage.getItem(clientId)) {
    clientManager.updateClient(clientInfo);
    actionMessage.textContent = "Client updated!"
  } else {
    const client = new Client(clientInfo)
    clientManager.addClient(client);
    actionMessage.textContent = "Client saved!"
  }

  // Render client list with new client
  const clientListElement = document.querySelector("#client-list tbody");
  const clients = clientManager.getClients();
  clientManager.renderClientList(clientListElement, clients);
})