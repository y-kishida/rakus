'use strict';
const db = require('../db/db').db;
var roomModel = require('../db/room-model');
/**
 * Room Entity
 */
class RoomEntity {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param name room名
   * @param message 投稿内容
   * @param date 投稿した日付
   * @param message_type 投稿の種類（チャット、メモ、回答）
   */
  constructor(id, name, room_id, message, date, message_type) {
    this.id   = id;
    this.name = name;
    this.room_id = room_id;
    this.message  = message;
    this.date = date;
    this.message_type = message_type
  }
}
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
  socket.on('sendQuizMessageEvent', async function (data) {
    if (!data) {
      return;
    }
    let quiz = quiz_db[Math.floor(Math.random() * quiz_db.length)];
    let quiz_data = {}
    quiz_data = {
      data,
      quiz
    };
    console.log(quiz_data);

    // DBのクイズ状態の更新
    db.run('UPDATE chat SET quiz_start = ? WHERE id = ?', [1, 1]);
    // 全クライアントが受信するメッセージ表示イベント（receiveQuizMessageEvent）を送信する
    io.sockets.emit('receiveQuizMessageEvent', quiz_data);
    io.sockets.emit('receiveQuizAnswer', quiz_data.quiz['answer']);
    //　投稿内容をDBに保存
    var today = new Date();
    const room = new roomModel();
    var result = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() +":"+ today.getSeconds();
    var json = JSON.stringify(quiz_data);

    await room.create(new RoomEntity(null,quiz_data.data,1,json,result,'クイズ'));
  });
};
