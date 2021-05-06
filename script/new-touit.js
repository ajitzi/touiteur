const touitZone = document.querySelector(".touit-list");
const pseudoInput = document.querySelector("#pseudo");
const touitInput = document.querySelector("#message");
const formulaire = document.querySelector(".touit-form");

const width = window.matchMedia('(min-width: 768px)');
const btnPrev = document.querySelector("#btn-close");
const actualTouit = document.querySelector(".actual-touit");

const formComment = document.querySelector(".comments-container form");
const pseudoComInput = document.querySelector("#pseudo-comment");
const messageComInput = document.querySelector("#message-comment");

const commentsList = document.querySelector(".comments-list");
const mainContainer = document.querySelector(".main-grid");
const btnUpCenter = document.querySelector("#btn-up");

const topLikes = document.querySelector(".top-likes");


//  POSTER UN TOUIT ----------------------

const requestNewTouit = new XMLHttpRequest;
requestNewTouit.open("POST", "http://touiteur.cefim-formation.org/send");
requestNewTouit.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

formulaire.addEventListener("submit", function(ev) {
    ev.preventDefault();
    let body = "name=" + pseudoInput.value + "&message=" + touitInput.value;
    requestNewTouit.send(body);
    pseudoInput.value = "";
    touitInput.value = "";
});


// AFFICHAGE DES TOUITS 

const request = new XMLHttpRequest();
request.open('GET', "http://touiteur.cefim-formation.org/list", true);

const touitContainer = document.querySelector(".touit-list");

let responseComments;

request.addEventListener("readystatechange", function() {
    if (request.readyState === XMLHttpRequest.DONE) {
        if (request.status === 200) {
            const response = JSON.parse(request.responseText);
            response.messages.sort(function(a, b) {
                return a - b;
            });
            for (i = 0; i < response.messages.length; i++) {
                const id = response.messages[i].id;
                const pseudo = response.messages[i].name;
                const message = response.messages[i].message;
                const timeStamp = response.messages[i].ts;
                const likes = response.messages[i].likes;
                const comments = response.messages[i].comments_count;

                const milliseconds = timeStamp * 1000;
                const dateObject = new Date(milliseconds);
                const date = dateObject.toLocaleString();

                displayTouit(id, pseudo, message, date, likes, comments, touitZone);
            }
        } else {
            console.error("Touits non chargés");
        }
    }
});
request.send();

function displayTouit(id, pseudo, message, date, nbLike, nbComment, displayZone, top) {

    const tuileTouit = document.createElement("article");
    tuileTouit.className = "tuile-touit tuile top-" + top;
    tuileTouit.dataset.id = id;

    const tuileHeader = document.createElement("div");
    tuileHeader.className = "tuile-header";

    const pseudoTouit = document.createElement("h3");
    pseudoTouit.textContent = pseudo;

    const borderWrap = document.createElement("div");
    borderWrap.className = "border-wrap";

    const tuileMain = document.createElement("div");
    tuileMain.className = "tuile-main";

    const messageTouit = document.createElement("p");
    messageTouit.textContent = message;

    const tuileFooter = document.createElement("div");
    tuileFooter.className = "tuile-footer";

    const dateTouit = document.createElement("p");
    dateTouit.textContent = date;

    const iconsTouit = document.createElement("div");
    iconsTouit.className = "icons";

    const btnLike = document.createElement("button");
    btnLike.className = "btn-like btn-card"
        // AJOUTER UN LIKE
    btnLike.addEventListener("click", function() {
        const requestLike = new XMLHttpRequest();
        requestLike.open("PUT", "http://touiteur.cefim-formation.org/likes/send", true);
        requestLike.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

        requestLike.addEventListener("readystatechange", function() {
            if (requestLike.readyState === XMLHttpRequest.DONE) {
                if (requestLike.status === 200) {
                    const response = JSON.parse(requestLike.responseText);
                    console.log(response);
                }
            }
        })
        const body = "message_id=" + id;
        requestLike.send(body);
    });

    const totalLike = document.createElement("span");
    totalLike.textContent = nbLike;

    const iconLike = document.createElement("img");
    iconLike.setAttribute("src", "img/like.svg");

    const btnComment = document.createElement("button");
    btnComment.className = "btn-comment btn-card";
    // OUVRIR LES COMMENTAIRES D'UN TOUIT
    btnComment.addEventListener("click", function() {
        document.querySelector(".comments").style.display = "block";
        btnPrev.style.display = "block";
        mainContainer.style.display = "none";
        window.scroll(0, 0);
        btnUpCenter.classList.toggle("go-to-center");

        const copytuileTouit = tuileTouit.cloneNode(true);
        actualTouit.appendChild(copytuileTouit);

        // AFFICHER LES COMMENTAIRES
        const requestComments = new XMLHttpRequest();
        requestComments.open("GET", "http://touiteur.cefim-formation.org/comments/list?message_id=" + id, true);


        requestComments.addEventListener("readystatechange", function() {
            if (requestComments.readyState === XMLHttpRequest.DONE) {
                if (requestComments.status === 200) {
                    responseComments = JSON.parse(requestComments.responseText);
                    console.log(responseComments);
                    for (i = 0; i < responseComments.comments.length; i++) {
                        const pseudo = responseComments.comments[i].name;
                        const comment = responseComments.comments[i].comment;
                        const timeStamp = responseComments.comments[i].ts;

                        const milliseconds = timeStamp * 1000;
                        const dateObject = new Date(milliseconds);
                        const date = dateObject.toLocaleString();

                        displayComment(pseudo, comment, date);
                    }
                } else {
                    console.error("Commentaires non chargés");
                }
            }
        });

        requestComments.send();
    });

    const totalComment = document.createElement("span");
    totalComment.textContent = nbComment;

    const iconComment = document.createElement("img");
    iconComment.setAttribute("src", "img/comment.svg");

    btnComment.appendChild(totalComment);
    btnComment.appendChild(iconComment);

    btnLike.appendChild(totalLike);
    btnLike.appendChild(iconLike);

    iconsTouit.appendChild(btnLike);
    iconsTouit.appendChild(btnComment);

    tuileFooter.appendChild(dateTouit);
    tuileFooter.appendChild(iconsTouit);

    tuileMain.appendChild(messageTouit);

    tuileHeader.appendChild(pseudoTouit);

    if (!isNaN(top)) {
        borderWrap.appendChild(tuileMain);
        borderWrap.appendChild(tuileFooter);

        tuileTouit.appendChild(tuileHeader);
        tuileTouit.appendChild(borderWrap);
    } else {
        tuileTouit.appendChild(tuileHeader);
        tuileTouit.appendChild(tuileMain);
        tuileTouit.appendChild(tuileFooter);
    }
    displayZone.appendChild(tuileTouit);
}


