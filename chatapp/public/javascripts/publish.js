'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    //ユーザ名とメッセージの内容のデータをまとめる
    const userMessage = { userName, message };
    // 投稿内容に正解が含まれているかの確認
    if (message === 'hogehoge') {
        alert('正解しました！');
        exit();
    }
    // 投稿内容を送信
    socket.emit('sendMessage', userMessage);
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (userMessage) {
    $('#thread').prepend(`<p>${userMessage.userName}さん:${userMessage.message}</p>`);
});
