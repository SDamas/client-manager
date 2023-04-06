// This file keeps all functionalities of the client modal

// Select modal elements
const modalBackground = document.querySelector("#modal-background");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-modal");

// Button to open modal
const openModal = document.querySelector("#add-new-client");

// Action message element. This is the element that displays the action executed in the modal
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

// This function is called when modal is closed
function clearModalFields() {
  document.querySelector("#clientId").value = "";
  document.querySelector("#clientName").value = "";
  document.querySelector("#clientCompany").value = ""
  document.querySelector("#clientEmail").value = "";
  document.querySelector("#clientPhone").value = "";
  document.querySelector("#clientProject").value = "";
  document.querySelector("#clientStatus").value = "";
}