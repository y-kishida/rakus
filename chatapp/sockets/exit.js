'use strict';

module.exports = function (socket) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendExitMessageEvent', function (data) {
      if (!data) {
          return;
      }

      console.log('クライアントの入力値：' + data);
      // 全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
      socket.broadcast.emit('receiveMessageEvent',data);
    });
};
