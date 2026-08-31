/* =========================================================
   STREAMFLIX
   TMDB MOVIE APP
========================================================= */


/* =========================================================
   기본 설정
========================================================= */

const API_KEY = "fcd43ec3ffa5db4179fab968cb9c5837";
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_URL = "https://image.tmdb.org/t/p/original";
const POSTER_URL = "https://image.tmdb.org/t/p/w500";


/* =========================================================
   DOM
========================================================= */

const rows = document.querySelectorAll(".movie-row");

const searchBtn = document.querySelector(".search-btn");
const searchPanel = document.querySelector(".search-panel");
const closeSearch = document.querySelector(".close-search");
const searchInput = document.querySelector("#searchInput");
const searchResults = document.querySelector("#searchResults");

const loginBtn = document.querySelector("#loginBtn");
const loginModal = document.querySelector("#loginModal");
const loginClose = document.querySelector("#loginClose");
const loginForm = document.querySelector("#loginForm");

const infoModal = document.querySelector("#infoModal");
const modalClose = document.querySelector(".modal-close");

const hero = document.querySelector(".hero");
const heroContent = document.querySelector(".hero-content");
const heroBackdrop = document.querySelector(".hero-backdrop");
const soundBtn = document.querySelector(".sound-btn");


/* =========================================================
   영화 데이터
========================================================= */

const movieData = {
    popular: [],
    action: [],
    comedy: [],
    horror: [],
    romance: [],
    documentary: [],
    "top-rated": [],
    "my-list": []
};


/* =========================================================
   찜 목록
========================================================= */

let wishlist = JSON.parse(
    localStorage.getItem("streamflix_wishlist") || "[]"
);


/* =========================================================
   TMDB 요청
========================================================= */

async function fetchTMDB(endpoint) {

    try {

        const separator = endpoint.includes("?") ? "&" : "?";

        const response = await fetch(
            `${BASE_URL}${endpoint}${separator}api_key=${API_KEY}&language=ko-KR`
        );

        if (!response.ok) {
            throw new Error("TMDB 요청 실패");
        }

        return await response.json();

    } catch (error) {

        console.error("TMDB ERROR:", error);

        return null;
    }
}


/* =========================================================
   영화 목록 가져오기
========================================================= */

async function loadMovies() {

    const requests = [

        [
            "popular",
            "/movie/popular?region=KR&page=1"
        ],

        [
            "action",
            "/discover/movie?with_genres=28&sort_by=popularity.desc&page=1"
        ],

        [
            "comedy",
            "/discover/movie?with_genres=35&sort_by=popularity.desc&page=1"
        ],

        [
            "horror",
            "/discover/movie?with_genres=27&sort_by=popularity.desc&page=1"
        ],

        [
            "romance",
            "/discover/movie?with_genres=10749&sort_by=popularity.desc&page=1"
        ],

        [
            "documentary",
            "/discover/movie?with_genres=99&sort_by=popularity.desc&page=1"
        ],

        [
            "top-rated",
            "/movie/top_rated?region=KR&page=1"
        ]

    ];


    await Promise.all(

        requests.map(
            async ([category, endpoint]) => {

                const data = await fetchTMDB(endpoint);

                if (data && data.results) {

                    movieData[category] =
                        data.results.filter(
                            movie => movie.poster_path
                        );
                }

            }
        )

    );


    /* 영화 카드 출력 */

    renderAllRows();


    /* Hero 영상 */

    await setupRandomHero();


    /* 찜 목록 */

    renderWishlist();
}


/* =========================================================
   모든 영화 Row 출력
========================================================= */

function renderAllRows() {

    Object.keys(movieData).forEach(category => {

        if (category === "my-list") {
            return;
        }

        renderMovieRow(
            category,
            movieData[category]
        );

    });
}


/* =========================================================
   영화 Row
========================================================= */

function renderMovieRow(category, movies) {

    const row =
        document.querySelector(
            `.movie-row[data-row="${category}"]`
        );

    if (!row) {
        return;
    }


    row.innerHTML = "";


    if (!movies || movies.length === 0) {

        row.innerHTML =
            `<p class="empty-result">영화를 불러올 수 없습니다.</p>`;

        return;
    }


    /*
       한 화면에 6개가 보이도록
       카드 자체는 CSS에서 6등분
    */

    movies.slice(0, 20).forEach(movie => {

        row.appendChild(
            createMovieCard(movie)
        );

    });


    setupSlider(row);
}


