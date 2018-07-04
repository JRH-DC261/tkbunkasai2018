$(document).ready(function() {
    $('#fullpage').fullpage({
        anchors: ['Home', 'Information', 'Access', 'Group', 'Timetable', 'Downloads'],
        menu: '#header',
        scrollOverflow: false,
        slidesNavigation: false,
        paddingTop: '39px',
        responsiveHeight: 500,
        scrollBar: true,
        autoScrolling: false,
        fitToSection: false,
        bigSectionsDestination: 'top',
        verticalCentered: true,

        //スクロール時に現在位置表示変更(スマホ)
        onLeave: function (index, nextIndex, direction) {
            if (nextIndex == 1) {
                $('#header_current-section-sp').html('');
            } else if (nextIndex == 2) {
                $('#header_current-section-sp').html('ご案内');
            } else if (nextIndex == 3) {
                $('#header_current-section-sp').html('アクセス');
            } else if (nextIndex == 4) {
                $('#header_current-section-sp').html('参加団体');
            } else if (nextIndex == 5) {
                $('#header_current-section-sp').html('タイムテーブル');
            } else if (nextIndex == 6) {
                $('#header_current-section-sp').html('ダウンロード');
            } else {
                $('#header_current-section-sp').html('');
            }
        }
    });

    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');
});
