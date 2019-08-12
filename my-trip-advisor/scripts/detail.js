var map;

$(function() {
    
    var id = parseId(window.location.search);
    console.log(id);

    getDetail(id);

    //initMap();

});

function initMap() {
    // google.maps.Map(지도를 표시할 엘리먼트, 여러가지 옵션을 설정한 오브젝트)
    map = new google.maps.Map(document.getElementById('map'), { 
        zoom: 10,
        center: { // 한라산을 위치로 함.
            lat: 33.3617,
            lng: 126.5292
        }
    });
}

function showMarker(lat, lng) {
    var pos = {
        lat: lat,
        lng: lng
    };

    new google.maps.Marker({ // 위도와 경도를 전달받아 지도상에 마커를 생성. lat. lng.
        position: pos,
        map: map
    });

    map.panTo(pos);
}

function parseId(str) {

    console.log(str); // str은 ?id=0&name=kim 과 같은 형태로 들어온다.

    var s = str.substring(1); // 해당 인덱스부터 시작하는 새로운 문자열 리턴. id=0&name=kim
    var args = s.split('&'); // 해당 문자를 기준으로 문자열을 잘라서 배열로 리턴. ['id=0', 'name=kim']

    for(var i = 0; i < args.length; i++) { // args.length = 2 가 됨.
        
        var arg = args[i]; // 배열을 돌면서 확인.
        var tokens = arg.split('='); // ['id' , '0'].

        if(tokens[0] === 'id') { 
            return tokens[1]; // 0을 리턴.
        }

    }

    return null;

}

function getDetail(id) {

    var url = 'https://javascript-basic.appspot.com/locationDetail';

    $.getJSON(url, { // 두번째 파라미터에는 쿼리 스트링으로 키와 값을 보냄.
        
        id: id

    }, function(r) { // 성공시 콜백.
        console.log('-- get success --');
        console.log(r);

        $('.detail-header-name').html(r.name);
        $('.detail-header-city-name').html(r.cityName);
        $('.detail-desc-text').html(r.desc);

        var $gallery = $('#detail-images');

        var images = r.subImageList;

        for(var i = 0; i < images.length; i++) {
            console.log(images[i]);
            var $image = $('<img src="'+images[i]+'"/>');
            $gallery.append($image);
        }

        Galleria.loadTheme('libs/galleria/themes/classic/galleria.classic.min.js');
        Galleria.run('#detail-images');

        showMarker(r.position.x, r.position.y);

    });

}