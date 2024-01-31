const elements = {
    search: document.querySelector(".intro .search .box input"),
    options: document.querySelectorAll(".intro .search .options input"),
    searchIcon: document.querySelector(".intro .search .box i"),
    sideLi: document.querySelectorAll(".sidebar ul li:has(> a) a"),
    go: document.querySelector(".content .go img"),
    posin: document.querySelector(".page .posIn"),
    siLi: document.querySelectorAll(".content .wrapper > div"),
    mug: document.querySelector("#about .mug"),
    mon: document.querySelector(".mon"),
    sm: document.querySelectorAll(".gi ul > li span"),
    reg: /^[-=!@$%^&*().,/0-9]+$/,
    notification: document.querySelector(".notification"),
    not: document.querySelector(".notification-div"),
    notiHolder: document.querySelector(".notification-content"),
    closeNoti: document.querySelector(".close"),
    darklight: document.querySelector(".header .theme"),
    time: document.querySelector(".content .header .time"),
    elRev: document.querySelectorAll(".page .content h3"),
    intdv: document.querySelector(".intro > div"),
    load: document.querySelector(".boxload"),
};
window.addEventListener("load", () => {
    if (matchMedia("(prefers-color-scheme: dark)").matches) {
        elements.darklight.lastElementChild.textContent = "dark";
        localStorage.setItem("theme", "dark");
    }
    elements.load.classList.add("fade");
});
document.addEventListener("DOMContentLoaded", function () {
    elements.elRev.forEach((h) => {
        h.classList.add("hide");
    });
    function checkVisibility() {
        elements.elRev.forEach((h) => {
            if (isElementVisible(h)) {
                h.classList.replace("hide", "show");
            }
        });
        if (isElementVisible(elements.intdv)) {
            elements.intdv.classList.replace("hide", "show");
        }
    }
    function isElementVisible(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= window.innerHeight &&
            rect.right <= window.innerWidth
        );
    }
    setTimeout(function () {
        checkVisibility();
    }, 450);
    elements.notiHolder.innerHTML = "<span>You Have No New Notification</span>";
    elements.sideLi.forEach((li) => {
        li.addEventListener("click", () => {
            elements.sideLi.forEach((l) => l.classList.remove("active"));
            li.classList.add("active");
        });
        if (!elements.sideLi[1].classList.contains("active")) {
            li.addEventListener("mouseenter", () => li.classList.add("active"));
            li.addEventListener("mouseleave", () =>
                li.classList.remove("active")
            );
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
    elements.options.forEach((op) => {
        op.onclick = () => {
            elements.closeNoti.click();
        };
    });
    function posing() {
        let scrolled =
            (document.documentElement.scrollTop /
                (document.documentElement.scrollHeight -
                    document.documentElement.clientHeight)) *
            100;
        elements.posin.style.width = `${scrolled}%`;
    }
    window.addEventListener("scroll", () => {
        posing();
        const { scrollHeight, scrollTop, clientHeight } =
            document.documentElement;
        if (window.scrollY >= 150) {
            elements.closeNoti.click();
        }
        checkVisibility();
        elements.sideLi.forEach((l) => l.classList.remove("active"));
        if (window.scrollY < 350) {
            elements.go.style.opacity = 0;
            elements.go.style.display = "none";
        } else {
            elements.closeNoti.click();
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
            elements.sideLi[elements.sideLi.length - 2].classList.contains(
                "active"
            )
        );
    });
    elements.sm.forEach((s) => {
        s.addEventListener("click", () => {
            const i = s.firstElementChild;
            i.classList.toggle("fa-arrow-up-wide-short");
            i.classList.toggle("fa-arrow-down-short-wide");
            s.parentElement.parentElement.classList.toggle("ac");
            ch = true;
            posing();
        });
    });
    const chargeLevel = document.getElementById("charge-level");
    const charge = document.getElementById("charge");
    window.onload = () => {
        posing();
        if (window.scrollY < 350) {
            elements.go.style.opacity = 0;
            elements.go.style.display = "none";
        } else {
            elements.go.style.opacity = 1;
            elements.go.style.display = "block";
        }
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
    elements.search.addEventListener("click", handFocus);
    elements.search.addEventListener("select", handFocus);
    elements.searchIcon.onclick = () => {
        handleSearch();
    };
    elements.search.addEventListener("keydown", (e) => {
        elements.closeNoti.click();
        if (
            (e.key === "Enter" && elements.search.value.length >= 3) ||
            (e.key === "Enter" && elements.search.value.includes("#"))
        ) {
            window.scrollTo(0, 0);
            handleSearch();
        }
        if (elements.reg.test(e.key)) {
            e.preventDefault();
        }
        handFocus();
    });
    function handFocus() {
        elements.search.classList.add("focused");
    }
    document.addEventListener("click", (e) => {
        if (!elements.search.contains(e.target)) {
            elements.search.classList.remove("focused");
        }
    });
    function handleSearch() {
        if (
            (elements.search.value !== "" &&
                elements.search.value.length >= 3) ||
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
                        e.parentElement.firstElementChild.firstElementChild.click();
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
                    arr[
                        i
                    ].parentElement.firstElementChild.firstElementChild.click();
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
    function timing() {
        let date = new Date();
        let hours =
            date.getHours() > 12 ? date.getHours() - 12 : date.getHours();
        let minutes =
            (date.getMinutes() / 10 < 1 ? "0" : "") + date.getMinutes();
        elements.time.textContent = `${
            (hours / 10 < 1 ? "0" : "") + hours
        }:${minutes} ${date.getHours() >= 12 ? "PM" : "AM"}`;
    }
    setInterval(timing, 1000);
});
