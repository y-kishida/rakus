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

module.exports = function (socket, io) {
  // 投稿メッセージを送信する
  socket.on('sendMessage', async function (userMessage) {
    if (!userMessage.message) {
      return;
    }
    console.log(`${userMessage.userName}さんの入力値:${userMessage.message}`);
    // 先頭と最後の空白を削除
    userMessage.message = userMessage.message.trim();
    // 改行コード\nを<br>に
    userMessage.message = userMessage.message.replace(/\r?\n/g, '<br>');

    //　投稿内容をDBに保存
    var today = new Date();
    console.log(today);
    // console.log("年=" + today.getFullYear());
    // console.log("月=" + (today.getMonth()+1));
    // console.log("日=" + today.getDate());
    // console.log("時=" + today.getHours());
    // console.log("分=" + today.getMinutes());
    // console.log("秒=" + today.getSeconds());
    //'2017-12-09 13:13:13'
    const room = new roomModel();
    var result = today.getFullYear() + "-" + (today.getMonth()+1) + "-" + today.getDate() + " " + today.getHours() + ":" + today.getMinutes() +":"+ today.getSeconds();
    await room.create(new RoomEntity(null,userMessage.userName,1,userMessage.message,result,'チャット'));

    io.sockets.emit('receiveMessage', userMessage);
  });

  socket.on('sendTakeBreakNotification', function (userMessage) {
    socket.broadcast.emit('recceiveTakeBreakeNotification', userMessage);
  })
};
