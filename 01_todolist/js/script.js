/* ========================================
   TODO+ STEP 4 FIXED
======================================== */


/* ========================================
   STORAGE
======================================== */

const TODO_STORAGE_KEY =
    "todo-plus.todos";

const SETTINGS_STORAGE_KEY =
    "todo-plus.settings";


/* ========================================
   STATE
======================================== */

const state = {

    todos: [],

    settings: {
        name: "",
        theme: "light",
        color: "green",
        globalNotification: true
    },

    selectedDate:
        formatDate(new Date()),

    calendarDate:
        new Date(),

    filter:
        "all",

    search:
        "",

    sort:
        "date",

    editingId:
        null,

    notificationTimers:
        []

};


/* ========================================
   DOM
======================================== */

const els = {

    /* header */

    headerDate:
        document.getElementById(
            "headerDate"
        ),

    openSettings:
        document.getElementById(
            "openSettings"
        ),


    /* hero */

    greeting:
        document.getElementById(
            "greeting"
        ),

    heroDate:
        document.getElementById(
            "heroDate"
        ),

    openAddModal:
        document.getElementById(
            "openAddModal"
        ),


    /* progress */

    progressText:
        document.getElementById(
            "progressText"
        ),

    progressCount:
        document.getElementById(
            "progressCount"
        ),

    progressBar:
        document.getElementById(
            "progressBar"
        ),


    /* calendar */

    calendarTitle:
        document.getElementById(
            "calendarTitle"
        ),

    calendarGrid:
        document.getElementById(
            "calendarGrid"
        ),

    prevMonth:
        document.getElementById(
            "prevMonth"
        ),

    nextMonth:
        document.getElementById(
            "nextMonth"
        ),

    goToday:
        document.getElementById(
            "goToday"
        ),


    /* todo */

    selectedDateText:
        document.getElementById(
            "selectedDateText"
        ),

    listTitle:
        document.getElementById(
            "listTitle"
        ),

    listCount:
        document.getElementById(
            "listCount"
        ),

    searchInput:
        document.getElementById(
            "searchInput"
        ),

    sortSelect:
        document.getElementById(
            "sortSelect"
        ),

    todoList:
        document.getElementById(
            "todoList"
        ),

    emptyState:
        document.getElementById(
            "emptyState"
        ),

    emptyTitle:
        document.getElementById(
            "emptyTitle"
        ),

    emptyDesc:
        document.getElementById(
            "emptyDesc"
        ),

    emptyAddBtn:
        document.getElementById(
            "emptyAddBtn"
        ),


    /* modal */

    todoModal:
        document.getElementById(
            "todoModal"
        ),

    modalTitle:
        document.getElementById(
            "modalTitle"
        ),

    closeModal:
        document.getElementById(
            "closeModal"
        ),

    cancelModal:
        document.getElementById(
            "cancelModal"
        ),

    todoForm:
        document.getElementById(
            "todoForm"
        ),

    titleInput:
        document.getElementById(
            "title"
        ),

    descriptionInput:
        document.getElementById(
            "description"
        ),

    dateInput:
        document.getElementById(
            "date"
        ),

    timeInput:
        document.getElementById(
            "time"
        ),

    categoryInput:
        document.getElementById(
            "category"
        ),

    priorityInput:
        document.getElementById(
            "priority"
        ),

    notificationInput:
        document.getElementById(
            "notification"
        ),

    repeatInput:
        document.getElementById(
            "repeat"
        ),


    /* stats */

    statTotal:
        document.getElementById(
            "statTotal"
        ),

    statCompleted:
        document.getElementById(
            "statCompleted"
        ),

    statPending:
        document.getElementById(
            "statPending"
        ),

    statRate:
        document.getElementById(
            "statRate"
        ),

    statToday:
        document.getElementById(
            "statToday"
        ),

    statWeek:
        document.getElementById(
            "statWeek"
        ),

    statMonth:
        document.getElementById(
            "statMonth"
        ),

    statStreak:
        document.getElementById(
            "statStreak"
        ),

    weeklyChart:
        document.getElementById(
            "weeklyChart"
        ),


    /* settings */

    userNameInput:
        document.getElementById(
            "userNameInput"
        ),

    saveUserName:
        document.getElementById(
            "saveUserName"
        ),

    notificationToggle:
        document.getElementById(
            "notificationToggle"
        ),

    exportData:
        document.getElementById(
            "exportData"
        ),

    importDataBtn:
        document.getElementById(
            "importDataBtn"
        ),

    importDataInput:
        document.getElementById(
            "importDataInput"
        ),

    clearData:
        document.getElementById(
            "clearData"
        ),


    /* toast */

    notificationToast:
        document.getElementById(
            "notificationToast"
        ),

    toastTitle:
        document.getElementById(
            "toastTitle"
        ),

    toastMessage:
        document.getElementById(
            "toastMessage"
        )

};


/* ========================================
   START
======================================== */

document.addEventListener(
    "DOMContentLoaded",
    init
);


function init() {

    state.todos =
        loadTodos()
            .map(
                normalizeTodo
            );


    state.settings =
        loadSettings();


    saveTodos();


    applySettings();


    loadSettingsUI();


    updateHeader();


    bindEvents();


    renderAll();

}


/* ========================================
   EVENT BIND
======================================== */

function bindEvents() {


    /* ADD */

    if (
        els.openAddModal
    ) {

        els.openAddModal.addEventListener(
            "click",
            function () {

                openModal();

            }
        );

    }


    if (
        els.emptyAddBtn
    ) {

        els.emptyAddBtn.addEventListener(
            "click",
            function () {

                openModal();

            }
        );

    }


    /* MODAL */

    if (
        els.closeModal
    ) {

        els.closeModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (
        els.cancelModal
    ) {

        els.cancelModal.addEventListener(
            "click",
            closeModal
        );

    }


    if (
        els.todoModal
    ) {

        els.todoModal.addEventListener(
            "click",
            function (event) {

                if (
                    event.target ===
                    els.todoModal
                ) {

                    closeModal();

                }

            }
        );

    }


    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key ===
                "Escape"
                &&
                els.todoModal
                &&
                !els.todoModal.hidden
            ) {

                closeModal();

            }

        }
    );


    /* FORM */

    if (
        els.todoForm
    ) {

        els.todoForm.addEventListener(
            "submit",
            handleTodoSubmit
        );

    }


    /* SEARCH */

    if (
        els.searchInput
    ) {

        els.searchInput.addEventListener(
            "input",
            function (event) {

                state.search =
                    event.target.value
                        .trim()
                        .toLowerCase();


                renderTodoList();

            }
        );

    }


    /* FILTER */

    document
        .querySelectorAll(
            ".filter-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        state.filter =
                            button.dataset.filter;


                        updateFilterButtons();


                        renderTodoList();

                    }
                );

            }
        );


    /* SORT */

    if (
        els.sortSelect
    ) {

        els.sortSelect.addEventListener(
            "change",
            function (event) {

                state.sort =
                    event.target.value;


                renderTodoList();

            }
        );

    }


    /* CALENDAR PREV */

    if (
        els.prevMonth
    ) {

        els.prevMonth.addEventListener(
            "click",
            function () {

                state.calendarDate =
                    new Date(

                        state.calendarDate
                            .getFullYear(),

                        state.calendarDate
                            .getMonth() - 1,

                        1

                    );


                renderCalendar();

            }
        );

    }


    /* CALENDAR NEXT */

    if (
        els.nextMonth
    ) {

        els.nextMonth.addEventListener(
            "click",
            function () {

                state.calendarDate =
                    new Date(

                        state.calendarDate
                            .getFullYear(),

                        state.calendarDate
                            .getMonth() + 1,

                        1

                    );


                renderCalendar();

            }
        );

    }


    /* TODAY */

    if (
        els.goToday
    ) {

        els.goToday.addEventListener(
            "click",
            function () {

                const today =
                    new Date();


                state.calendarDate =
                    new Date(
                        today.getFullYear(),
                        today.getMonth(),
                        1
                    );


                state.selectedDate =
                    formatDate(
                        today
                    );


                state.filter =
                    "all";


                updateFilterButtons();


                renderAll();

            }
        );

    }


    /* TODO LIST */

    if (
        els.todoList
    ) {

        els.todoList.addEventListener(
            "click",
            handleTodoAction
        );

    }


    /* TABS */

    document
        .querySelectorAll(
            ".dashboard-tab"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        switchView(
                            button.dataset.view
                        );

                    }
                );

            }
        );


    /* HEADER SETTINGS */

    if (
        els.openSettings
    ) {

        els.openSettings.addEventListener(
            "click",
            function () {

                switchView(
                    "settings"
                );

            }
        );

    }


    /* PROFILE */

    if (
        els.saveUserName
    ) {

        els.saveUserName.addEventListener(
            "click",
            saveUserName
        );

    }


    /* THEME */

    document
        .querySelectorAll(
            ".theme-btn"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        setTheme(
                            button.dataset.theme
                        );

                    }
                );

            }
        );


    /* COLOR */

    document
        .querySelectorAll(
            ".color-option"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        setColor(
                            button.dataset.color
                        );

                    }
                );

            }
        );


    /* NOTIFICATION */

    if (
        els.notificationToggle
    ) {

        els.notificationToggle.addEventListener(
            "click",
            toggleNotification
        );

    }


    /* BACKUP */

    if (
        els.exportData
    ) {

        els.exportData.addEventListener(
            "click",
            exportTodos
        );

    }


    /* IMPORT */

    if (
        els.importDataBtn
    ) {

        els.importDataBtn.addEventListener(
            "click",
            function () {

                els.importDataInput.click();

            }
        );

    }


    if (
        els.importDataInput
    ) {

        els.importDataInput.addEventListener(
            "change",
            importTodos
        );

    }


    /* CLEAR */

    if (
        els.clearData
    ) {

        els.clearData.addEventListener(
            "click",
            clearAllTodos
        );

    }

}


