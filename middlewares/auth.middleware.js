const jwt = require('jsonwebtoken');
const User = require('../models/User.model');

const auth = (req, res, next) => {
  const token = req.get('Authorization');

  if(!token){
    return res.status(401).json({msg: 'Não existe um token'})
  }
  
  const tokenWithoutBearer = token.split(' ')[1];

  try {
    const decodedToken = jwt.verify(tokenWithoutBearer, process.env.SECRET_JWT);
    req.user = { ...decodedToken };
    next();
  } catch (error) {
    res.status(401).json({error: error.message});
  }

  
}

module.exports = auth;