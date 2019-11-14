'use strict';

// クイズ開始をサーバに送信する
function quiz() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // クイズメッセージイベントを送信する
    socket.emit('sendQuizMessageEvent',userName);
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveQuizMessageEvent', function (data) {
    // ここにクイズボタンを消す処理
    $('.room-quiz_button').hide();
    $('#thread').prepend('<p>' + data +'さんがクイズの森を開始しました。'+ '</p>');
});
