'use strict';

module.exports = function (server) {

    const socketIo = require('socket.io')(server, { wsEngine: 'ws' });
    const io = socketIo.listen(server);

    io.sockets.on('connection', function (socket) {
        // 投稿モジュールの呼出
        require('./publish')(socket, io);

        // 入室モジュールの呼出
        require('./enter')(socket);

        // 退室モジュールの呼出
        require('./exit')(socket);

        // クイズモジュールの呼出
        require('./quiz')(socket, io);

        // 復元モジュールの呼出
        require('./restore')(socket, io);

        // クイズ’終了モジュールの呼出
        require('./quitQuizMode')(socket);
    });
};
