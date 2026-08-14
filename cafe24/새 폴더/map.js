/* =========================================
   KAKAO MAP
========================================= */


/*
    카카오맵이 들어갈 HTML 영역 가져오기
*/

var mapContainer =
    document.getElementById('kakao-map');


/*
    지도 기본 위치

    처음 지도가 표시될 때
    강남역 근처를 보여주도록 설정
*/

var mapOption = {

    center: new kakao.maps.LatLng(
        37.498095,
        127.027610
    ),

    level: 4

};


/*
    지도 생성
*/

var map = new kakao.maps.Map(
    mapContainer,
    mapOption
);


/* =========================================
   ADDRESS → COORDINATE
========================================= */


/*
    주소를 좌표로 바꾸기 위한 객체
*/

var geocoder =
    new kakao.maps.services.Geocoder();


/*
    ★★★★★★★★★★★★★★★★★★★★★★★★★
    
    여기만 실제 매장 주소로 바꾸면 됨!
    
    예:
    '서울특별시 강남구 강남대로 123'
    
    ★★★★★★★★★★★★★★★★★★★★★★★★★
*/

var storeAddress =
    '서울특별시 강남구 테헤란로 123';


/*
    주소 검색
*/

geocoder.addressSearch(
    storeAddress,

    function(result, status) {


        /*
            주소 검색 성공
        */

        if (
            status ===
            kakao.maps.services.Status.OK
        ) {


            /*
                검색 결과에서
                위도(latitude)와 경도(longitude)를 가져옴
            */

            var coords =
                new kakao.maps.LatLng(
                    result[0].y,
                    result[0].x
                );


            /* =========================================
               MARKER
            ========================================== */


            /*
                매장 위치에 마커 생성
            */

            var marker =
                new kakao.maps.Marker({

                    map: map,

                    position: coords

                });


            /* =========================================
               MOVE MAP
            ========================================== */


            /*
                매장 위치를
                지도의 가운데로 이동
            */

            map.setCenter(coords);


            /* =========================================
               INFO WINDOW
            ========================================== */


            /*
                마커를 클릭했을 때 보여줄
                매장 이름
            */

            var infowindow =
                new kakao.maps.InfoWindow({

                    content:
                        '<div class="map-info">' +
                        '카페온24 강남역점' +
                        '</div>'

                });


            /*
                인포윈도우 표시
            */

            infowindow.open(
                map,
                marker
            );

        }

    }
);