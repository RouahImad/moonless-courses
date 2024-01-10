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
    sideLi.forEach((li) => {
        li.classList.remove("active");
    });
    setTimeout(function () {
        go.style.setProperty("bottom", "40px");
    }, 1000);
});
let posin = document.querySelector(".content .posIn");
let siLi = document.querySelectorAll(".content .wrapper > div");

window.addEventListener("scroll", (e) => {
    let { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    posin.style.width = `${scrolled}%`;

    if (window.scrollY < 350) {
        go.style.opacity = 0;
        go.classList.remove("clicked");
    } else {
        go.style.opacity = 1;
    }
    let index;
    if (scrollTop >= siLi[0].offsetTop - 40) {
        siLi.forEach((e, i) => {
            sideLi.forEach((li) => {
                li.classList.remove("active");
            });
            if (e.offsetTop - 50 <= document.documentElement.scrollTop) {
                index = i;
            }
        });
        sideLi[index].classList.add("active");
    } else {
        sideLi.forEach((li) => {
            li.classList.remove("active");
        });
    }

    if (scrollHeight - scrollTop - 10 <= clientHeight) {
        sideLi.forEach((li, i) => {
            index = i;
            li.classList.remove("active");
        });
        sideLi[index].classList.add("active");
    }

    sideLi.forEach((li) => {
        li.addEventListener("click", () => {
            sideLi.forEach((l) => {
                l.classList.remove("active");
            });
            li.classList.add("active");
        });
    });
});

let sm = document.querySelectorAll(".gi span");
sm.forEach((s) => {
    s.addEventListener("click", () => {
        let s1L = document.querySelectorAll(`.gi .${s.textContent} li`);
        let i = s.firstElementChild;
        i.classList.toggle("fa-arrow-up-wide-short");
        i.classList.toggle("fa-arrow-down-short-wide");
        s1L.forEach((li) => {
            li.classList.toggle("ac");
        });
    });
});

// document.querySelectorAll("body *").forEach((e) => {
//     if (e.classList.contains("s1")) {
//     }
// });
