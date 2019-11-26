'use strict';
const db = require('../db/db').db;
const quiz_db = [
  {
    "question": "りんごのいろは？",
    "answer": "赤色"
  },
  {
    "question": "信号機の進めの色は？",
    "answer": "青色"
  },
  {
    "question": "株式会社ラクスが上場する株式市場は？",
    "answer": "東証マザーズ"
  }
]

module.exports = function (socket, io) {
  // 退室メッセージをクライアントに送信する
  socket.on('sendQuizMessageEvent', function (data) {
    if (!data) {
      return;
    }
    let quiz = quiz_db[Math.floor(Math.random() * quiz_db.length)];
    data = {
      data,
      quiz
    };
    // DBのクイズ状態の更新
    db.run('UPDATE chat SET quiz_start = ? WHERE id = ?', [1, 1]);
    // 全クライアントが受信するメッセージ表示イベント（receiveQuizMessageEvent）を送信する
    io.sockets.emit('receiveQuizMessageEvent', data);
    io.sockets.emit('receiveQuizAnswer', data.quiz['answer']);
  });
};
