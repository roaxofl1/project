document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       1. D-DAY
    ========================================= */

    const weddingDate = new Date("2026-09-01T12:00:00");

    const heroDday = document.querySelector("#heroDday");
    const ddayNumber = document.querySelector("#ddayNumber");
    const ddayMessage = document.querySelector("#ddayMessage");

    function updateDday() {
        const now = new Date();
        const diff = weddingDate.getTime() - now.getTime();
        const oneDay = 1000 * 60 * 60 * 24;

        if (diff > 0) {
            const days = Math.ceil(diff / oneDay);

            heroDday.textContent = `D-${days}`;
            ddayNumber.textContent = `D-${days}`;
            ddayMessage.textContent = "소중한 날을 기다리고 있습니다.";

        } else if (Math.abs(diff) < oneDay) {

            heroDday.textContent = "D-DAY";
            ddayNumber.textContent = "D-DAY";
            ddayMessage.textContent = "오늘, 저희가 결혼합니다.";

        } else {

            const days = Math.floor(Math.abs(diff) / oneDay);

            heroDday.textContent = `D+${days}`;
            ddayNumber.textContent = `D+${days}`;
            ddayMessage.textContent = "소중한 결혼식의 추억을 함께 간직합니다.";
        }
    }

    updateDday();


    /* =========================================
       2. SCROLL REVEAL
    ========================================= */

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, observer) => {

            entries.forEach((entry) => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("is-visible");

                    // 한 번 나타난 요소는 다시 애니메이션하지 않음
                    observer.unobserve(entry.target);
                }
            });

        }, {
            threshold: 0.12,
            rootMargin: "0px 0px -30px 0px"
        });

        revealElements.forEach((element) => {
            observer.observe(element);
        });

    } else {

        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    }


    /* =========================================
       3. KAKAO MAP
       ========================================= */

    const mapContainer = document.querySelector("#kakaoMap");

    /*
       ★ 카카오맵 API가 정상적으로 불러와졌는지 확인
    */

    if (mapContainer) {

        if (typeof kakao === "undefined") {

            mapContainer.innerHTML = `
                <div style="
                    height:100%;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    text-align:center;
                    padding:20px;
                    color:#8b827b;
                    font-size:12px;
                ">
                    카카오맵 API 키를 입력해주세요.
                </div>
            `;

        } else {

            /*
                서울 신라호텔
                주소:
                서울특별시 중구 동호로 249

                좌표는 실제 신라호텔 기준 좌표
            */

            const hotelPosition = new kakao.maps.LatLng(
                37.5559,
                127.0051
            );

            const mapOption = {
                center: hotelPosition,
                level: 3
            };

            const map = new kakao.maps.Map(
                mapContainer,
                mapOption
            );

            /*
                마커 생성
            */

            const marker = new kakao.maps.Marker({
                position: hotelPosition
            });

            marker.setMap(map);

            /*
                장소명 표시
            */

            const infoWindow = new kakao.maps.InfoWindow({
                position: hotelPosition,
                content: `
                    <div style="
                        padding:8px 12px;
                        font-size:12px;
                        white-space:nowrap;
                    ">
                        서울 신라호텔 영빈관
                    </div>
                `
            });

            infoWindow.open(map, marker);


            /*
                모바일 화면 크기 변경 시
                지도 중심 유지
            */

            window.addEventListener("resize", () => {
                map.relayout();
                map.setCenter(hotelPosition);
            });
        }
    }


    /* =========================================
       4. ACCOUNT COPY
    ========================================= */

    const toast = document.querySelector("#toast");

    function showToast(message) {

        toast.textContent = message;
        toast.classList.add("is-show");

        clearTimeout(window.toastTimer);

        window.toastTimer = setTimeout(() => {
            toast.classList.remove("is-show");
        }, 1800);
    }

    document.querySelectorAll(".copy-btn").forEach((button) => {

        button.addEventListener("click", async () => {

            const account = button.dataset.copy;

            try {

                await navigator.clipboard.writeText(account);

            } catch (error) {

                const textarea = document.createElement("textarea");

                textarea.value = account;

                document.body.appendChild(textarea);

                textarea.select();

                document.execCommand("copy");

                textarea.remove();
            }

            showToast("계좌번호가 복사되었습니다.");
        });
    });


    /* =========================================
       5. GALLERY LIGHTBOX
    ========================================= */

    const lightbox = document.querySelector("#lightbox");
    const lightboxImage = document.querySelector("#lightboxImage");
    const lightboxClose = document.querySelector("#lightboxClose");

    document.querySelectorAll(".gallery-item").forEach((item) => {

        item.addEventListener("click", () => {

            const imagePath = item.dataset.image;

            lightboxImage.src = imagePath;

            lightbox.classList.add("is-open");

            document.body.style.overflow = "hidden";
        });
    });

    function closeLightbox() {

        lightbox.classList.remove("is-open");

        document.body.style.overflow = "";
    }

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", (event) => {

        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeLightbox();
        }
    });


    /* =========================================
       6. GOOGLE SHEETS GUESTBOOK
       ========================================= */

    /*
       ★ Google Apps Script Web App URL을 여기에 입력
       예:
       const GOOGLE_SCRIPT_URL =
       "https://script.google.com/macros/s/XXXX/exec";
    */

    const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFfwDPGc9BPztwpDCFYXTcBZAq3MJLeGsXw9jtp3ayCfEpNGC2DcZBEQ_N9iE3s4rD3A/exec";

    const guestbookForm = document.querySelector("#guestbookForm");
    const guestbookStatus = document.querySelector("#guestbookStatus");
    const guestbookList = document.querySelector("#guestbookList");

    const demoMessages = [];

    function escapeHtml(value) {

        const div = document.createElement("div");

        div.textContent = value;

        return div.innerHTML;
    }

    function renderGuestbook(messages) {

        guestbookList.innerHTML = "";

        if (!messages.length) {

            guestbookList.innerHTML = `
                <p style="
                    padding:30px 10px;
                    color:#a49a92;
                    text-align:center;
                    font-size:12px;
                ">
                    첫 번째 축하 메시지를 남겨주세요 ♥
                </p>
            `;

            return;
        }

        messages.forEach((item) => {

            const article = document.createElement("article");

            article.className = "guestbook-item";

            article.innerHTML = `
                <strong>${escapeHtml(item.name)}</strong>
                <time>${escapeHtml(item.date || "")}</time>
                <p>${escapeHtml(item.message)}</p>
            `;

            guestbookList.appendChild(article);
        });
    }

    renderGuestbook(demoMessages);


    guestbookForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const name = document.querySelector("#guestName").value.trim();
        const message = document.querySelector("#guestMessage").value.trim();

        if (!name || !message) {

            guestbookStatus.textContent =
                "이름과 메시지를 모두 입력해주세요.";

            return;
        }

        const data = {
            name,
            message,
            createdAt: new Date().toISOString()
        };


        /*
            Google Apps Script URL이 입력되어 있다면
            실제 Google Sheets에 저장
        */

        if (GOOGLE_SCRIPT_URL) {

            try {

                guestbookStatus.textContent = "등록 중입니다...";

                await fetch(GOOGLE_SCRIPT_URL, {
                    method: "POST",
                    mode: "no-cors",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                });

                guestbookStatus.textContent =
                    "방명록이 등록되었습니다. 감사합니다 ♥";

                guestbookForm.reset();

            } catch (error) {

                guestbookStatus.textContent =
                    "등록에 실패했습니다. 다시 시도해주세요.";
            }

            return;
        }


        /*
            URL을 아직 입력하지 않은 개발 단계에서는
            화면에만 표시
        */

        const today = new Date();

        const formattedDate =
            `${today.getFullYear()}.` +
            `${String(today.getMonth() + 1).padStart(2, "0")}.` +
            `${String(today.getDate()).padStart(2, "0")}`;

        demoMessages.unshift({
            name,
            message,
            date: formattedDate
        });

        renderGuestbook(demoMessages);

        guestbookStatus.textContent =
            "방명록이 등록되었습니다. 감사합니다 ♥";

        guestbookForm.reset();
    });

});
