/* =========================================================
   NETFLIX STYLE MOVIE WEBSITE
   TMDB API
========================================================= */


/* =========================================================
   1. TMDB 설정
========================================================= */

const API_KEY = "fcd43ec3ffa5db4179fab968cb9c5837";

const BASE_URL = "https://api.themoviedb.org/3";

const IMAGE_URL = "https://image.tmdb.org/t/p/w500";

const BACKDROP_URL =
    "https://image.tmdb.org/t/p/original";


/* =========================================================
   2. 전역 상태
========================================================= */

const state = {

    /* 찜한 영화 ID */
    wishlist: JSON.parse(
        localStorage.getItem("netflix-wishlist") || "[]"
    )

};


/* =========================================================
   3. TMDB API 요청 함수
========================================================= */

async function fetchTMDB(endpoint, params = {}) {

    const query = new URLSearchParams({

        api_key: API_KEY,

        language: "ko-KR",

        region: "KR",

        ...params

    });


    try {

        const response = await fetch(
            `${BASE_URL}${endpoint}?${query.toString()}`
        );


        if (!response.ok) {

            throw new Error(
                `TMDB API 오류 : ${response.status}`
            );

        }


        return await response.json();


    } catch (error) {

        console.error(
            "TMDB 요청 실패 :",
            error
        );

        return null;

    }

}


/* =========================================================
   4. 영화 데이터 정리
========================================================= */

function formatMovie(movie) {

    return {

        id: movie.id,

        title:
            movie.title ||
            movie.name ||
            "제목 없음",

        overview:
            movie.overview ||
            "등록된 줄거리가 없습니다.",

        year:
            movie.release_date
                ? movie.release_date.substring(0, 4)
                : "미정",

        rating:
            movie.vote_average
                ? Number(movie.vote_average).toFixed(1)
                : "0.0",

        poster:
            movie.poster_path
                ? IMAGE_URL + movie.poster_path
                : null,

        backdrop:
            movie.backdrop_path
                ? BACKDROP_URL + movie.backdrop_path
                : null

    };

}


/* =========================================================
   5. 기본 영화 카드
========================================================= */

function createMovieCard(movie) {

    const isWished =
        state.wishlist.includes(
            Number(movie.id)
        );


    const poster =
        movie.poster ||
        "https://via.placeholder.com/500x750/222/fff?text=NO+IMAGE";


    return `

        <article
            class="movie-card"
            data-id="${movie.id}"
        >

            <img
                src="${poster}"
                alt="${movie.title}"
                loading="lazy"
                onerror="
                    this.onerror=null;
                    this.src='https://via.placeholder.com/500x750/222/fff?text=NO+IMAGE';
                "
            >


            <button
                type="button"
                class="wish-btn ${isWished ? "active" : ""}"
                data-wish="${movie.id}"
                aria-label="${isWished ? "찜 취소" : "찜하기"}"
            >
                ${isWished ? "♥" : "+"}
            </button>


            <div class="movie-overlay">

                <p class="movie-title">
                    ${movie.title}
                </p>

                <p class="movie-info">
                    ${movie.year}
                    ·
                    ⭐ ${movie.rating}
                </p>

            </div>

        </article>

    `;

}


/* =========================================================
   6. 영화 목록 출력
========================================================= */

function renderMovies(row, movies) {

    if (!row) {
        return;
    }


    if (!movies || movies.length === 0) {

        row.innerHTML = `
            <p class="movie-error">
                영화를 불러오지 못했습니다.
            </p>
        `;

        return;

    }


    row.innerHTML =
        movies
            .map(movie => createMovieCard(movie))
            .join("");


    updateWishlistButtons();

}


/* =========================================================
   7. 로딩
========================================================= */

function showLoading(row) {

    if (!row) {
        return;
    }


    row.innerHTML = `

        <div class="movie-loading">
            콘텐츠를 불러오는 중...
        </div>

    `;

}


/* =========================================================
   8. HERO 영화
========================================================= */

