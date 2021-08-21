class ExpressError extends Error {
    constructor(result = 'error', type = 'Generic Error', message, status = 500) {
        super();
        this.result = result;
        this.type = type;
        this.message = message;
        this.status = status;
    }
}

module.exports = ExpressError;