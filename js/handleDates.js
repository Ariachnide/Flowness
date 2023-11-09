const t = new Date();
const currentDay = `${t.getMonth() + 1}/${t.getDate()}/${t.getFullYear()}`;

function isDatePast(s) {
    const d = `${s[1]}/${s[0]}/${s[2]}`;
    return (new Date(d).getTime() < new Date(currentDay).getTime())
        ? true
        : false;
}

window.addEventListener("load", () => {
    const pastDateList = document.getElementById("pastDateList");
    const plannedDatesElement = document.getElementById("plannedDatesElement");
    const plannedDateList = document.getElementById("plannedDateList");
    let isPlannedDateListDisplayed = false;
    fetch("./js/dates.json")
        .then((res) => res.json())
        .then((json) => {
            json.items.forEach((d) => {
                const el = document.createElement("li");
                el.classList.add("date-item");
                if (d.date === "...") {
                    el.innerHTML = "... ... ...";
                    pastDateList.appendChild(el);
                    return;
                }
                el.innerHTML = `<b>${d.date}</b> • ${d.place}`;

                if (isDatePast(d.date.split("/"))) {
                    pastDateList.appendChild(el);
                } else {
                    if (!isPlannedDateListDisplayed) {
                        plannedDatesElement.style.display = "block";
                        isPlannedDateListDisplayed = true;
                    }
                    plannedDateList.appendChild(el);
                }
            })
        })
})
