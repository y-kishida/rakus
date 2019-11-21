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
      room_id  TEXT,
      name TEXT,
      message text
    )
  `);
};
db.serialize(() => {
  // Prepared Statement でデータを挿入する
  const stmt = db.prepare('INSERT INTO chat (name, quiz_start) VALUES (?, ?)');
  stmt.run(['quiz', 0]);
  // prepare() で取得した Prepared Statement オブジェクトをクローズする。これをコールしないとエラーになる
  stmt.finalize();
});
db.close();