/* =========================================================
   영화 카드 생성
========================================================= */

function createMovieCard(movie) {

    const card =
        document.createElement("article");

    card.className = "movie-card";

    card.dataset.movieId = movie.id;


    const poster =
        movie.poster_path
            ? `${POSTER_URL}${movie.poster_path}`
            : "";


    const title =
        movie.title ||
        movie.name ||
        "제목 없음";


    const year =
        movie.release_date
            ? movie.release_date.substring(0, 4)
            : "정보 없음";


    const rating =
        movie.vote_average
            ? Number(movie.vote_average).toFixed(1)
            : "0.0";


    card.innerHTML = `

        <img
            src="${poster}"
            alt="${escapeHTML(title)}"
            loading="lazy"
        >

        <button
            class="wish-btn"
            type="button"
            aria-label="찜하기"
        >
            +
        </button>

        <div class="movie-overlay">

            <strong class="movie-title">
                ${escapeHTML(title)}
            </strong>

            <span class="movie-info">
                ${year} · ⭐ ${rating}
            </span>

            <p class="movie-overview">
                ${escapeHTML(
                    movie.overview ||
                    "등록된 줄거리가 없습니다."
                )}
            </p>

        </div>
    `;


    /* =====================================================
       찜 버튼
    ===================================================== */

    const wishBtn =
        card.querySelector(".wish-btn");


    updateWishButton(
        wishBtn,
        movie.id
    );


    wishBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            toggleWishlist(movie);

        }
    );


    /* =====================================================
       카드 클릭 → 상세정보
    ===================================================== */

    card.addEventListener(
        "click",
        event => {

            if (
                event.target.closest(".wish-btn")
            ) {
                return;
            }

            openMovieInfo(movie);

        }
    );


    return card;
}


/* =========================================================
   HTML 문자 처리
========================================================= */

function escapeHTML(text) {

    if (!text) {
        return "";
    }

    return String(text)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}


/* =========================================================
   찜 버튼 상태
========================================================= */

function updateWishButton(button, movieId) {

    if (!button) {
        return;
    }


    const exists =
        wishlist.some(
            movie => movie.id === movieId
        );


    if (exists) {

        button.classList.add("active");
        button.textContent = "♥";
        button.setAttribute(
            "aria-label",
            "찜 해제"
        );

    } else {

        button.classList.remove("active");
        button.textContent = "+";
        button.setAttribute(
            "aria-label",
            "찜하기"
        );

    }
}


/* =========================================================
   찜하기 토글
========================================================= */

function toggleWishlist(movie) {

    const index =
        wishlist.findIndex(
            item => item.id === movie.id
        );


    if (index === -1) {

        wishlist.push(movie);

    } else {

        wishlist.splice(index, 1);

    }


    localStorage.setItem(
        "streamflix_wishlist",
        JSON.stringify(wishlist)
    );


    /* 모든 카드의 버튼 상태 갱신 */

    document
        .querySelectorAll(
            `.movie-card[data-movie-id="${movie.id}"] .wish-btn`
        )
        .forEach(button => {

            updateWishButton(
                button,
                movie.id
            );

        });


    renderWishlist();
}


/* =========================================================
   찜한 콘텐츠
========================================================= */

function renderWishlist() {

    const row =
        document.querySelector(
            '.movie-row[data-row="my-list"]'
        );

    if (!row) {
        return;
    }


    const emptyMessage =
        document.querySelector(
            "#my-list .empty-message"
        );


    row.innerHTML = "";


    if (wishlist.length === 0) {

        if (emptyMessage) {
            emptyMessage.style.display = "block";
        }

        return;
    }


    if (emptyMessage) {
        emptyMessage.style.display = "none";
    }


    wishlist.forEach(movie => {

        row.appendChild(
            createMovieCard(movie)
        );

    });


    setupSlider(row);
}


/* =========================================================
   슬라이더
========================================================= */

