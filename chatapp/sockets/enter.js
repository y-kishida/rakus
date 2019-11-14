'use strict';

module.exports = function (socket) {
    // 入室メッセージをクライアントに送信する
    socket.on('enterRoom', function (data) {
      socket.broadcast.emit('enterRoom', data)
    });
};
