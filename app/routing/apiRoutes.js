// GET route for /api/friends
// POST route survey & compatibility

var friendsGroup = require('../data/friends.js');

module.exports = function (app) {
    app.get('/api/friends', function (req, res) {
        res.json(friendsGroup);
    });

    app.post('/api/friends', function (req, res) {
        var newAnswers = req.body.answers;
        var answersArray = [];
        var bestFriend = 0;

        for (var i = 0; i < friendsGroup.length; i++) {
            var answerSpread = 0;
            for (var j = 0; j < newAnswers.length; j++) {
                answerSpread += (Math.abs(friendsGroup[i].answers[j]) - parseInt(newAnswers[j]));
            }
            answersArray.push(answerSpread);
        }

        for (var i = 0; i < answersArray.length; i++) {
            if (answersArray[i] <= answersArray[bestFriend]) {
                bestFriend = i;
            }
        }

        var alphaMatch = friendsGroup[bestFriend];
        res.json(alphaMatch);

        friendsGroup.push(req.body);
    });
};