function setupSlider(row) {

    if (!row) {
        return;
    }


    const section =
        row.closest(".content-section");


    if (!section) {
        return;
    }


    /* 기존 버튼 제거 */

    section
        .querySelectorAll(".slider-btn")
        .forEach(button => button.remove());


    const sliderWrap =
        document.createElement("div");

    sliderWrap.className = "movie-slider";


    /* row를 slider wrapper로 이동 */

    row.parentNode.insertBefore(
        sliderWrap,
        row
    );

    sliderWrap.appendChild(row);


    /* 이전 버튼 */

    const prev =
        document.createElement("button");

    prev.className =
        "slider-btn slider-prev";

    prev.type = "button";

    prev.innerHTML = "‹";

    prev.setAttribute(
        "aria-label",
        "이전 영화"
    );


    /* 다음 버튼 */

    const next =
        document.createElement("button");

    next.className =
        "slider-btn slider-next";

    next.type = "button";

    next.innerHTML = "›";

    next.setAttribute(
        "aria-label",
        "다음 영화"
    );


    sliderWrap.appendChild(prev);
    sliderWrap.appendChild(next);


    /* =====================================================
       한 장씩 이동
    ===================================================== */

    function getStep() {

        const card =
            row.querySelector(".movie-card");

        if (!card) {
            return 0;
        }

        const gap = 10;

        return card.offsetWidth + gap;
    }


    prev.addEventListener(
        "click",
        () => {

            row.scrollBy({
                left: -getStep(),
                behavior: "smooth"
            });

        }
    );


    next.addEventListener(
        "click",
        () => {

            row.scrollBy({
                left: getStep(),
                behavior: "smooth"
            });

        }
    );


    /* =====================================================
       버튼 표시 상태
    ===================================================== */

    function updateButtons() {

        const maxScroll =
            row.scrollWidth -
            row.clientWidth;


        if (row.scrollLeft <= 5) {

            prev.classList.add(
                "disabled"
            );

        } else {

            prev.classList.remove(
                "disabled"
            );

        }


        if (
            row.scrollLeft >=
            maxScroll - 5
        ) {

            next.classList.add(
                "disabled"
            );

        } else {

            next.classList.remove(
                "disabled"
            );

        }

    }


    row.addEventListener(
        "scroll",
        updateButtons
    );


    window.addEventListener(
        "resize",
        updateButtons
    );


    updateButtons();


    /* =====================================================
       마우스 드래그
    ===================================================== */

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;


    row.addEventListener(
        "mousedown",
        event => {

            isDown = true;

            row.classList.add(
                "dragging"
            );

            startX = event.pageX -
                row.offsetLeft;

            scrollLeft =
                row.scrollLeft;

        }
    );


    row.addEventListener(
        "mouseleave",
        () => {

            isDown = false;

            row.classList.remove(
                "dragging"
            );

        }
    );


    row.addEventListener(
        "mouseup",
        () => {

            isDown = false;

            row.classList.remove(
                "dragging"
            );

        }
    );


    row.addEventListener(
        "mousemove",
        event => {

            if (!isDown) {
                return;
            }

            event.preventDefault();

            const x =
                event.pageX -
                row.offsetLeft;

            const walk =
                (x - startX) * 1.2;

            row.scrollLeft =
                scrollLeft - walk;

        }
    );
}


/* =========================================================
   HERO
========================================================= */

let currentHeroMovie = null;
let currentHeroVideoKey = null;


/* =========================================================
   Hero 후보 가져오기
========================================================= */

