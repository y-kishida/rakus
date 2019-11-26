'use strict';

// 入室メッセージをサーバに送信する
// 入力されたユーザ名を取得する
const userName = $('#userName').val();

// 入室メッセージイベントを送信する
socket.emit('enterRoom', userName);
socket.emit('sendRestoreEvent',userName);

// サーバから受信した入室メッセージを画面上に表示する
socket.on('enterRoom', function (data) {
    $('#thread').prepend(`<p>${data}さんが入室しました</p>`);
});

socket.on('recieveRestoreEvent', function (rooms) {
    console.log(rooms);
    for (var i = 0; i < rooms.length; i++) {
      if (rooms[i].message_type == 'クイズ'){
        var obj = JSON.parse(rooms[i].message);
        $('#thread').prepend('<h3>' + rooms[i].name + 'さんがクイズの森を開始しました。' + '</h3>');
        $('#thread').prepend('<h3>' + obj.quiz['question'] + '</h3>');
      }
      else if ($('#userName').val() === rooms[i].name) {
          $('#thread').prepend(`<div class="message-box my-message"><div class="userName">${rooms[i].name}さん:</div><div class="message">${rooms[i].message}</div>`);
      } else {
          $('#thread').prepend(`<div class="message-box"><div class="userName">${rooms[i].name}さん:</div><div class="message">${rooms[i].message}</div>`);
      }
}
});
