const $userTarget = $('[data-user]');
const $otherUsers = $('[data-dropdown]');
const $accordion = $('#accordion');
const $homePageUser = $('[data-home-user]');
const $playerLevel = $('[data-player-level]');

let userId = Number($userTarget.attr('data-user-id'));
let homePageId = Number($homePageUser.attr('home-id'));

let filterData = theData => {
    const $sessionElements = $('[data-session]');

    $sessionElements.each((index, element) => {
        let $element = $(element);
        let sessionId = Number($element.attr('sessionId'));
        let filteredScores = theData.filter((obj) => sessionId == obj.session.id);
        let orderedScores = _.sortBy(filteredScores, 'score').reverse();

        orderedScores.forEach(obj => {
            let targetDiv = $element.find('[data-dropdown]');

            if (userId === obj.player.id || obj.player.id === homePageId) {
                targetDiv.append(`<div class="current-player">
                                      <div class="session-player-name">${obj.player.name}</div>
                                      <div class="session-player-score"><span>${obj.score}</span></div>
                                      <div class="empty"></div>
                                  </div>`);
            } else {
                targetDiv.append(`<div class="other-player">
                                      <div class="session-player-name">${obj.player.name}</div>
                                      <div class="session-player-score"><span>${obj.score}</span></div>
                                      <div class="empty"></div>
                                  </div>`);
            }
        }); 
    }); 
}

let makePlayerLevel = (theData) => {
    let filteredData = theData.filter(obj => homePageId == obj.player.id || userId == obj.player.id);
    console.log(filteredData.length)
    let filterLength = filteredData.length;
    if (filterLength <= 0) {
        $playerLevel.text(`Level 0 Pissboy`);
    } else if (0 < filterLength && filterLength <= 5) {
        $playerLevel.text(`Level ${filterLength} Jester`);
    } else if (5 < filterLength && filterLength <= 10) {
        $playerLevel.text(`Level ${filterLength} Squire`);
    } else if (10 < filterLength && filterLength <= 20) {
        $playerLevel.text(`Level ${filterLength} Noble`);
    } else if (20 < filterLength && filterLength <= 30) {
        $playerLevel.text(`Level ${filterLength} Knight`);
    } else if (30 < filterLength && filterLength <= 40) {
        $playerLevel.text(`Level ${filterLength} Master`);
    } else if (40 < filterLength && filterLength < 50) {
        $playerLevel.text(`Level ${filterLength} Deity`);
    } else if (filterLength >= 50) {
        $playerLevel.text(`Level ${filterLength} Badass`);
    }
}

$.get('/scores', data => {
    filterData(data);
    makePlayerLevel(data);
});