$(document).ready(function () {
    $('#loader').addClass('loaded');

    //各端末画面横幅
    var iPadPro = 1025;
    var smartphone = 600;

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var widthRatio = viewportWidth / viewportHeight;

    //参加団体の1画面当たり表示数決定
    if (viewportWidth < smartphone) {
        //1団体表示
        $('.group-slide div').removeClass('__display3 __L1 __M1 __R1 __L2 __M2 __R2').addClass('slide __display1');
        $('.group-slide').removeClass('slide');
    } else if (viewportWidth < iPadPro && widthRatio < 6/5) {
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
    } else {
    }

    //スクロールバー幅取得
    function getScrollBarWidth() {
        var $outer = $('<div>').css({
                visibility: 'hidden',
                width: 100,
                overflow: 'scroll'
            }).appendTo('body'),
            widthWithScroll = $('<div>').css({
                width: '100%'
            }).appendTo($outer).outerWidth();
        $outer.remove();
        return 100 - widthWithScroll;
    }
    var scrollBarWidth = getScrollBarWidth();
    var pageWidth = viewportWidth - scrollBarWidth;

    //fullpage設定
    $('#fullpage').fullpage({
        //anchors: ['Home', 'About', 'Access', 'Group', 'Timetable', 'Downloads'],
        anchors: ['Home', 'About', 'Access', 'Group', 'Downloads'],
        lockAnchors: true,
        menu: '#menu',
        slidesNavigation: false,
        responsiveHeight: 500,
        scrolloverflow: true,
        autoScrolling: false,
        fitToSection: false,
        bigSectionsDestination: 'top',
        verticalCentered: true,

        afterLoad: function (origin, destination, direction) {
            var loadedSection = this;
            if (destination === 1) {
                $('#menu').removeClass('active');
            } else {
                $('#menu').addClass('active');
            }
        },
        onLeave: function (origin, destination, direction) {
            var leavingSection = this;
            if (origin === 1) {
                $('#menu').addClass('active');
            } else if (destination === 1) {
                $('#menu').removeClass('active');
            }
        }
    });


    //メニュー
    $('.menu_home').click(function () {
        $.fn.fullpage.moveTo('Home');
    });
    $('.menu_about').click(function () {
        $.fn.fullpage.moveTo('About');
    });
    $('.menu_access').click(function () {
        $.fn.fullpage.moveTo('Access');
    });
    $('.menu_group').click(function () {
        $.fn.fullpage.moveTo('Group');
    });
    $('.menu_timetable').click(function () {
        $.fn.fullpage.moveTo('Timetable');
    });
    $('.menu_downloads, .link_downloads').click(function () {
        $.fn.fullpage.moveTo('Downloads');
    });

    $('.menu-sp_icon.__open').click(function () {
        $('#menu-sp').css('left', '0vw');
        $('.menu-sp_icon.__open').css('display', 'none');
        $('.menu-sp_icon.__close').css('display', 'block');
        $('#blackout').addClass('active');
    });
    $('.menu-sp_icon.__close, #blackout').click(function () {
        $('#menu-sp').removeAttr('style');
        $('.menu-sp_icon.__open').css('display', 'block');
        $('.menu-sp_icon.__close').css('display', 'none');
        $('#blackout').removeClass('active');
    });
    $('#menu-sp_nav li').click(function () {
        $('#menu-sp').removeAttr('style');
        $('.menu-sp_icon.__open').css('display', 'block');
        $('.menu-sp_icon.__close').css('display', 'none');
        $('#blackout').removeClass('active');
    });

    //カウントダウン
    var targetTime = new Date("Nov 2, 2018").getTime();
    var currentTime = new Date().getTime();
    var remainingTime = targetTime - currentTime;
    var remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    $('.countdown_days').append(remainingDays);

    //トップページ矢印
    $('#home_down').click(function () {
        $.fn.fullpage.moveTo('About');
    });

    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');


    //参加団体一覧開閉
    function openGroupList() {
        $('.group-list_cnt, .group-list_close').css('display', 'block').animate({
            opacity: 1
        }, 400);
        $('#blackout_group-info').addClass('active');
        //bodyのスクロール禁止
        scrollPosition = window.pageYOffset;
        scrollPositionTop = -scrollPosition + 'px';
        $('body').css('position', 'fixed');
        $('body').css('margin-top', scrollPositionTop);
        //スクロールバー分の余白挿入
        $('body').css('width', pageWidth + scrollBarWidth);
        $('body').css('margin-right', scrollBarWidth);
        $('.menu-sp_icon.__open').css('display', 'none');
    }

    function closeGroupList() {
        $('.group-list_cnt, .group-list_close').animate({
            opacity: 0
        }, 400, function () {
            $('.group-list_cnt, .group-list_close').css('display', 'none');
            $('#blackout_group-info').removeClass('active');
            //bodyのスクロール禁止解除
            $('body').css('position', 'static');
            $('body').css('margin-top', '0');
            $(window).scrollTop(scrollPosition);
            $('.menu-sp_icon.__open').css('display', 'block');
            $('.group-list_iframe').attr('src', ' ');
        });
    }

    //開く
    $('.group_cnt_exhibit').click(function () {
        $('.group-list_iframe').attr('src', 'groupList.html#Exhibit');
        openGroupList();
    });
    $('.group_cnt_theater').click(function () {
        $('.group-list_iframe').attr('src', 'groupList.html#Theater');
        openGroupList();
    });
    $('.group_cnt_perform').click(function () {
        $('.group-list_iframe').attr('src', 'groupList.html#Perform');
        openGroupList();
    });
    //閉じるボタン
    $('.group-list_close').click(function () {
        closeGroupList();
    });

    //参加団体情報開閉
    function openGroupInfo() {
        $('.group-list_close', parent.document).animate({
            opacity: 0
        }, 400, function () {
            $('.group-list_close', parent.document).css('display', 'none');
        });
        $('.group-info_cnt, .group-info_close', parent.document).css('display', 'block').animate({
            opacity: 1
        }, 400);
    }

    function closeGroupInfo() {
        $('.group-info_cnt, .group-info_close', parent.document).animate({
            opacity: 0
        }, 400, function () {
            $('.group-info_cnt, .group-info_close', parent.document).css('display', 'none');
        });

        $('.group-list_close', parent.document).css('display', 'block').animate({
            opacity: 1
        }, 400, function(){
            $('.group-info_iframe', parent.document).attr('src', ' ');
        });
    }

    if (viewportWidth < smartphone) {
        $('.group-exhibit').click(function () {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupExhibit.html#1/' + groupInfoNumber;
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        });
    } else if (viewportWidth < iPadPro && widthRatio < 6/5) {
        $('.group-exhibit').click(function () {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupExhibit.html#1/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        });
    } else {
        $('.group-exhibit').click(function () {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupExhibit.html#1/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        });
    }

    //閉じるボタン
    $('.group-info_close').click(function () {
        closeGroupInfo();
    });

    //
    $('#blackout_group-info').click(function () {
        closeGroupList();
        closeGroupInfo();
    });
});