async function loadHeroMovie() {

    const data =
        await fetchTMDB(
            "/movie/popular",
            {
                page: 1
            }
        );


    if (
        !data ||
        !data.results ||
        !data.results.length
    ) {

        return;

    }


    const movie =
        formatMovie(
            data.results[0]
        );


    const hero =
        document.querySelector(".hero");


    if (!hero) {
        return;
    }


    /* 배경 */

    if (movie.backdrop) {

        hero.style.backgroundImage = `

            linear-gradient(
                90deg,
                rgba(0,0,0,.95) 0%,
                rgba(0,0,0,.75) 30%,
                rgba(0,0,0,.20) 70%,
                rgba(0,0,0,.30) 100%
            ),

            linear-gradient(
                0deg,
                #141414 0%,
                transparent 35%
            ),

            url("${movie.backdrop}")

        `;

    }


    /* 제목 */

    const title =
        hero.querySelector("h1");


    if (title) {

        title.textContent =
            movie.title;

    }


    /* 설명 */

    const description =
        hero.querySelector(
            ".hero-description"
        );


    if (description) {

        description.textContent =
            movie.overview;

    }


    /* 메타 */

    const meta =
        hero.querySelector(
            ".hero-meta"
        );


    if (meta) {

        meta.innerHTML = `

            <span>${movie.year}</span>

            <span>12+</span>

            <span>⭐ ${movie.rating}</span>

            <span>영화</span>

        `;

    }


    /* Hero 상세정보 버튼에 영화 ID 저장 */

    const infoButton =
        hero.querySelector(
            '[data-action="info"]'
        );


    if (infoButton) {

        infoButton.dataset.movieId =
            movie.id;

    }


    /* Hero 재생 버튼 */

    const playButton =
        hero.querySelector(
            '[data-action="play"]'
        );


    if (playButton) {

        playButton.dataset.movieId =
            movie.id;

    }

}


/* =========================================================
   9. 인기 영화
========================================================= */

async function loadPopularMovies() {

    const row =
        document.querySelector(
            '[data-row="popular"]'
        );


    if (!row) {
        return;
    }


    showLoading(row);


    const data =
        await fetchTMDB(
            "/movie/popular",
            {
                page: 1
            }
        );


    if (!data) {
        return;
    }


    const movies =
        data.results
            .slice(0, 10)
            .map(formatMovie);


    renderMovies(
        row,
        movies
    );

}


/* =========================================================
   10. 장르별 영화
========================================================= */

async function loadGenreMovies(
    rowName,
    genreId
) {

    const row =
        document.querySelector(
            `[data-row="${rowName}"]`
        );


    if (!row) {
        return;
    }


    showLoading(row);


    const data =
        await fetchTMDB(
            "/discover/movie",
            {

                with_genres:
                    genreId,

                sort_by:
                    "popularity.desc",

                "vote_count.gte":
                    30,

                page:
                    1

            }
        );


    if (!data) {
        return;
    }


    const movies =
        data.results
            .slice(0, 10)
            .map(formatMovie);


    renderMovies(
        row,
        movies
    );

}


/* =========================================================
   11. 액션
========================================================= */

async function loadActionMovies() {

    await loadGenreMovies(
        "action",
        28
    );

}


/* =========================================================
   12. 코미디
========================================================= */

async function loadComedyMovies() {

    await loadGenreMovies(
        "comedy",
        35
    );

}


/* =========================================================
   13. 공포
========================================================= */

async function loadHorrorMovies() {

    await loadGenreMovies(
        "horror",
        27
    );

}


/* =========================================================
   14. 로맨스
========================================================= */

async function loadRomanceMovies() {

    await loadGenreMovies(
        "romance",
        10749
    );

}


/* =========================================================
   15. 다큐멘터리
========================================================= */

async function loadDocumentaryMovies() {

    await loadGenreMovies(
        "documentary",
        99
    );

}


/* =========================================================
   16. 평점 높은 영화
========================================================= */

async function loadTopRatedMovies() {

    const row =
        document.querySelector(
            '[data-row="top-rated"]'
        );


    if (!row) {
        return;
    }


    showLoading(row);


    const data =
        await fetchTMDB(
            "/discover/movie",
            {

                sort_by:
                    "vote_average.desc",

                "vote_count.gte":
                    300,

                page:
                    1

            }
        );


    if (!data) {
        return;
    }


    const movies =
        data.results
            .slice(0, 10)
            .map(formatMovie);


    renderMovies(
        row,
        movies
    );

}


/* =========================================================
   ⭐ 17. 내가 찜한 콘텐츠
========================================================= */

