const decimalInput = document.querySelector("#decimal-input");
const binaryInput = document.querySelector("#binary-input");
const binaryFeedback = document.querySelector("#binary-feedback");

function setDecimalValue(value) {
  decimalInput.value = String(value);
  binaryInput.value = value.toString(2).padStart(8, "0");
  binaryFeedback.textContent = `${value} im Zehnersystem entspricht ${binaryInput.value} im Binärsystem.`;
}

decimalInput.addEventListener("input", () => {
  const rawValue = decimalInput.value.trim();
  if (rawValue === "") {
    binaryInput.value = "";
    binaryFeedback.textContent = "Gib eine ganze Zahl zwischen 0 und 255 ein.";
    return;
  }

  const value = Number(rawValue);
  if (!Number.isInteger(value) || value < 0 || value > 255) {
    binaryInput.value = "";
    binaryFeedback.textContent = "Bitte gib eine ganze Zahl zwischen 0 und 255 ein.";
    return;
  }

  setDecimalValue(value);
});

binaryInput.addEventListener("input", () => {
  const rawValue = binaryInput.value.trim();
  if (rawValue === "") {
    decimalInput.value = "";
    binaryFeedback.textContent = "Gib eine Binärzahl mit 1 bis 8 Bits ein.";
    return;
  }

  if (!/^[01]{1,8}$/.test(rawValue)) {
    decimalInput.value = "";
    binaryFeedback.textContent = "Eine Binärzahl besteht aus 1 bis 8 Nullen und Einsen.";
    return;
  }

  const value = Number.parseInt(rawValue, 2);
  decimalInput.value = String(value);
  binaryFeedback.textContent = `${rawValue} im Binärsystem entspricht ${value} im Zehnersystem.`;
});

document.querySelector("#random-number").addEventListener("click", () => {
  setDecimalValue(Math.floor(Math.random() * 256));
});
