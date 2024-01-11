let sideLi = document.querySelectorAll(".sidebar ul li a");
let go = document.querySelector(".content img");
let posin = document.querySelector(".page .posIn");
let siLi = document.querySelectorAll(".content .wrapper > div");
let mug = document.querySelector("#about .mug");
let mon = document.querySelector(".mon");
let sm = document.querySelectorAll(".gi span");

sideLi.forEach((li) => {
    li.addEventListener("click", () => {
        sideLi.forEach((l) => {
            l.classList.remove("active");
        });
        li.classList.add("active");
    });
});
sideLi.forEach((l) => {
    if (!sideLi[1].classList.contains("active")) {
        l.addEventListener("mouseenter", function () {
            l.classList.add("active");
        });

        l.addEventListener("mouseleave", function () {
            l.classList.remove("active");
        });
    }
});
mon.addEventListener("click", () => {
    sideLi.forEach((li) => {
        li.classList.remove("active");
    });
});

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

window.addEventListener("scroll", () => {
    sideLi.forEach((l) => {
        l.is;
        l.classList.remove("active");
    });
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
    if (scrollTop >= siLi[0].offsetTop - 80) {
        siLi.forEach((e, i) => {
            sideLi.forEach((li) => {
                li.classList.remove("active");
            });
            if (e.offsetTop - 100 <= document.documentElement.scrollTop) {
                index = i;
            }
        });
        sideLi[index].classList.add("active");
    } else {
        sideLi.forEach((li) => {
            li.classList.remove("active");
        });
    }
    if (scrollHeight <= (scrollTop + clientHeight).toFixed()) {
        sideLi.forEach((li, i) => {
            index = i;
            li.classList.remove("active");
        });
        sideLi[index - 1].classList.add("active");
    }
    if (sideLi[sideLi.length - 2].classList.contains("active")) {
        mug.classList.add("mugetsu");
    } else {
        mug.classList.remove("mugetsu");
    }
});

sm.forEach((s) => {
    s.addEventListener("click", () => {
        let s1L = document.querySelectorAll(
            `#${s.parentElement.parentElement.parentElement.id} .gi .${s.textContent} li`
        );
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

const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");
window.onload = () => {
    if (!navigator.getBattery) {
        console.log("battery status api is not supported");
        return false;
    }
};

navigator.getBattery().then((battery) => {
    function update() {
        updateCharging();
        updateLeveling();
    }
    update();
    battery.addEventListener("chargingchange", () => {
        update();
    });
    battery.addEventListener("levelchange", () => {
        update();
    });

    function updateCharging() {
        if (battery.charging) {
            charge.classList.add("active-charging");
        } else {
            charge.classList.remove("active-charging");
        }
    }
    function updateLeveling() {
        let batteryLevel = `${parseInt(battery.level * 100)}%`;
        charge.style.width = batteryLevel;
        chargeLevel.textContent = batteryLevel;
        if (parseInt(battery.level * 100) >= 70) {
            document.documentElement.style.setProperty(
                "--charge-color",
                "#00FF00"
            );
        } else if (parseInt(battery.level * 100) >= 30) {
            document.documentElement.style.setProperty(
                "--charge-color",
                "#FFA500"
            );
        } else {
            document.documentElement.style.setProperty(
                "--charge-color",
                "#FF0000"
            );
        }
    }
});