async function loadWishlistMovies() {

    /*
        ⭐⭐⭐ 중요 ⭐⭐⭐

        네 HTML에는

        data-row="my-list"

        로 되어 있기 때문에
        wishlist가 아니라 my-list를 찾는다.
    */

    const row =
        document.querySelector(
            '[data-row="my-list"]'
        );


    const emptyMessage =
        document.querySelector(
            "#my-list .empty-message"
        );


    if (!row) {

        console.warn(
            "찜한 콘텐츠 영역을 찾을 수 없습니다."
        );

        return;

    }


    /* =====================================================
       찜한 영화가 하나도 없는 경우
    ===================================================== */

    if (
        !state.wishlist ||
        state.wishlist.length === 0
    ) {

        row.innerHTML = "";


        if (emptyMessage) {

            emptyMessage.style.display =
                "block";

        }


        return;

    }


    /* =====================================================
       찜한 영화가 있는 경우
    ===================================================== */

    if (emptyMessage) {

        emptyMessage.style.display =
            "none";

    }


    showLoading(row);


    try {

        const movies =
            await Promise.all(

                state.wishlist.map(
                    async movieId => {

                        const data =
                            await fetchTMDB(
                                `/movie/${movieId}`,
                                {}
                            );


                        if (
                            !data ||
                            !data.id
                        ) {

                            return null;

                        }


                        return formatMovie(
                            data
                        );

                    }
                )

            );


        const validMovies =
            movies.filter(
                movie => movie !== null
            );


        /*
            혹시 삭제된 영화가 있다면
            찜 목록에서도 제거
        */

        if (
            validMovies.length !==
            state.wishlist.length
        ) {

            state.wishlist =
                validMovies.map(
                    movie => movie.id
                );


            localStorage.setItem(
                "netflix-wishlist",
                JSON.stringify(
                    state.wishlist
                )
            );

        }


        renderMovies(
            row,
            validMovies
        );


    } catch (error) {

        console.error(
            "찜한 콘텐츠 불러오기 실패:",
            error
        );


        row.innerHTML = `

            <p class="movie-error">
                찜한 콘텐츠를 불러오지 못했습니다.
            </p>

        `;

    }

}


/* =========================================================
   ⭐ 18. 찜하기 / 찜 취소
========================================================= */

function toggleWishlist(movieId) {

    movieId =
        Number(movieId);


    /* 이미 찜한 영화라면 제거 */

    if (
        state.wishlist.includes(
            movieId
        )
    ) {

        state.wishlist =
            state.wishlist.filter(
                id => id !== movieId
            );

    }


    /* 찜하지 않은 영화라면 추가 */

    else {

        state.wishlist.push(
            movieId
        );

    }


    /* localStorage 저장 */

    localStorage.setItem(
        "netflix-wishlist",
        JSON.stringify(
            state.wishlist
        )
    );


    /* 모든 찜 버튼 상태 변경 */

    updateWishlistButtons();


    /*
        ⭐⭐⭐ 핵심 ⭐⭐⭐

        찜을 누르자마자
        '내가 찜한 콘텐츠' 다시 불러오기
    */

    loadWishlistMovies();

}


/* =========================================================
   19. 찜 버튼 상태 업데이트
========================================================= */

function updateWishlistButtons() {

    const buttons =
        document.querySelectorAll(
            "[data-wish]"
        );


    buttons.forEach(button => {

        const movieId =
            Number(
                button.dataset.wish
            );


        const isWished =
            state.wishlist.includes(
                movieId
            );


        button.classList.toggle(
            "active",
            isWished
        );


        button.textContent =
            isWished
                ? "♥"
                : "+";


        button.setAttribute(
            "aria-label",
            isWished
                ? "찜 취소"
                : "찜하기"
        );

    });

}


/* =========================================================
   20. 영화 상세정보 모달
========================================================= */

async function openMovieModal(movieId) {

    const modal =
        document.getElementById(
            "infoModal"
        );


    if (!modal) {

        console.warn(
            "infoModal을 찾을 수 없습니다."
        );

        return;

    }


    const data =
        await fetchTMDB(
            `/movie/${movieId}`,
            {}
        );


    if (
        !data ||
        !data.id
    ) {

        return;

    }


    const title =
        document.getElementById(
            "modalTitle"
        );


    const text =
        document.getElementById(
            "modalText"
        );


    const poster =
        document.querySelector(
            ".modal-poster"
        );


    if (title) {

        title.textContent =
            data.title;

    }


    if (text) {

        text.textContent =
            data.overview ||
            "등록된 줄거리가 없습니다.";

    }


    if (
        poster &&
        data.backdrop_path
    ) {

        poster.style.backgroundImage = `

            linear-gradient(
                0deg,
                #181818,
                transparent
            ),

            url("${BACKDROP_URL}${data.backdrop_path}")

        `;

    }


    modal.classList.add(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "false"
    );

}


