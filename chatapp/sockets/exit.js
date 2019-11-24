'use strict';

module.exports = function (socket) {
  // 退室メッセージをクライアントに送信する
  socket.on('sendExitMessageEvent', function (data) {
    if (!data) {
      return;
    }
    console.log('クライアントの入力値：' + data);
    if (global.memberList.indexOf(data) != -1) {
      memberList.splice(memberList.indexOf(data), 1);
      console.log('exit memberList: ', memberList);
    }
    // 全クライアントが受信するメッセージ表示イベント（receiveMessageEvent）を送信する
    socket.broadcast.emit('receiveMessageEvent', data);
  });
};
