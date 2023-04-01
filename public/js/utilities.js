export function getParameter(parameter) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(parameter);
}

export function checkStatusLabel() {
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