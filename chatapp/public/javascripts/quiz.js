'use strict';

let answer = null;

// クイズ開始をサーバに送信する
function quiz() {
    // ユーザ名取得
    const userName = $('#userName').val();
    // クイズメッセージイベントを送信する
    socket.emit('sendQuizMessageEvent', userName);
}

// サーバから受信した退室メッセージを画面上に表示する
socket.on('receiveQuizMessageEvent', function (data) {
    // ここにクイズボタンを消す処理
    $('.room-quiz_button').hide();
    //　ここに投稿ボタンを回答ボタンに変える処理
    document.getElementById("btn-text").value = "回答";
    $('#thread').prepend('<h3>' + data.data + 'さんがクイズの森を開始しました。' + '</h3>');
    $('#thread').prepend('<h3>' + data.quiz['question'] + '</h3>');
    // ここに一度回答したら退出ボタンを消す処理
    $('.room-publish_button').click(function () {
        $('.room-exit_button').hide();
    });
});

socket.on('receiveQuizAnswer', function (data) {
    answer = data;
});