/* =========================================================
   21. 영화 상세 모달 닫기
========================================================= */

function closeMovieModal() {

    const modal =
        document.getElementById(
            "infoModal"
        );


    if (!modal) {
        return;
    }


    modal.classList.remove(
        "open"
    );


    modal.setAttribute(
        "aria-hidden",
        "true"
    );

}


/* =========================================================
   22. 영화 카드 클릭
========================================================= */

document.addEventListener(
    "click",
    event => {

        /* -----------------------------------------
           찜 버튼
        ----------------------------------------- */

        const wishButton =
            event.target.closest(
                "[data-wish]"
            );


        if (wishButton) {

            event.preventDefault();

            event.stopPropagation();


            toggleWishlist(
                wishButton.dataset.wish
            );


            return;

        }


        /* -----------------------------------------
           영화 카드
        ----------------------------------------- */

        const card =
            event.target.closest(
                ".movie-card"
            );


        if (!card) {
            return;
        }


        const movieId =
            card.dataset.id;


        if (movieId) {

            openMovieModal(
                movieId
            );

        }

    }
);


/* =========================================================
   23. 영화 상세 모달 닫기 이벤트
========================================================= */

document.addEventListener(
    "click",
    event => {

        const closeButton =
            event.target.closest(
                ".modal-close"
            );


        if (closeButton) {

            closeMovieModal();

        }

    }
);


/* 모달 바깥 클릭 */

const infoModal =
    document.getElementById(
        "infoModal"
    );


if (infoModal) {

    infoModal.addEventListener(
        "click",
        event => {

            if (
                event.target ===
                infoModal
            ) {

                closeMovieModal();

            }

        }
    );

}


/* =========================================================
   24. 검색
========================================================= */

const searchInput =
    document.getElementById(
        "searchInput"
    );


const searchResults =
    document.getElementById(
        "searchResults"
    );


let searchTimer;


/* 검색 실행 */

async function searchMovies() {

    if (
        !searchInput ||
        !searchResults
    ) {

        return;

    }


    const keyword =
        searchInput.value.trim();


    /* 검색어가 없으면 비우기 */

    if (!keyword) {

        searchResults.innerHTML =
            "";

        return;

    }


    searchResults.innerHTML = `

        <p class="movie-loading">
            검색 중...
        </p>

    `;


    const data =
        await fetchTMDB(
            "/search/movie",
            {

                query:
                    keyword,

                page:
                    1,

                include_adult:
                    false

            }
        );


    if (
        !data ||
        !data.results ||
        data.results.length === 0
    ) {

        searchResults.innerHTML = `

            <p class="movie-error">
                검색 결과가 없습니다.
            </p>

        `;

        return;

    }


    const movies =
        data.results
            .slice(0, 10)
            .map(formatMovie);


    searchResults.innerHTML =
        movies
            .map(
                movie =>
                    createMovieCard(
                        movie
                    )
            )
            .join("");


    updateWishlistButtons();

}


/* 검색어 입력 */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        () => {

            clearTimeout(
                searchTimer
            );


            searchTimer =
                setTimeout(
                    searchMovies,
                    400
                );

        }
    );

}


/* =========================================================
   25. 검색창 열기
========================================================= */

const searchButton =
    document.querySelector(
        ".search-btn"
    );


const searchPanel =
    document.querySelector(
        ".search-panel"
    );


if (
    searchButton &&
    searchPanel
) {

    searchButton.addEventListener(
        "click",
        () => {

            searchPanel.classList.add(
                "open"
            );


            searchPanel.setAttribute(
                "aria-hidden",
                "false"
            );


            setTimeout(
                () => {

                    searchInput?.focus();

                },
                100
            );

        }
    );

}


/* =========================================================
   26. 검색창 닫기
========================================================= */

function closeSearch() {

    if (!searchPanel) {
        return;
    }


    searchPanel.classList.remove(
        "open"
    );


    searchPanel.setAttribute(
        "aria-hidden",
        "true"
    );


    if (searchInput) {

        searchInput.value =
            "";

    }


    if (searchResults) {

        searchResults.innerHTML =
            "";

    }

}


const closeSearchButton =
    document.querySelector(
        ".close-search"
    );


if (closeSearchButton) {

    closeSearchButton.addEventListener(
        "click",
        closeSearch
    );

}


