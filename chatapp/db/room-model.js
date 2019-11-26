const Model = require('./model');
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


/**
 * Room Model
 */
class RoomModel {
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
          room_id,
          message,
          date,
          message_type
      FROM
          room
    `;

    return this.model.findAll(sql)
      .then((rows) => {
        const rooms = [];

        for(const row of rows) {
          rooms.push(new RoomEntity(row.id, row.name, row.room_id, row.message, row.date, row.message_type));
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
          room_id,
          message,
          date,
          message_type
      FROM
          room
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };

    return this.model.findOne(sql, params)
      .then((row) => {
        return new RoomEntity(row.id, row.name, row.room_id, row.message, row.date, row.message_type);
      });
  }

  /**
   * 登録する
   *
   * @param room 登録情報を持つ Entity
   * @return 登録できたら Resolve する
   */
  create(room) {
    // ID は自動採番させる
    const sql = `
      INSERT INTO room (
          name,
          room_id,
          message,
          date,
          message_type
      ) VALUES (
          $name,
          $room_id,
          $message,
          $date,
          $message_type
      )
    `;
    const params = {
      $name: room.name,
      $room_id: room.room_id,
      $message: room.message,
      $date: room.date,
      $message_type: room.message_type
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
   * @param room 更新情報を持つ Entity
   * @return 登録 or 更新できたら Resolve する
   */
  update(room) {
    const sql = `
      REPLACE INTO room (
          id,
          name,
          room_id,
          message,
          date,
          message_type
      ) VALUES (
          $name,
          $room_id,
          $message,
          $date,
          $message_type
      )
    `;
    const params = {
      $id  : room.id,
      $name: room.name,
      $room_id: room.room_id,
      $message: room.message,
      $date: room.date,
      $message_type: room.message_type
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
          room
      WHERE
          id = $id
    `;
    const params = {
      $id: id
    };
    return this.model.run(sql, params);
  }
}

module.exports = RoomModel
