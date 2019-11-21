'use strict';
const db = require('../db/db').db;

module.exports = function (socket, io) {
  // 退室メッセージをクライアントに送信する
  socket.on('sendQuizModeEvent', function (data) {
    if (!data) {
      return;
    }
    // DBのクイズ状態の更新
    db.run('UPDATE chat SET quiz_start = ? WHERE id = ?', [0, 1]);
  });
};
