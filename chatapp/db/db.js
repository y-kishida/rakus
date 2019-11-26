const sqliite3 = require('sqlite3').verbose();

/** DB ファイルを生成 or 取得する */
const db = new sqliite3.Database('./sqlite3-database.db');

/** DB の初期化処理 */
const init = () => {
  db.run(`
    CREATE TABLE IF NOT EXISTS chat (
      id    INTEGER  PRIMARY KEY  AUTOINCREMENT,
      name  TEXT,
      quiz_start INTEGER
    )
  `);
  db.run(`
    CREATE TABLE IF NOT EXISTS room (
      id    INTEGER  PRIMARY KEY  AUTOINCREMENT,
      name TEXT,
      room_id  INTEGER,
      message TEXT,
      date TEXT,
      message_type TEXT
    )
  `);
};

// db.serialize(() => {
//   // テーブルがなければ作成する
//   db.run(`
//     CREATE TABLE IF NOT EXISTS chat (
//       id    INTEGER  PRIMARY KEY  AUTOINCREMENT,
//       name  TEXT,
//       quiz_start INTEGER
//     )
//   `);
//
//   // Prepared Statement でデータを挿入する
//   const stmt = db.prepare('INSERT INTO chat (name, quiz_start) VALUES (?, ?)');
//   stmt.run(['quiz', 0]);
//
//   // prepare() で取得した Prepared Statement オブジェクトをクローズする。これをコールしないとエラーになる
//   stmt.finalize();
// });
//
// db.serialize(() => {
//   db.each('SELECT * FROM chat', (error, row) => {
//     if(error) {
//       console.error('Error!', error);
//       return;
//     }
//
//     // カラムを指定してデータを表示する
//     console.log(row.name + ' … ' + row.quiz_start);
//   });
// });

module.exports = {
  db: db,
  init: init
};
