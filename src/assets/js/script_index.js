$(document).ready(function () {
    //fullpage設定
    $('#fullpage').fullpage({
        //anchors: ['Home', 'About', 'Access', 'Group', 'Timetable', 'Downloads'],
        //anchors: ['Home', 'About', 'Access', 'Group', 'Downloads'],
        anchors: ['Home', 'About', 'Access', 'Downloads'],
        lockAnchors: true,
        menu: '#menu',
        slidesNavigation: false,
        responsiveHeight: 500,
        scrolloverflow: true,
        autoScrolling: false,
        fitToSection: false,
        bigSectionsDestination: 'top',
        verticalCentered: true,
        animateAnchor: false,

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

});
