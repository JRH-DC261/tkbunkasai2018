$(document).ready(function () {
    $('#loader').addClass('loaded');

    //各端末画面横幅
    var iPadPro = 1025;
    var smartphone = 600;

    var viewportWidth = $(window).width();
    var viewportHeight = $(window).height();
    var widthRatio = viewportWidth / viewportHeight;

    //参加団体の1画面当たり表示数決定(iOS)
    if (viewportWidth < smartphone) {
        //1団体表示
        $('.group-slide div').removeClass('__display3 __L1 __M1 __R1 __L2 __M2 __R2').addClass('slide __display1');
        $('.group-slide').removeClass('slide');
    } else if (viewportWidth < iPadPro && widthRatio < 6 / 5) {
        //2団体表示
        $('.group-slide__extra').addClass('slide');
        $('.group-slide__extra.__extra1').append($('.group-slide .__R1.__extra1'));
        $('.group-slide__extra.__extra1').append($('.group-slide .__L2.__extra1'));
        $('.group-slide__extra.__extra2').append($('.group-slide .__R1.__extra2'));
        $('.group-slide__extra.__extra2').append($('.group-slide .__L2.__extra2'));
        $('.group-slide__extra.__extra3').append($('.group-slide .__R1.__extra3'));
        $('.group-slide__extra.__extra3').append($('.group-slide .__L2.__extra3'));
        $('.group-slide .__L1').removeClass('__display3 __L1').addClass('__display2 __L');
        $('.group-slide .__M1').removeClass('__display3 __M1').addClass('__display2 __R');
        $('.group-slide .__R1').removeClass('__display3 __R1').addClass('__display2 __L');
        $('.group-slide .__L2').removeClass('__display3 __L2').addClass('__display2 __R');
        $('.group-slide .__M2').removeClass('__display3 __M2').addClass('__display2 __L');
        $('.group-slide .__R2').removeClass('__display3 __R2').addClass('__display2 __R');
    } else {}

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
    $('.fullpage_index').fullpage({
        //anchors: ['Home', 'About', 'Access', 'Group', 'Timetable', 'Downloads'],
        anchors: ['Home', 'About', 'Access', 'Group', 'Downloads'],
        //anchors: ['Home', 'About', 'Access', 'Downloads'],
        lockAnchors: true,
        menu: '#menu',
        slidesNavigation: false,
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
    $('.fullpage_group-info').fullpage({
        lockAnchors: false,
        //scrolloverflow: false,
        autoScrolling: false,
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
    var remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24) + 1);
    $('.countdown_days').append(remainingDays);

    //トップページ矢印
    $('#home_down').click(function () {
        $.fn.fullpage.moveTo('About');
    });

    //横スライド矢印
    $('.fp-prev').append('<span class="fa fa-angle-left" id="arrowL"></span>');
    $('.fp-next').append('<span class="fa fa-angle-right" id="arrowR"></span>');

    //アコーディオン
    $('.accordion_nav').click(function () {
        $(this).toggleClass('active');
        $(this).next('.accordion_content').toggleClass('active');
    });


    //参加団体一覧開閉
    function openGroupList(group) {
        $('.group-list_cnt, .group-list_close').css('display', 'block').animate({
            opacity: 1
        }, 400, function () {
            var destinationGroup = "#" + group;
            var GroupOffset = $('.group-list_iframe').contents().find(destinationGroup).offset().top;
            $('.group-list_iframe').contents().scrollTop(GroupOffset);
            $('.group-list_cnt').animate({
                scrollTop: GroupOffset
            }, 250, 'swing');
            //$('.group-list_iframe').contents().find('#whiteout_group-info').removeClass('active');
        });
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
            //$('.group-list_iframe').attr('src', ' ');
            //$('.group-list_iframe').contents().find('#whiteout_group-info').addClass('active');
        });
    }

    //開く
    $('.group_cnt_exhibit').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList#Exhibit');
        openGroupList('Exhibit');
    });
    $('.group_cnt_theater').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList');
        openGroupList('Theater');
    });
    $('.group_cnt_perform').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList#Perform');
        openGroupList('Perform');
    });
    $('.group_cnt_h3').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList#H3');
        openGroupList('H3');
    });
    $('.group_cnt_chuya').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList#H3');
        openGroupList('H3');
    });
    $('.group_cnt_messe').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList#Messe');
        openGroupList('Messe');
    });
    $('.group_cnt_list').click(function () {
        //$('.group-list_iframe').attr('src', 'groupList');
        openGroupList('Top');
    });
    //閉じるボタン
    $('.group-list_close').click(function () {
        closeGroupList();
    });

    //参加団体情報開閉
    function openGroupInfo(page) {
        //参加団体の1画面当たり表示数決定
        /*var parentWidth = $(window, parent.document).width();
        if (parentWidth < smartphone) {
            //1団体表示
            $('.group-slide div').removeClass('__display3 __L1 __M1 __R1 __L2 __M2 __R2').addClass('slide __display1');
            $('.group-slide').removeClass('slide');
            alert('a');
        } else if (parentWidth < iPadPro && widthRatio < 6 / 5) {
            //2団体表示
            $('.group-slide__extra').addClass('slide');
            $('.group-slide__extra.__extra1').append($('.group-slide .__R1.__extra1'));
            $('.group-slide__extra.__extra1').append($('.group-slide .__L2.__extra1'));
            $('.group-slide__extra.__extra2').append($('.group-slide .__R1.__extra2'));
            $('.group-slide__extra.__extra2').append($('.group-slide .__L2.__extra2'));
            $('.group-slide__extra.__extra3').append($('.group-slide .__R1.__extra3'));
            $('.group-slide__extra.__extra3').append($('.group-slide .__L2.__extra3'));
            $('.group-slide .__L1').removeClass('__display3 __L1').addClass('__display2 __L');
            $('.group-slide .__M1').removeClass('__display3 __M1').addClass('__display2 __R');
            $('.group-slide .__R1').removeClass('__display3 __R1').addClass('__display2 __L');
            $('.group-slide .__L2').removeClass('__display3 __L2').addClass('__display2 __R');
            $('.group-slide .__M2').removeClass('__display3 __M2').addClass('__display2 __L');
            $('.group-slide .__R2').removeClass('__display3 __R2').addClass('__display2 __R');
            alert('b');
        } else {
            alert('c');}*/

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
        }, 400, function () {
            //$('.group-info_iframe', parent.document).attr('src', ' ');
        });
    }

    $('.group-exhibit').click(function () {
        var parentWidth = $(window, parent.document).width();
        if (parentWidth < smartphone) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupExhibit#0/' + groupInfoNumber;
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else if (parentWidth < iPadPro && widthRatio < 6 / 5) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupExhibit#0/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupExhibit#0/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        }
    });
    $('.group-theater').click(function () {
        var parentWidth = $(window, parent.document).width();
        if (parentWidth < smartphone) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupTheater#0/' + groupInfoNumber;
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else if (parentWidth < iPadPro && widthRatio < 6 / 5) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupTheater#0/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupTheater#0/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        }
    });
    $('.group-perform').click(function () {
        var parentWidth = $(window, parent.document).width();
        if (parentWidth < smartphone) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupPerform#0/' + groupInfoNumber;
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else if (parentWidth < iPadPro && widthRatio < 6 / 5) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupPerform#0/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupPerform#0/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        }
    });
    $('.group-H3').click(function () {
        var parentWidth = $(window, parent.document).width();
        if (parentWidth < smartphone) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupH3#0/' + groupInfoNumber;
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else if (parentWidth < iPadPro && widthRatio < 6 / 5) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupH3#0/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupH3#0/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        }
    });
    $('.group-Messe').click(function () {
        var parentWidth = $(window, parent.document).width();
        if (parentWidth < smartphone) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupMesse#0/' + groupInfoNumber;
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else if (parentWidth < iPadPro && widthRatio < 6 / 5) {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupMesse#0/' + Math.floor(groupInfoNumber / 2);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        } else {
            var groupInfoNumber = $(this).closest('tr').index();
            var groupInfoOpenSrc = 'groupMesse#0/' + Math.floor(groupInfoNumber / 3);
            $('.group-info_iframe', parent.document).attr('src', groupInfoOpenSrc);
            openGroupInfo();
        }
    });


    //閉じるボタン
    $('.group-info_close').click(function () {
        closeGroupInfo();
    });

    //ブラックアウトで閉じる
    /*$('#blackout_group-info').click(function () {
        closeGroupList();
        closeGroupInfo();
    });*/

    //リロード時に団体情報割りが乱れる
    $(window).on('beforeunload', function(){
        $('.group-info_iframe', parent.document).attr('src', '');
    });
});
