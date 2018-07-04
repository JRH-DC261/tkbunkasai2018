$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['', '', '', '', '', ''],
        slidesNavigation: false,
        responsiveHeight: 500,
        scrollBar: true,
        autoScrolling: true,
        //スクロール時にモダルを閉じる
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex == 1) {
                closeGroupInfo();
            } else if (nextIndex == 3) {
                closeGroupInfo();
            }
        }
    });

    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');
});
