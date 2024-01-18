let abb = document.querySelectorAll("body > input");
abb.forEach((e) => {
    if (e.checked) {
        console.log(e.id);
    }
});
const elements = {
    search: document.querySelector(".intro .search .box input"),
    options: document.querySelectorAll(".intro .search .options input"),
    searchIcon: document.querySelector(".intro .search .box i"),
    sideLi: document.querySelectorAll(".sidebar ul li a"),
    go: document.querySelector(".content .go img"),
    posin: document.querySelector(".page .posIn"),
    siLi: document.querySelectorAll(".content .wrapper > div"),
    mug: document.querySelector("#about .mug"),
    mon: document.querySelector(".mon"),
    sm: document.querySelectorAll(".gi span"),
    reg: /^[-=!@$%^&*().,/0-9]+$/,
    notification: document.querySelector(".notification"),
    not: document.querySelector(".notification-div"),
    notiHolder: document.querySelector(".notification-content"),
    closeNoti: document.querySelector(".close"),
    darklight: document.querySelector(".header .theme"),
    time: document.querySelector(".content .header .time"),
};
elements.notiHolder.innerHTML = "<span>You Have No New Notification</span>";

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
    elements.closeNoti.click();
    elements.sideLi.forEach((l) => l.classList.remove("active"));
    const { scrollHeight, scrollTop, clientHeight } = document.documentElement;
    const scrolled = (scrollTop / (scrollHeight - clientHeight)) * 100;
    elements.posin.style.width = `${scrolled}%`;

    if (window.scrollY < 350) {
        elements.go.style.opacity = 0;
        elements.go.style.display = "none";
    } else {
        elements.go.style.opacity = 1;
        elements.go.style.display = "block";
    }

    let index;
    if (scrollTop >= elements.siLi[0].offsetTop - 80) {
        elements.siLi.forEach((e, i) => {
            if (e.offsetTop - 230 <= scrollTop) {
                index = i;
            }
        });
        elements.sideLi[index].classList.add("active");
    }
    if (scrollHeight <= (scrollTop + clientHeight + 60).toFixed()) {
        elements.sideLi.forEach((e) => {
            e.classList.remove("active");
        });
        elements.sideLi[elements.sideLi.length - 2].classList.add("active");
    }

    elements.mug.classList.toggle(
        "mugetsu",
        elements.sideLi[elements.sideLi.length - 2].classList.contains("active")
    );
});

elements.sm.forEach((s) => {
    s.addEventListener("click", () => {
        const i = s.firstElementChild;
        i.classList.toggle("fa-arrow-up-wide-short");
        i.classList.toggle("fa-arrow-down-short-wide");
        s.parentElement.classList.toggle("ac");
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

            if (parseInt(battery.level * 100) >= 60) {
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
    elements.search.style.width = `${(
        (window.innerWidth * 50) /
        (window.innerWidth + window.innerHeight * 0.7)
    ).toFixed()}em`;
    window.scrollTo(0, 0);
};
checkSize();
function checkSize() {
    elements.search.style.width = `${(
        (window.innerWidth * 50) /
        (window.innerWidth + window.innerHeight * 0.7)
    ).toFixed()}em`;
}
window.addEventListener("resize", checkSize);

elements.search.addEventListener("keydown", (e) => {
    elements.closeNoti.click();
    if (
        (e.key === "Enter" && elements.search.value.length >= 3) ||
        (e.key === "Enter" && elements.search.value.includes("#"))
    ) {
        elements.search.blur();
        handleSearch();
    }
    if (elements.reg.test(e.key)) {
        e.preventDefault();
    }
});

elements.searchIcon.onclick = handleSearch;

function handleSearch() {
    if (
        (elements.search.value !== "" && elements.search.value.length >= 3) ||
        elements.search.value.includes("#")
    ) {
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

    let searchId = [];
    elements.options.forEach((op) => {
        if (op.checked) {
            searchId.push(op.id);
        }
    });
    const ulNoti = document.createElement("ul");
    searchId.forEach((srid) => {
        let bodySearch = document.querySelectorAll(`body #${srid}s .mod`);
        bodySearch.forEach((e) => {
            if (
                e.innerText
                    .split("\n")
                    .splice(0, 1)
                    .join("")
                    .normalize("NFD")
                    .replace(/[\u0300-\u036f]/g, "")
                    .toLowerCase() === v
            ) {
                if (!e.parentElement.classList.contains("ac")) {
                    e.parentElement.firstElementChild.click();
                }
                elements.notiHolder.innerHTML =
                    "<span>You Have No New Notification</span>";
                e.classList.add("found");
                e.scrollIntoView();
                elements.notification.classList.remove("clicked");
            } else if (e.getAttribute("data-search").includes(v)) {
                valar.push(e);
                elements.notiHolder.innerHTML = "";
                elements.not.classList.add("active");
                elements.notiHolder.append(ulNoti);
                elements.notiHolder.firstElementChild.innerHTML += `<li class="Noti${srid}">${e.innerText
                    .split("\n")
                    .splice(0, 1)} (${srid})</li>`;
                notiSliding(valar, bodySearch);
                elements.notification.classList.add("clicked");
            }
        });
    });
}

function notiSliding(arr, where) {
    const ntLi = document.querySelectorAll(".notification-div ul li");
    ntLi.forEach((el, i) => {
        el.addEventListener("click", () => {
            where.forEach((e) => {
                e.classList.remove("found");
            });
            arr[i].classList.add("found");
            elements.closeNoti.click();
            if (!arr[i].parentElement.classList.contains("ac")) {
                arr[i].parentElement.firstElementChild.click();
            }
            arr[i].scrollIntoView();
        });
    });
}
elements.notification.addEventListener("click", () => {
    elements.not.classList.add("active");
});

elements.closeNoti.addEventListener("click", () => {
    elements.not.classList.remove("active");
});

elements.darklight.addEventListener("click", () => {
    let themeVal;
    localStorage.removeItem("theme");
    document.body.classList.toggle("dark");
    if (document.body.classList.contains("dark")) {
        elements.darklight.lastElementChild.textContent = "dark";
        themeVal = "dark";
    } else {
        elements.darklight.lastElementChild.textContent = "light";
        themeVal = "light";
    }
    localStorage.setItem("theme", themeVal);
});

if (localStorage.getItem("theme")) {
    if (
        !document.body.classList.contains("dark") &&
        localStorage.theme == "dark"
    ) {
        elements.darklight.click();
    }
}

setInterval(timeing(), 1000);

function timeing() {
    let date = new Date();
    let hours = date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
    let minutes =
        date.getMinutes() / 10 < 1
            ? "0" + date.getMinutes()
            : date.getMinutes();
    elements.time.textContent = `${
        hours / 10 < 1 ? "0" + hours : hours
    }:${minutes} ${hours > 12 ? "PM" : "AM"}`;
}
