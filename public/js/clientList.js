import { getClients, renderClientList } from "./ClientManager.mjs";

if (localStorage.length === 0) {
  console.log("No clients to display.")
} else {
  renderClientList()
}