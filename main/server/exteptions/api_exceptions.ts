class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static unauthorizedError() {
        return new ApiError(401, 'Пользователь не зарегестрирован');
    }

    static badRequest(message, errors = []) {
        return new ApiError(400, message, errors)
    }
}

export default ApiError;