$(function() {
    $(window).scroll(function(){

        var top = $(window).scrollTop(); // 상단으로 부터 스크롤이 얼만큼 아래로 내려와있나 픽셀단위로 리턴.

        if(top > 0) {
            $('#header').addClass('inverted');
        } else {
            $('#header').removeClass('inverted');
        }

    });

    $(window).trigger('scroll'); // 스크롤 이벤트를 강제로 한번 발동 시킴.

    var dpFrom = $('#from').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0
    });
    dpFrom.datepicker('setDate', new Date());

    var dpTo = $('#to').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        onSelect: function() { // 사용자가 특정 날짜를 선택했을때 onSelect가 호출됨.
            // 옵션에 최소 날짜를 from 부터 설정해서 출발일 이전을 종료일로 선택 못하게 함.
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'));
        }
    });

    dpTo.datepicker('setDate',4); // 오늘 날짜에서 4일을 더한 날짜로 기본값을 설정.

    $('#form-search').submit(function(e){
        e.preventDefault();

        var from = $('#from').val();
        var to = $('#to').val();

        search(from, to);
    });

});

function search(from, to) {
    var url = 'https://javascript-basic.appspot.com/searchLocation';

    $.getJSON(url, {
        from: from,
        to: to
    }, function(r) { // 여행지 리스트를 리턴함.
        
        var $list = $('#list-panel');

        for(var i = 0; i < r.length; i++) {
            var data = r[i];
            var $item = createListItem(data);

            $list.append($item);

        }

        $('#list-bg').show();
    });

}

function createListItem(data) {
    var $tmpl = $('#list-item-template').clone().removeAttr('id');

    $tmpl.find('.list-item-image').attr('src', data.titleImageUrl);
    $tmpl.find('.list-item-name').html(data.name);
    $tmpl.find('.list-item-city-name').html(data.cityName);

    $tmpl.click(function(e) { // 클릭 이벤트를 달아줌.
        var url = 'detail.html?id='+ data.id;
        window.location = url;
    });

    return $tmpl;
}