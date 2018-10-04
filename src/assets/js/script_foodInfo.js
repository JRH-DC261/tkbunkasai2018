$(document).ready(function () {
    //fullpage
    //fullpage設定
    $('#fullpage').fullpage({
        anchors: ['FoodInfo', 'Shokuhin', 'Kissa'],
        lockAnchors: true,
        menu: '#menu',
        slidesNavigation: false,
        scrolloverflow: true,
        autoScrolling: false,
        fitToSection: false,
        bigSectionsDestination: 'top',
        verticalCentered: true,
    });
    //メニュー
    $('.menu_foodInfo').click(function () {
        $.fn.fullpage.moveTo('FoodInfo');
    });
    $('.menu_shokuhin').click(function () {
        $.fn.fullpage.moveTo('Shokuhin');
    });
    $('.menu_kissa').click(function () {
        $.fn.fullpage.moveTo('Kissa');
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

    /*
    noInfo:     情報提供休止
    wait[5,15,30,45,60,90]: []分待ち
    wait[60,120]Over:       []分以上待ち
    lineStop:   行列形成休止
    salesStop:  販売休止
    salesEnd:   販売終了
    */

    var asahi1 = 'wait5';
    var asahi2 = 'wait15';
    var asahi3 = 'wait30';
    var asahi4 = 'wait45';
    var asahi5 = 'wait60';
    var nakaniwa1 = 'lineStop';
    var nakaniwa2 = 'salesStop';
    var kissa1 = 'salesEnd';
    var kissa2 = 'noInfo';

    function foodInfo(food, status) {
        var statusSrc = 'assets/img/foodInfo/' + status + '.svg';
        var foodID = '#' + food;
        $(foodID).attr('src', statusSrc);
    };
    foodInfo('asahi1', asahi1);
    foodInfo('asahi2', asahi2);
    foodInfo('asahi3', asahi3);
    foodInfo('asahi4', asahi4);
    foodInfo('asahi5', asahi5);
    foodInfo('nakaniwa1', nakaniwa1);
    foodInfo('nakaniwa2', nakaniwa2);
    foodInfo('kissa1', kissa1);
    foodInfo('kissa2', kissa2);
});
