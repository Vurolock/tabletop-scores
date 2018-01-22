const $addPlayerBtn = $('#add-player-btn');
const $playerRow = $('#player-row');
const $userSelect = $('#players')
const $submitBtn = $('[data-submit]');
const $playerGroup = $('[data-player-info]')
// const $dataList = $('#playerList');


$.get('/players')
    .then((data) => {
        let playerNames = data.map(entry => {
            return $userSelect.append(`<option value=${entry.id}>${entry.name}</option>`)
            });
    });


$addPlayerBtn.on('click', (event) => {
    console.log('click')
    $playerRow.clone().appendTo($playerGroup);
})
