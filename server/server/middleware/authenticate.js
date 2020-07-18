const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const token = req.headers.authorization ?
        req.headers.authorization.split(" ")[1] :
        undefined;

    if (token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err)
                return res
                    .status(401)
                    .json({ message: "Unauthorized Access - Invalid Token" });
            else {
                req.decoded = decoded;
                next();
            }
        });
    else
        return res
            .status(403)
            .json({ message: "Unauthorized Access - No Token Provided!" });
};