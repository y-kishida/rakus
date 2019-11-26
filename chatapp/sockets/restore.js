'use strict';

const db = require('../db/db').db;
var roomModel = require('../db/room-model');

module.exports = function (socket, io) {
  // 退室メッセージをクライアントに送信する
  socket.on('sendRestoreEvent', async function (data) {
    if (!data) {
      return;
    }
    const room = new roomModel();
    const rooms = await room.findAll();
    for ( var i = rooms.length-1;  i > 0;  i--  ) {
      console.log(rooms[i].message_type);
      // console.log(rooms[i].message_type);
      if (rooms[i].message_type == 'クイズ'){
        var obj = JSON.parse(rooms[i].message);
        console.log('test',obj.quiz['answer']);
        io.to(socket.id).emit('receiveQuizAnswer', obj.quiz['answer']);
        break;
      }
    }
    io.to(socket.id).emit('recieveRestoreEvent', rooms) //特定のユーザーのみ（socket.idで送信元のみに送信）
  });
};
