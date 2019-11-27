'use strict';
const db = require('../db/db').db;
module.exports = function (socket, io) {
  // 退室メッセージをクライアントに送信する
  socket.on('sendQuizModeEvent', function (count) {
    console.log(count);
    // DBのクイズ状態の更新
    setInterval(count_down, 1000);
    function count_down() {
      count--;
      if(count == 0) {
        db.run('UPDATE chat SET quiz_start = ? WHERE id = ?', [0, 1]);
    }
  }
    // db.run('UPDATE chat SET quiz_start = ? WHERE id = ?', [0, 1]);
  });
};
