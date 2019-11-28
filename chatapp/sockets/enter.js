'use strict';

global.memberList = []

module.exports = function (socket, io) {
  // 入室メッセージをクライアントに送信する
  socket.on('enterRoom', function (data) {
    if (!(global.memberList.indexOf(data) != -1)) {
      global.memberList.push(data);
    }
    console.log('enter memberList: ', global.memberList);
    data = {
      data,
      memberList,
    }
    io.sockets.emit('enterRoom', data);
  });

  socket.on('checkNameDeplicate', function (userName) {
    // 存在していたら、入室できないフラグ
    if (global.memberList.indexOf(userName) != -1) {
      socket.emit('blockEnterFlag', true);
    } else {
      socket.emit('blockEnterFlag', false);
    }
  });
};