/* ========================================
   VIEW
======================================== */

function switchView(
    view
) {

    document
        .querySelectorAll(
            ".dashboard-tab"
        )
        .forEach(
            function (button) {

                button.classList.toggle(
                    "active",
                    button.dataset.view ===
                        view
                );

            }
        );


    document
        .querySelectorAll(
            ".view-section"
        )
        .forEach(
            function (section) {

                section.classList.toggle(
                    "active",
                    section.id ===
                        `${view}View`
                );

            }
        );


    if (
        view ===
        "stats"
    ) {

        renderStats();

    }


    if (
        view ===
        "settings"
    ) {

        loadSettingsUI();

    }

}


/* ========================================
   RENDER ALL
======================================== */

function renderAll() {

    renderProgress();

    renderCalendar();

    renderTodoList();

    renderStats();

    scheduleNotifications();

}


/* ========================================
   CALENDAR
======================================== */

function renderCalendar() {

    if (
        !els.calendarGrid
    ) {

        return;

    }


    const year =
        state.calendarDate
            .getFullYear();


    const month =
        state.calendarDate
            .getMonth();


    if (
        els.calendarTitle
    ) {

        els.calendarTitle.textContent =
            `${year}년 ${month + 1}월`;

    }


    els.calendarGrid.innerHTML =
        "";


    const firstDay =
        new Date(
            year,
            month,
            1
        ).getDay();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const prevMonthDays =
        new Date(
            year,
            month,
            0
        ).getDate();


    const totalCells =
        Math.ceil(
            (
                firstDay +
                daysInMonth
            )
            /
            7
        )
        *
        7;


    const todayKey =
        formatDate(
            new Date()
        );


    for (
        let index = 0;
        index < totalCells;
        index++
    ) {

        let dayNumber;

        let cellDate;

        let otherMonth =
            false;


        /* 이전 달 */

        if (
            index <
            firstDay
        ) {

            dayNumber =
                prevMonthDays
                -
                firstDay
                +
                index
                +
                1;


            cellDate =
                new Date(
                    year,
                    month - 1,
                    dayNumber
                );


            otherMonth =
                true;

        }


        /* 다음 달 */

        else if (
            index >=
            firstDay +
            daysInMonth
        ) {

            dayNumber =
                index
                -
                (
                    firstDay +
                    daysInMonth
                )
                +
                1;


            cellDate =
                new Date(
                    year,
                    month + 1,
                    dayNumber
                );


            otherMonth =
                true;

        }


        /* 현재 달 */

        else {

            dayNumber =
                index
                -
                firstDay
                +
                1;


            cellDate =
                new Date(
                    year,
                    month,
                    dayNumber
                );

        }


        const dateKey =
            formatDate(
                cellDate
            );


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "calendar-day";


        if (
            otherMonth
        ) {

            button.classList.add(
                "other-month"
            );

        }


        if (
            dateKey ===
            todayKey
        ) {

            button.classList.add(
                "today"
            );

        }


        if (
            dateKey ===
            state.selectedDate
        ) {

            button.classList.add(
                "selected"
            );

        }


        const dayTodos =
            state.todos.filter(
                function (todo) {

                    return (
                        todo.date ===
                        dateKey
                    );

                }
            );


        const hasHighPriority =
            dayTodos.some(
                function (todo) {

                    return (
                        todo.priority ===
                        "high"
                    );

                }
            );


        button.innerHTML = `

            <div
                class="calendar-day-number"
            >
                ${dayNumber}
            </div>

            ${
                dayTodos.length > 0

                ?

                `
                    <div
                        class="
                            calendar-dot
                            ${
                                hasHighPriority
                                ? "high"
                                : ""
                            }
                        "
                    ></div>
                `

                :

                ""
            }

        `;


        button.addEventListener(
            "click",
            function () {

                state.selectedDate =
                    dateKey;


                state.calendarDate =
                    new Date(
                        cellDate.getFullYear(),
                        cellDate.getMonth(),
                        1
                    );


                state.filter =
                    "all";


                updateFilterButtons();


                renderCalendar();


                renderTodoList();

            }
        );


        els.calendarGrid.appendChild(
            button
        );

    }

}


/* ========================================
   PROGRESS
======================================== */

function renderProgress() {

    if (
        !els.progressText
    ) {

        return;

    }


    const today =
        formatDate(
            new Date()
        );


    const todayTodos =
        state.todos.filter(
            function (todo) {

                return (
                    todo.date ===
                    today
                );

            }
        );


    const completed =
        todayTodos.filter(
            function (todo) {

                return todo.completed;

            }
        ).length;


    const total =
        todayTodos.length;


    const percent =
        total > 0
        ?
        Math.round(
            completed /
            total *
            100
        )
        :
        0;


    els.progressText.textContent =
        `${percent}%`;


    els.progressCount.textContent =
        `${completed} / ${total} 완료`;


    els.progressBar.style.width =
        `${percent}%`;

}


/* ========================================
   FILTER
======================================== */

