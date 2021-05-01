const width = window.matchMedia('(min-width: 768px)');
const btnPrev = document.querySelector("#btn-close");
const commentPage = document.querySelector(".comments");
const btnOpenComment = document.querySelectorAll(".btn-comment");
const mainContainer = document.querySelector(".main-grid");
const btnUpCenter = document.querySelector("#btn-up");

function closeComment() {
    document.querySelector(".comments").style.display = "none";
    btnPrev.style.display = "none";
    if (width.matches) {
        mainContainer.style.display = "grid";
    } else {
        mainContainer.style.display = "block";
    }
    btnUpCenter.classList.toggle("go-to-center");
}

btnPrev.addEventListener("click", closeComment);

function openComment() {
    document.querySelector(".comments").style.display = "block";
    btnPrev.style.display = "block";
    mainContainer.style.display = "none";
    window.scroll(0, 0);
    btnUpCenter.classList.toggle("go-to-center");
}

btnOpenComment.forEach(element => element.addEventListener("click", openComment));

function goToUp() {
    window.scroll(0, 0);
}

btnUpCenter.addEventListener("click", goToUp);