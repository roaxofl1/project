# Netflix Style Web Site

HTML / CSS / JavaScript만으로 만든 넷플릭스 스타일 반응형 웹사이트입니다.

## 실행 방법

1. 압축을 해제합니다.
2. `index.html`을 브라우저에서 실행합니다.

## 포함 기능

- Netflix 스타일 고정 헤더
- 히어로 배너
- 인기 콘텐츠 / 액션 영화 / 시리즈 / 찜 목록
- 반응형 영화 카드 그리드
- 검색 오버레이
- 콘텐츠 상세 모달
- 찜하기 + `localStorage` 저장
- 모바일 메뉴 대응
- 스크롤 시 헤더 배경 변경
- ESC로 모달/검색창 닫기

## 폴더 구조

```text
netflix-style-site/
├─ index.html
├─ css/
│  └─ style.css
├─ js/
│  └─ script.js
└─ README.md
```

현재 영화 포스터는 TMDB 이미지 CDN을 예시로 사용했습니다.
실제 프로젝트에서는 TMDB API를 연결하여 영화 데이터를 동적으로 불러오면 됩니다.
