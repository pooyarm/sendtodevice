const mockMiddleware = (store) => next => {
    return action => {
        next(action);
    }
}

export default mockMiddleware;