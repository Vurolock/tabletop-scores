const $userTarget = $('[data-user]');
const $otherUsers = $('[data-dropdown]');
const $accordion = $('#accordion');
const $homePageUser = $('[data-home-user]');

let filterData = theData => {
    const $sessionElements = $('[data-session]');
    let userId = Number($userTarget.attr('data-user-id'));
    let homePageId = Number($homePageUser.attr('home-id'));

    $sessionElements.each((index, element) => {
        let $element = $(element);
        let sessionId = Number($element.attr('sessionId'));
        let filteredScores = theData.filter((obj) => sessionId == obj.session.id);

        filteredScores.forEach(obj => {
            let targetDiv = $element.find('[data-dropdown]');

            if (userId === obj.player.id || obj.player.id === homePageId) {
                targetDiv.append(`<div class="current-player">
                                      <div class="session-player-name">${obj.player.name}</div>
                                      <div class="session-player-score">${obj.score}</div>
                                  </div>`);
            } else {
                targetDiv.append(`<div class="other-player">
                                      <div class="session-player-name">${obj.player.name}</div>
                                      <div class="session-player-score">${obj.score}</div>
                                  </div>`);
            }
        }); 
    }); 
}

$.get('/scores', data => {
    filterData(data);
});