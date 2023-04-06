export function getParameter(parameter) {
  // This function retrieves the value of a parameter in the URL
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

export function checkStatusLabel() {
  // This function checks the status of the client's project and adds a class identifier accordingly.

  // Get all status of the page
  const statusLabels = document.querySelectorAll('.status-label');
  for (let i = 0; i < statusLabels.length; i++) {
    const statusLabel = statusLabels[i];
    if (statusLabel.textContent == "Finished") {
      statusLabel.classList.add("finished")
    } else {
      statusLabel.classList.add("in-progress")
    }
  }
}

export function openClientModal() {
  document.querySelector("#modal-background").style.display = "block";
  document.querySelector("#modal").style.display = "block";
}