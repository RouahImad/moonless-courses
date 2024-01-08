// let pdfContainer = document.getElementById("pdfContainer");
// let iframe = document.querySelector("#pdfContainer + iframe");
// let side = document.querySelector(".sidebar");
// pdfContainer.addEventListener("click", function (e) {
//     if (e.target && e.target.getAttribute("data")) {
//         loadPDF(e.target.getAttribute("data"));
//     }
// });
// function loadPDF(e) {
//     var pdfPath = `${e}.pdf`;
//     iframe.src = pdfPath;
//     iframe.style.width = "100%";
//     iframe.style.height = "95vh";
//     iframe.style.border = "none";
// }

let sideLi = document.querySelectorAll(".sidebar ul li a");

sideLi.forEach((li) => {
    li.addEventListener("click", () => {
        sideLi.forEach((l) => {
            l.classList.remove("active");
        });
        li.classList.add("active");
    });
});
let mon = document.querySelector(".mon");
mon.addEventListener("click", () => {
    sideLi.forEach((li) => {
        li.classList.remove("active");
    });
});

let go = document.querySelector(".content img");

go.addEventListener("click", (e) => {
    window.scrollTo(0, 0);

    go.style.setProperty("bottom", "65vh");

    setTimeout(function () {
        go.style.setProperty("bottom", "40px");
    }, 1000);
});

window.addEventListener("scroll", (e) => {
    if (window.scrollY < 350) {
        go.style.opacity = 0;
        go.classList.remove("clicked");
    } else {
        go.style.opacity = 1;
    }
});