async function setupRandomHero() {

    let candidates = [];


    /*
       인기 영화 + 평점 높은 영화에서
       영상 후보를 가져온다.
    */

    candidates = [
        ...(movieData.popular || []),
        ...(movieData["top-rated"] || [])
    ];


    /* 중복 제거 */

    const uniqueMovies =
        Array.from(
            new Map(
                candidates.map(
                    movie => [movie.id, movie]
                )
            ).values()
        );


    /*
       영상이 실제 존재하는 영화만 찾는다.
       너무 많은 요청을 하지 않도록 앞쪽 영화만 검사.
    */

    const checkMovies =
        uniqueMovies.slice(0, 10);


    const results =
        await Promise.all(

            checkMovies.map(
                async movie => {

                    const data =
                        await fetchTMDB(
                            `/movie/${movie.id}/videos`
                        );


                    if (
                        !data ||
                        !data.results
                    ) {
                        return null;
                    }


                    const video =
                        findYouTubeVideo(
                            data.results
                        );


                    if (!video) {
                        return null;
                    }


                    return {
                        movie,
                        video
                    };

                }
            )

        );


    const valid =
        results.filter(Boolean);


    /*
       예고편이 있는 영화가 없으면
       기존 인기 영화 중 하나를 Hero로 사용
    */

    if (valid.length === 0) {

        if (uniqueMovies.length > 0) {

            setHero(
                uniqueMovies[
                    Math.floor(
                        Math.random() *
                        uniqueMovies.length
                    )
                ],
                null
            );

        }

        return;
    }


    /*
       랜덤 Hero
    */

    const selected =
        valid[
            Math.floor(
                Math.random() *
                valid.length
            )
        ];


    setHero(
        selected.movie,
        selected.video
    );
}


/* =========================================================
   YouTube 영상 찾기
========================================================= */

function findYouTubeVideo(videos) {

    if (!videos || videos.length === 0) {
        return null;
    }


    /*
       우선순위

       1. Trailer
       2. Teaser
       3. Featurette
    */

    const priority = [
        "Trailer",
        "Teaser",
        "Featurette"
    ];


    for (
        const type of priority
    ) {

        const found =
            videos.find(
                video =>
                    video.site === "YouTube" &&
                    video.type === type &&
                    video.key
            );


        if (found) {
            return found;
        }

    }


    return null;
}


/* =========================================================
   Hero 출력
========================================================= */

function setHero(movie, video) {

    if (!hero || !movie) {
        return;
    }


    currentHeroMovie = movie;

    currentHeroVideoKey =
        video ? video.key : null;


    /*
       기존 영상 제거
    */

    const oldVideo =
        hero.querySelector(
            ".hero-video"
        );


    if (oldVideo) {
        oldVideo.remove();
    }


    /*
       배경 이미지
    */

    if (heroBackdrop) {

        heroBackdrop.style.backgroundImage =
            movie.backdrop_path
                ? `url("${IMAGE_URL}${movie.backdrop_path}")`
                : movie.poster_path
                    ? `url("${IMAGE_URL}${movie.poster_path}")`
                    : "none";

    }


    /*
       Hero 텍스트
    */

    const title =
        movie.title ||
        movie.name ||
        "영화";


    const year =
        movie.release_date
            ? movie.release_date.substring(0, 4)
            : "";


    const rating =
        movie.vote_average
            ? Number(
                movie.vote_average
            ).toFixed(1)
            : "0.0";


    if (heroContent) {

        heroContent.innerHTML = `

            <p class="hero-kicker">
                STREAMFLIX ORIGINAL
            </p>

            <h1>
                ${escapeHTML(title)}
            </h1>

            <div class="hero-meta">

                <span>
                    ${year}
                </span>

                <span>
                    12+
                </span>

                <span>
                    ⭐ ${rating}
                </span>

                <span>
                    영화
                </span>

            </div>

            <p class="hero-description">
                ${escapeHTML(
                    movie.overview ||
                    "등록된 줄거리가 없습니다."
                )}
            </p>

            <div class="hero-buttons">

                <button
                    class="primary-btn"
                    data-action="play"
                    type="button"
                >
                    ▶ 재생
                </button>

                <button
                    class="secondary-btn"
                    data-action="info"
                    type="button"
                >
                    ⓘ 상세 정보
                </button>

            </div>
        `;


        bindHeroButtons();

    }


    /*
       실제 YouTube 영상이 있는 경우
    */

    if (video && video.key) {

        const iframe =
            document.createElement("iframe");


        iframe.className =
            "hero-video";


        iframe.src =
            `https://www.youtube.com/embed/${video.key}` +
            `?autoplay=1` +
            `&mute=1` +
            `&controls=0` +
            `&loop=1` +
            `&playlist=${video.key}` +
            `&rel=0` +
            `&playsinline=1` +
            `&modestbranding=1`;


        iframe.setAttribute(
            "allow",
            "autoplay; encrypted-media; picture-in-picture"
        );


        iframe.setAttribute(
            "allowfullscreen",
            ""
        );


        iframe.setAttribute(
            "frameborder",
            "0"
        );


        /*
           hero 맨 앞에 영상 삽입
        */

        hero.insertBefore(
            iframe,
            hero.firstChild
        );


        /*
           소리 버튼
        */

        if (soundBtn) {

            soundBtn.textContent =
                "🔇";

            soundBtn.onclick =
                toggleHeroSound;

        }

    }
}


