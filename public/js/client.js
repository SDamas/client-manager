import Client from "./Client.mjs";
import * as clientManager from "./ClientManager.mjs";

const saveClient = document.querySelector("#save-client");

// Save client action
saveClient.addEventListener("click", () => {
  const clientInfo = clientManager.getNewClientInfo();
  const client = new Client(clientInfo)
  clientManager.addClient(client);

  // Render client list with new client
  const clientListElement = document.querySelector("#client-list tbody");
  const clients = clientManager.getClients();
  clientManager.renderClientList(clientListElement, clients);
})

// Delete client
