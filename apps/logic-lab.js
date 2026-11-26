const gateSelect = document.querySelector("#gate-select");
const gateFormula = document.querySelector("#gate-formula");
const logicOutput = document.querySelector("#logic-output");
const logicExplanation = document.querySelector("#logic-explanation");
const bits = { a: false, b: false };
const gateDescriptions = {
  AND: { formula: "A UND B", explanation: "UND gibt nur dann 1 aus, wenn beide Eingänge 1 sind." },
  OR: { formula: "A ODER B", explanation: "ODER gibt 1 aus, wenn mindestens ein Eingang 1 ist." },
  XOR: { formula: "A XOR B", explanation: "XOR gibt 1 aus, wenn die Eingänge verschieden sind." }
};

function updateLogic() {
  const gate = gateSelect.value;
  const description = gateDescriptions[gate];
  let output = false;
  if (gate === "AND") output = bits.a && bits.b;
  if (gate === "OR") output = bits.a || bits.b;
  if (gate === "XOR") output = bits.a !== bits.b;

  gateFormula.textContent = description.formula;
  logicOutput.textContent = output ? "1" : "0";
  logicExplanation.replaceChildren();
  logicExplanation.append(description.formula);
  const detail = document.createElement("span");
  detail.textContent = description.explanation;
  logicExplanation.append(detail);
}

document.querySelectorAll(".bit-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const bit = button.dataset.bit;
    bits[bit] = !bits[bit];
    button.setAttribute("aria-checked", String(bits[bit]));
    button.textContent = bits[bit] ? "1" : "0";
    updateLogic();
  });
});

gateSelect.addEventListener("change", updateLogic);
updateLogic();
