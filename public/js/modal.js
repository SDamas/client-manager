// Select modal elements
const modalBackground = document.querySelector("#modal-background");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-modal");

// Button to open modal
const openModal = document.querySelector("#add-new-client");

// Action message element. This is the element that displays the action executed in the modal.
const actionMessage = document.querySelector("#client-form #action-message")

// Add open modal action
openModal.addEventListener("click", () => {
  modalBackground.style.display = "block";
  modal.style.display = "block";
})

// Add close modal action when modal background is clicked
modalBackground.addEventListener("click", () => {
  modalBackground.style.display = "none";
  modal.style.display = "none";
  actionMessage.textContent = "";
  clearModalFields();
})

// Add close modal action when close modal is clicked
closeModal.addEventListener("click", () => {
  modalBackground.style.display = "none";
  modal.style.display = "none";
  actionMessage.textContent = "";
  clearModalFields();
})

// Add the openClientModal to the editBtns
const editBtns = document.querySelectorAll("span[data-edit]");
editBtns.forEach(button => {
  button.addEventListener("click", openClientModal);
})
// TODO: After modal is open, the client list is rendered, and this querySelectorAll is not called.
// Find a way to fix it.

function openClientModal() {
  modalBackground.style.display = "block";
  modal.style.display = "block";
}

function clearModalFields() {
  document.querySelector("#clientId").value = "";
  document.querySelector("#clientName").value = "";
  document.querySelector("#clientCompany").value = ""
  document.querySelector("#clientEmail").value = "";
  document.querySelector("#clientPhone").value = "";
  document.querySelector("#clientProject").value = "";
  document.querySelector("#clientStatus").value = "";
}