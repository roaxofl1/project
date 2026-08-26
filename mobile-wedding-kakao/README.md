# 💍 김민혁 ♥ 이서영 모바일 청첩장

PRD를 기준으로 제작한 모바일 우선 청첩장입니다.

## 파일 구조

```text
mobile-wedding-kakao/
├── index.html
├── css/
│   └── style.css
├── js/
│   └── script.js
└── images/
```

---

# 1. 카카오맵 API 키 입력

`index.html`의 `<head>` 부분에 아래 코드가 있습니다.

```html
<script
    type="text/javascript"
    src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=여기에_자바스크립트_API키_입력&libraries=services">
</script>
```

**`여기에_자바스크립트_API키_입력` 부분만 본인의 JavaScript 키로 변경하세요.**

예:

```html
<script
    type="text/javascript"
    src="https://dapi.kakao.com/v2/maps/sdk.js?appkey=123456789abcdef&libraries=services">
</script>
```

카카오맵 Web SDK는 **REST API 키가 아니라 JavaScript 키**를 사용합니다.

또한 카카오디벨로퍼스에서 해당 JavaScript 키의 **JavaScript SDK 도메인**을 등록해야 합니다.

---

# 2. 카카오맵 설정

카카오디벨로퍼스에서:

```text
앱 생성
↓
카카오맵 API 사용 설정 ON
↓
플랫폼 키
↓
JavaScript 키
↓
JavaScript SDK 도메인 등록
```

로 설정합니다.

로컬 테스트라면 사용하는 환경에 맞춰 도메인을 등록하세요.

실제 배포 시에는 청첩장 주소의 도메인을 등록하면 됩니다.

---

# 3. 지도 위치

현재 지도 중심은 서울 신라호텔 영빈관 기준으로 설정되어 있습니다.

`js/script.js`에서 다음 부분을 찾으면 됩니다.

```javascript
const hotelPosition = new kakao.maps.LatLng(
    37.5559,
    127.0051
);
```

다른 장소로 변경하려면 위도/경도를 변경합니다.

---

# 4. 이미지

이미지를 `images` 폴더에 넣습니다.

```text
./images/main.jpg
./images/wedding01.jpg
./images/wedding02.jpg
./images/wedding03.jpg
./images/wedding04.jpg
./images/wedding05.jpg
```

---

# 5. 전화번호

`index.html`에서:

```html
href="tel:010-0000-0000"
```

를 실제 신랑/신부 전화번호로 변경합니다.

---

# 6. Google Sheets 방명록

`js/script.js`에서:

```javascript
const GOOGLE_SCRIPT_URL = "";
```

에 Google Apps Script Web App URL을 입력합니다.

예:

```javascript
const GOOGLE_SCRIPT_URL =
    "https://script.google.com/macros/s/XXXX/exec";
```

URL을 입력하지 않은 상태에서는 화면에만 방명록이 추가됩니다.

---

# 7. 구현 기능

- 모바일 First
- D-Day 자동 계산
- D-Day 애니메이션
- 스크롤 Reveal
- 아래 → 위 등장 애니메이션
- Intersection Observer
- 웨딩 갤러리
- 사진 Lightbox
- 전화 연결
- 카카오맵
- 카카오맵 길찾기 페이지 연결
- 계좌번호 복사
- Google Sheets 방명록 연결 구조
- 모바일 접근성
- `prefers-reduced-motion` 지원
