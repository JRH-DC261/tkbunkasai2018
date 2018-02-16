$(document).ready(function () {
    //各端末画面横幅
    var iPadPro = 1025;
    var smartphone = 600;

    //レスポンシブ(参加団体)
    var viewportWidth = $(window).width();
    if (viewportWidth < iPadPro) {
        $(".slide div").removeClass("GroupL GroupM GroupR").addClass("slide");
        $("#GroupSlide").removeClass("slide");
    }

    //Slicknav設定
    $('#menu-sp').slicknav({
        label: ''
    });

    //ロード時のセクション名を表示
    if (location.hash == "#Home") {
    $("#header-currentSection-sp").html("ホーム");
    }else if (location.hash == "#Information") {
    $("#header-currentSection-sp").html("ご案内");
    }else if (location.hash == "#Access") {
    $("#header-currentSection-sp").html("アクセス");
    }else if (location.hash == "#Groups") {
    $("#header-currentSection-sp").html("参加団体");
    }else if (location.hash == "#Timetable") {
    $("#header-currentSection-sp").html("タイムテーブル");
    }else if (location.hash == "#Downloads") {
    $("#header-currentSection-sp").html("ダウンロード");
    }

    //スクロール先のセクション名に切り替え
    $(window).on('hashchange', function(){
        if (location.hash == "#Home") {
        $("#header-currentSection-sp").html("ホーム");
        }else if (location.hash == "#Information") {
        $("#header-currentSection-sp").html("ご案内");
        }else if (location.hash == "#Access") {
        $("#header-currentSection-sp").html("アクセス");
        }else if (location.hash == "#Groups") {
        $("#header-currentSection-sp").html("参加団体");
        }else if (location.hash == "#Timetable") {
        $("#header-currentSection-sp").html("タイムテーブル");
        }else if (location.hash == "#Downloads") {
        $("#header-currentSection-sp").html("ダウンロード");
        }
    });

    //ハンバーガー→Xアニメーション
    $('.slicknav_btn').click(function(){
        $(this).toggleClass("active");
    });


    //fullpage
    $('#fullpage').fullpage({
        anchors: ['Home','Information','Access','Groups','Timetable','Downloads'],
        menu:'.header',
        scrollOverflow: true,
        slidesNavigation:true,
        paddingTop: '5vh',
        responsiveHeight: 500
    });


    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');
});
