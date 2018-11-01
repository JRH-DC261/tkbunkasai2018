$(document).ready(function () {
    //初期時刻(デバッグ用)
    //var currentTime = 0925;

    //スケジュールづくり(この後を先に読むこと推奨)
    function schedule() {
        //現在時刻を取得(hhmm)
        function getCurrentTime() {
            //カウントダウン
            var now = new Date();
            var currentHour = now.getHours();
            var currentMinute = now.getMinutes();
            var currentTime = currentHour * 100 + currentMinute;
            return (currentTime);
        };
        var currentTime = getCurrentTime();

        //現在時刻生成(デバッグ用)
        //mmが60以上にならないよう場合分け
        /*if (String(currentTime).slice(-2) < 59) {
            currentTime += 1;
        } else {
            currentTime += 41;
        }
        console.log(currentTime);*/

        $('tr').each(function () {
            //開始・終了時刻を読み取る
            var startTime = $(this).data('startTime');
            var endTime = $(this).data('endTime');

            //開始前公演にscheduledクラス付与
            if (startTime > currentTime) {
                $(this).addClass('scheduled');
            }
            //途中入場可の場合は公演開始後も残す(scheduled・afterStartクラス付与)
            else if ($(this).hasClass('lateEntry') && endTime > currentTime) {
                $(this).addClass('scheduled');
                $(this).addClass('afterStart');
                $(this).children('.startTime').html('公演中');
            }
            //既に始めっていて途中入場不可の公演・公演終了後の公演は表示を消す
            else {
                $(this).removeClass('scheduled');
                $(this).removeClass('active');
            };
            //公演3分前になったらnearStartクラス付与
            //10進数で分を扱っているのでmm=が60以上になってしまう→mm=00の3分前が97ではなく57になるように場合分け
            if (String(startTime).slice(-2) >= 3 && startTime < currentTime + 4) {
                $(this).addClass('nearStart');
            } else if (String(startTime).slice(-2) < 3 && startTime < currentTime + 43) {
                $(this).addClass('nearStart');
            };
        });
        //上位n-1件を表示
        $('tr.scheduled').slice(0, 13).addClass('active');

        //現在時刻表示
        var currentTimeText = (0 + String(currentTime).slice(-4, -2)).slice(-2) + ':' + String(currentTime).slice(-2);
        $('.currentTime>span').html(currentTimeText);
    }

    //読み込み時の動作
    //csvから公演情報を読み込み→HTMLに出力
    $.get('assets/TT_day1.csv', function (data) {
        var csv = $.csv()(data);
        //出力するHTML(最初は空)
        var performanceList = '';

        //HTML生成(this[n]はcsvのn列目)
        $(csv).each(function (index) {
            //hhhmmをhh:mmに変える
            var startTimeText = this[0].slice(-4, -2) + ':' + this[0].slice(-2);
            var endTimeText = this[1].slice(-4, -2) + ':' + this[1].slice(-2);
            //適宜dataとclassを付与しながらHTMLをperformanceListに書き足し
            performanceList += '<tr class="' + this[9] + '" data-start-time=' + this[0] + ' data-end-time=' + this[1] + '>';
            performanceList += '<td class="startTime">' + startTimeText + '</td>';
            performanceList += '<td class="decoIcon">' + '<img class="deco-icon" src="assets/img/deco-icon/deco-icon_' + this[6] + '.png">' + '</td>';
            performanceList += '<td class="group">' + this[4] + '</td>';
            performanceList += '<td class="performanceName">' + this[3] + '</td>';
            performanceList += '<td class="place ' + this[10] + '"><span>' + this[5] + '</span></td>';
            performanceList += '<td class="performanceType">' + this[8] + '</td>';
            //performanceList += '<td>' + '</td>';
            performanceList += '<td class="endTime">' + endTimeText + '</td>';
            performanceList += '<td class="page">&nbsp;&nbsp;P.' + this[7] + '</td>';
            performanceList += '</tr>';
        });
        //HTMLを表内に出力
        $("#timetable").append(performanceList);

        //各場所ごとに矢印追加
        $('.orange, .omatsuri, .skyHall, .st, .gym').append(' 🡫');
        $('.blue').append('  🡪');
        $('.red, .messeHall').prepend('🡨 ');
        //文字の始まりをそろえる
        $('.orange, .omatsuri, .skyHall, .st, .gym').prepend('　&nbsp;');
        $('.blue').prepend('　&nbsp;');

        schedule();

        //切替表示項目の初期設定
        $('.place, .endTime').addClass('active');
    });

    //読み込み後も繰り返し行う動作
    //スケジュールづくりをnミリ秒おきに繰り返す
    setInterval(function () {
        schedule();
    }, 60000);

    //表示切替をnミリ秒おきに繰り返す
    setInterval(function () {
        $('.place, .endTime, .page, .performanceType').toggleClass('active');
    }, 7500);
});
