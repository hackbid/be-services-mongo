module.exports = (err, req, res, next) => {
    let status;
    let message;
    switch (err.name) {
        case 'NotFound':
        case 'BSONError':
            status = 404;
            message = 'Data Not Found';
            break;
        default:
            status = 500;
            message = 'Internal server error';
            break;
    }
    res.status(status).json({ message });
};
