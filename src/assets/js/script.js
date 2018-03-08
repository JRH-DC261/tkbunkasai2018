$(document).ready(function () {
    //各端末画面横幅
    var iPadPro = 1025;
    var smartphone = 600;

    var viewportWidth = $(window).width();

    if (viewportWidth < smartphone) {
        //1団体表示
        $('.group-slide div').removeClass('__display3 __L1 __M1 __R1 __L2 __M2 __R2').addClass('slide __display1');
        $('.group-slide').removeClass('slide');
    }else if (viewportWidth < iPadPro) {
        //2団体表示
        $('.group-slide__extra').addClass('slide');
        $('.group-slide__extra').append($('.group-slide .__R1'));
        $('.group-slide__extra').append($('.group-slide .__L2'));
        $('.group-slide .__L1').removeClass('__display3 __L1').addClass('__display2 __L');
        $('.group-slide .__M1').removeClass('__display3 __M1').addClass('__display2 __R');
        $('.group-slide .__R1').removeClass('__display3 __R1').addClass('__display2 __L');
        $('.group-slide .__L2').removeClass('__display3 __L2').addClass('__display2 __R');
        $('.group-slide .__M2').removeClass('__display3 __M2').addClass('__display2 __L');
        $('.group-slide .__R2').removeClass('__display3 __R2').addClass('__display2 __R');
    }

    //スクロールバー幅取得
    function getScrollBarWidth () {
        var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
            widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
        $outer.remove();
        return 100 - widthWithScroll;
    };
    var scrollBarWidth = getScrollBarWidth();
    var headerWidth = viewportWidth - scrollBarWidth;

    //あらかじめヘッダーにスクロールバー幅を入れる
    $('#header').css('width',headerWidth);
    $('#header').css('padding-right',scrollBarWidth);

    //画面回転時再読み込み
    /*$(window).bind('orientationchange',function() {
        location.reload();
    });*/

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
    if (location.hash == '#Home') {
    $('#header_current-section-sp').html('ホーム');
    }else if (location.hash == '#Information') {
    $('#header_current-section-sp').html('ご案内');
    }else if (location.hash == '#Access') {
    $('#header_current-section-sp').html('アクセス');
    }else if (location.hash == '#Group') {
    $('#header_current-section-sp').html('参加団体');
    }else if (location.hash == '#Timetable') {
    $('#header_current-section-sp').html('タイムテーブル');
    }else if (location.hash == '#Downloads') {
    $('#header_current-section-sp').html('ダウンロード');
    }

    //スクロール先のセクション名に切り替え
    $(window).on('hashchange', function(){
        if (location.hash == '#Home') {
        $('#header_current-section-sp').html('ホーム');
        }else if (location.hash == '#Information') {
        $('#header_current-section-sp').html('ご案内');
        }else if (location.hash == '#Access') {
        $('#header_current-section-sp').html('アクセス');
        }else if (location.hash == '#Group') {
        $('#header_current-section-sp').html('参加団体');
        }else if (location.hash == '#Timetable') {
        $('#header_current-section-sp').html('タイムテーブル');
        }else if (location.hash == '#Downloads') {
        $('#header_current-section-sp').html('ダウンロード');
        }
    });

    //ハンバーガー→Xアニメーション
    $('.slicknav_btn').click(function(){
        $(this).toggleClass('active');
    });

    $('#fullpage').click(function(){
        $('#menu-sp').slicknav('close');
        $('.slicknav_btn').removeClass('active');
    });


    //fullpage
    $('#fullpage').fullpage({
        anchors: ['Home','Information','Access','Group','Timetable','Downloads'],
        menu:'#header',
        scrollOverflow: false,
        slidesNavigation: false,
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
    $('.group-section').sticky({topSpacing:39});





    //対応する団体情報を開く
    //団体表示
    if (viewportWidth < smartphone) {
        $('.group-exhibit').click(function() {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'GroupExhibit.html#Home/' + groupInfoNumber;
            $('.group-info_iframe').attr('src', groupInfoOpenSrc);
            $('.group-info_cnt').css('visibility','visible').animate({opacity: 1}, 400);
            $('body').css('overflow', 'hidden');
            $('body').css('margin-right', scrollBarWidth);
        });
    }else if (viewportWidth < iPadPro) {
        $('.group-exhibit').click(function() {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'GroupExhibit.html#Home/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe').attr('src', groupInfoOpenSrc);
            $('.group-info_cnt').css('visibility','visible').animate({opacity: 1}, 400);
            $('body').css('overflow', 'hidden');
            $('body').css('margin-right', scrollBarWidth);
        });
    }else{
        $('.group-exhibit').click(function() {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'GroupExhibit.html#Home/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe').attr('src', groupInfoOpenSrc);
            $('.group-info_cnt').css('visibility','visible').animate({opacity: 1}, 400);
            $('body').css('overflow', 'hidden');
            $('body').css('margin-right', scrollBarWidth);
        });
    }

    $('.group-info_close').click(function() {
        $('.group-info_cnt').animate({opacity: 0}, 400, function() {
            $('.group-info_cnt').css('visibility','hidden');
            $('body').css('overflow', 'auto');
            $('body').css('margin-right', '0');
        });
    });
});
