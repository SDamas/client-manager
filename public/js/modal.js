// Select modal elements
const modalBackground = document.querySelector("#modal-background");
const modal = document.querySelector("#modal");
const closeModal = document.querySelector("#close-modal");

// Button to open modal
const openModal = document.querySelector("#add-new-client");

// Add open modal action
openModal.addEventListener("click", () => {
  modalBackground.style.display = "block";
  modal.style.display = "block";
})

// Add close modal action when modal background is clicked
modalBackground.addEventListener("click", () => {
  modalBackground.style.display = "none";
  modal.style.display = "none";
})

// Add close modal action when close modal is clicked
closeModal.addEventListener("click", () => {
  modalBackground.style.display = "none";
  modal.style.display = "none";
})

export function openClientModal() {
  modalBackground.style.display = "block";
  modal.style.display = "block";
}