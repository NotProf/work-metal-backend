module.exports = (res, error) => {
    const status = error.status? error.status: 500;
    res.status(status).json({
        success: false,
        message: error.message? error.message: error
    })
}