/* =========================================================
   Hero 버튼 이벤트
========================================================= */

function bindHeroButtons() {

    const playButton =
        hero.querySelector(
            '[data-action="play"]'
        );


    const infoButton =
        hero.querySelector(
            '[data-action="info"]'
        );


    if (playButton) {

        playButton.addEventListener(
            "click",
            () => {

                if (
                    currentHeroVideoKey
                ) {

                    window.open(
                        `https://www.youtube.com/watch?v=${currentHeroVideoKey}`,
                        "_blank"
                    );

                } else if (
                    currentHeroMovie
                ) {

                    openMovieInfo(
                        currentHeroMovie
                    );

                }

            }
        );

    }


    if (infoButton) {

        infoButton.addEventListener(
            "click",
            () => {

                if (currentHeroMovie) {

                    openMovieInfo(
                        currentHeroMovie
                    );

                }

            }
        );

    }
}


/* =========================================================
   Hero 음소거
========================================================= */

function toggleHeroSound() {

    /*
       YouTube iframe은 일반 DOM만으로
       음소거 상태를 직접 변경할 수 없기 때문에
       YouTube IFrame API를 사용한다.
    */

    if (!currentHeroVideoKey) {
        return;
    }


    if (
        typeof YT === "undefined" ||
        !YT.Player
    ) {

        loadYouTubeAPI();

        return;
    }


    if (!window.heroPlayer) {

        window.heroPlayer =
            new YT.Player(
                hero.querySelector(
                    ".hero-video"
                ),
                {

                    events: {

                        onReady: event => {

                            event.target.unMute();

                            if (soundBtn) {
                                soundBtn.textContent =
                                    "🔊";
                            }

                        }

                    }

                }
            );

    } else {

        const player =
            window.heroPlayer;


        /*
           현재 음소거 여부 확인 후 토글
        */

        if (
            player.isMuted()
        ) {

            player.unMute();

            if (soundBtn) {
                soundBtn.textContent =
                    "🔊";
            }

        } else {

            player.mute();

            if (soundBtn) {
                soundBtn.textContent =
                    "🔇";
            }

        }

    }
}


/* =========================================================
   YouTube API 로딩
========================================================= */

function loadYouTubeAPI() {

    if (
        document.querySelector(
            'script[src="https://www.youtube.com/iframe_api"]'
        )
    ) {
        return;
    }


    const script =
        document.createElement("script");


    script.src =
        "https://www.youtube.com/iframe_api";


    document.head.appendChild(
        script
    );
}


/* =========================================================
   영화 상세 정보
========================================================= */

function openMovieInfo(movie) {

    if (!infoModal) {
        return;
    }


    const title =
        document.querySelector(
            "#modalTitle"
        );


    const text =
        document.querySelector(
            "#modalText"
        );


    const poster =
        document.querySelector(
            ".modal-poster"
        );


    if (title) {

        title.textContent =
            movie.title ||
            movie.name ||
            "영화";

    }


    if (text) {

        text.textContent =
            movie.overview ||
            "등록된 줄거리가 없습니다.";

    }


    if (
        poster &&
        movie.poster_path
    ) {

        poster.style.backgroundImage =
            `url("${IMAGE_URL}${movie.poster_path}")`;

    }


    infoModal.setAttribute(
        "aria-hidden",
        "false"
    );


    infoModal.classList.add(
        "open"
    );


    document.body.classList.add(
        "modal-open"
    );
}


/* =========================================================
   상세 모달 닫기
========================================================= */

function closeInfoModal() {

    if (!infoModal) {
        return;
    }


    infoModal.setAttribute(
        "aria-hidden",
        "true"
    );


    infoModal.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "modal-open"
    );
}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeInfoModal
    );

}


if (infoModal) {

    infoModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                infoModal
            ) {

                closeInfoModal();

            }

        }
    );

}


