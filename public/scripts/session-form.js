const $addPlayerBtn = $('#add-player-btn');
const $playerRow = $('[data-player-row]');
const $userSelect = $('#players')
const $submitBtn = $('[data-submit]');
const $playerGroup = $('[data-player-info]');
// const $playerRowTarget = $('div[data-player-row]')
// const $dataList = $('#playerList');

$.get('/users')
    .then((data) => {
        let playerNames = data.map(entry => {
            return $userSelect.append(`<option value=${entry.id}>${entry.name}</option>`)
            });
    });

$addPlayerBtn.on('click', (event) => {
    $playerRow.clone().appendTo($playerGroup);
})
