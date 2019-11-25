'use strict';

const socket = io.connect();

// チャットルームに入室する
function enter() {
  // 入力されたユーザ名を取得する
  const userName = $('#userName').val();
  // ユーザ名が未入力でないかチェックする
  console.log(userName);
  if (userName !== '') {
    socket.emit('checkNameDeplicate', userName);
  } else {
    alert('ユーザ名を入力してください');
  }
};

socket.on('blockEnterFlag', function (flag) {
  console.log('Yo!')
  if (flag) {
    console.log('Yeah!')
    alert('すでに同じ名前の人が入室しています\n\
    名前を変えてください');
  } else {
    $('form').submit();
  }
});