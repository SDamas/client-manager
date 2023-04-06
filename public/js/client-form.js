// This file handles the interactions with the client information form in the client modal

import Client from "./Client.mjs";
import * as clientManager from "./ClientManager.mjs";

const clientForm = document.querySelector("#client-form");
const actionMessage = document.querySelector("#client-form #action-message")

// When the form is submitted, a validation is made to see if the client is already in the local storage, or not
clientForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const clientInfo = clientManager.getNewClientInfo();
  const clientId = clientInfo.id;

  // If client is in the local storage, update his information with the information that is in the form 
  if (localStorage.getItem(clientId)) {
    clientManager.updateClient(clientInfo);
    // Display action message
    actionMessage.textContent = "Client updated!"
    // If not, add the client to the local storage
  } else {
    const client = new Client(clientInfo)
    clientManager.addClient(client);
    // Display action message
    actionMessage.textContent = "Client saved!"
  }

  // Render client list after action is executed
  clientManager.renderClientList();
})