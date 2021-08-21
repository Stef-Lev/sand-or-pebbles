class ExpressError extends Error {
    constructor(type = 'Generic Error', message, status) {
        super();
        this.type = type;
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;