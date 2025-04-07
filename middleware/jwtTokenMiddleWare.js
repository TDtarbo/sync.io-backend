import jwt from "jsonwebtoken";

//Verify Email Login Link
const verifyMagicLinkToken = (req, res, next) => {

  const token = req.query.token;

  if(!token) return res.sendStatus(400)

  if (token) {
    try {
      const user = jwt.verify(token, process.env.MAGIC_SECRET_KEY);
      req.email = user.email;
      next();
    } catch (error) {
      console.error(`Verify Token Error: ${error}`);
        res.sendStatus(403);
    }
  }
};

//Verify JWT Token
const verifyToken = (req, res, next) => {

  const authHeader = req.headers.authorization;

  if (!authHeader) return res.sendStatus(403);

  const token = authHeader.split(" ")[1];

  if (!token) return res.sendStatus(400)

  try {
    const user = jwt.verify(token, process.env.ACCESS_SECRET_KEY);
    req.user = user;
    next();

  } catch (error) {
    console.error(`Verify Token Error: ${error}`);
    res.sendStatus(403);
  }
    
  
};

//Verify Cookie
const verifyCookie = (req, res, next) => {

  const refreshToken = req.cookies?.refreshToken || null;

  if (!refreshToken) return res.sendStatus(400)

  try {
    const user = jwt.verify(refreshToken, process.env.REFRESH_SECRET_KEY);
    req.user = user;
    next();
    
  } catch (error) {

    console.error(`Verify Cookie Error: ${error}`);
    res.sendStatus(403);
  }
  
};

const clearCookie = (req, res, next) => {

  const refreshToken = req.cookies?.refreshToken || null;

  if (!refreshToken) return res.sendStatus(400)

  try {
    
    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: false,  
      sameSite: "Strict",
    });
    
    res.sendStatus(200)
    
  } catch (error) {

    console.error(`Clear Cookie Error: ${error}`);
    res.sendStatus(500);
  }
  
}

export { verifyMagicLinkToken, verifyToken, verifyCookie, clearCookie };