/* =========================================================
   검색창 열기
========================================================= */

function openSearch() {

    if (!searchPanel) {
        return;
    }


    searchPanel.setAttribute(
        "aria-hidden",
        "false"
    );


    searchPanel.classList.add(
        "open"
    );


    document.body.classList.add(
        "modal-open"
    );


    setTimeout(
        () => {

            if (searchInput) {
                searchInput.focus();
            }

        },
        100
    );
}


function closeSearchPanel() {

    if (!searchPanel) {
        return;
    }


    searchPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    searchPanel.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


if (searchBtn) {

    searchBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();
            event.stopPropagation();

            openSearch();

        }
    );

}


if (closeSearch) {

    closeSearch.addEventListener(
        "click",
        event => {

            event.preventDefault();

            closeSearchPanel();

        }
    );

}


/* =========================================================
   검색
========================================================= */

let searchTimer = null;


if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimer
            );


            const keyword =
                searchInput.value.trim();


            if (!keyword) {

                searchResults.innerHTML =
                    "";

                return;

            }


            searchTimer =
                setTimeout(
                    () => {

                        searchMovies(
                            keyword
                        );

                    },
                    350
                );

        }
    );

}


async function searchMovies(keyword) {

    if (!searchResults) {
        return;
    }


    searchResults.innerHTML =
        `<div class="movie-loading">
            검색 중...
        </div>`;


    const data =
        await fetchTMDB(
            `/search/movie?query=${encodeURIComponent(keyword)}&page=1&include_adult=false`
        );


    if (
        !data ||
        !data.results
    ) {

        searchResults.innerHTML =
            `<p class="empty-result">
                검색 결과가 없습니다.
            </p>`;

        return;
    }


    const results =
        data.results.filter(
            movie => movie.poster_path
        );


    if (results.length === 0) {

        searchResults.innerHTML =
            `<p class="empty-result">
                검색 결과가 없습니다.
            </p>`;

        return;
    }


    searchResults.innerHTML = "";


    /*
       검색 결과도 카드 사용
    */

    results
        .slice(0, 20)
        .forEach(movie => {

            searchResults.appendChild(
                createMovieCard(movie)
            );

        });

}


/* =========================================================
   로그인
========================================================= */

function openLogin() {

    if (!loginModal) {
        return;
    }


    loginModal.setAttribute(
        "aria-hidden",
        "false"
    );


    loginModal.classList.add(
        "open"
    );


    document.body.classList.add(
        "modal-open"
    );


    const email =
        document.querySelector(
            "#loginEmail"
        );


    if (email) {

        setTimeout(
            () => email.focus(),
            100
        );

    }
}


function closeLogin() {

    if (!loginModal) {
        return;
    }


    loginModal.setAttribute(
        "aria-hidden",
        "true"
    );


    loginModal.classList.remove(
        "open"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


if (loginBtn) {

    loginBtn.addEventListener(
        "click",
        event => {

            event.preventDefault();

            openLogin();

        }
    );

}


if (loginClose) {

    loginClose.addEventListener(
        "click",
        closeLogin
    );

}


if (loginModal) {

    loginModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                loginModal
            ) {

                closeLogin();

            }

        }
    );

}


/* =========================================================
   로그인 제출
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.querySelector(
                    "#loginEmail"
                )?.value.trim();


            const password =
                document.querySelector(
                    "#loginPassword"
                )?.value;


            if (!email || !password) {
                return;
            }


            /*
               실제 회원 인증 서버가 없는
               개인 프로젝트이므로
               UI 로그인만 처리
            */

            localStorage.setItem(
                "streamflix_logged_in",
                "true"
            );


            closeLogin();


            if (loginBtn) {

                loginBtn.textContent =
                    "로그아웃";

            }

        }
    );

}


/* =========================================================
   로그인 상태
========================================================= */

function checkLoginState() {

    if (!loginBtn) {
        return;
    }


    const loggedIn =
        localStorage.getItem(
            "streamflix_logged_in"
        ) === "true";


    if (loggedIn) {

        loginBtn.textContent =
            "로그아웃";


        loginBtn.onclick =
            () => {

                localStorage.removeItem(
                    "streamflix_logged_in"
                );

                loginBtn.textContent =
                    "로그인";

            };

    }

}