function getVisibleTodos() {

    let result =
        [
            ...state.todos
        ];


    /*
        전체
        → 선택한 날짜 기준
    */

    if (
        state.filter ===
            "all"
        &&
        state.selectedDate
    ) {

        result =
            result.filter(
                function (todo) {

                    return (
                        todo.date ===
                        state.selectedDate
                    );

                }
            );

    }


    /*
        오늘
    */

    if (
        state.filter ===
        "today"
    ) {

        const today =
            formatDate(
                new Date()
            );


        result =
            result.filter(
                function (todo) {

                    return (
                        todo.date ===
                        today
                    );

                }
            );

    }


    /*
        미완료
    */

    if (
        state.filter ===
        "pending"
    ) {

        result =
            result.filter(
                function (todo) {

                    return !todo.completed;

                }
            );

    }


    /*
        완료
    */

    if (
        state.filter ===
        "completed"
    ) {

        result =
            result.filter(
                function (todo) {

                    return todo.completed;

                }
            );

    }


    /*
        높은 우선순위
    */

    if (
        state.filter ===
        "high"
    ) {

        result =
            result.filter(
                function (todo) {

                    return (
                        todo.priority ===
                        "high"
                    );

                }
            );

    }


    /*
        검색
    */

    if (
        state.search
    ) {

        result =
            result.filter(
                function (todo) {

                    const target =
                        [

                            todo.title,

                            todo.description,

                            todo.category

                        ]
                        .join(" ")
                        .toLowerCase();


                    return target.includes(
                        state.search
                    );

                }
            );

    }


    /*
        정렬
    */

    const priorityWeight = {

        high: 0,

        medium: 1,

        low: 2

    };


    result.sort(
        function (a, b) {

            if (
                state.sort ===
                "priority"
            ) {

                return (
                    (
                        priorityWeight[
                            a.priority
                        ]
                        ??
                        9
                    )

                    -

                    (
                        priorityWeight[
                            b.priority
                        ]
                        ??
                        9
                    )
                );

            }


            if (
                state.sort ===
                "created"
            ) {

                return String(
                    b.createdAt
                ).localeCompare(
                    String(
                        a.createdAt
                    )
                );

            }


            return (

                String(
                    a.date
                ).localeCompare(
                    String(
                        b.date
                    )
                )

                ||

                String(
                    a.time ||
                    "99:99"
                ).localeCompare(
                    String(
                        b.time ||
                        "99:99"
                    )
                )

            );

        }
    );


    return result;

}


/* ========================================
   TODO LIST
======================================== */

function renderTodoList() {

    if (
        !els.todoList
    ) {

        return;

    }


    const visible =
        getVisibleTodos();


    if (
        els.selectedDateText
    ) {

        els.selectedDateText.textContent =
            state.selectedDate
            ?
            formatKoreanDate(
                state.selectedDate
            )
            :
            "";

    }


    if (
        els.listTitle
    ) {

        els.listTitle.textContent =
            state.selectedDate
            ?
            `${formatShortDate(
                state.selectedDate
            )} 할 일`
            :
            "오늘의 할 일";

    }


    if (
        els.listCount
    ) {

        els.listCount.textContent =
            `${visible.length}개`;

    }


    els.todoList.innerHTML =
        "";


    if (
        visible.length ===
        0
    ) {

        if (
            els.emptyState
        ) {

            els.emptyState.hidden =
                false;

        }


        if (
            els.emptyTitle
        ) {

            els.emptyTitle.textContent =
                state.search
                ?
                "검색 결과가 없습니다."
                :
                "이 날짜에는 예정된 일이 없습니다.";

        }


        if (
            els.emptyDesc
        ) {

            els.emptyDesc.textContent =
                state.search
                ?
                "다른 검색어를 입력해 보세요."
                :
                "새로운 할 일을 추가해 보세요.";

        }


        return;

    }


    if (
        els.emptyState
    ) {

        els.emptyState.hidden =
            true;

    }


    visible.forEach(
        function (todo) {

            const item =
                document.createElement(
                    "article"
                );


            item.className =
                "todo-item";


            if (
                todo.completed
            ) {

                item.classList.add(
                    "completed"
                );

            }


            const priorityLabel = {

                high:
                    "높음",

                medium:
                    "보통",

                low:
                    "낮음"

            }[
                todo.priority
            ]
            ||
            "보통";


            item.innerHTML = `

                <button
                    class="
                        todo-check
                        ${
                            todo.completed
                            ? "checked"
                            : ""
                        }
                    "

                    type="button"

                    data-action="toggle"

                    data-id="${escapeAttr(
                        todo.id
                    )}"

                    aria-label="${
                        todo.completed
                        ?
                        "완료 취소"
                        :
                        "완료 처리"
                    }"
                ></button>


                <div>

                    <h3
                        class="todo-title"
                    >
                        ${escapeHtml(
                            todo.title
                        )}
                    </h3>


                    <div
                        class="todo-meta"
                    >

                        <span
                            class="meta-chip"
                        >
                            🕒
                            ${
                                todo.time
                                ||
                                "시간 미정"
                            }
                        </span>


                        <span
                            class="meta-chip"
                        >
                            ${escapeHtml(
                                todo.category
                            )}
                        </span>


                        <span
                            class="meta-chip"
                        >

                            <span
                                class="
                                    priority-dot
                                    ${
                                        todo.priority
                                    }
                                "
                            ></span>

                            ${priorityLabel}

                        </span>


                        ${
                            todo.repeat !==
                            "none"
                            ?

                            `
                                <span
                                    class="meta-chip"
                                >
                                    🔁
                                    ${
                                        getRepeatText(
                                            todo.repeat
                                        )
                                    }
                                </span>
                            `

                            :

                            ""
                        }


                        ${
                            todo.notification !==
                            "none"
                            ?

                            `
                                <span
                                    class="meta-chip"
                                >
                                    🔔
                                    ${
                                        getNotificationText(
                                            todo.notification
                                        )
                                    }
                                </span>
                            `

                            :

                            ""
                        }

                    </div>

                </div>


                <div
                    class="todo-actions"
                >

                    <button
                        class="text-btn"
                        type="button"
                        data-action="edit"
                        data-id="${escapeAttr(
                            todo.id
                        )}"
                    >
                        수정
                    </button>


                    <button
                        class="
                            text-btn
                            delete
                        "
                        type="button"
                        data-action="delete"
                        data-id="${escapeAttr(
                            todo.id
                        )}"
                    >
                        삭제
                    </button>

                </div>

            `;


            els.todoList.appendChild(
                item
            );

        }
    );

}


/* ========================================
   TODO ACTION
======================================== */

function handleTodoAction(
    event
) {

    const button =
        event.target.closest(
            "[data-action]"
        );


    if (
        !button
    ) {

        return;

    }


    const id =
        button.dataset.id;


    const action =
        button.dataset.action;


    const todo =
        state.todos.find(
            function (item) {

                return (
                    String(
                        item.id
                    )
                    ===
                    String(
                        id
                    )
                );

            }
        );


    if (
        !todo
    ) {

        return;

    }


    /* 완료 */

    if (
        action ===
        "toggle"
    ) {

        todo.completed =
            !todo.completed;


        todo.completedAt =
            todo.completed
            ?
            new Date()
                .toISOString()
            :
            null;


        todo.updatedAt =
            new Date()
                .toISOString();


        if (
            todo.completed
            &&
            todo.repeat !==
            "none"
        ) {

            createNextRepeatTodo(
                todo
            );

        }


        saveTodos();


        renderAll();


        return;

    }


    /* 수정 */

    if (
        action ===
        "edit"
    ) {

        openModal(
            todo
        );


        return;

    }


    /* 삭제 */

    if (
        action ===
        "delete"
    ) {

        const confirmed =
            window.confirm(
                `"${todo.title}" 할 일을 삭제할까요?`
            );


        if (
            !confirmed
        ) {

            return;

        }


        state.todos =
            state.todos.filter(
                function (item) {

                    return (
                        String(
                            item.id
                        )
                        !==
                        String(
                            id
                        )
                    );

                }
            );


        saveTodos();


        renderAll();

    }

}


/* ========================================
   MODAL
======================================== */

function openModal(
    todo = null
) {

    state.editingId =
        todo
        ?
        todo.id
        :
        null;


    els.modalTitle.textContent =
        todo
        ?
        "할 일 수정"
        :
        "할 일 추가";


    els.todoForm.reset();


    els.dateInput.value =
        todo?.date
        ||
        state.selectedDate
        ||
        formatDate(
            new Date()
        );


    els.timeInput.value =
        todo?.time
        ||
        "";


    els.categoryInput.value =
        todo?.category
        ||
        "업무";


    els.priorityInput.value =
        todo?.priority
        ||
        "medium";


    els.notificationInput.value =
        todo?.notification
        ||
        "none";


    els.repeatInput.value =
        todo?.repeat
        ||
        "none";


    els.titleInput.value =
        todo?.title
        ||
        "";


    els.descriptionInput.value =
        todo?.description
        ||
        "";


    els.todoModal.hidden =
        false;


    document.body.style.overflow =
        "hidden";


    setTimeout(
        function () {

            els.titleInput.focus();

        },
        0
    );

}


