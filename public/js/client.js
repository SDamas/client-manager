import { checkStatusLabel, getParameter } from "./utilities.js";
import { getClient, renderClient } from "./ClientManager.mjs";

const clientId = getParameter("id");
const client = getClient(clientId);
const outputElement = document.querySelector("#client-view");
outputElement.innerHTML = renderClient(client)
checkStatusLabel();
