$(document).ready(function () {
    $('#loader').addClass('loaded');

    //生徒向けページ
    $('.accordion_nav').click(function () {
        $(this).toggleClass('active');
        $(this).next('.accordion_content').toggleClass('active');
    });
});