function closeModal() {

    if (
        els.todoModal
    ) {

        els.todoModal.hidden =
            true;

    }


    document.body.style.overflow =
        "";


    state.editingId =
        null;

}


/* ========================================
   TODO SUBMIT
======================================== */

function handleTodoSubmit(
    event
) {

    event.preventDefault();


    const formData =
        new FormData(
            els.todoForm
        );


    const now =
        new Date()
            .toISOString();


    const payload = {

        title:
            String(
                formData.get(
                    "title"
                )
                ||
                ""
            )
            .trim(),

        description:
            String(
                formData.get(
                    "description"
                )
                ||
                ""
            )
            .trim(),

        date:
            String(
                formData.get(
                    "date"
                )
                ||
                ""
            ),

        time:
            String(
                formData.get(
                    "time"
                )
                ||
                ""
            ),

        category:
            String(
                formData.get(
                    "category"
                )
                ||
                "업무"
            ),

        priority:
            String(
                formData.get(
                    "priority"
                )
                ||
                "medium"
            ),

        notification:
            String(
                formData.get(
                    "notification"
                )
                ||
                "none"
            ),

        repeat:
            String(
                formData.get(
                    "repeat"
                )
                ||
                "none"
            )

    };


    if (
        !payload.title
        ||
        !payload.date
    ) {

        return;

    }


    /* 수정 */

    if (
        state.editingId
    ) {

        const index =
            state.todos.findIndex(
                function (todo) {

                    return (
                        String(
                            todo.id
                        )
                        ===
                        String(
                            state.editingId
                        )
                    );

                }
            );


        if (
            index !==
            -1
        ) {

            state.todos[index] = {

                ...state.todos[index],

                ...payload,

                updatedAt:
                    now

            };

        }

    }


    /* 신규 */

    else {

        state.todos.push({

            id:
                createId(),

            ...payload,

            completed:
                false,

            completedAt:
                null,

            repeatSourceId:
                null,

            createdAt:
                now,

            updatedAt:
                now

        });

    }


    saveTodos();


    state.selectedDate =
        payload.date;


    state.calendarDate =
        parseDate(
            payload.date
        );


    closeModal();


    renderAll();

}


/* ========================================
   REPEAT
======================================== */

function createNextRepeatTodo(
    sourceTodo
) {

    const nextDate =
        addRepeatDate(
            sourceTodo.date,
            sourceTodo.repeat
        );


    const exists =
        state.todos.some(
            function (todo) {

                return (

                    todo.title ===
                    sourceTodo.title

                    &&

                    todo.date ===
                    nextDate

                    &&

                    todo.repeat ===
                    sourceTodo.repeat

                    &&

                    !todo.completed

                );

            }
        );


    if (
        exists
    ) {

        return;

    }


    const now =
        new Date()
            .toISOString();


    state.todos.push({

        ...sourceTodo,

        id:
            createId(),

        date:
            nextDate,

        completed:
            false,

        completedAt:
            null,

        repeatSourceId:
            sourceTodo.id,

        createdAt:
            now,

        updatedAt:
            now

    });


    showToast(
        "반복 일정 생성",
        `${nextDate} 일정이 추가되었습니다.`
    );

}


/* ========================================
   STATS
======================================== */

function renderStats() {

    const total =
        state.todos.length;


    const completed =
        state.todos.filter(
            function (todo) {

                return todo.completed;

            }
        ).length;


    const pending =
        total -
        completed;


    const rate =
        total > 0
        ?
        Math.round(
            completed /
            total *
            100
        )
        :
        0;


    els.statTotal.textContent =
        total;


    els.statCompleted.textContent =
        completed;


    els.statPending.textContent =
        pending;


    els.statRate.textContent =
        `${rate}%`;


    els.statToday.textContent =
        countCompletedOnDate(
            formatDate(
                new Date()
            )
        );


    els.statWeek.textContent =
        countCompletedThisWeek();


    els.statMonth.textContent =
        countCompletedThisMonth();


    els.statStreak.textContent =
        `${calculateStreak()}일`;


    renderWeeklyChart();

}


function countCompletedOnDate(
    dateString
) {

    return state.todos.filter(
        function (todo) {

            return (

                todo.completed
                &&
                todo.completedAt
                &&
                formatDate(
                    new Date(
                        todo.completedAt
                    )
                )
                ===
                dateString

            );

        }
    ).length;

}


function countCompletedThisWeek() {

    const start =
        getStartOfWeek(
            new Date()
        );


    const end =
        new Date(
            start
        );


    end.setDate(
        end.getDate()
        +
        7
    );


    return state.todos.filter(
        function (todo) {

            if (
                !todo.completedAt
            ) {

                return false;

            }


            const date =
                new Date(
                    todo.completedAt
                );


            return (
                date >=
                start
                &&
                date <
                end
            );

        }
    ).length;

}


function countCompletedThisMonth() {

    const now =
        new Date();


    return state.todos.filter(
        function (todo) {

            if (
                !todo.completedAt
            ) {

                return false;

            }


            const date =
                new Date(
                    todo.completedAt
                );


            return (

                date.getFullYear()
                ===
                now.getFullYear()

                &&

                date.getMonth()
                ===
                now.getMonth()

            );

        }
    ).length;

}


function getStartOfWeek(
    date
) {

    const result =
        new Date(
            date
        );


    result.setDate(
        result.getDate()
        -
        result.getDay()
    );


    result.setHours(
        0,
        0,
        0,
        0
    );


    return result;

}


function calculateStreak() {

    const completedDates =
        new Set();


    state.todos.forEach(
        function (todo) {

            if (
                !todo.completedAt
            ) {

                return;

            }


            completedDates.add(
                formatDate(
                    new Date(
                        todo.completedAt
                    )
                )
            );

        }
    );


    let streak =
        0;


    const cursor =
        new Date();


    cursor.setHours(
        0,
        0,
        0,
        0
    );


    if (
        !completedDates.has(
            formatDate(
                cursor
            )
        )
    ) {

        cursor.setDate(
            cursor.getDate()
            -
            1
        );

    }


    while (
        completedDates.has(
            formatDate(
                cursor
            )
        )
    ) {

        streak++;


        cursor.setDate(
            cursor.getDate()
            -
            1
        );

    }


    return streak;

}


function renderWeeklyChart() {

    if (
        !els.weeklyChart
    ) {

        return;

    }


    const start =
        getStartOfWeek(
            new Date()
        );


    const labels = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ];


    const values =
        [];


    for (
        let i = 0;
        i < 7;
        i++
    ) {

        const date =
            new Date(
                start
            );


        date.setDate(
            date.getDate()
            +
            i
        );


        values.push({

            label:
                labels[
                    date.getDay()
                ],

            value:
                countCompletedOnDate(
                    formatDate(
                        date
                    )
                )

        });

    }


    const max =
        Math.max(
            ...values.map(
                function (item) {

                    return item.value;

                }
            ),
            1
        );


    els.weeklyChart.innerHTML =
        "";


    values.forEach(
        function (item) {

            const chartItem =
                document.createElement(
                    "div"
                );


            chartItem.className =
                "chart-item";


            const height =
                Math.max(
                    4,
                    item.value /
                    max *
                    150
                );


            chartItem.innerHTML = `

                <div
                    class="chart-value"
                >
                    ${item.value}
                </div>


                <div
                    class="chart-bar-wrap"
                >

                    <div
                        class="chart-bar"
                        style="
                            height:
                            ${height}px;
                        "
                    ></div>

                </div>


                <div
                    class="chart-day"
                >
                    ${item.label}
                </div>

            `;


            els.weeklyChart.appendChild(
                chartItem
            );

        }
    );

}


/* ========================================
   SETTINGS
======================================== */

