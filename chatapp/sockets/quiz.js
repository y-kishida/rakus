'use strict';

module.exports = function (socket, io) {
    // 退室メッセージをクライアントに送信する
    socket.on('sendQuizMessageEvent', function (data) {
      if (!data) {
          return;
      }
      // 全クライアントが受信するメッセージ表示イベント（receiveQuizMessageEvent）を送信する
      io.sockets.emit('receiveQuizMessageEvent',data);
    });
};
