$(function() {

    $('.btn-search').click(function(){
        console.log('제이쿼리 작동 완료.')
    });

});

var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

$(function() { 
    // DOM 객체 로딩이 완료되면 실행.
    // 이벤트만 추가 해줌.

    $('.btn-search').click(function() {

        // jQuery에서 get 방식으로 데이터를 받아오는 내장 함수.
        $('.btn-search').html('검색중...');
        
        console.log($('#txt-search').val());

        var inputSearchKeyword = $('#txt-search').val(); // 관악구

        search(1, 10, inputSearchKeyword);

    });
    
    $('#txt-search').on('keypress', function(e) {

        if(e.keyCode === 13) {

            //console.log('엔터가 입력되었습니다!');
            $('.btn-search').trigger('click');

        }

    });
       
});

function showPaging(page, perPage, total, searchKeyword) {
        
    var $paging = $('.paging').empty();

    var numPages = 5; // 한번에 보여줄 페이지 갯수.

    var pageStart = Math.floor((page - 1)/ numPages) * numPages + 1; // 시작페이지 계산.
    var pageEnd = pageStart + numPages - 1; // 마지막 페이지.
    var totalPages = Math.floor((total - 1)/ perPage) + 1; // 전체 페이지수.

    if (pageEnd > totalPages) { // 마지막 페이지가 전체 페이지 수보다 크면

        pageEnd = totalPages; // 진짜 마지막 페이지를 넣어준다.

    }

    var prevPage = pageStart - 1; // 이전 페이지.
    var nextPage = pageEnd + 1; // 다음 페이지.

    if ( prevPage < 1) {

        prevPage = 1;

    }

    if (nextPage > totalPages) {

        nextPage = totalPages;

    }

    var $prevElem = $('<a href="javascript:search(' + prevPage + ',' + perPage + ',\'' + searchKeyword + '\')">이전</a>');
    $prevElem.addClass('prev'); // css 적용을 위해서 클래스를 추가 해주고.
    $paging.append($prevElem);

    for(var i = pageStart; i <= pageEnd; i ++) {

        var $elem = $('<a href="javascript:search(' + i + ',' + perPage + ',\'' + searchKeyword + '\')">' + i + '</a>');

        if(i === page) {

            $elem.addClass('current');

        }

        $paging.append($elem);
    }

    var $nextElem = $('<a href="javascript:search(' + nextPage + ',' + perPage + ',\'' + searchKeyword + '\')">다음</a>');
    $nextElem.addClass('next');
    $paging.append($nextElem);

}

function search(page, perPage, inputSearchKeyword) {
    
    // 유효성 검사 작업.
    if(typeof page !== 'number' || page < 1) {
        page = 1;
    }

    if(typeof perPage !== 'number' || perPage <= 0) {
        perPage = 10;
    }

    $.get(API_URL, { 
            page : page,
            perPage : perPage,
            searchKeyword : inputSearchKeyword
        
        } , function(data){

        $('.btn-search').html('검색');

        //console.log(data);

        var list = data.list;
        var total = data.total;

        $('.total').html('총 ' + total + ' 개의 패스트푸드점을 찾았습니다!');

        var $list = $('.list').empty();
        //console.log($list);

        for(var i = 0; i < list.length; i++) {
            
            var item = list[i];
            
            // 1. 템플릿을 복제한다.
            var $elem = $('#item-template').clone().removeAttr('id');

            // 2. 복제한 템플릿에 데이터를 추가한다.
            $elem.find('.item-no').html(i+1);
            $elem.find('.item-name').html(item.name);
            $elem.find('.item-addr').html(item.addr);
        
            // 3. DOM에 복제한 템플릿을 추가한다.
            $list.append($elem);

        }

        showPaging(page, perPage, total, inputSearchKeyword);

    });

}