function loadSettings() {

    const defaultSettings = {

        name:
            "",

        theme:
            "light",

        color:
            "green",

        globalNotification:
            true

    };


    try {

        const raw =
            localStorage.getItem(
                SETTINGS_STORAGE_KEY
            );


        if (
            !raw
        ) {

            return defaultSettings;

        }


        const saved =
            JSON.parse(
                raw
            );


        return {

            ...defaultSettings,

            ...saved

        };

    }

    catch (
        error
    ) {

        console.error(
            error
        );


        return defaultSettings;

    }

}


function saveSettings() {

    localStorage.setItem(
        SETTINGS_STORAGE_KEY,
        JSON.stringify(
            state.settings
        )
    );

}


function loadSettingsUI() {

    updateGreeting();


    if (
        els.userNameInput
    ) {

        els.userNameInput.value =
            state.settings.name ||
            "";

    }


    if (
        els.notificationToggle
    ) {

        els.notificationToggle.classList.toggle(
            "active",
            Boolean(
                state.settings
                    .globalNotification
            )
        );

    }


    document
        .querySelectorAll(
            ".theme-btn"
        )
        .forEach(
            function (button) {

                button.classList.toggle(
                    "active",

                    button.dataset.theme
                    ===
                    state.settings.theme
                );

            }
        );


    document
        .querySelectorAll(
            ".color-option"
        )
        .forEach(
            function (button) {

                button.classList.toggle(
                    "active",

                    button.dataset.color
                    ===
                    state.settings.color
                );

            }
        );

}


function saveUserName() {

    const name =
        els.userNameInput.value
            .trim();


    state.settings.name =
        name;


    saveSettings();


    updateGreeting();


    showToast(
        "저장 완료",
        "사용자 이름을 저장했습니다."
    );

}


function updateGreeting() {

    const name =
        state.settings.name ||
        "";


    if (
        els.greeting
    ) {

        els.greeting.textContent =
            name
            ?
            `${name}님, 오늘도 힘내요! 👋`
            :
            "안녕하세요! 👋";

    }

}


function setTheme(
    theme
) {

    state.settings.theme =
        theme;


    saveSettings();


    applySettings();


    loadSettingsUI();

}


function setColor(
    color
) {

    state.settings.color =
        color;


    saveSettings();


    applySettings();


    loadSettingsUI();

}


function applySettings() {

    document.body.classList.remove(
        "dark"
    );


    document.body.classList.remove(
        "theme-blue",
        "theme-purple",
        "theme-orange"
    );


    if (
        state.settings.theme ===
        "dark"
    ) {

        document.body.classList.add(
            "dark"
        );

    }


    if (
        state.settings.color ===
        "blue"
    ) {

        document.body.classList.add(
            "theme-blue"
        );

    }


    if (
        state.settings.color ===
        "purple"
    ) {

        document.body.classList.add(
            "theme-purple"
        );

    }


    if (
        state.settings.color ===
        "orange"
    ) {

        document.body.classList.add(
            "theme-orange"
        );

    }

}


/* ========================================
   NOTIFICATION
======================================== */

function toggleNotification() {

    state.settings.globalNotification =
        !state.settings.globalNotification;


    saveSettings();


    if (
        !state.settings.globalNotification
    ) {

        clearNotificationTimers();


        showToast(
            "알림 꺼짐",
            "전체 알림을 껐습니다."
        );

    }

    else {

        requestNotificationPermission();


        showToast(
            "알림 켜짐",
            "전체 알림을 켰습니다."
        );

    }


    loadSettingsUI();

}


async function requestNotificationPermission() {

    if (
        !(
            "Notification"
            in window
        )
    ) {

        showToast(
            "알림 미지원",
            "현재 브라우저에서는 알림을 사용할 수 없습니다."
        );


        return;

    }


    try {

        if (
            Notification.permission ===
            "default"
        ) {

            await Notification.requestPermission();

        }

    }

    catch (
        error
    ) {

        console.error(
            error
        );

    }


    scheduleNotifications();

}


function scheduleNotifications() {

    clearNotificationTimers();


    if (
        !state.settings
            .globalNotification
    ) {

        return;

    }


    state.todos.forEach(
        function (todo) {

            if (
                todo.completed
                ||
                todo.notification ===
                    "none"
                ||
                !todo.time
            ) {

                return;

            }


            const eventTime =
                new Date(
                    `${todo.date}T${todo.time}:00`
                );


            const minutes =
                Number(
                    todo.notification
                )
                ||
                0;


            const target =
                eventTime.getTime()
                -
                minutes *
                60 *
                1000;


            const delay =
                target -
                Date.now();


            if (
                delay <=
                0
                ||
                delay >
                2147483647
            ) {

                return;

            }


            const timer =
                setTimeout(
                    function () {

                        triggerNotification(
                            todo
                        );

                    },
                    delay
                );


            state.notificationTimers.push(
                timer
            );

        }
    );

}


function clearNotificationTimers() {

    state.notificationTimers.forEach(
        function (timer) {

            clearTimeout(
                timer
            );

        }
    );


    state.notificationTimers =
        [];

}


function triggerNotification(
    todo
) {

    const title =
        "TODO+ 알림";


    const message =
        `"${todo.title}" 일정이 있습니다.`;


    if (
        "Notification"
        in window
        &&
        Notification.permission ===
            "granted"
    ) {

        new Notification(
            title,
            {
                body:
                    message
            }
        );

    }


    showToast(
        title,
        message
    );

}


/* ========================================
   BACKUP
======================================== */

function exportTodos() {

    const backup = {

        app:
            "TODO+",

        version:
            "4.0",

        exportedAt:
            new Date()
                .toISOString(),

        todos:
            state.todos,

        settings:
            state.settings

    };


    const blob =
        new Blob(
            [
                JSON.stringify(
                    backup,
                    null,
                    2
                )
            ],
            {
                type:
                    "application/json"
            }
        );


    const url =
        URL.createObjectURL(
            blob
        );


    const link =
        document.createElement(
            "a"
        );


    link.href =
        url;


    link.download =
        `todo-plus-backup-${formatDate(
            new Date()
        )}.json`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();


    URL.revokeObjectURL(
        url
    );


    showToast(
        "백업 완료",
        "Todo 데이터를 저장했습니다."
    );

}


/* ========================================
   IMPORT
======================================== */

function importTodos(
    event
) {

    const file =
        event.target.files[0];


    if (
        !file
    ) {

        return;

    }


    const reader =
        new FileReader();


    reader.onload =
        function () {

            try {

                const data =
                    JSON.parse(
                        reader.result
                    );


                const todos =
                    Array.isArray(
                        data.todos
                    )
                    ?
                    data.todos
                    :
                    Array.isArray(
                        data
                    )
                    ?
                    data
                    :
                    null;


                if (
                    !todos
                ) {

                    throw new Error(
                        "잘못된 백업 파일"
                    );

                }


                const confirmed =
                    window.confirm(
                        "현재 Todo 데이터를 가져온 데이터로 교체할까요?"
                    );


                if (
                    !confirmed
                ) {

                    event.target.value =
                        "";


                    return;

                }


                state.todos =
                    todos.map(
                        normalizeTodo
                    );


                if (
                    data.settings
                ) {

                    state.settings = {

                        ...state.settings,

                        ...data.settings

                    };

                }


                saveTodos();

                saveSettings();

                applySettings();

                loadSettingsUI();

                renderAll();


                showToast(
                    "복원 완료",
                    "백업 데이터를 불러왔습니다."
                );

            }

            catch (
                error
            ) {

                console.error(
                    error
                );


                showToast(
                    "복원 실패",
                    "올바른 JSON 백업 파일인지 확인해주세요."
                );

            }


            event.target.value =
                "";

        };


    reader.readAsText(
        file
    );

}


/* ========================================
   CLEAR ALL
======================================== */

