# WEATHER APP

OpenWeather API를 이용한 전 세계 날씨 정보 앱입니다.

## 파일 구조

```text
weather_app/
├── index.html
├── css/
│   └── style.css
└── js/
    └── app.js
```

## 실행 방법

1. OpenWeather에서 API Key를 발급합니다.
2. `js/app.js`를 엽니다.
3. 아래 부분을 실제 API Key로 교체합니다.

```javascript
const API_KEY = "YOUR_API_KEY";
```

4. `index.html`을 Live Server 등으로 실행합니다.
5. 도시를 검색합니다.

예:

- 서울
- Seoul
- 도쿄
- Tokyo
- 뉴욕
- New York

## API 응답 확인

날씨 데이터를 받은 직후 브라우저 개발자 도구 Console에 전체 응답이 출력됩니다.

```javascript
console.log(currentData);
console.log(forecastData);
```

## 포함 기능

- 한글/영문 도시 검색
- 검색 자동완성
- 인기 도시 빠른 검색
- 현재 위치 날씨
- 현재 날씨 상세정보
- 시간별 날씨
- 5일 예보
- 기온 변화 그래프
- 관심 도시 저장/삭제
- LocalStorage
- 다크모드
- 오류 처리
- 반응형 UI


## 대한민국 도시 검색

한글 검색을 위해 대한민국의 전국 **시·군·구 단위 주요 행정구역**을 cityMap에 추가했습니다.
예: 수원, 성남, 용인, 고양, 춘천, 강릉, 청주, 천안, 전주, 목포, 여수, 포항, 경주, 창원, 제주, 서귀포 등.

참고로 OpenWeather의 도시 데이터베이스에 특정 소도시/행정구역이 독립 도시로 등록되어 있지 않은 경우에는 API 자체가 결과를 반환하지 않을 수 있습니다. 이 경우에는 해당 지역의 대표 도시명이나 좌표 기반 조회를 사용하는 것이 더 정확합니다.


## 국내 도시 검색 방식

대한민국 도시명은 영문명 검색에 의존하지 않고 **도시별 위도/경도 좌표로 OpenWeather API를 조회**하도록 구성했습니다.
따라서 `김포`처럼 영문 도시명 검색에서 누락될 수 있는 지역도 한글로 바로 검색할 수 있습니다.