/* =========================================================
   27. 로그인
========================================================= */

const loginButton =
    document.getElementById(
        "loginBtn"
    );


const loginModal =
    document.getElementById(
        "loginModal"
    );


const loginClose =
    document.getElementById(
        "loginClose"
    );


const loginForm =
    document.getElementById(
        "loginForm"
    );


/* 로그인 모달 열기 */

if (
    loginButton &&
    loginModal
) {

    loginButton.addEventListener(
        "click",
        () => {

            loginModal.classList.add(
                "open"
            );


            loginModal.setAttribute(
                "aria-hidden",
                "false"
            );


            document.body.classList.add(
                "modal-open"
            );


            setTimeout(
                () => {

                    document
                        .getElementById(
                            "loginEmail"
                        )
                        ?.focus();

                },
                150
            );

        }
    );

}


/* 로그인 모달 닫기 */

function closeLoginModal() {

    if (!loginModal) {
        return;
    }


    loginModal.classList.remove(
        "open"
    );


    loginModal.setAttribute(
        "aria-hidden",
        "true"
    );


    document.body.classList.remove(
        "modal-open"
    );

}


/* X 버튼 */

if (loginClose) {

    loginClose.addEventListener(
        "click",
        closeLoginModal
    );

}


/* 배경 클릭 */

if (loginModal) {

    loginModal.addEventListener(
        "click",
        event => {

            if (
                event.target === loginModal ||
                event.target.classList.contains(
                    "login-modal-bg"
                )
            ) {

                closeLoginModal();

            }

        }
    );

}


/* 로그인 */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        event => {

            event.preventDefault();


            const email =
                document.getElementById(
                    "loginEmail"
                )?.value.trim();


            const password =
                document.getElementById(
                    "loginPassword"
                )?.value.trim();


            if (
                !email ||
                !password
            ) {

                alert(
                    "이메일과 비밀번호를 입력해주세요."
                );

                return;

            }


            alert(
                "로그인 기능은 서버 연결 후 사용할 수 있습니다."
            );

        }
    );

}


/* =========================================================
   28. Hero 재생 버튼
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                '[data-action="play"]'
            );


        if (!button) {
            return;
        }


        alert(
            "재생 기능은 추후 연결할 수 있습니다."
        );

    }
);


/* =========================================================
   29. Hero 상세정보
========================================================= */

document.addEventListener(
    "click",
    event => {

        const button =
            event.target.closest(
                '[data-action="info"]'
            );


        if (!button) {
            return;
        }


        const movieId =
            button.dataset.movieId;


        if (movieId) {

            openMovieModal(
                movieId
            );

        }

    }
);


/* =========================================================
   30. ESC 키
========================================================= */

document.addEventListener(
    "keydown",
    event => {

        if (
            event.key === "Escape"
        ) {

            closeMovieModal();

            closeSearch();

            closeLoginModal();

        }

    }
);


/* =========================================================
   31. Header 스크롤 효과
========================================================= */

const header =
    document.querySelector(
        ".header"
    );


window.addEventListener(
    "scroll",
    () => {

        if (!header) {
            return;
        }


        if (
            window.scrollY > 30
        ) {

            header.classList.add(
                "scrolled"
            );

        } else {

            header.classList.remove(
                "scrolled"
            );

        }

    }
);


/* =========================================================
   32. 초기 실행
========================================================= */

async function init() {

    console.log(
        "🎬 TMDB 데이터 로딩 시작"
    );


    /*
        Promise.all을 이용해서
        여러 카테고리를 동시에 불러온다.
    */

    await Promise.all([

        /* Hero */

        loadHeroMovie(),


        /* 인기 */

        loadPopularMovies(),


        /* 액션 */

        loadActionMovies(),


        /* 코미디 */

        loadComedyMovies(),


        /* 공포 */

        loadHorrorMovies(),


        /* 로맨스 */

        loadRomanceMovies(),


        /* 다큐멘터리 */

        loadDocumentaryMovies(),


        /* 평점 높은 영화 */

        loadTopRatedMovies(),


        /*
            ⭐⭐⭐⭐⭐
            내가 찜한 콘텐츠
        */

        loadWishlistMovies()

    ]);


    /*
        모든 카드가 만들어진 후
        찜 버튼 상태를 다시 확인
    */

    updateWishlistButtons();


    console.log(
        "✅ TMDB 데이터 로딩 완료"
    );

}


/* =========================================================
   33. 실행
========================================================= */

init();