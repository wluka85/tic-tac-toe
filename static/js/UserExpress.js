module.exports = class UserExpress {

    constructor(userName, uuid) {
        this.userName = userName;
        this.uuid = uuid;
        this.playerIdList = new Array;
        this.scores = 0;
    }

    addGame(playerId) {
        this.playerIdList.push(playerId);
    }

    checkifContainsPlayerId(playerId) {
        return this.playerIdList.includes(playerId);
    }

    addScores(scores) {
        this.scores += scores;
    }
}
