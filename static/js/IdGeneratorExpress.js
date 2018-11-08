module.exports = class IdGeneratorExpress {

    constructor() {
        this.listId = new Array();
        this.nextId = 0;
    }

    getId() {
        return this.nextId++;
    }
}
