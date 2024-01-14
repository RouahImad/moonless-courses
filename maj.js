const elements = {
    search: document.querySelector(".intro .search .box input"),
    options: document.querySelectorAll(".intro .search .options input"),
    searchIcon: document.querySelector(".intro .search .box i"),
    sideLi: document.querySelectorAll(".sidebar ul li a"),
    go: document.querySelector(".content img"),
    posin: document.querySelector(".page .posIn"),
    siLi: document.querySelectorAll(".content .wrapper > div"),
    mug: document.querySelector("#about .mug"),
    mon: document.querySelector(".mon"),
    sm: document.querySelectorAll(".gi span"),
    reg: /^[-=!@#$%^&*().,/0-9]+$/,
    notification: document.querySelector(".notification"),
    not: document.querySelector(".notification-div"),
    notiHolder: document.querySelector(".notification-content"),
    closeNoti: document.querySelector(".close"),
    darklight: document.querySelector(".header .theme"),
};

const spanNoti = document.createElement("span");
spanNoti.innerText = "You Have No New Notification";
elements.notiHolder.append(spanNoti);

elements.sideLi.forEach((li) => {
    li.addEventListener("click", () => {
        elements.sideLi.forEach((l) => l.classList.remove("active"));
        li.classList.add("active");
    });

    if (!elements.sideLi[1].classList.contains("active")) {
        li.addEventListener("mouseenter", () => li.classList.add("active"));
        li.addEventListener("mouseleave", () => li.classList.remove("active"));
    }
});

elements.mon.addEventListener("click", () => {
    elements.sideLi.forEach((li) => li.classList.remove("active"));
});

elements.go.addEventListener("click", () => {
    window.scrollTo(0, 0);
    elements.go.style.setProperty("bottom", "65vh");
    elements.sideLi.forEach((li) => li.classList.remove("active"));
    setTimeout(() => elements.go.style.setProperty("bottom", "40px"), 1000);
});

window.addEventListener("scroll", () => {
    elements.sideLi.forEach((l) => l.classList.remove("active"));
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    elements.posin.style.width = `${scrolled}%`;

    if (window.scrollY < 350) {
        elements.go.style.opacity = 0;
        elements.go.classList.remove("clicked");
    } else {
        elements.go.style.opacity = 1;
    }

    let index;
    if (scrollTop >= elements.siLi[0].offsetTop - 80) {
        elements.siLi.forEach((e, i) => {
            if (e.offsetTop - 100 <= scrollTop) {
                index = i;
            }
        });
        elements.sideLi[index].classList.add("active");
    } else if (scrollHeight <= (scrollTop + clientHeight).toFixed()) {
        index = elements.sideLi.length - 1;
        elements.sideLi[index - 1].classList.add("active");
    }

    elements.mug.classList.toggle(
        "mugetsu",
        elements.sideLi[elements.sideLi.length - 2].classList.contains("active")
    );
});

elements.sm.forEach((s) => {
    s.addEventListener("click", () => {
        const s1L = document.querySelectorAll(
            `#${s.parentElement.parentElement.parentElement.id} .gi .${s.textContent} li`
        );
        const i = s.firstElementChild;
        i.classList.toggle("fa-arrow-up-wide-short");
        i.classList.toggle("fa-arrow-down-short-wide");
        s1L.forEach((li) => li.classList.toggle("ac"));
    });
});
const chargeLevel = document.getElementById("charge-level");
const charge = document.getElementById("charge");

window.onload = () => {
    if (!navigator.getBattery) {
        console.log("Battery status API is not supported");
        return false;
    }

    navigator.getBattery().then((battery) => {
        function update() {
            updateCharging();
            updateLeveling();
        }

        update();

        battery.addEventListener("chargingchange", update);
        battery.addEventListener("levelchange", update);

        function updateCharging() {
            charge.classList.toggle("active-charging", battery.charging);
        }

        function updateLeveling() {
            const batteryLevel = `${parseInt(battery.level * 100)}%`;
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
};

elements.search.onfocus = () => {
    elements.search.style.width = "17rem";
};

elements.search.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && elements.search.value.length >= 3) {
        handleSearch();
    }
    if (elements.reg.test(e.key)) {
        e.preventDefault();
    }
});

elements.searchIcon.onclick = handleSearch;

function handleSearch() {
    if (elements.search.value !== "" && elements.search.value.length >= 3) {
        validate(
            elements.search.value
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .toLowerCase()
        );
    }
}

function validate(v) {
    const valar = [];
    document.querySelectorAll(`body *`).forEach((e) => {
        e.classList.remove("found");
    });

    let searchId;
    elements.options.forEach((op) => {
        if (op.checked) {
            searchId = op.id;
        }
    });

    const ulNoti = document.createElement("ul");

    document.querySelectorAll(`body #${searchId} *`).forEach((e) => {
        if (e.hasAttribute("data-search")) {
            if (
                e.innerText.split("\n").splice(0, 1).join("").toLowerCase() ===
                v
            ) {
                if (!e.classList.contains("ac")) {
                    e.parentElement.firstElementChild.click();
                }

                elements.notiHolder.childNodes.forEach((el) => {
                    el.remove();
                });

                e.scrollIntoView({ behavior: "smooth", block: "start" });

                spanNoti = document.createElement("span");
                spanNoti.innerText = "You Have No New Notification";
                elements.notiHolder.append(spanNoti);

                e.classList.add("found");
            } else if (e.getAttribute("data-search").includes(v)) {
                valar.push(e);

                elements.notiHolder.childNodes.forEach((el) => {
                    el.remove();
                });

                elements.not.classList.add("active");
                const liNoti = document.createElement("li");
                liNoti.textContent = e.innerText.split("\n").splice(0, 1);
                ulNoti.append(liNoti);
                elements.notiHolder.append(ulNoti);

                notiSliding(valar);
            }
        }
    });
}

function notiSliding(arr) {
    const ntLi = document.querySelectorAll(".notification-div ul li");

    ntLi.forEach((el, i) => {
        el.addEventListener("click", () => {
            document.querySelectorAll(`body *`).forEach((e) => {
                e.classList.remove("found");
            });

            arr[i].classList.add("found");
            elements.closeNoti.click();

            if (!arr[i].classList.contains("ac")) {
                arr[i].parentElement.firstElementChild.click();
            }

            arr[i].scrollIntoView({ behavior: "smooth", block: "start" });
        });
    });
}

elements.notification.addEventListener("click", () => {
    click = true;
    elements.not.classList.add("active");

    if (click) {
        elements.notification.classList.add("clicked");
    } else {
        elements.notification.classList.remove("clicked");
    }
});

elements.closeNoti.addEventListener("click", () => {
    elements.not.classList.remove("active");
});

elements.darklight.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        elements.darklight.lastElementChild.textContent = "dark";
    } else {
        elements.darklight.lastElementChild.textContent = "light";
    }
});

// End of your code...
