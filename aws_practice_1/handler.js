export function asyncHandler(handler) {
    return function (req, res, next) {
        if (!handler) next(new Error(`Invalid handler ${handler}, it must be a function.`));
        else handler(req, res, next).catch(next);
    }
}