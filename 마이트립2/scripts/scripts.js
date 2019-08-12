$(function() {

    $(window).scroll(function() {

        var top = $(window).scrollTop(); // 스크롤이 위에서부터 얼마나 떨어져 있나.

        if(top > 0) { // 스크롤을 내렸으면

            $('#header').addClass('inverted'); // inverted 클래스를 추가.

        } else { // 스크롤을 안내렸으면

            $('#header').removeClass('inverted'); // inverted 클래스를 제거.
        }

    });

})