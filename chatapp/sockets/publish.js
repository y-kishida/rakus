'use strict';

module.exports = function (socket, io) {
  // 投稿メッセージを送信する
  socket.on('sendMessage', function (userMessage) {
    if (!userMessage.message) {
      return;
    }
    console.log(`${userMessage.userName}さんの入力値:${userMessage.message}`);
    // 先頭と最後の空白を削除
    userMessage.message = userMessage.message.trim();
    // 改行コード\nを<br>に
    userMessage.message = userMessage.message.replace(/\r?\n/g, '<br>');
    io.sockets.emit('receiveMessage', userMessage);
  });
};