function clearAllTodos() {

    const confirmed =
        window.confirm(
            "모든 Todo를 삭제할까요?\n이 작업은 되돌릴 수 없습니다."
        );


    if (
        !confirmed
    ) {

        return;

    }


    state.todos =
        [];


    saveTodos();


    clearNotificationTimers();


    renderAll();


    showToast(
        "삭제 완료",
        "모든 Todo를 삭제했습니다."
    );

}


/* ========================================
   STORAGE
======================================== */

function loadTodos() {

    try {

        const raw =
            localStorage.getItem(
                TODO_STORAGE_KEY
            );


        if (
            !raw
        ) {

            return [];

        }


        const data =
            JSON.parse(
                raw
            );


        return Array.isArray(
            data
        )
        ?
        data
        :
        [];

    }

    catch (
        error
    ) {

        console.error(
            error
        );


        return [];

    }

}


function saveTodos() {

    localStorage.setItem(
        TODO_STORAGE_KEY,
        JSON.stringify(
            state.todos
        )
    );

}


/* ========================================
   NORMALIZE
======================================== */

function normalizeTodo(
    todo
) {

    return {

        ...todo,

        id:
            todo.id
            ||
            createId(),

        title:
            todo.title
            ||
            "",

        description:
            todo.description
            ||
            "",

        date:
            todo.date
            ||
            formatDate(
                new Date()
            ),

        time:
            todo.time
            ||
            "",

        category:
            todo.category
            ||
            "업무",

        priority:
            todo.priority
            ||
            "medium",

        notification:
            todo.notification
            ||
            "none",

        repeat:
            todo.repeat
            ||
            "none",

        completed:
            Boolean(
                todo.completed
            ),

        completedAt:
            todo.completedAt
            ||
            null,

        repeatSourceId:
            todo.repeatSourceId
            ||
            null,

        createdAt:
            todo.createdAt
            ||
            new Date()
                .toISOString(),

        updatedAt:
            todo.updatedAt
            ||
            new Date()
                .toISOString()

    };

}


/* ========================================
   DATE
======================================== */

function formatDate(
    date
) {

    const year =
        date.getFullYear();


    const month =
        String(
            date.getMonth() + 1
        ).padStart(
            2,
            "0"
        );


    const day =
        String(
            date.getDate()
        ).padStart(
            2,
            "0"
        );


    return `${year}-${month}-${day}`;

}


function parseDate(
    value
) {

    const [
        year,
        month,
        day
    ] =
        String(
            value
        )
        .split("-")
        .map(Number);


    return new Date(
        year,
        month - 1,
        day
    );

}


function formatKoreanDate(
    value
) {

    const date =
        parseDate(
            value
        );


    const weekdays = [
        "일",
        "월",
        "화",
        "수",
        "목",
        "금",
        "토"
    ];


    return `${date.getFullYear()}년 ${
        date.getMonth() + 1
    }월 ${
        date.getDate()
    }일 ${
        weekdays[
            date.getDay()
        ]
    }요일`;

}


function formatShortDate(
    value
) {

    const date =
        parseDate(
            value
        );


    return `${
        date.getMonth() + 1
    }/${
        date.getDate()
    }`;

}


function addRepeatDate(
    value,
    repeat
) {

    const date =
        parseDate(
            value
        );


    if (
        repeat ===
        "daily"
    ) {

        date.setDate(
            date.getDate()
            +
            1
        );

    }


    else if (
        repeat ===
        "weekly"
    ) {

        date.setDate(
            date.getDate()
            +
            7
        );

    }


    else if (
        repeat ===
        "monthly"
    ) {

        date.setMonth(
            date.getMonth()
            +
            1
        );

    }


    else if (
        repeat ===
        "yearly"
    ) {

        date.setFullYear(
            date.getFullYear()
            +
            1
        );

    }


    return formatDate(
        date
    );

}


/* ========================================
   HEADER
======================================== */

function updateHeader() {

    const today =
        new Date();


    if (
        els.headerDate
    ) {

        els.headerDate.textContent =
            `${today.getFullYear()}.${String(
                today.getMonth() + 1
            ).padStart(
                2,
                "0"
            )}.${String(
                today.getDate()
            ).padStart(
                2,
                "0"
            )}`;

    }


    if (
        els.heroDate
    ) {

        els.heroDate.textContent =
            formatKoreanDate(
                formatDate(
                    today
                )
            );

    }


    updateGreeting();

}


/* ========================================
   FILTER BUTTON
======================================== */

function updateFilterButtons() {

    document
        .querySelectorAll(
            ".filter-btn"
        )
        .forEach(
            function (button) {

                button.classList.toggle(
                    "active",

                    button.dataset.filter
                    ===
                    state.filter
                );

            }
        );

}


/* ========================================
   TOAST
======================================== */

function showToast(
    title,
    message
) {

    if (
        !els.notificationToast
    ) {

        return;

    }


    els.toastTitle.textContent =
        title;


    els.toastMessage.textContent =
        message;


    els.notificationToast.hidden =
        false;


    clearTimeout(
        showToast.timer
    );


    showToast.timer =
        setTimeout(
            function () {

                els.notificationToast.hidden =
                    true;

            },
            4000
        );

}


/* ========================================
   ID
======================================== */

function createId() {

    if (
        typeof crypto !==
            "undefined"
        &&
        typeof crypto.randomUUID ===
            "function"
    ) {

        return crypto.randomUUID();

    }


    return (
        Date.now()
        +
        "-"
        +
        Math.random()
            .toString(16)
            .slice(2)
    );

}


/* ========================================
   SECURITY
======================================== */

function escapeHtml(
    value
) {

    return String(
        value
    )

    .replaceAll(
        "&",
        "&amp;"
    )

    .replaceAll(
        "<",
        "&lt;"
    )

    .replaceAll(
        ">",
        "&gt;"
    )

    .replaceAll(
        '"',
        "&quot;"
    )

    .replaceAll(
        "'",
        "&#039;"
    );

}


function escapeAttr(
    value
) {

    return escapeHtml(
        value
    );

}

/* ========================================
   STEP 5
   QUICK TODO
   RECOMMENDATION
   FOCUS MODE
======================================== */


/* ========================================
   STEP 5 STATE
======================================== */

const step5State = {

    focusMinutes:
        25,

    focusSeconds:
        25 * 60,

    focusTimer:
        null,

    focusRunning:
        false,

    focusTodoId:
        null

};


/* ========================================
   STEP 5 INIT
======================================== */

function initStep5() {

    createQuickTodoUI();

    createRecommendationUI();

    createFocusView();

    createFocusTab();

    bindStep5Events();

    renderRecommendations();

    renderFocusTask();

}


if (
    document.readyState ===
    "loading"
) {

    document.addEventListener(
        "DOMContentLoaded",
        initStep5
    );

}

else {

    setTimeout(
        initStep5,
        0
    );

}


/* ========================================
   QUICK TODO
======================================== */

function createQuickTodoUI() {

    const tasksView =
        document.getElementById(
            "tasksView"
        );


    if (
        !tasksView
        ||
        document.getElementById(
            "step5QuickCard"
        )
    ) {

        return;

    }


    const card =
        document.createElement(
            "section"
        );


    card.className =
        "step5-quick-card";


    card.id =
        "step5QuickCard";


    card.innerHTML = `

        <p
            class="step5-quick-label"
        >
            QUICK TODO
        </p>


        <form
            class="step5-quick-form"
            id="step5QuickForm"
        >

            <input
                class="step5-quick-input"
                id="step5QuickInput"
                type="text"
                maxlength="80"
                placeholder="오늘 뭐 해야 하지?"
                autocomplete="off"
            >


            <button
                class="step5-quick-submit"
                type="submit"
                aria-label="할 일 추가"
            >
                ＋
            </button>

        </form>

    `;


    const progressCard =
        tasksView.querySelector(
            ".progress-card"
        );


    if (
        progressCard
    ) {

        tasksView.insertBefore(
            card,
            progressCard
        );

    }

}


/* ========================================
   QUICK FORM
======================================== */

