var API_URL = 'https://floating-harbor-78336.herokuapp.com/fastfood';

$(function() {
    $('.btn-search').click(function(){
        console.log('Search!');
    });
    
    $('.btn-search').click(function(){
        var searchKeyword = $('#txt-search').val();

        search(1, 10, searchKeyword);
    });
    
    $('#txt-search').on('keypress', function(e){
        if(e.keyCode === 13) {
            console.log('엔터가 입력 되었습니다!');

            $('.btn-search').trigger('click');
        }
    });

    search(1, 10);
    
});

// 패스트 푸드 점의 갯수를 찾는다.
// page : 현재 페이지.
// perPage : 페이지당 보여줄 개시물 수.
// searchKeyword : 검색 키워드.
function search(page, perPage, searchKeyword) {
    if(typeof page !== 'number' || page < 1) {
        page = 1;
    }

    if(typeof perPage !== 'number' || perPage <= 0) {
        perPage = 10;
    }

    // $.get 의 첫번째 파라미터 : API URL.
    // 두번째 파라미터 : 전달할 쿼리스트링 값.
    // 세번째 파라미터 : 콜백함수.
    // 네번째 파라미터 : 데이터 리턴타입.
    $.get(API_URL, {
        page : page,
        perPage : perPage,
        searchKeyword : searchKeyword
    }, function(data) {
        //console.log(data);

        var list = data.list;
        var total = data.total;

        $('.total').html('총 '+ total + '개의 패스트 푸드점을 찾았습니다.');

        var $list = $('.list').empty();

        for(var i = 0; i < list.length; i++) {
            var item = list[i];

            // 패스트 푸드 주소를 추가.
            // 1. 템플릿을 복제한다.
            var $elem = $('#item-template')
                .clone()
                .removeAttr('id');
            
            // 2. 복제한 템플릿에 데이터를 세팅한다.
            $elem.find('.item-no').html(i+1);
            $elem.find('.item-name').html(item.name);
            $elem.find('.item-addr').html(item.addr);
            
            // 3. 목록에 복제한 템플릿을 추가한다.
            $list.append($elem);
        }

        showPaging(page, perPage, total, searchKeyword);
    });
}

// 페이징을 DOM에 그려줄 함수.
// page : 현재 페이지
// perPage : 한번에 보여줄 페이징 갯수.
// total : 전체 게시물 수.
function showPaging(page, perPage, total, searchKeyword) {
    var $paging = $('.paging').empty(); // paging 클래스의 자식 엘리먼트들을 다 지운다.
    var numPages = 5; // 한 블럭당 보여줄 페이지 수.
    var pageStart = Math.floor((page - 1) / numPages) * numPages +1;
    var pageEnd = pageStart + numPages - 1;
    var totalPages = Math.floor((total - 1) / perPage) + 1; // 전체페이지수.
    
    if(pageEnd > totalPages) {
        pageEnd = totalPages;
    }

    var prevPage = pageStart - 1;

    if(prevPage < 1) {
        prevPage = 1;
    }

    var nextPage = pageEnd + 1;

    if(nextPage > totalPages) { 
        nextPage = totalPages;
    }

    var $prevElem = $('<a href="javascript:search('+prevPage+','+perPage+',\''+searchKeyword+'\''+')">이전</a>');
    $prevElem.addClass('prev');
    $paging.append($prevElem);

    for (var i = pageStart; i <= pageEnd; i++) {

        // $안에 <a ~> 처럼  꺽쇠로 둘러쌓인 태그를 넣어주면
        // 태그를 만들어서 변수에 할당함.
        var $elem = $('<a href="javascript:search('+i+','+perPage+',\''+searchKeyword+'\''+')">'+i+'</a>');

        if(i === page) {
            $elem.addClass('current');
        }

        $paging.append($elem);
    }

    var $nextElem = $('<a href="javascript:search('+ nextPage +',' +perPage+',\''+searchKeyword+'\''+')">다음</a>');
    $nextElem.addClass('next');
    $paging.append($nextElem);

}