// AFFICHAGE DES COMMENTAIRES

function displayComment(pseudo, comment, date) {
    const tuileComment = document.createElement("article");

    const commentPseudo = document.createElement("h2");
    commentPseudo.textContent = pseudo;

    const commentText = document.createElement("p");
    commentText.textContent = comment;

    const commentFooter = document.createElement("p");
    commentFooter.textContent = date;

    tuileComment.appendChild(commentPseudo);
    tuileComment.appendChild(commentText);
    tuileComment.appendChild(commentFooter);

    commentsList.appendChild(tuileComment);
}


// POSTER UN COMMENTAIRE

const requestNewComment = new XMLHttpRequest;
requestNewComment.open("POST", "http://touiteur.cefim-formation.org/comments/send");
requestNewComment.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

formComment.addEventListener("submit", function(ev) {
    ev.preventDefault();
    const id = document.querySelector(".actual-touit .tuile-touit").dataset.id;
    let body = "message_id=" + id + "&name=" + pseudoComInput.value + "&comment=" + messageComInput.value;
    requestNewComment.send(body);
    pseudoComInput.value = "";
    messageComInput.value = "";
});


// EVENTS COMMENTAIRES --------------

btnPrev.addEventListener("click", function() {
    document.querySelector(".comments").style.display = "none";
    btnPrev.style.display = "none";
    actualTouit.innerHTML = "";
    commentsList.innerHTML = "";
    //Afin d'effacer le plus efficacement le touit et ses commentaires. Pas dans un formulaire.
    if (width.matches) {
        mainContainer.style.display = "grid";
    } else {
        mainContainer.style.display = "block";
    }
    btnUpCenter.classList.toggle("go-to-center");
});


btnUpCenter.addEventListener("click", function() {
    window.scroll(0, 0);
});


// TOP TOUITS

const requestTop = new XMLHttpRequest();
requestTop.open('GET', "http://touiteur.cefim-formation.org/likes/top?count=3", true);
requestTop.addEventListener("readystatechange", function() {
    if (requestTop.readyState === XMLHttpRequest.DONE) {
        if (requestTop.status === 200) {
            const response = JSON.parse(requestTop.responseText);
            // console.log(response);
            let topNumber = 1;
            for (i = 0; i < response.top.length; i++) {
                const id = response.top[i].id;
                const pseudo = response.top[i].name;
                const message = response.top[i].message;
                const timeStamp = response.top[i].ts;
                const likes = response.top[i].likes;
                const comments = response.top[i].comments_count;

                const milliseconds = timeStamp * 1000;
                const dateObject = new Date(milliseconds);
                const date = dateObject.toLocaleString();

                displayTouit(id, pseudo, message, date, likes, comments, topLikes, topNumber);
                topNumber++;
            }
        }
    }
})
requestTop.send();


// AFFICHAGE TRENDING
let compareArray;
const requestTrend = new XMLHttpRequest();
requestTrend.open('GET', "http://touiteur.cefim-formation.org/trending", true);
requestTrend.addEventListener("readystatechange", function() {
    if (requestTrend.readyState === XMLHttpRequest.DONE) {
        if (requestTrend.status === 200) {
            const response = JSON.parse(requestTrend.responseText);
            let responseKeys = Object.keys(response);
            let responseValue = Object.values(response);
            compareArray = [];
            for (i = 0; i < responseKeys.length; i++) {
                compareArray[i] = [responseValue[i], responseKeys[i]];
            }
            compareArray.sort(function(a, b) {
                return b[0] - a[0];
            });
            for (let i = 0; i < 30; i++) {
                document.querySelector(".trend .tuile-main p").textContent += "#" + compareArray[i][1] + " ";
            }
        }
    }
})
requestTrend.send();