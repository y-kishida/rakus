const Model = require('./model');
/**
 * Chat Entity
 */
class ChatEntity {
  /**
   * コンストラクタ
   *
   * @param id ID
   * @param name chatroom名
   * @param quiz_start クイズの状況（0:チャット状態,1:クイズ開始状態）
   */
  constructor(id, name, quiz_start) {
    this.id   = id;
    this.name = name;
    this.quiz_start  = quiz_start;
  }
}


/**
 * Chat Model
 */
class ChatModel {
  /**
   * コンストラクタ
   */
  constructor() {
    this.model = new Model();
  }

  /**
   * 全件取得する
   *
   * @return Entity の配列を Resolve する
   */
  findAll() {
    const sql = `
      SELECT
          id,
          name,
          quiz_start
      FROM
          chat
    `;

    return this.model.findAll(sql)
      .then((rows) => {
        const rooms = [];

        for(const row of rows) {
          rooms.push(new ChatEntity(row.id, row.name, row.quiz_start));
        }

        return rooms;
      });
  }

  /**
   * ID を指定して1件検索する
   *
   * @param id ID
   * @return Entity を Resolve する
   */
  findById(id) {
    const sql = `
      SELECT
          id,
          name,
          quiz_start
      FROM
          chat
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };

    return this.model.findOne(sql, params)
      .then((row) => {
        // return new ChatEntity(row.id, row.name, row.quiz_start);
        return new ChatEntity(row.id, row.name, row.quiz_start);
      });
  }

  /**
   * 登録する
   *
   * @param chat 登録情報を持つ Entity
   * @return 登録できたら Resolve する
   */
  create(chat) {
    // ID は自動採番させる
    const sql = `
      INSERT INTO chat (
          name,
          quiz_start
      ) VALUES (
          $name,
          $quiz_start
      )
    `;
    const params = {
      $name: chat.name,
      $quiz_start : chat.quiz_start
    };

    return this.model.run(sql, params)
      .then((id) => {
        // 登録したデータを返却する
        return this.findById(id);
      });
  }

  /**
   * 登録 or 更新する
   *
   * @param chat 更新情報を持つ Entity
   * @return 登録 or 更新できたら Resolve する
   */
  update(chat) {
    const sql = `
      REPLACE INTO chat (
          id,
          name,
          quiz_start
      ) VALUES (
          $id,
          $name,
          $quiz_start
      )
    `;
    const params = {
      $id  : chat.id,
      $name: chat.name,
      $question : chat.quiz_start
    };

    return this.model.run(sql, params);
  }
  /**
   * 削除する
   *
   * @param id ID
   * @return 削除できたら Resolve する
   */
  delete(id) {
    const sql = `
      DELETE FROM
          chat
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    return this.model.run(sql, params);
  }
}

module.exports = ChatModel
