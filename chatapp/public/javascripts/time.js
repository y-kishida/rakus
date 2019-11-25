  //ここにカウントダウンの秒数定義
  let count = 10;

  //　属性の値を取得する
  if ($('.room-quiz_button').is(':visible')) {
    // 表示の場合
  } else {
    // 非表示の場合
    setInterval(count_down, 1000);
    function count_down() {
      count--;
      const count_text = 'クイズ回答終了まで'
      $('#countdown').text(count);
      //　ここに復元機能を呼び出す
      // socket.emit('sendQuizModeEvent');
      // 0秒になった時
      if(count == 0) {
      location.href = '/end';
    }
  }
  }

  // クイズボタンがクリックされた場合の処理
  $('.room-quiz_button').click(function(){
    setInterval(count_down, 1000);
    function count_down() {
      count--;
      const count_text = 'クイズ回答終了まで'
      $('#countdown').text(count);
      //　ここに復元機能を呼び出す
      // socket.emit('sendQuizModeEvent');
      // 0秒になった時
      if(count == 0) {
      location.href = '/end';
    }
  }
  });
