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
    io.to(socket.id).emit('recieveRestoreEvent', rooms) //特定のユーザーのみ（socket.idで送信元のみに送信）
  });
};
