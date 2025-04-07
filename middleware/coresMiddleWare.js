import { allowedOrigins } from "../utils/corsConfig.js";

const corsMiddleWare = (req, res, next) => {

    const reqOrigin = req.headers.origin

    if(!reqOrigin || !allowedOrigins.includes(reqOrigin)) return res.status(405).json("CORS Error")

    res.header("Access-Control-Allow-Origin", reqOrigin);
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Cookie");
    
    next()
}

export default corsMiddleWare