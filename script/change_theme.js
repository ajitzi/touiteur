const btnTheme = document.querySelector("#btn-theme");
const logo = document.querySelector("header img");
const touit = document.querySelector(".touit button img");
const light = document.querySelector("#btn-theme img");
const touitComment = document.querySelector("#btn-comment img");
const btnClose = document.querySelector("#btn-close img");
const btnUp = document.querySelector("#btn-up img");

function changeTheme() {
    if (document.body.dataset.theme === "dark") {
        document.body.dataset.theme = ""
        logo.setAttribute("src", "img/logotouiteurV2.svg");
        touit.setAttribute("src", "img/touiteur_facesV2.svg");
        light.setAttribute("src", "img/light-light.svg");
        touitComment.setAttribute("src", "img/touiteur_facesV2.svg");
        btnClose.setAttribute("src", "img/arrow.svg");
        btnUp.setAttribute("src", "img/arrow.svg");
    } else {
        document.body.dataset.theme = "dark"
        logo.setAttribute("src", "img/logotouiteur-dark.svg");
        touit.setAttribute("src", "img/touiteur_faces-dark.svg");
        light.setAttribute("src", "img/light-dark.svg");
        touitComment.setAttribute("src", "img/touiteur_faces-dark.svg");
        btnClose.setAttribute("src", "img/arrow-dark.svg");
        btnUp.setAttribute("src", "img/arrow-dark.svg");
    }
}

btnTheme.addEventListener("click", changeTheme);