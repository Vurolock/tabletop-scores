const socket = io.connect('http://localhost:3000');
const $msgForm = $('#msg-form');
const $msgInput = $('#m');
const $msgBox = $('#messages');

$(() => {
    $msgForm.submit(() => {
        socket.emit('message', $msgInput.val());
        $msgInput.val('');
        return false;
    });

    socket.on('message', msg => {
        $msgBox.append($('<li>').text(msg));
    })
});