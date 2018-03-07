$(document).ready(function () {
    //各端末画面横幅
    var iPadPro = 1025;
    var smartphone = 600;

    var viewportWidth = $(window).width();

    if (viewportWidth < iPadPro) {
        //1団体表示
        $(".slide div").removeClass("GroupL GroupM GroupR").addClass("slide");
        $(".GroupSlide").removeClass("slide");
    }

    //画面リサイズ時再読み込み
    /*var timer = false;
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        }
        timer = setTimeout(function() {
            location.reload();
        }, 200);
    });*/



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
    }else if (location.hash == "#Group") {
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
        }else if (location.hash == "#Group") {
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

    $("#fullpage").click(function(){
        $("#menu-sp").slicknav('close');
        $(".slicknav_btn").removeClass('active');
    });


    //fullpage
    $('#fullpage').fullpage({
        anchors: ['Home','Information','Access','Group','Timetable','Downloads'],
        menu:'#header',
        scrollOverflow: false,
        slidesNavigation: true,
        paddingTop: '39px',
        responsiveHeight: 500,
        autoScrolling: false,
        fitToSection: false,
        bigSectionsDestination: top,
    });


    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');

    //団体一覧部門Sticky
    $(".GroupSection").sticky({topSpacing:39});

    //対応する団体情報を開く
    //団体表示
    if (viewportWidth < iPadPro) {
        $('.GroupExhibit').click(function() {
            var GroupInfoNumber = $(this).closest('tr').index();
            var GroupInfoOpenSrc = 'GroupExhibit.html#Home/' + GroupInfoNumber;
            $('.GroupInfo').attr('src', GroupInfoOpenSrc);
            $('.GroupInfo').css('visibility','visible').animate({opacity: 1}, 400);
        });
    }else{
        $('.GroupExhibit').click(function() {
            var GroupInfoNumber = $(this).closest('tr').index();
            var GroupInfoOpenSrc = 'GroupExhibit.html#Home/' + Math.floor(GroupInfoNumber / 3);
            $('.GroupInfo').css('visibility','visible').animate({opacity: 1}, 400);
        });
    }

    $('.GroupInfoClose').click(function() {
        $('.GroupInfo').animate({opacity: 0}, 400, function() {
            $('.GroupInfo').css('visibility','hidden');
        });
    });
});
