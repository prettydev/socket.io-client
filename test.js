var socket = require('socket.io-client')('ws://localhost:8500');
const repl = require('repl')
const chalk = require('chalk');
socket.on('disconnect', function () {
    socket.emit('disconnect')
});
socket.on('connect', () => {
    console.log(chalk.red('=== connected to the server ==='))
})
socket.on('ServerTime', (data) => {
    console.log(chalk.green(data));
})
repl.start({
    prompt: '',
    eval: (cmd) => {
        socket.send(cmd)
    }
})