'use strict';

// 投稿メッセージをサーバに送信する
function publish() {
    // ユーザ名を取得
    const userName = $('#userName').val();
    // 入力されたメッセージを取得
    const message = $('#message').val();
    //ユーザ名とメッセージの内容のデータをまとめる
    const userMessage = { userName, message };

    // 空文字以外ならTrue判定を逆転 == 空文字ならTrueになる
    if (!message.match(/\S/g)) {
        alert('テキストを入力してください');
        $('#message').val('');
        return false
    }

    // 投稿内容に正解が含まれているかの確認
    if (message === 'hogehoge') {
        alert('正解しました！');
        exit();
    }

    // 投稿内容を送信
    socket.emit('sendMessage', userMessage);

    // 投稿したら削除
    $('#message').val('');
    return false;
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (userMessage) {
    $('#thread').prepend(`<p>${userMessage.userName}さん:${userMessage.message}</p>`);
});
