$(document).ready(function() {
    //各端末画面横幅
    var iPadPro = 1025;
    var smartphone = 600;

    //レスポンシブ(参加団体)
    var viewportWidth = $(window).width();
    if (viewportWidth < iPadPro) {
        $(".slide div").removeClass("GroupL GroupM GroupR").addClass("slide");
        $("#GroupSlide").removeClass("slide");
    }

    //fullpage
    $('#fullpage').fullpage({
        anchors:['Home','Information','Access','Groups','Timetable','Downloads'],
        menu:'.header'
    });

    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');
});