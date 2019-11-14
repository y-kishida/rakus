'use strict';

module.exports = function (socket, io) {
    // 投稿メッセージを送信する
    socket.on('sendMessage', function (userMessage) {
      if (!userMessage.message) {
        return;
      }
      console.log(`${userMessage.userName}さんの入力値:${userMessage.message}`);

    io.sockets.emit('receiveMessage', userMessage);
    });
};