/* =========================================================
   ESC 키
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeSearchPanel();
            closeLogin();
            closeInfoModal();

        }

    }
);


/* =========================================================
   초기 실행
========================================================= */

document.addEventListener(
    "DOMContentLoaded",
    async () => {

        checkLoginState();

        await loadMovies();

    }
);
/* =========================================================
   HERO YOUTUBE TRAILER
   ※ 다른 기능 건드리지 않음
========================================================= */

(function initHeroVideo() {

    const heroVideo = document.getElementById("heroVideo");

    if (!heroVideo) {
        console.warn("heroVideo iframe을 찾을 수 없습니다.");
        return;
    }

    /*
     * TMDB에서 예고편이 있는 영화 찾기
     */
    async function findTrailer() {

        try {

            // 현재 인기 영화 목록 가져오기
            const movieResponse = await fetch(
                `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=1`
            );

            const movieData = await movieResponse.json();

            if (!movieData.results || !movieData.results.length) {
                return;
            }


            /*
             * 영화들을 순서대로 확인하면서
             * 실제 YouTube 예고편이 있는 영화 찾기
             */
            const movies = [...movieData.results]
                .sort(() => Math.random() - 0.5);


            for (const movie of movies) {

                try {

                    const videoResponse = await fetch(
                        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=ko-KR`
                    );

                    const videoData = await videoResponse.json();

                    if (!videoData.results) {
                        continue;
                    }


                    /*
                     * YouTube Trailer 우선
                     */
                    let trailer = videoData.results.find(video =>
                        video.site === "YouTube" &&
                        video.type === "Trailer" &&
                        video.official === true
                    );


                    /*
                     * 공식 Trailer가 없으면
                     * 일반 Trailer
                     */
                    if (!trailer) {

                        trailer = videoData.results.find(video =>
                            video.site === "YouTube" &&
                            video.type === "Trailer"
                        );

                    }


                    /*
                     * Trailer가 없으면 Teaser
                     */
                    if (!trailer) {

                        trailer = videoData.results.find(video =>
                            video.site === "YouTube" &&
                            video.type === "Teaser"
                        );

                    }


                    if (!trailer || !trailer.key) {
                        continue;
                    }


                    /*
                     * YouTube 영상 ID
                     */
                    const videoId = trailer.key;


                    /*
                     * Hero 영상 설정
                     *
                     * mute=1
                     * → 브라우저 자동재생 정책 때문에 필요
                     */
                    heroVideo.src =
                        `https://www.youtube-nocookie.com/embed/${videoId}` +
                        `?autoplay=1` +
                        `&mute=1` +
                        `&controls=0` +
                        `&loop=1` +
                        `&playlist=${videoId}` +
                        `&playsinline=1` +
                        `&rel=0` +
                        `&modestbranding=1`;


                    /*
                     * 현재 Hero 영화의 배경 이미지도 같이 변경
                     *
                     * 기존 Hero 디자인은 그대로 유지
                     */
                    const hero = document.querySelector(".hero");

                    if (hero && movie.backdrop_path) {

                        hero.style.backgroundImage =
                            `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`;

                    }


                    console.log(
                        "Hero Trailer 재생:",
                        movie.title,
                        videoId
                    );


                    /*
                     * 첫 번째 정상 Trailer를 찾았으면 종료
                     */
                    return;

                } catch (error) {

                    console.warn(
                        "Trailer 확인 실패:",
                        movie.title,
                        error
                    );

                }

            }


            console.warn(
                "재생 가능한 YouTube Trailer를 찾지 못했습니다."
            );

        } catch (error) {

            console.error(
                "Hero 영상 불러오기 실패:",
                error
            );

        }

    }


    /*
     * 페이지 로딩 후 실행
     */
    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            findTrailer
        );

    } else {

        findTrailer();

    }

})();
/* =========================================================
   NAVIGATION - 앵커 이동
========================================================= */

document.querySelectorAll('.nav a').forEach(link => {

    link.addEventListener('click', function (e) {

        const targetId = this.getAttribute('href');

        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        const target = document.querySelector(targetId);

        if (!target) {
            return;
        }

        e.preventDefault();

        target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });

    });

});