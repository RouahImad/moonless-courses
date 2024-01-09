let side = document.querySelector(".sidebar");
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

let sm = document.querySelectorAll(".gi span");
sm.forEach((s) => {
    s.addEventListener("click", () => {
        let s1L = document.querySelectorAll(`.gi .${s.textContent} li`);
        let i = s.firstElementChild;
        if (i.classList.contains("fa-arrow-up-wide-short")) {
            i.classList.replace(
                "fa-arrow-up-wide-short",
                "fa-arrow-down-short-wide"
            );
        } else {
            i.classList.replace(
                "fa-arrow-down-short-wide",
                "fa-arrow-up-wide-short"
            );
        }
        s1L.forEach((li) => {
            if (li.style.display === "block") {
                li.style.display = "none";
            } else {
                li.style.display = "block";
            }
        });
    });
});
