// PAS 1: Selectam elementele de care avem nevoie.
// Ex. 1 - surprise image
const surpriseButton = document.querySelector("#surprise-button");
const imagePlaceholder = document.querySelector(".image-placeholder");
// Ex. 2 - dropdown menu
const dropdownButton = document.querySelector(".dropdown-menu button");
const dropdownMenu = document.querySelector(".dropdown-menu ul");
// Ex. 3 - scroll to top button
const scrollToTopButton = document.querySelector(".scroll-to-top");
// Ex. 4 - form validation and submission
const form = document.querySelector("form");
const usernameInput = document.querySelector("#username");
const phoneInput = document.querySelector("#phone");
const usernameError = document.querySelector(".username-error-message");
const phoneError = document.querySelector(".phone-error-message");
const formResult = document.querySelector(".form-result");

// PAS 2: Adaugam event listeneri pentru elementele pe care dorim sa le urmarim.
surpriseButton.addEventListener("click", function () {
  // PAS 3: In momentul in care se declanseaza evenimentul, modificam html-ul cum avem nevoie.
  if (Math.random() > 0.5) {
    imagePlaceholder.innerHTML = `<img src="https://t.resfu.com/media/img_news/afp_fr_c200d01330cc9272a8af9188412e6c0f3fe6c393.jpg?size=1000x&ext=jpeg" alt="">`;
  } else {
    imagePlaceholder.innerHTML = `<img src="https://allthatsinteresting.com/wordpress/wp-content/uploads/2012/06/iconic-photos-1950-einstein.jpg" alt="">`;
  }
});

dropdownButton.addEventListener("click", function () {
  // Pentru a vedea ce proprietati de css are un element, ne folosim de getComputedStyle, dupa care extragem proprietatea dorita cu getPropertyValue
  const dropdownMenuStyle = getComputedStyle(dropdownMenu);
  const visibility = dropdownMenuStyle.getPropertyValue("visibility");

  if (visibility === "hidden") {
    // Pentru a seta o proprietate de CSS, lucrurile sunt mai simple, ne folosim de obiectul style.
    dropdownMenu.style.visibility = "visible";
  } else {
    dropdownMenu.style.visibility = "hidden";
  }
});

scrollToTopButton.addEventListener("click", function () {
  // Functia scrollTo este o functie predefinita.
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// Eventul de scroll se declanseaza de fiecare data cand scrollam.
document.addEventListener("scroll", function () {
  // Proprietatea scrollY reprezinta numarul de pizeli scrollati pe axa OY (cand nu am scrollat deloc este 0).
  if (window.scrollY > 100) {
    scrollToTopButton.style.visibility = "visible";
  } else {
    scrollToTopButton.style.visibility = "hidden";
  }
});

// Evenimentul "change" se produce atunci cand se modifica continutul inputului, doar dupa ce userul a parasit inputul (ex: da click in alta parte).
usernameInput.addEventListener("change", function (event) {
  // event.target este inputul de la care se declanseaza evenimentul. Ce a tastat userul se regaseste in atributul value, al inputului.
  const value = event.target.value;
  // Daca username-ul are sub 3 caractere, afisam mesajul de eroare, altfel stergem mesajul de eroare.
  if (value.length < 3) {
    usernameError.innerHTML =
      "Username-ul trebuie sa contina minim 3 caractere.";
  } else {
    usernameError.innerHTML = "";
  }
});
// Evenimentul "input" se produce la fiecare modificare din interiorul inputului.
phoneInput.addEventListener("input", function (event) {
  const value = event.target.value;
  // Daca valoarea introdusa in input nu este una numerica, afisam mesajul de eroare.
  if (isNaN(value)) {
    phoneError.innerHTML = "Va rugam sa introduceti doar caractere numerice.";
  } else {
    phoneError.innerHTML = "";
  }
});
// Evenimentul "submit" se declanseaza cand dam click pe butonul de submit. Target-ul sau este formularul.
form.addEventListener("submit", function (event) {
  // Comportamentul default al eventului de submit este sa dea refresh la pagina. Nu vrem asta, asa ca prevenim acest comportament.
  event.preventDefault();
  const usernameValue = usernameInput.value;
  const phoneValue = phoneInput.value;

  // Pro tip: daca conditiile din if sunt mai complicate, le putem salva intr-o variabila.
  const usernameIsValid = usernameValue.length >= 3;
  const phoneIsValid = !isNaN(phoneValue);
  // Daca formularul este completat fara erori, afisam datele adaugate, altfel afisam un mesaj de eroare.
  if (usernameIsValid && phoneIsValid) {
    formResult.innerHTML = `
      <p>Ati introdus username-ul ${usernameValue} cu telefonul ${phoneValue}.</p>
    `;
  } else {
    formResult.innerHTML = "<p>Formularul contine erori de completare.</p>";
  }
});
