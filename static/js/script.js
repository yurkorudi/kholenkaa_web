const burger = document.getElementById("burger");
const navbar = document.getElementById("navbar");

burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    navbar.classList.toggle("active");
});