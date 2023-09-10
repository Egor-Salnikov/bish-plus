function CalendarControl() {
    const calendar = new Date();
    const calendarControl = {
        localDate: new Date(),
        chosenDate: new Date(),
        prevMonthLastDate: null,
        calWeekDays: ["Дүшәмбе", "Сишәмбе", "Чәршәмбе", "Пәнҗешәмбе", "Җомга", "Шимбә", "Якшәмбе"],
        calMonthName: [
            "Гыйнвар",
            "Февраль",
            "Март",
            "Апрель",
            "Май",
            "Июнь",
            "Июль",
            "Август",
            "Сентябрь",
            "Октябрь",
            "Ноябрь",
            "Декабрь"
        ],
        daysInMonth: function (month, year) {
            return new Date(year, month, 0).getDate();
        },
        firstDay: function () {
            return new Date(calendar.getFullYear(), calendar.getMonth(), 1);
        },
        firstDayNumber: function () {
            return (7 + calendarControl.firstDay().getDay());
        },
        getPreviousMonthLastDate: function () {
            let lastDate = new Date(
                calendar.getFullYear(),
                calendar.getMonth(),
                0
            ).getDate();
            return lastDate;
        },
        navigateToPreviousMonth: function () {
            calendar.setMonth(calendar.getMonth() - 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToNextMonth: function () {
            calendar.setMonth(calendar.getMonth() + 1);
            calendarControl.attachEventsOnNextPrev();
        },
        navigateToCurrentMonth: function () {
            let currentMonth = calendarControl.localDate.getMonth();
            let currentYear = calendarControl.localDate.getFullYear();
            calendar.setMonth(currentMonth);
            calendar.setFullYear(currentYear);
            calendarControl.attachEventsOnNextPrev();
        },
        displayYear: function () {
            let yearLabel = document.querySelector(".calendar .calendar-year-label");
            yearLabel.innerHTML = calendar.getFullYear();
        },
        displayMonth: function () {
            let monthLabel = document.querySelector(
                ".calendar .calendar-month-label"
            );
            monthLabel.innerHTML = calendarControl.calMonthName[calendar.getMonth()];
        },
        updateTimeTableDate: function() {
            document.querySelectorAll(".calendar-today-date").forEach((value) => {
                value.innerHTML = calendarControl.chosenDate.getDate();
            })
            document.querySelectorAll(".calendar-today-weekdate").forEach((value) => {
                value.innerHTML = calendarControl.calWeekDays[(calendarControl.chosenDate.getDay() + 6) % 7];
            })
        },
        selectDate: function (e) {
            calendarControl.chosenDate.setDate(e.target.getAttribute("data-num"));
            calendarControl.chosenDate.setMonth(calendar.getMonth());
            calendarControl.chosenDate.setFullYear(calendar.getFullYear());
            // console.log(calendarControl.chosenDate);
            calendarControl.updateTimeTableDate();
            document.querySelectorAll(".number-item").forEach((value) => {
                value.classList.remove("calendar-current");
            })
            document.querySelectorAll(".chosen-course-date")[0].innerHTML = `<h3>${calendarControl.calWeekDays[(calendarControl.chosenDate.getDay() + 6) % 7].substring(0, 3)} - ${calendarControl.chosenDate.getDate()}
                 ${calendarControl.calMonthName[calendarControl.chosenDate.getMonth()].substring(0, 3)}</h3>
                 <h3 class="chosen-course-time">${Math.floor(Math.random() * 5) + 9}:${Math.random() > 0.5 ? "30" : "00"}</h3>`;
            document.querySelectorAll(".chosen-course-date")[1].innerHTML = `<h3>${calendarControl.calWeekDays[(calendarControl.chosenDate.getDay() + 6) % 7].substring(0, 3)} - ${calendarControl.chosenDate.getDate()}
                 ${calendarControl.calMonthName[calendarControl.chosenDate.getMonth()].substring(0, 3)}</h3>
                 <h3 class="chosen-course-time">${Math.floor(Math.random() * 5) + 15}:${Math.random() > 0.5 ? "30" : "00"}</h3>`;
            e.target.classList.add("calendar-current");
        },
        plotSelectors: function () {
            document.querySelector(
                ".calendar"
            ).innerHTML += `
<div class="calendar-left">
    <div class="calendar-today">
        <div class="calendar-today-date">
                ${calendarControl.localDate.getDate()}
        </div>
         <div class="calendar-today-weekdate">
                ${calendarControl.calWeekDays[calendarControl.localDate.getDay()]}
         </div>
    </div>
    <div class="chosen-date-courses">
        <div class="chosen-course-container">
            <div class="chosen-course-date">
                <h3>${calendarControl.calWeekDays[(calendarControl.localDate.getDay() + 6) % 7].substring(0, 3)} - ${calendarControl.chosenDate.getDate()}
                 ${calendarControl.calMonthName[calendarControl.chosenDate.getMonth()].substring(0, 3)}</h3>
                 <h3 class="chosen-course-time">10:00</h3>
            </div>
            <div class="chosen-course-separate-line"></div>
            <div class="chosen-course-data">
                <div class="chosen-course-info">
                    <h2>С++ алгоритм турында</h2>
                    <h3>Андрюша Павлов</h3>
                </div>
                <img src="./static/images/cpp.png" alt="course-logo">
            </div>
        </div>
        <div class="chosen-course-container">
            <div class="chosen-course-date">
                <h3>${calendarControl.calWeekDays[(calendarControl.localDate.getDay() + 6) % 7].substring(0, 3)} - ${calendarControl.chosenDate.getDate()}
                 ${calendarControl.calMonthName[calendarControl.chosenDate.getMonth()].substring(0, 3)}</h3>
                 <h3 class="chosen-course-time">16:30</h3>
            </div>
            <div class="chosen-course-separate-line"></div>
            <div class="chosen-course-data">
                <div class="chosen-course-info">
                    <h2>С++ алгоритм турында</h2>
                    <h3>Андрюша Павлов</h3>
                </div>
                <img src="./static/images/cpp.png" alt="course-logo">
            </div>
        </div>
    </div>
</div>
<div class="calendar-inner"><div class="calendar-controls">
          <div class="calendar-prev"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M88.2 3.8L35.8 56.23 28 64l7.8 7.78 52.4 52.4 9.78-7.76L45.58 64l52.4-52.4z"/></svg></a></div>
          <div class="calendar-year-month">
          <div class="calendar-month-label"></div>
          <div class="calendar-tire">—</div>
          <div class="calendar-year-label"></div>
          </div>
          <div class="calendar-next"><a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="128" height="128" viewBox="0 0 128 128"><path fill="#666" d="M38.8 124.2l52.4-52.42L99 64l-7.77-7.78-52.4-52.4-9.8 7.77L81.44 64 29 116.42z"/></svg></a></div>
          </div>
          <div class="calendar-body"></div></div>`;
        },
        plotDayNames: function () {
            for (let i = 0; i < calendarControl.calWeekDays.length; i++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div>${calendarControl.calWeekDays[i].substring(0, 3)}</div>`;
            }
        },
        plotDates: function () {
            document.querySelector(".calendar .calendar-body").innerHTML = "";
            calendarControl.plotDayNames();
            calendarControl.displayMonth();
            calendarControl.displayYear();
            let count = 1;
            let prevDateCount = 0;

            calendarControl.prevMonthLastDate = calendarControl.getPreviousMonthLastDate();
            let prevMonthDatesArray = [];
            let calendarDays = calendarControl.daysInMonth(
                calendar.getMonth() + 1,
                calendar.getFullYear()
            );
            // dates of current month
            for (let i = 1; i < calendarDays; i++) {
                if (i < calendarControl.firstDayNumber()) {
                    prevDateCount += 1;
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="prev-dates"></div>`;
                    prevMonthDatesArray.push(calendarControl.prevMonthLastDate--);
                } else {
                    document.querySelector(
                        ".calendar .calendar-body"
                    ).innerHTML += `<div class="number-item" data-num=${count}>${count++}</div>`;
                }
            }
            //remaining dates after month dates
            for (let j = 0; j < prevDateCount + 1; j++) {
                document.querySelector(
                    ".calendar .calendar-body"
                ).innerHTML += `<div class="number-item" data-num=${count}>${count++}</div>`;
            }
            calendarControl.plotPrevMonthDates(prevMonthDatesArray);
            calendarControl.plotNextMonthDates();
            calendarControl.highlightChosenDay();
        },
        attachEvents: function () {
            let prevBtn = document.querySelector(".calendar .calendar-prev a");
            let nextBtn = document.querySelector(".calendar .calendar-next a");
            let todayDate = document.querySelector(".calendar .calendar-today");
            let dateNumber = document.querySelectorAll(".calendar .number-item");
            prevBtn.addEventListener(
                "click",
                calendarControl.navigateToPreviousMonth
            );
            nextBtn.addEventListener("click", calendarControl.navigateToNextMonth);
            todayDate.addEventListener(
                "click",
                () => {calendarControl.chosenDate.setDate(calendarControl.localDate.getDate());
                    calendarControl.chosenDate.setMonth(calendarControl.localDate.getMonth());
                    calendarControl.chosenDate.setFullYear(calendarControl.localDate.getFullYear());
                    calendarControl.navigateToCurrentMonth();
                    calendarControl.updateTimeTableDate();}
            );
            for (let i = 0; i < dateNumber.length; i++) {
                dateNumber[i].addEventListener(
                    "click",
                    calendarControl.selectDate,
                    false
                );
            }
        },
        highlightChosenDay: function () {
            let currentMonth = calendarControl.chosenDate.getMonth() + 1;
            let changedMonth = calendar.getMonth() + 1;
            let currentYear = calendarControl.chosenDate.getFullYear();
            let changedYear = calendar.getFullYear();
            if (
                currentYear === changedYear &&
                currentMonth === changedMonth &&
                document.querySelectorAll(".number-item")
            ) {
                document
                    .querySelectorAll(".number-item")
                    [calendarControl.chosenDate.getDate() - 1].classList.add("calendar-current");
            }
        },
        plotPrevMonthDates: function(dates){
            dates.reverse();
            for(let i=0;i<dates.length;i++) {
                if(document.querySelectorAll(".prev-dates")) {
                    document.querySelectorAll(".prev-dates")[i].textContent = dates[i];
                }
            }
        },
        plotNextMonthDates: function(){
            let childElemCount = document.querySelector('.calendar-body').childElementCount;
            //7 lines
            if(childElemCount > 42 ) {
                let diff = 49 - childElemCount;
                calendarControl.loopThroughNextDays(diff);
            }

            //6 lines
            if(childElemCount > 35 && childElemCount <= 42 ) {
                calendarControl.loopThroughNextDays(42 - childElemCount);
            }

        },
        loopThroughNextDays: function(count) {
            if(count > 0) {
                for(let i=1;i<=count;i++) {
                    document.querySelector('.calendar-body').innerHTML += `<div class="next-dates">${i}</div>`;
                }
            }
        },
        attachEventsOnNextPrev: function () {
            calendarControl.plotDates();
            calendarControl.attachEvents();
        },
        init: function () {
            calendarControl.plotSelectors();
            calendarControl.plotDates();
            calendarControl.attachEvents();
        }
    };
    calendarControl.init();
}

const calendarControl = new CalendarControl();

function showTab(tabIndex) {
    const tabs = document.querySelectorAll('.page-num');
    tabs.forEach((content) => {
        content.classList.remove('active');
    });
    const selectedTab = document.getElementById(`page-${tabIndex}`);
    selectedTab?.classList.add('active');
}
showTab(1);
async function getContent() {
    let request = await fetch("http://bishplus.ru/api/get-past-webinars/");
    let data = await request.json();
    let dataIndex = 0;
    console.log(data);
    document.querySelector(".past-webinars-container")
        .querySelectorAll(".webinar-container")
        .forEach((value) => {
            value.querySelector(".webinar-preview").src = data[dataIndex].preview_image_url;
            value.querySelector(".webinar-name").innerHTML = `${data[dataIndex].name}`;
            value.querySelector(".webinar-author").innerHTML = `${data[dataIndex].author_name}`;
        dataIndex++;
    });
    dataIndex = 0;
    request = await fetch("http://bishplus.ru/api/get-upcoming-webinars/");
    data = await request.json();
    console.log(data);
    document.querySelector(".future-webinars-container")
        .querySelectorAll(".webinar-container")
        .forEach((value) => {
            value.querySelector(".webinar-preview").src = data[dataIndex].preview_image_url;
            value.querySelector(".webinar-name").innerHTML = `${data[dataIndex].name}`;
            value.querySelector(".webinar-author").innerHTML = `${data[dataIndex].author_name}`;
            dataIndex++;
        });
}
getContent();