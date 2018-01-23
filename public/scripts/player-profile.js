const $userTarget = $('[data-user]');
const $otherUsers = $('[data-dropdown]');
const $accordion = $('#accordion');


let filterData = theData => {
    let userId = $userTarget.attr('data-user-id');
    userId = Number(userId);
    const $sessionElements = $('[data-session]');
    $sessionElements.each((index, $element) => {
        $element = $($element);
        let sessionId = $element.attr('sessionId');
        sessionId = Number(sessionId);
        let filteredScores = theData
                            .filter((obj) => userId != obj.player.id)
                            .filter((obj) => sessionId == obj.session.id)
        console.log(filteredScores);
        filteredScores.forEach(obj => {
            let targetDiv = $element.find('[data-dropdown]');
            targetDiv.append(`<p>${obj.player.name} | ${obj.score}`);
        }); 
    }); 
}

$.get('/scores', data => {
    filterData(data);
});