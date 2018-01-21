const addPlayerBtn = $('#add-player-btn');
const playerRow = $('#player-row');
const form = $('.needs-validation');
const dataList = $('#playerList')


$.get('/players')
    .then((data) => {
        // console.log(response, response.data);
        let playerNames = data.map(entry => {
            return dataList.append(`<option value="${entry.name}"></option>`);
        });
});


addPlayerBtn.on('click', (event) => {
    console.log('Click')
    if (err) throw err;
    playerRow.append(`<div class="form-row" id="player-row">
    <div class="form-group col-sm-8">
        <label for="players">Player Name</label>
        <input type="text" class="form-control" id="players" name="name" list="playerList" required>
        <datalist id="playerList">
           
        </datalist>
    </div>
    <div class="form-group col-sm-4">
        <label for="score">Score</label>
        <input type="number" class="form-control" id="score" name="score">
    </div>
</div>`)
})