function bindQuickTodo() {

    const form =
        document.getElementById(
            "step5QuickForm"
        );


    const input =
        document.getElementById(
            "step5QuickInput"
        );


    if (
        !form
        ||
        !input
    ) {

        return;

    }


    form.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const title =
                input.value.trim();


            if (
                !title
            ) {

                input.focus();

                return;

            }


            const now =
                new Date()
                    .toISOString();


            state.todos.push({

                id:
                    createId(),

                title:
                    title,

                description:
                    "",

                date:
                    state.selectedDate
                    ||
                    formatDate(
                        new Date()
                    ),

                time:
                    "",

                category:
                    "생활",

                priority:
                    "medium",

                notification:
                    "none",

                repeat:
                    "none",

                completed:
                    false,

                completedAt:
                    null,

                repeatSourceId:
                    null,

                createdAt:
                    now,

                updatedAt:
                    now

            });


            saveTodos();


            input.value =
                "";


            renderAll();


            renderRecommendations();


            renderFocusTask();


            showToast(
                "할 일 추가",
                `"${title}"을(를) 추가했습니다.`
            );

        }
    );

}


/* ========================================
   RECOMMENDATION
======================================== */

function createRecommendationUI() {

    const tasksView =
        document.getElementById(
            "tasksView"
        );


    if (
        !tasksView
        ||
        document.getElementById(
            "step5RecommendCard"
        )
    ) {

        return;

    }


    const card =
        document.createElement(
            "section"
        );


    card.id =
        "step5RecommendCard";


    card.className =
        "step5-recommend-card";


    card.innerHTML = `

        <div
            class="step5-section-head"
        >

            <div>

                <h3>
                    오늘 먼저 할 일
                </h3>

                <p>
                    우선순위와 시간을 기준으로 추천했어요.
                </p>

            </div>

        </div>


        <div
            class="step5-recommend-list"
            id="step5RecommendList"
        ></div>

    `;


    const workspace =
        tasksView.querySelector(
            ".workspace"
        );


    if (
        workspace
    ) {

        tasksView.insertBefore(
            card,
            workspace
        );

    }

}


function getRecommendedTodos() {

    const today =
        formatDate(
            new Date()
        );


    const priorityWeight = {

        high:
            0,

        medium:
            1,

        low:
            2

    };


    return [
        ...state.todos
    ]
    .filter(
        function (todo) {

            return (
                !todo.completed
                &&
                (
                    todo.date === today
                    ||
                    todo.date ===
                        state.selectedDate
                )
            );

        }
    )
    .sort(
        function (a, b) {

            return (

                (
                    priorityWeight[
                        a.priority
                    ]
                    ??
                    9
                )
                -
                (
                    priorityWeight[
                        b.priority
                    ]
                    ??
                    9
                )

                ||

                String(
                    a.time ||
                    "99:99"
                )
                .localeCompare(
                    String(
                        b.time ||
                        "99:99"
                    )
                )

            );

        }
    )
    .slice(
        0,
        3
    );

}


function renderRecommendations() {

    const list =
        document.getElementById(
            "step5RecommendList"
        );


    if (
        !list
    ) {

        return;

    }


    const todos =
        getRecommendedTodos();


    list.innerHTML =
        "";


    if (
        todos.length ===
        0
    ) {

        list.innerHTML = `

            <div
                class="
                    step5-focus-empty
                "
            >

                <div
                    class="
                        step5-focus-empty-icon
                    "
                >
                    ✓
                </div>

                <strong>
                    오늘 할 일이 모두 끝났어요!
                </strong>

            </div>

        `;


        return;

    }


    todos.forEach(
        function (todo, index) {

            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "step5-recommend-item";


            item.dataset.id =
                todo.id;


            const priorityLabel = {

                high:
                    "높음",

                medium:
                    "보통",

                low:
                    "낮음"

            }[
                todo.priority
            ] || "보통";


            item.innerHTML = `

                <span
                    class="
                        step5-rank
                    "
                >
                    ${index + 1}
                </span>


                <div>

                    <div
                        class="
                            step5-recommend-title
                        "
                    >
                        ${escapeHtml(
                            todo.title
                        )}
                    </div>


                    <div
                        class="
                            step5-recommend-meta
                        "
                    >
                        ${
                            todo.time
                            ||
                            "시간 미정"
                        }
                    </div>

                </div>


                <span
                    class="
                        step5-priority
                        ${todo.priority}
                    "
                >
                    ${priorityLabel}
                </span>

            `;


            item.addEventListener(
                "click",
                function () {

                    state.selectedDate =
                        todo.date;


                    state.calendarDate =
                        parseDate(
                            todo.date
                        );


                    state.filter =
                        "all";


                    updateFilterButtons();


                    renderCalendar();


                    renderTodoList();


                    switchView(
                        "tasks"
                    );


                    document
                        .getElementById(
                            "step5QuickCard"
                        )
                        ?.scrollIntoView(
                            {
                                behavior:
                                    "smooth",
                                block:
                                    "start"
                            }
                        );

                }
            );


            list.appendChild(
                item
            );

        }
    );

}


/* ========================================
   FOCUS TAB
======================================== */

function createFocusTab() {

    const tabs =
        document.querySelector(
            ".dashboard-tabs"
        );


    if (
        !tabs
        ||
        document.querySelector(
            '[data-view="focus"]'
        )
    ) {

        return;

    }


    const button =
        document.createElement(
            "button"
        );


    button.className =
        "dashboard-tab step5-focus-tab";


    button.dataset.view =
        "focus";


    button.type =
        "button";


    button.textContent =
        "집중";


    tabs.appendChild(
        button
    );


    button.addEventListener(
        "click",
        function () {

            switchView(
                "focus"
            );


            renderFocusTask();

        }
    );

}


function createFocusView() {

    const main =
        document.querySelector(
            ".main-wrap"
        );

    if (
        !main
        ||
        document.getElementById(
            "focusView"
        )
    ) {

        return;

    }


    const view =
        document.createElement(
            "section"
        );


    /* ★ 여기 중요 */
    view.id =
        "focusView";


    view.className =
        "view-section step5-focus-view";


    view.innerHTML = `

        <div
            class="
                step5-focus-header
            "
        >

            <p
                class="section-label"
            >
                FOCUS MODE
            </p>


            <h2>
                지금 해야 할 일에만 집중해요.
            </h2>


            <p>
                하나를 끝내고 다음 할 일로 넘어가세요.
            </p>

        </div>


        <div
            class="step5-focus-card"
            id="step5FocusCard"
        ></div>

    `;


    main.appendChild(
        view
    );

}

/* ========================================
   FOCUS TASK
======================================== */

function getFocusTodos() {

    const today =
        formatDate(
            new Date()
        );


    return [
        ...state.todos
    ]
    .filter(
        function (todo) {

            return (
                !todo.completed
                &&
                todo.date >= today
            );

        }
    )
    .sort(
        function (a, b) {

            const priorityWeight = {

                high:
                    0,

                medium:
                    1,

                low:
                    2

            };


            return (

                (
                    priorityWeight[
                        a.priority
                    ]
                    ??
                    9
                )
                -
                (
                    priorityWeight[
                        b.priority
                    ]
                    ??
                    9
                )

                ||

                String(
                    a.date
                )
                .localeCompare(
                    String(
                        b.date
                    )
                )

                ||

                String(
                    a.time ||
                    "99:99"
                )
                .localeCompare(
                    String(
                        b.time ||
                        "99:99"
                    )
                )

            );

        }
    );

}


