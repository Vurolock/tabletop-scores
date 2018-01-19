const addPlayerBtn = $('#add-player-btn');
const playerRow = $('#player-row')

addPlayerBtn.on('click', (event) => {
    console.log('Click')
    playerRow.append(`<div class="form-group col-sm-8">
    <label for="players">Player Name</label>
    <input type="text" class="form-control" id="players">
</div>
<div class="form-group col-sm-4">
    <label for="score">Score</label>
    <input type="text" class="form-control" id="score">
</div>`)
})