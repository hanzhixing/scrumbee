class HttpError extends Error {
    constructor(message = '') {
        super(message);

        this.name = 'HttpError';
        this.message = message;

        if (typeof Error.captureStackTrace === 'function') {
            Error.captureStackTrace(this, this.constructor);
        } else {
            this.stack = (new Error(message)).stack;
        }
    }
}

export default HttpError;