function renderFocusTask() {

    const card =
        document.getElementById(
            "step5FocusCard"
        );


    if (
        !card
    ) {

        return;

    }


    const todos =
        getFocusTodos();


    let todo =
        state.todos.find(
            function (item) {

                return (
                    String(
                        item.id
                    )
                    ===
                    String(
                        step5State.focusTodoId
                    )
                    &&
                    !item.completed
                );

            }
        );


    if (
        !todo
    ) {

        todo =
            todos[0]
            ||
            null;

    }


    if (
        todo
    ) {

        step5State.focusTodoId =
            todo.id;


        card.innerHTML = `

            <p
                class="
                    step5-focus-label
                "
            >
                CURRENT TASK
            </p>


            <h3
                class="
                    step5-focus-title
                "
            >
                ${escapeHtml(
                    todo.title
                )}
            </h3>


            <p
                class="
                    step5-focus-meta
                "
            >
                ${formatKoreanDate(
                    todo.date
                )}
                ·
                ${
                    todo.time
                    ||
                    "시간 미정"
                }
                ·
                ${
                    todo.category
                }
            </p>


            <div
                class="step5-timer"
                id="step5Timer"
            >
                ${formatFocusTime(
                    step5State.focusSeconds
                )}
            </div>


            <div
                class="
                    step5-timer-controls
                "
            >

                <button
                    class="
                        step5-timer-btn
                        ${
                            step5State.focusMinutes ===
                            25
                            ?
                            "active"
                            :
                            ""
                        }
                    "
                    data-focus-minutes="25"
                    type="button"
                >
                    25분
                </button>


                <button
                    class="
                        step5-timer-btn
                        ${
                            step5State.focusMinutes ===
                            50
                            ?
                            "active"
                            :
                            ""
                        }
                    "
                    data-focus-minutes="50"
                    type="button"
                >
                    50분
                </button>

            </div>


            <div
                class="
                    step5-focus-actions
                "
            >

                <button
                    class="
                        primary-btn
                        step5-focus-start
                    "
                    id="step5FocusStart"
                    type="button"
                >
                    ${
                        step5State.focusRunning
                        ?
                        "일시정지"
                        :
                        "집중 시작"
                    }
                </button>


                <button
                    class="
                        secondary-btn
                        step5-focus-complete
                    "
                    id="step5FocusComplete"
                    type="button"
                >
                    할 일 완료
                </button>

            </div>

        `;


        bindFocusControls();

        updateFocusTimerUI();

        return;

    }


    card.innerHTML = `

        <div
            class="
                step5-focus-empty
            "
        >

            <div
                class="
                    step5-focus-empty-icon
                "
            >
                🎉
            </div>


            <h3>
                모든 할 일을 완료했어요!
            </h3>


            <p
                style="
                    margin-top: 8px;
                    color: var(--sub-text);
                    font-size: 13px;
                "
            >
                오늘은 충분히 잘 해냈어요.
            </p>

        </div>

    `;

}


/* ========================================
   FOCUS CONTROLS
======================================== */

function bindFocusControls() {

    document
        .querySelectorAll(
            "[data-focus-minutes]"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        step5State.focusMinutes =
                            Number(
                                button.dataset.focusMinutes
                            );


                        step5State.focusSeconds =
                            step5State.focusMinutes
                            *
                            60;


                        stopFocusTimer();


                        renderFocusTask();

                    }
                );

            }
        );


    const startButton =
        document.getElementById(
            "step5FocusStart"
        );


    const completeButton =
        document.getElementById(
            "step5FocusComplete"
        );


    if (
        startButton
    ) {

        startButton.addEventListener(
            "click",
            toggleFocusTimer
        );

    }


    if (
        completeButton
    ) {

        completeButton.addEventListener(
            "click",
            completeFocusTask
        );

    }

}


/* ========================================
   FOCUS TIMER
======================================== */

function toggleFocusTimer() {

    if (
        step5State.focusRunning
    ) {

        pauseFocusTimer();

        return;

    }


    startFocusTimer();

}


function startFocusTimer() {

    const todo =
        getCurrentFocusTodo();


    if (
        !todo
    ) {

        renderFocusTask();

        return;

    }


    step5State.focusRunning =
        true;


    updateFocusTimerUI();


    step5State.focusTimer =
        setInterval(
            function () {

                step5State.focusSeconds--;


                updateFocusTimerUI();


                if (
                    step5State.focusSeconds <=
                    0
                ) {

                    finishFocusSession();

                }

            },
            1000
        );

}


function pauseFocusTimer() {

    clearInterval(
        step5State.focusTimer
    );


    step5State.focusTimer =
        null;


    step5State.focusRunning =
        false;


    updateFocusTimerUI();

}


function stopFocusTimer() {

    clearInterval(
        step5State.focusTimer
    );


    step5State.focusTimer =
        null;


    step5State.focusRunning =
        false;

}


function finishFocusSession() {

    stopFocusTimer();


    showToast(
        "집중 시간 완료!",
        "25분 동안 집중했어요. 잘했어요! 🎉"
    );


    const todo =
        getCurrentFocusTodo();


    if (
        todo
    ) {

        const confirmed =
            window.confirm(
                `"${todo.title}"을 완료 처리할까요?`
            );


        if (
            confirmed
        ) {

            completeFocusTask();

        }
        else {

            step5State.focusSeconds =
                step5State.focusMinutes
                *
                60;


            renderFocusTask();

        }

    }

}


function updateFocusTimerUI() {

    const timer =
        document.getElementById(
            "step5Timer"
        );


    const startButton =
        document.getElementById(
            "step5FocusStart"
        );


    if (
        timer
    ) {

        timer.textContent =
            formatFocusTime(
                step5State.focusSeconds
            );


        timer.classList.toggle(
            "running",
            step5State.focusRunning
        );

    }


    if (
        startButton
    ) {

        startButton.textContent =
            step5State.focusRunning
            ?
            "일시정지"
            :
            "집중 시작";

    }

}


function formatFocusTime(
    totalSeconds
) {

    const minutes =
        Math.floor(
            totalSeconds /
            60
        );


    const seconds =
        totalSeconds %
        60;


    return `${String(
        minutes
    ).padStart(
        2,
        "0"
    )}:${String(
        seconds
    ).padStart(
        2,
        "0"
    )}`;

}


/* ========================================
   FOCUS COMPLETE
======================================== */

function getCurrentFocusTodo() {

    return state.todos.find(
        function (todo) {

            return (
                String(
                    todo.id
                )
                ===
                String(
                    step5State.focusTodoId
                )
                &&
                !todo.completed
            );

        }
    );

}


function completeFocusTask() {

    const todo =
        getCurrentFocusTodo();


    if (
        !todo
    ) {

        return;

    }


    stopFocusTimer();


    todo.completed =
        true;


    todo.completedAt =
        new Date()
            .toISOString();


    todo.updatedAt =
        new Date()
            .toISOString();


    saveTodos();


    showToast(
        "완료!",
        `"${todo.title}"을(를) 완료했어요. 🎉`
    );


    step5State.focusTodoId =
        null;


    step5State.focusSeconds =
        step5State.focusMinutes
        *
        60;


    renderAll();


    renderRecommendations();


    renderFocusTask();


    addCompletionAnimation();

}


function addCompletionAnimation() {

    const items =
        document.querySelectorAll(
            ".todo-item.completed"
        );


    if (
        items.length
    ) {

        const lastItem =
            items[
                items.length - 1
            ];


        lastItem.classList.add(
            "step5-complete-animation"
        );

    }

}


/* ========================================
   STEP 5 EVENTS
======================================== */

function bindStep5Events() {

    bindQuickTodo();


    /*
        Todo 완료 후 추천 목록 갱신
    */

    const todoList =
        document.getElementById(
            "todoList"
        );


    if (
        todoList
    ) {

        todoList.addEventListener(
            "click",
            function () {

                setTimeout(
                    function () {

                        renderRecommendations();

                        renderFocusTask();

                    },
                    30
                );

            }
        );

    }


    /*
        탭 전환 후 집중화면 새로고침
    */

    document
        .querySelectorAll(
            ".dashboard-tab"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        if (
                            button.dataset.view ===
                            "focus"
                        ) {

                            renderFocusTask();

                        }


                        if (
                            button.dataset.view ===
                            "tasks"
                        ) {

                            renderRecommendations();

                        }

                    }
                );

            }
        );

}