const wrapAsyncError = (fn) => (req, res, next) => fn(req, res, next).catch(next);

module.exports = wrapAsyncError;
