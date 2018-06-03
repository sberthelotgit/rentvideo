const log = (req, res, next) =>{
    console.log(`request receive ${req.url}`);
    next();
};

module.exports = log;