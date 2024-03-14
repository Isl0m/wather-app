function toCelsius(temperature) {
  return Math.round(temperature - 273.15);
}

function setTextToElement(elementId, text) {
  const element = document.getElementById(elementId);
  element.innerText = text;
}
