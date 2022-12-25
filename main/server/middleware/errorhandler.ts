import ApiError from "../exteptions/api_exceptions";

function errorHandler(err, req, res, next) {
    if(err instanceof ApiError) {
        console.warn('error', '',  {
            message: 'Error Handler',
            action: `${req.method} : ${req.url}`,
            body: {
                ...req.body,
                secretKey: undefined,
                publicKey: undefined
            },
            err
        });
        return res.status(err.status).json({message: err.message, errors: err.errors});
    }
    console.warn(err);
    return res.status(500).json({message: 'Непредвиденная ошибка'});
}

export default errorHandler;