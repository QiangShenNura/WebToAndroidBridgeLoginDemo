const DEFAULT_VALUE = -1;

const loginForm = document.getElementById("loginForm");
const messageEl = document.getElementById("message");
const previewEl = document.getElementById("jsonPreview");

const fields = {
  username: document.getElementById("username"),
  password: document.getElementById("password"),
  userId: document.getElementById("userId"),
  age: document.getElementById("age"),
  heightInCm: document.getElementById("heightInCm"),
  weightInKg: document.getElementById("weightInKg"),
  gender: document.getElementById("gender"),
};

function parseInteger(value) {
  if (value === "") {
    return DEFAULT_VALUE;
  }

  const parsed = Number.parseInt(value, 10);
  return Number.isNaN(parsed) ? DEFAULT_VALUE : parsed;
}

function showMessage(text, type) {
  messageEl.textContent = text;
  messageEl.classList.remove("error", "success");

  if (type) {
    messageEl.classList.add(type);
  }
}

function buildBridgePayload() {
  return {
    userId: fields.userId.value.trim(),
    age: parseInteger(fields.age.value.trim()),
    heightInCm: parseInteger(fields.heightInCm.value.trim()),
    weightInKg: parseInteger(fields.weightInKg.value.trim()),
    gender: parseInteger(fields.gender.value.trim()),
  };
}

function sendToAndroidBridge(jsonString) {
  const bridge = window.AndroidBridge;

  showMessage("Login successful.", "success");

  if (bridge && typeof bridge.onJSLoginResult === "function") {
    bridge.onJSLoginResult(jsonString);
    return;
  }

  showMessage("Login successful. AndroidBridge is not available in this browser environment.", "success");
}

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const username = fields.username.value.trim();
  const password = fields.password.value.trim();

  if (!username || !password) {
    showMessage("Username and password are required.", "error");
    return;
  }

  const payload = buildBridgePayload();
  const jsonString = JSON.stringify(payload);

  previewEl.textContent = jsonString;
  sendToAndroidBridge(jsonString);
});
