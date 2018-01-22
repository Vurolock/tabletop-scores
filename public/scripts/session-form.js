const $addPlayerBtn = $('#add-player-btn');
const $playerRow = $('[data-player-row]');
const $userSelect = $('#players')
const $submitBtn = $('[data-submit]');
const $playerGroup = $('[data-player-info]');
// const $playerRowTarget = $('div[data-player-row]')
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
//     $playerGroup.append(`<div class="form-row" data-player-row>
//     <div class="form-group col-sm-8">
//         <label for="players${$playerRow.length}">Player Name</label>
//         <select name="name" id="players${$playerRow.length}" class="form-control form-control-lg" required>

//         </select>
//     </div>
//     <div class="form-group col-sm-4">
//         <label for="score">Score</label>
//         <input type="number" class="form-control" id="score${$playerRow.length}" name="score">
//     </div>
// </div>`)
    console.log($playerRow);
    console.log($('[data-player-row]').length);
})
