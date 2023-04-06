// This file is used to fill the client.html page with information about the client according to id.

import { checkStatusLabel, getParameter } from "./utilities.js";
import { getClient, renderClient } from "./ClientManager.mjs";

const clientId = getParameter("id");
// Get client information from localStorage
const client = getClient(clientId);
// Element to output the information
const outputElement = document.querySelector("#client-view");
outputElement.innerHTML = renderClient(client)
checkStatusLabel();