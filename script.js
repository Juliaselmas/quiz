let darkModeBtn = document.querySelector("#darkMode");

darkModeBtn.addEventListener("change", () => {
    document.body.classList.toggle("dark", darkModeBtn.checked);
});
