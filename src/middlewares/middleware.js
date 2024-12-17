const constants = require('../utils/constants');
const publicRoutes = constants.ROUTES.PUBLIC_ROUTES;
const authMiddleware = require('./authMiddleware');

const middleware = ((req, res, next) => {
  let path = req.path.split('/');

  path = path ? path[path.length-1] : "";
    
  const isPublicRoute = publicRoutes.some((route) => {
    return path.startsWith(route);
  })

  if(isPublicRoute){
    return next();
  }

  authMiddleware(req, res, next);
})

module.exports = middleware;