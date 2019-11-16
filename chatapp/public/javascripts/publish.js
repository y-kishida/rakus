'use strict';

// 入室時の休止フラッグの設定（初期値はfalse、休止しない)
let take_break_flag = false;

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
    if (message.match('hogehoge')) {
        alert('正解しました！');
        exit();
    }

    // 投稿内容を送信
    socket.emit('sendMessage', userMessage);

    // 投稿したら削除
    $('#message').val('');
    return false;
}

// 休止ボタンが押されたらフラッグを変更
function take_break() {
    take_break_flag = !take_break_flag;
    if (take_break_flag) {
        $('#take_break_button').val('休止中');
    } else {
        $('#take_break_button').val('休止する')
    }
}

// サーバから受信した投稿メッセージを画面上に表示する
socket.on('receiveMessage', function (userMessage) {
    // 休止フラッグがtrueなら処理をしない
    if (take_break_flag) {
        return;
    }

    // 自分の投稿かどうかを判定して、自分の投稿なら太字
    if ($('#userName').val() === userMessage.userName) {
        $('#thread').prepend(`<div class="message-box"><div class="userName">${userMessage.userName}さん:</div><div class="message">${userMessage.message}</div>`);
    } else {
        $('#thread').prepend(`<p>${userMessage.userName}さん:${userMessage.message}</p>`);
    }
});
