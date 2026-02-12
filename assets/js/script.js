
// ---------------------- Helpers ----------------------
function $(id) {
  return document.getElementById(id);
}

function setError(errorId, msg) {
  $(errorId).textContent = msg;
}

function clearErrors() {
  const ids = ["errFullName", "errEmail", "errPhone", "errSubject", "errMessage"];
  ids.forEach(id => setError(id, ""));
  $("successBox").textContent = "";
}

function sanitizeText(text) {
  // Simple protection côté client (le serveur doit aussi valider)
  return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

// ---------------------- Validation ----------------------
function validateFullName(name) {
  if (name.trim().length < 3) return "Le nom doit contenir au moins 3 caractères.";
  return "";
}

function validateEmail(email) {
  const value = email.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(value)) return "Email invalide.";
  return "";
}

function validatePhone(phone) {
  const value = phone.trim();
  if (value === "") return ""; // optionnel
  const regex = /^[0-9]{10}$/;
  if (!regex.test(value)) return "Téléphone invalide (10 chiffres, ex: 4388753421).";
  return "";
}

function validateSubject(subject) {
  if (subject === "") return "Veuillez choisir un sujet.";
  return "";
}

function validateMessage(message) {
  const value = message.trim();
  if (value.length < 10) return "Le message doit contenir au moins 10 caractères.";
  if (value.length > 300) return "Le message ne doit pas dépasser 300 caractères.";
  return "";
}

// ---------------------- UI Logic ----------------------
function updateCharCount() {
  const len = $("message").value.length;
  $("charCount").textContent = String(len);
}

function resetForm() {
  $("contactForm").reset();
  $("previewBox").innerHTML = `<p class="muted">Aucun envoi pour le moment.</p>`;
  $("charCount").textContent = "0";
  clearErrors();
}

// ---------------------- Main ----------------------
document.addEventListener("DOMContentLoaded", () => {
  $("message").addEventListener("input", updateCharCount);

  $("btnReset").addEventListener("click", resetForm);

  $("contactForm").addEventListener("submit", (e) => {
    e.preventDefault();
    clearErrors();

    const fullName = $("fullName").value;
    const email = $("email").value;
    const phone = $("phone").value;
    const subject = $("subject").value;
    const message = $("message").value;

    const errName = validateFullName(fullName);
    const errEmail = validateEmail(email);
    const errPhone = validatePhone(phone);
    const errSubject = validateSubject(subject);
    const errMsg = validateMessage(message);

    let ok = true;

    if (errName) { setError("errFullName", errName); ok = false; }
    if (errEmail) { setError("errEmail", errEmail); ok = false; }
    if (errPhone) { setError("errPhone", errPhone); ok = false; }
    if (errSubject) { setError("errSubject", errSubject); ok = false; }
    if (errMsg) { setError("errMessage", errMsg); ok = false; }

    if (!ok) return;

    // Simulation d'envoi (portfolio)
    const safeName = sanitizeText(fullName);
    const safeEmail = sanitizeText(email);
    const safePhone = sanitizeText(phone);
    const safeMsg = sanitizeText(message);

    $("successBox").textContent = "✅ Formulaire validé. Données prêtes à être envoyées au serveur.";

    $("previewBox").innerHTML = `
      <p><strong>Nom :</strong> ${safeName}</p>
      <p><strong>Email :</strong> ${safeEmail}</p>
      <p><strong>Téléphone :</strong> ${safePhone ? safePhone : "(non fourni)"}</p>
      <p><strong>Sujet :</strong> ${subject}</p>
      <p><strong>Message :</strong><br>${safeMsg}</p>
    `;
  });
});
