const btnTheme = document.querySelector("#btn-theme");
const logo = document.querySelector("header img");
const touit = document.querySelector(".touit button img");

function changeTheme() {
    if (document.body.dataset.theme === "dark") {
        document.body.dataset.theme = ""
        logo.setAttribute("src", "../img/logotouiteurV2.svg");
        touit.setAttribute("src", "../img/touiteur_facesV2.svg");
    } else {
        document.body.dataset.theme = "dark"
        logo.setAttribute("src", "../img/logotouiteur-dark.svg");
        touit.setAttribute("src", "../img/touiteur_faces-dark.svg");
    }
}

btnTheme.addEventListener("click", changeTheme);