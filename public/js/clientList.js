import {renderClientList } from "./ClientManager.mjs";

if (localStorage.length === 0) {
  document.querySelector("#no-clients-message").textContent = "No clients to display.";
} else {
  renderClientList()
}